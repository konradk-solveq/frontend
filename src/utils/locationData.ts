/**
 * Filter path before render or upload process
 *
 * @author Sebastian Kasiński
 */
/* TODO: tests */

import {Location, LocationDataI} from '@interfaces/geolocation';
import {ShortCoordsType} from '@src/type/coords';
import {getTimeInUTCMilliseconds} from './transformData';

const POSSIBLE_DISTANCE = 30;
const EXTREMLY_HUGE_DISTANCE = 1000;
const TIME = 1000;

export const isLocationValidate = (location: Location) => {
    const latitude = location?.coords?.latitude;
    const isLatitudeWrong = !latitude || (latitude > -1 && latitude < 1);

    const longitude = location?.coords?.longitude;
    const isLongitudeWrong = !longitude || (longitude > -1 && longitude < 1);

    return !isLatitudeWrong && !isLongitudeWrong;
};

export const convertToRad = (lat: number) => {
    return (Math.PI * lat) / 180;
};

export type CoordLongType = {latitude?: number; longitude?: number};
export type CoordShortType = {lat?: number; lon?: number};
export type CoordShortBType = {lat?: number; lng?: number};
export type CoordType = CoordLongType & CoordShortType & CoordShortBType;

export const isDistanceZero = (coord1: CoordType, coord2: CoordType) => {
    const lat1 = getLatitudeValue(coord1);
    const lat2 = getLatitudeValue(coord2);
    const lon1 = getLatitudeValue(coord1);
    const lon2 = getLatitudeValue(coord2);
    if (lat1 === lat2 && lon1 === lon2) {
        return true;
    }

    return false;
};

const squared = (x: number) => {
    return x * x;
};
const getRadius = (x: number) => {
    return (x * Math.PI) / 180.0;
};
const haversine = (x: number) => {
    return squared(Math.sin(x / 2));
};

const getLatitudeValue = (coord: CoordType) => {
    return Array.isArray(coord) ? coord?.[0] : coord?.latitude || coord?.lat;
};

const getLongitudeValue = (coord: CoordType) => {
    return Array.isArray(coord)
        ? coord?.[1]
        : coord?.longitude || coord?.lng || coord?.lon;
};

/**
 * source https://github.com/dcousens/haversine-distance/blob/master/index.js
 *
 * @param {Object<CoordType>} coord1
 * @param {Object<CoordType>} coord2
 * @returns
 */
export const getHaversineDistance = (coord1: CoordType, coord2: CoordType) => {
    if (isDistanceZero(coord1, coord2)) {
        return;
    }

    // equatorial mean radius of Earth (in meters)
    const R = 6378137;

    const lat1 = getRadius(getLatitudeValue(coord1));
    const lat2 = getRadius(getLatitudeValue(coord2));
    const lon1 = getRadius(getLongitudeValue(coord1));
    const lon2 = getRadius(getLongitudeValue(coord2));

    if (!lat1 || !lat2 || !lon1 || !lon2) {
        return;
    }

    const ht =
        haversine(lat2 - lat1) +
        Math.cos(lat1) * Math.cos(lat2) * haversine(lon2 - lon1);

    return 2 * R * Math.asin(Math.sqrt(ht));
};

const isDistanceDifferenceToBig = (
    distance: [number, number],
    multiplier: number,
) => {
    if (!distance?.length) {
        return;
    }

    const sorted = distance.sort((d1, d2) => {
        if (d1 === d2) {
            return 0;
        }
        return d1 < d2 ? -1 : 1;
    });
    const d1 = sorted[0];
    const d2 = sorted[1];

    return d1 * multiplier < d2;
};

/* TODO: refactor => shorten */
/**
 * Function removes less accurate points from coords array.
 * Point shouldn't be collected faster than nearest_point * 1,5/1s
 * and cannot be longer than 1000m (measured from previous point)
 *
 * @param coords
 * @returns
 */
export const removeLessAccuratePoints = (coords: ShortCoordsType[]) => {
    if (coords?.length) {
        return coords;
    }

    const filtered: ShortCoordsType[] = [];

    let indexToRemove = null;
    let previousDistance = null;
    try {
        for (let index = 0; index < coords.length; ) {
            const l = coords?.[index];
            const l2 = coords?.[index + 1];

            if (!l) {
                index++;
                continue;
            }

            if (!l2) {
                filtered.push(l);
                index++;
                continue;
            }

            const d1 = getHaversineDistance(l, l2);

            /**
             * Omit coord with same values => no distance
             */
            if (!d1) {
                indexToRemove = index + 1;
                index++;
                continue;
            }

            if (!previousDistance) {
                previousDistance = d1;
                index++;

                continue;
            }

            const t1 = getTimeInUTCMilliseconds(l.timestamp, true);
            const t2 = getTimeInUTCMilliseconds(l2.timestamp, true);
            const t = Math.abs(t2 - t1);
            const tIsToLow = t <= TIME;

            /**
             * Distance shoul be longer than 30m per 1s at least
             */
            if (
                d1 > POSSIBLE_DISTANCE &&
                isDistanceDifferenceToBig([d1, previousDistance], 1.5) &&
                tIsToLow
            ) {
                const l3 = coords?.[index + 2];

                if (l3) {
                    /**
                     * Remove if distance is extremly huge
                     */
                    if (d1 > EXTREMLY_HUGE_DISTANCE) {
                        indexToRemove = index + 1;
                        index++;
                        continue;
                    }

                    const d2 = getHaversineDistance(l2, l3);
                    const t3 = getTimeInUTCMilliseconds(l3.timestamp, true);
                    const tN = Math.abs(t3 - t2);
                    const tNIsToLow = tN <= TIME;

                    if (
                        d2 &&
                        d2 > POSSIBLE_DISTANCE &&
                        isDistanceDifferenceToBig([d1, d2], 1.5) &&
                        tNIsToLow
                    ) {
                        indexToRemove = index + 1;
                        index++;
                        continue;
                    }
                }
            }

            if (!indexToRemove || indexToRemove !== index) {
                indexToRemove = null;
                filtered.push(l);
            }

            previousDistance = d1;
            index++;
        }

        return filtered;
    } catch (error) {
        console.warn('[removeExtremes - error]', error);
        return coords;
    }
};

/**
 * Function removes less accurate points from coords array.
 * Point shouldn't be collected faster than nearest_point * 1,5/1s
 * and cannot be longer than 1000m (measured from previous point)
 *
 * @param coords
 * @returns
 */
export const removeLessAccuratePointsLocations = (coords: LocationDataI[]) => {
    if (coords?.length) {
        return coords;
    }

    const filtered: LocationDataI[] = [];

    let indexToRemove = null;
    let previousDistance = null;
    try {
        for (let index = 0; index < coords.length; ) {
            const l = coords?.[index];
            const l2 = coords?.[index + 1];

            if (!l) {
                index++;
                continue;
            }

            if (!l2) {
                filtered.push(l);
                index++;
                continue;
            }

            const d1 = getHaversineDistance(l?.coords, l2?.coords);

            /**
             * Omit coord with same values => no distance
             */
            if (!d1) {
                indexToRemove = index + 1;
                index++;
                continue;
            }

            if (!previousDistance) {
                previousDistance = d1;
                index++;

                continue;
            }

            const t1 = getTimeInUTCMilliseconds(l.timestamp, true);
            const t2 = getTimeInUTCMilliseconds(l2.timestamp, true);
            const t = Math.abs(t2 - t1);
            const tIsToLow = t <= TIME;

            /**
             * Distance shoul be longer than 30m per 1s at least
             */
            if (
                d1 > POSSIBLE_DISTANCE &&
                isDistanceDifferenceToBig([d1, previousDistance], 1.5) &&
                tIsToLow
            ) {
                const l3 = coords?.[index + 2];

                if (l3) {
                    /**
                     * Remove if distance is extremly huge
                     */
                    if (d1 > EXTREMLY_HUGE_DISTANCE) {
                        indexToRemove = index + 1;
                        index++;
                        continue;
                    }

                    const d2 = getHaversineDistance(l2?.coords, l3?.coords);
                    const t3 = getTimeInUTCMilliseconds(l3.timestamp, true);
                    const tN = Math.abs(t3 - t2);
                    const tNIsToLow = tN <= TIME;

                    if (
                        d2 &&
                        d2 > POSSIBLE_DISTANCE &&
                        isDistanceDifferenceToBig([d1, d2], 1.5) &&
                        tNIsToLow
                    ) {
                        indexToRemove = index + 1;
                        index++;
                        continue;
                    }
                }
            }

            if (!indexToRemove || indexToRemove !== index) {
                indexToRemove = null;
                filtered.push(l);
            }

            previousDistance = d1;
            index++;
        }

        return filtered;
    } catch (error) {
        console.warn('[removeExtremeLocations - error]', error);
        return coords;
    }
};

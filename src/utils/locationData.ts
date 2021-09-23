/**
 * Filter path before render or upload process
 *
 * @author Sebastian Kasiński
 */
/* TODO: tests */

import {Location, LocationDataI} from '@interfaces/geolocation';
import {ShortCoordsType} from '@src/type/coords';
import {getTimeInUTCMilliseconds} from './transformData';

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
 * @param coord1
 * @param coord2
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

/**
 * Function removes extreme points from coords array.
 * Point can't be collected faster than 70m/1s
 * and cannot be longer than 1000m (measured from previous point)
 *
 * @param coords
 * @returns
 */
export const removeExtremes = (coords: ShortCoordsType[]) => {
    const filtered: ShortCoordsType[] = [];

    let indexToRemove = null;
    try {
        for (let index = 0; index < coords.length; ) {
            const l = coords?.[index];
            const l2 = coords?.[index + 1];
            if (!l || !l2) {
                index++;
                continue;
            }

            const d1 = getHaversineDistance(l, l2);
            const t1 = getTimeInUTCMilliseconds(l.timestamp, true);
            const t2 = getTimeInUTCMilliseconds(l2.timestamp, true);
            const t = Math.abs(t2 - t1);
            const tIsToLow = t <= 1000;

            /**
             * Distans shouldn't be longer than 50m per 1s
             */
            if (d1 && d1 > 50 && tIsToLow) {
                const l3 = coords?.[index + 2];

                if (l3) {
                    /**
                     * Remove if distance is extremly big
                     */
                    if (d1 > 1000) {
                        indexToRemove = index + 1;

                        index++;
                        continue;
                    }

                    const d2 = getHaversineDistance(l2, l3);
                    const t3 = getTimeInUTCMilliseconds(l3.timestamp, true);
                    const tN = Math.abs(t3 - t2);
                    const tNIsToLow = tN <= 1000;
                    if (d2 && d2 > 50 && tNIsToLow) {
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

            index++;
        }

        return filtered;
    } catch (error) {
        console.warn('[removeExtremes - error]', error);
        return coords;
    }
};

/**
 * Function removes extreme points from coords array.
 * Point can't be collected faster than 70m/1s
 * and cannot be longer than 1000m (measured from previous point)
 *
 * @param coords
 * @returns
 */
export const removeExtremeLocations = (coords: LocationDataI[]) => {
    const filtered: LocationDataI[] = [];

    let indexToRemove = null;
    try {
        for (let index = 0; index < coords.length; ) {
            const l = coords?.[index];
            const l2 = coords?.[index + 1];
            if (!l || !l2) {
                index++;
                continue;
            }

            const d1 = getHaversineDistance(l?.coords, l2?.coords);
            const t1 = getTimeInUTCMilliseconds(l.timestamp, true);
            const t2 = getTimeInUTCMilliseconds(l2.timestamp, true);
            const t = Math.abs(t2 - t1);
            const tIsToLow = t <= 1000;

            /**
             * Distans shouldn't be longer than 50m per 1s
             */
            if (d1 && d1 > 50 && tIsToLow) {
                const l3 = coords?.[index + 2];

                if (l3) {
                    /**
                     * Remove if distance is extremly big
                     */
                    if (d1 > 1000) {
                        indexToRemove = index + 1;

                        index++;
                        continue;
                    }

                    const d2 = getHaversineDistance(l2?.coords, l3?.coords);
                    const t3 = getTimeInUTCMilliseconds(l3.timestamp, true);
                    const tN = Math.abs(t3 - t2);
                    const tNIsToLow = tN <= 1000;
                    if (d2 && d2 > 50 && tNIsToLow) {
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

            index++;
        }

        return filtered;
    } catch (error) {
        console.warn('[removeExtremeLocations - error]', error);
        return coords;
    }
};

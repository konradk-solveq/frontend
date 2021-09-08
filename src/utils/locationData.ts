import {Location} from '@interfaces/geolocation';

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
    // console.group('[get coord 1]', coord)
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

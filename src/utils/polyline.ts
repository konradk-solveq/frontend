/**
 * Utils for maps reducer.
 *
 * @author Sebastian Kasiński
 */

import {Decimate_STTrace} from '@solveq/path-decimation-sttrace';
import {GeoPoint} from '@solveq/path-decimation-prelude';

type ShortCoordsType = {
    latitude: number;
    longitude: number;
    timestamp?: number;
};

export const toGeoPoint = (data: ShortCoordsType) => {
    let date = data.timestamp ? new Date(data.timestamp) : new Date();
    const newPoint = new GeoPoint(data.latitude, data.longitude, date);

    return newPoint;
};

export const getCompresionRatio = (length?: number) => {
    if (!length || length < 1000) {
        return 1.0;
    }

    if (length < 3000) {
        return 0.7;
    }

    if (length < 5000) {
        return 0.5;
    }

    return 0.3;
};

/**
 * Reduce number of points to draw as polyline
 *
 * @param {Array<ShortCoordsType>} c coords
 * @returns {Array<ShortCoordsType>} filtered coords
 */
export const getShorterRoute = (
    c: ShortCoordsType[],
): Array<ShortCoordsType> => {
    try {
        const ratio = getCompresionRatio(c?.length);
        if (ratio < 1) {
            const transformed = c
                .map(toGeoPoint)
                .filter((r: GeoPoint | null) => r);

            const decimatedPath: ShortCoordsType[] = Decimate_STTrace(0.5)(
                transformed,
            ).map(gp => {
                return {
                    latitude: gp.getLatitude(),
                    longitude: gp.getLongitude(),
                };
            });

            return decimatedPath;
        }

        return c;
    } catch (error) {
        return c;
    }
};

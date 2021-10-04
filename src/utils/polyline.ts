/**
 * Utils for maps reducer.
 *
 * @author Sebastian Kasiński
 */

import {chunk, flatten} from 'lodash';
import {Decimate_STTrace} from '@solveq/path-decimation-sttrace';
import {GeoPoint} from '@solveq/path-decimation-prelude';

type ShortCoordsType = {
    latitude: number;
    longitude: number;
    timestamp: number;
};

export const toGeoPoint = (data: ShortCoordsType) => {
    let date = data.timestamp ? new Date(data.timestamp) : new Date();
    const newPoint = new GeoPoint(data.latitude, data.longitude, date);

    return newPoint;
};

export const getCompresionRatio = (length?: number) => {
    if (!length || length < 5000) {
        return 1.0;
    }

    if (length < 7000) {
        return 0.8;
    }

    if (length < 10000) {
        return 0.6;
    }

    if (length < 20000) {
        return 0.5;
    }

    return 0.3;
};

const simplifyRoute = (c: ShortCoordsType[], ratio: number) => {
    if (ratio < 1) {
        try {
            const transformed = c
                .map(toGeoPoint)
                .filter((r: GeoPoint | null) => r);
            const decimatedPath = Decimate_STTrace(ratio)(transformed);

            const transformed2: ShortCoordsType[] = decimatedPath.map(gp => {
                return {
                    latitude: gp.getLatitude(),
                    longitude: gp.getLongitude(),
                    timestamp: gp.getTime()?.getMilliseconds(),
                };
            });

            return transformed2;
        } catch (error) {
            return c;
        }
    }

    return c;
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

        const chunkes = chunk(c, 1000);
        const res: ShortCoordsType[][] = [];
        chunkes.forEach(ch => {
            const result = simplifyRoute(ch, ratio);
            res.push(result);
        });

        const shorten = flatten(res);

        return shorten;
    } catch (error) {
        console.warn('[getShorterRoute - error]', error);
        return c;
    }
};

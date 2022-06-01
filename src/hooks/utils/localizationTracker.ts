import {v4 as uuidv4} from 'uuid';

import {transformMetersToKilometersString} from '@utils/metersToKilometers';
import {getAverageSpeed, msToKH} from '@utils/speed';
import {isLocationValidate} from '@utils/locationData';
import {CurrentRouteI} from '@storage/reducers/routes';

export const DEFAULT_SPEED = '0.0';
export const DEFAULT_DISTANCE = '0.00';

export const getAverageSpeedData = (
    speedData: number[],
    oldAverageSpeed?: number,
) => {
    let aSpeed = getAverageSpeed(speedData);
    if (oldAverageSpeed) {
        aSpeed = getAverageSpeed([parseFloat(aSpeed), oldAverageSpeed]);
    }

    return aSpeed;
};

export const startCurrentRoute = async (
    followByRoute?: string,
): Promise<CurrentRouteI> => {
    return {
        id: uuidv4(),
        isActive: true,
        recordingState: 'recording',
        startedAt: new Date(),
        endedAt: undefined,
        routeId: followByRoute || undefined,
        pauseTime: 0,
        remoteRouteId: undefined,
    };
};

export const getTrackerData = (
    gpsData: any,
    averageSpeed?: string,
    noSpeed?: boolean,
) => {
    if (!gpsData || !isLocationValidate(gpsData)) {
        return;
    }

    const speed = noSpeed
        ? DEFAULT_SPEED
        : msToKH(gpsData?.coords?.speed) || DEFAULT_SPEED;
    const distance = transformMetersToKilometersString(
        gpsData?.odometer,
        2,
        true,
        '.',
    );

    const res = {
        distance: distance || DEFAULT_DISTANCE,
        speed: speed || DEFAULT_SPEED,
        // speed: !notMoving ? speed : DEFAULT_SPEED,
        averageSpeed: msToKH(averageSpeed) || DEFAULT_SPEED,
        odometer: gpsData?.odometer,
        coords: {
            lat: gpsData?.coords?.latitude,
            lon: gpsData?.coords?.longitude,
        },
        timestamp: gpsData?.timestamp,
    };

    return res;
};

export const isSpeedFromGps = (gpsData: any) => {
    return (
        gpsData?.is_moving &&
        gpsData?.speed_accuracy &&
        gpsData?.speed_accuracy !== -1
    );
};

export const deviceIsNotMoving = (gpsData: any) => {
    const isOdometerActive = gpsData?.odometer && gpsData?.odometer > 10;
    const notMoving =
        gpsData?.activity?.type &&
        gpsData?.activity?.type === 'still' &&
        gpsData?.activity?.confidence > 70;
    return (isOdometerActive && notMoving) || !gpsData?.is_moving;
};

export const speedToLow = (gpsData: any) => {
    return gpsData?.odometer < 1 && gpsData?.coords?.speed <= 1;
};

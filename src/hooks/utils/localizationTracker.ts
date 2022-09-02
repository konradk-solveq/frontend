import {v4 as uuidv4} from 'uuid';

import {transformMetersToKilometersString} from '@utils/metersToKilometers';
import {getAverageSpeed, msToKH} from '@utils/speed';
import {isLocationValidate} from '@utils/locationData';
import {CurrentRouteI} from '@storage/reducers/routes';
import {Location, RecordTimeAction, RecordTimeI} from '@interfaces/geolocation';
import {DataI} from '@hooks/useLocalizationTracker';
import {getCurrentLocation} from '@utils/geolocation';
import {
    getTimeInUTCSeconds,
    isLocationValidToPass,
} from '@src/utils/transformData';

export const DEFAULT_SPEED = '0.0';
export const DEFAULT_DISTANCE = '0.00';

export const getAverageSpeedData = (
    speedData: number[],
    oldAverageSpeed?: number,
) => {
    let avgSpeed = getAverageSpeed([...speedData]);
    if (oldAverageSpeed) {
        avgSpeed = getAverageSpeed([parseFloat(avgSpeed), oldAverageSpeed]);
    }

    return avgSpeed;
};

export const getRecordTime = (
    actionType: RecordTimeAction,
    date?: Date,
): RecordTimeI | undefined => {
    try {
        const d = date ? new Date(date) : new Date();

        const recordTime = {
            action: actionType,
            time: getTimeInUTCSeconds(d.toISOString()),
        };
        return recordTime;
    } catch (error) {
        console.error('[getRecordTime - error: ]', error);
        return;
    }
};

export const startCurrentRoute = async (
    followByRoute?: string,
): Promise<CurrentRouteI> => {
    const recordTime = getRecordTime(RecordTimeAction.START);
    const recordTimes = recordTime ? [recordTime] : [];

    return {
        id: uuidv4(),
        isActive: true,
        recordingState: 'recording',
        startedAt: new Date(),
        endedAt: undefined,
        recordTimes: recordTimes,
        routeId: followByRoute || undefined,
        pauseTime: 0,
        remoteRouteId: undefined,
    };
};

export const getTrackerData = (
    gpsData: Location,
    noSpeed?: boolean,
    noDistance?: boolean,
): DataI | undefined => {
    if (!gpsData || !isLocationValidate(gpsData)) {
        return;
    }

    const speed = noSpeed
        ? DEFAULT_SPEED
        : msToKH(gpsData?.coords?.speed) || DEFAULT_SPEED;
    const distance = noDistance
        ? DEFAULT_DISTANCE
        : transformMetersToKilometersString(gpsData?.odometer, 2, true, '.');

    const res = {
        distance: distance || DEFAULT_DISTANCE,
        speed: speed || DEFAULT_SPEED,
        odometer: noDistance ? 0 : gpsData?.odometer,
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

export const getLocationData = async (
    routeId?: string,
    fastTimeout?: boolean,
    locationData?: Location,
) => {
    const currentLocationData =
        locationData ||
        (await getCurrentLocation(
            routeId,
            fastTimeout ? 4 : undefined,
            undefined,
            fastTimeout,
            fastTimeout ? 5 : 15,
            fastTimeout ? 2000 : 500,
            fastTimeout,
        ));

    if (!currentLocationData) {
        return;
    }

    if (!isLocationValidate(currentLocationData)) {
        return;
    }

    if (!fastTimeout && !isLocationValidToPass(currentLocationData, routeId)) {
        return;
    }

    const lowSpeed = speedToLow(currentLocationData);
    const res = getTrackerData(currentLocationData, lowSpeed);

    if (!res) {
        return;
    }

    return {
        trackerData: res,
        lowSpeed: lowSpeed,
    };
};

import {useCallback, useEffect, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import {
    activateKeepAwake,
    deactivateKeepAwake,
} from '@sayem314/react-native-keep-awake';

import {useAppDispatch, useAppSelector} from './redux';
import {trackerCurrentRouteAverrageSpeedSelector} from '../storage/selectors/routes';
import {
    persistCurrentRouteData,
    setAverageSpeed,
    setCurrentRoute,
    stopCurrentRoute,
} from '../storage/actions/routes';
import {
    cleanUp,
    getBackgroundGeolocationState,
    getCurrentLocation,
    requestGeolocationPermission,
    startBackgroundGeolocation,
    stopBackgroundGeolocation,
} from '../utils/geolocation';
import {transformMetersToKilometersString} from '../utils/metersToKilometers';
import {getAverageSpeed, msToKH} from '../utils/speed';

interface DataI {
    distance: string;
    speed: string;
    averageSpeed: string;
    odometer: number;
    coords: {
        lat: number;
        lon: number;
    };
}

const startCurrentRoute = async () => {
    return {
        id: uuidv4(),
        isActive: true,
        startedAt: new Date(),
        endedAt: undefined,
    };
};

const useLocalizationTracker = (persist: boolean) => {
    const dispatch = useAppDispatch();
    const currentRouteAverrageSpeed = useAppSelector(
        trackerCurrentRouteAverrageSpeedSelector,
    );
    const [isActive, setIsActive] = useState(false);
    const [trackerData, setTrackerData] = useState<DataI>();
    const [lastDistance, setLastDistance] = useState<number>(0);
    const [averageSpeed, setCurrentAverageSpeed] = useState<
        number | undefined
    >();

    const onPersistData = useCallback(
        async (d: number) => {
            if (d - lastDistance < 500) {
                return;
            }

            dispatch(persistCurrentRouteData());
            if (averageSpeed) {
                dispatch(setAverageSpeed(averageSpeed));
            }
            setLastDistance(d);
        },
        [dispatch, lastDistance, averageSpeed],
    );

    const stopTracker = async () => {
        /* TODO: error */
        dispatch(persistCurrentRouteData());
        await stopBackgroundGeolocation();

        deactivateKeepAwake();
        dispatch(stopCurrentRoute());
        setIsActive(false);
    };

    const startTracker = async (keep?: boolean) => {
        /* TODO: error */
        const state = await getBackgroundGeolocationState();

        if (state.enabled && !keep) {
            await stopTracker();
        }

        setIsActive(true);
        activateKeepAwake();

        await startBackgroundGeolocation(keep);
        if (!keep) {
            const currRoute = await startCurrentRoute();
            dispatch(setCurrentRoute(keep ? undefined : currRoute));
        }
    };

    useEffect(() => {
        requestGeolocationPermission();
    }, []);

    useEffect(() => {
        let interval: any;
        if (isActive) {
            const speed: number[] = [];
            interval = setInterval(() => {
                getCurrentLocation().then(d => {
                    if (d?.coords?.speed) {
                        speed.push(d?.coords?.speed);
                    }

                    let aSpeed = getAverageSpeed(speed);
                    if (currentRouteAverrageSpeed) {
                        aSpeed = getAverageSpeed([
                            parseFloat(aSpeed),
                            currentRouteAverrageSpeed,
                        ]);
                    }
                    const distance = transformMetersToKilometersString(
                        d?.odometer,
                        2,
                        true,
                    );

                    const res = {
                        distance: distance || '00,00',
                        speed: msToKH(d?.coords?.speed) || '00,0',
                        averageSpeed: msToKH(aSpeed) || '00,0',
                        odometer: d?.odometer,
                        coords: {
                            lat: d?.coords?.latitude,
                            lon: d?.coords?.longitude,
                        },
                    };

                    setTrackerData(res);
                    setCurrentAverageSpeed(parseFloat(aSpeed));

                    if (persist) {
                        onPersistData(d?.odometer);
                    }
                });
            }, 5000);
        }

        return () => {
            clearInterval(interval);
            cleanUp();
        };
    }, [isActive, persist, onPersistData, currentRouteAverrageSpeed]);

    return {
        trackerData,
        lastDistance,
        isActive,
        startTracker,
        stopTracker,
        averageSpeed,
    };
};

export default useLocalizationTracker;

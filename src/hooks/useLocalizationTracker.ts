import {useCallback, useEffect, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import {
    activateKeepAwake,
    deactivateKeepAwake,
} from '@sayem314/react-native-keep-awake';

import {useAppDispatch} from './redux';
import {
    persistCurrentRouteData,
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
}

const startCurrentRoute = async () => {
    return {
        id: uuidv4(),
        isActive: true,
        startedAt: new Date(),
    };
};

const useLocalizationTracker = (persist: boolean) => {
    const dispatch = useAppDispatch();
    const [isActive, setIsActive] = useState(false);
    const [trackerData, setTrackerData] = useState<DataI>();
    const [lastDistance, setLastDistance] = useState<number>(0);

    const onPersistData = useCallback(
        async (d: number) => {
            if (d - lastDistance < 1000) {
                return;
            }

            persistCurrentRouteData();
            setLastDistance(d);
        },
        [lastDistance],
    );

    const stopTracker = async () => {
        /* TODO: error */
        // await stopBackgroundGeolocation();
        const state = await stopBackgroundGeolocation();
        console.log('[stopTracker]', state?.enabled);
        deactivateKeepAwake();
        dispatch(stopCurrentRoute());
        setIsActive(false);
    };

    const startTracker = async (keep?: boolean) => {
        /* TODO: error */
        const state = await getBackgroundGeolocationState();
        console.log('[startTracker]', state.enabled);
        if (state.enabled && !keep) {
            await stopTracker();
        }

        setIsActive(true);
        activateKeepAwake();

        if (!keep) {
            await startBackgroundGeolocation(keep);
        }

        const currRoute = await startCurrentRoute();
        dispatch(setCurrentRoute(keep ? undefined : currRoute));
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

                    const averageSpeed = getAverageSpeed(speed);
                    const distance = transformMetersToKilometersString(
                        d?.odometer,
                        2,
                        true,
                    );

                    const res = {
                        distance: distance || '00,00',
                        speed: msToKH(d?.coords?.speed) || '00,0',
                        averageSpeed: msToKH(averageSpeed) || '00,0',
                    };

                    setTrackerData(res);
                    if (persist) {
                        onPersistData(d?.odometer);
                    }
                });
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isActive, persist, onPersistData]);

    return {
        trackerData,
        lastDistance,
        isActive,
        startTracker,
        stopTracker,
    };
};

export default useLocalizationTracker;

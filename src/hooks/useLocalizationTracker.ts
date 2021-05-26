import {useCallback, useEffect, useState} from 'react';
import {
    activateKeepAwake,
    deactivateKeepAwake,
} from '@sayem314/react-native-keep-awake';

import {
    cleanUp,
    getBackgroundGeolocationState,
    getCurrentLocation,
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

const useLocalizationTracker = (persist: boolean) => {
    const [isActive, setIsActive] = useState(false);
    const [trackerData, setTrackerData] = useState<DataI>();
    const [lastDistance, setLastDistance] = useState<number>(0);

    const onPersistData = useCallback(
        async (d: number) => {
            if (d - lastDistance < 1000) {
                return;
            }
            /* TODO: persist locations to redux */
            // const locations = await getLocations();
            setLastDistance(d);
        },
        [lastDistance],
    );

    const startTracker = async () => {
        console.log('started');
        const state = await getBackgroundGeolocationState();
        console.log('[onStartGPSHandler]', state.enabled);
        if (!state.enabled) {
            setIsActive(true);
            activateKeepAwake();
            await startBackgroundGeolocation();
        }
    };

    const stopTracker = async () => {
        console.log('stoped');
        await stopBackgroundGeolocation();
        deactivateKeepAwake();
        setIsActive(false);
    };

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
            cleanUp();
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

import {useRef, useState, useEffect} from 'react';
import CompassHeading from 'react-native-compass-heading';

import useAppState from '@hooks/useAppState';

/**
 * 'react-native-compass-heading' envet listener is limited to 1,
 * so you can use only one useEffect at the same time.
 * Every other listener will be stopped and removed by library.
 */
const useCompassHook = (disabled?: boolean) => {
    const mountedRef = useRef(false);
    /**
     * Pause compass when app is on background mode
     */
    const pauseCompassRef = useRef(false);
    const prevCompassHeadingdRef = useRef(0);

    const [compassHeading, setCompassHeading] = useState(0);

    const {appStateVisible, appPrevStateVisible} = useAppState();
    useEffect(() => {
        mountedRef.current = true;

        return () => {
            mountedRef.current = false;
        };
    }, []);

    useEffect(() => {
        if (
            appPrevStateVisible === 'active' &&
            appStateVisible === 'background'
        ) {
            pauseCompassRef.current = true;
            return;
        }

        pauseCompassRef.current = false;
    }, [appPrevStateVisible, appStateVisible]);

    useEffect(() => {
        try {
            if (disabled) {
                CompassHeading.stop();
                return;
            }
            const degree_update_rate = 5;
            if (mountedRef.current) {
                CompassHeading.start(degree_update_rate, ({heading}) => {
                    if (pauseCompassRef.current) {
                        return;
                    }

                    const lastHeading = prevCompassHeadingdRef.current;
                    prevCompassHeadingdRef.current = heading;

                    if (Math.abs(lastHeading - heading) >= degree_update_rate) {
                        setCompassHeading(heading);
                    }
                });
            }
        } catch (error) {
            console.error(error);
        }
        return () => {
            try {
                CompassHeading.stop();
            } catch (error) {
                console.error(error);
            }
        };
    }, [disabled]);

    return compassHeading;
};

export default useCompassHook;

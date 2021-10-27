import {useRef, useState, useEffect} from 'react';
import CompassHeading from 'react-native-compass-heading';

import useAppState from '@hooks/useAppState';

const useCompassHook = (disable?: boolean) => {
    const mountedRef = useRef(false);
    /**
     * Pause compass when app is background mode active
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
        if (disable) {
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
        return () => {
            CompassHeading.stop();
        };
    }, [disable]);

    return compassHeading;
};

export default useCompassHook;

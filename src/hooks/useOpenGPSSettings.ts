import {useEffect, useState} from 'react';

import {openGPSModule} from '../utils/geolocation';

const useOpenGPSSettings = (stopOnInit?: boolean) => {
    const [isGPSEnabled, setIsGPSEnabled] = useState(false);

    const openLocationSettings = async () => {
        const res = await openGPSModule();
        if (res === 'enabled' || res === 'already-enabled') {
            setIsGPSEnabled(true);
            return;
        }
        setIsGPSEnabled(false);
    };

    useEffect(() => {
        if (!stopOnInit) {
            const t = setTimeout(() => {
                openLocationSettings();
            }, 500);

            return () => {
                clearTimeout(t);
            };
        }
    }, [stopOnInit]);

    return {isGPSEnabled, openLocationSettings};
};

export default useOpenGPSSettings;

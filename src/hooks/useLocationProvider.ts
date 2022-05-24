import {useCallback, useEffect, useRef, useState} from 'react';

import {AuthorizationStatusEnum, ProviderChangeEventI} from '@type/location';
import {
    getCurrentLocation,
    getProviderState,
    LOCATION_ACCURACY,
    onProviderChangeListener,
} from '@utils/geolocation';
import useCheckLocationType from '@hooks/staticLocationProvider/useCheckLocationType';

const useLocationProvider = () => {
    /**
     * Initialize the location provider
     */
    const checkInitRef = useRef(false);

    const [locationEnabled, setLocationEnabled] = useState(false);
    const [gpsAvailable, setGpsAvailable] = useState(false);
    const [highDesiredAccuracy, setHighDesiredAccuracy] = useState(false);

    const {permissionGranted} = useCheckLocationType();

    const checkLocationAccuracy = useCallback(() => {
        getCurrentLocation(undefined, 4, 10, true).then(location => {
            /**
             * Check if accuracy is defined and is high enough
             */
            if (
                location?.coords?.accuracy &&
                location?.coords?.accuracy <= LOCATION_ACCURACY &&
                location?.coords?.accuracy > 0
            ) {
                setHighDesiredAccuracy(true);
            } else {
                setHighDesiredAccuracy(false);
            }

            getProviderState().then(state => {
                /**
                 * Re-check if GPS is available
                 */
                if (state?.gps) {
                    setGpsAvailable(true);
                }
            });
        });
    }, []);

    const checkProviderState = useCallback(
        (state?: ProviderChangeEventI) => {
            if (!state) {
                return;
            }

            /**
             * Check if location services are enabled
             */
            const isLocationEnabled = state.enabled;
            /**
             * Check if GPS provider is available
             */
            const isGpsAvailable = state.gps;

            /**
             * Make sure that locasion permission is granted
             */
            let authorized = true;
            if (
                state.status ===
                    AuthorizationStatusEnum.AUTHORIZATION_STATUS_DENIED ||
                state.status ===
                    AuthorizationStatusEnum.AUTHORIZATION_STATUS_RESTRICTED ||
                state.status ===
                    AuthorizationStatusEnum.AUTHORIZATION_STATUS_NOT_DETERMINED
            ) {
                authorized = false;
            }

            setLocationEnabled(isLocationEnabled && authorized);
            setGpsAvailable(isGpsAvailable);

            if (isLocationEnabled) {
                if (isGpsAvailable) {
                    setHighDesiredAccuracy(true);
                } else {
                    setHighDesiredAccuracy(false);
                }

                checkInitRef.current = true;
                /**
                 * Do additional checks for location accuracy
                 */
                checkLocationAccuracy();
            }
        },
        [checkLocationAccuracy],
    );

    useEffect(() => {
        /* TODO: check condition if component will be rendered globbaly (above navigation stack) */
        if (!permissionGranted) {
            return;
        }

        /**
         * Check current ProviderState
         */
        getProviderState().then(checkProviderState);

        /**
         * Subscribe to event listener
         */
        const subscription = onProviderChangeListener(checkProviderState);

        return () => {
            subscription?.remove();
        };
    }, [permissionGranted, checkLocationAccuracy, checkProviderState]);

    return {
        locationEnabled,
        gpsAvailable,
        highDesiredAccuracy,
        initialized: checkInitRef.current,
    };
};

export default useLocationProvider;

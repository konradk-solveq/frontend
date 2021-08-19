import {useEffect, useState, useCallback} from 'react';

import {LocationType, locationTypeEnum} from '@type/location';
import {onboardingFinishedSelector} from '@storage/selectors';
import {useAppSelector} from '@hooks/redux';
import useFineWhenInUseLocationPermission from '@hooks/useFineWhenInUseLocationPermission';
import {checkDeviceHasLocationAlwaysPermission} from '@utils/geolocation';

const useCheckLocationType = (isEnabled?: boolean, skipChecking?: boolean) => {
    const isOnboardingFinished = useAppSelector(onboardingFinishedSelector);

    const {permissionResult} = useFineWhenInUseLocationPermission(
        !isOnboardingFinished,
    );

    const [locationType, setLocationType] = useState<LocationType>(
        locationTypeEnum.NONE,
    );

    const checkLocationType = useCallback(async () => {
        if (permissionResult !== 'granted' && !skipChecking) {
            return false;
        }

        const isBackgroundGeolocationEnabled =
            isEnabled !== undefined
                ? isEnabled
                : await checkDeviceHasLocationAlwaysPermission();

        setLocationType(
            isBackgroundGeolocationEnabled
                ? locationTypeEnum.ALWAYS
                : locationTypeEnum.WHEN_IN_USE,
        );

        return true;
    }, [isEnabled, permissionResult, skipChecking]);

    useEffect(() => {
        checkLocationType();
    }, [checkLocationType]);

    return {
        locationType,
        setLocationType,
        checkLocationType,
        permissionGranted: permissionResult === 'granted',
    };
};

export default useCheckLocationType;

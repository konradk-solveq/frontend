import {useEffect, useState, useCallback} from 'react';

import {LocationType, locationTypeEnum} from '@type/location';
import {checkDeviceHasLocationAlwaysPermission} from '@utils/geolocation';

const useCheckLocationType = (isEnabled?: boolean) => {
    const [locationType, setLocationType] = useState<LocationType>(
        locationTypeEnum.NONE,
    );

    const checkLocationType = useCallback(async () => {
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
    }, [isEnabled]);

    useEffect(() => {
        checkLocationType();
    }, [checkLocationType]);

    return {locationType, setLocationType, checkLocationType};
};

export default useCheckLocationType;

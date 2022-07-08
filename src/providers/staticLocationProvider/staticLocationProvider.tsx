import React, {createContext, useContext, useMemo} from 'react';

import {BasicCoordsType} from '@type/coords';
import {locationTypeEnum} from '@type/location';

import useProviderStaticLocation from '@hooks/staticLocationProvider/useProviderStaticLocation';

type contType = {
    location: BasicCoordsType | undefined;
    locationType: locationTypeEnum;
    isTrackingActivatedHandler: (a: boolean) => void;
};

export const LocationDataContext = createContext<contType>({
    location: undefined,
    locationType: locationTypeEnum.NONE,
    isTrackingActivatedHandler: (_: boolean) => {},
});

export const useLocationProvider = () => useContext(LocationDataContext);

interface IProps {
    children?: React.ReactNode;
}

const StaticLocationProvider: React.FC<IProps> = ({children}: IProps) => {
    const {
        location,
        locationType,
        isTrackingActivatedHandler,
    } = useProviderStaticLocation();

    const values = useMemo(
        () => ({
            location,
            locationType,
            isTrackingActivatedHandler,
        }),
        [location, locationType, isTrackingActivatedHandler],
    );

    if (!children) {
        return null;
    }

    return (
        <LocationDataContext.Provider value={values}>
            {children}
        </LocationDataContext.Provider>
    );
};

export default React.memo(StaticLocationProvider);

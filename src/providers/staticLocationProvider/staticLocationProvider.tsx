import React, {createContext, useContext} from 'react';

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
    isTrackingActivatedHandler: (a: boolean) => {},
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

    if (!children) {
        return null;
    }

    return (
        <LocationDataContext.Provider
            value={{location, locationType, isTrackingActivatedHandler}}>
            {children}
        </LocationDataContext.Provider>
    );
};

export default React.memo(StaticLocationProvider);

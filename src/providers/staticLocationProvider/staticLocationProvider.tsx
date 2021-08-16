import React, {createContext, useContext} from 'react';

import {BasicCoordsType} from '@type/coords';

import useProviderStaticLocation from '@hooks/staticLocationProvider/useProviderStaticLocation';

type contType = {
    location: BasicCoordsType | undefined;
    isTrackingActivatedHandler: (a: boolean) => void;
};

export const LocationDataContext = createContext<contType>({
    location: undefined,
    isTrackingActivatedHandler: (a: boolean) => {},
});

export const useLocationProvider = () => useContext(LocationDataContext);

interface IProps {
    children?: React.ReactNode;
}

const StaticLocationProvider: React.FC<IProps> = ({children}: IProps) => {
    const {location, isTrackingActivatedHandler} = useProviderStaticLocation();

    if (!children) {
        return null;
    }

    return (
        <LocationDataContext.Provider
            value={{location, isTrackingActivatedHandler}}>
            {children}
        </LocationDataContext.Provider>
    );
};

export default React.memo(StaticLocationProvider);

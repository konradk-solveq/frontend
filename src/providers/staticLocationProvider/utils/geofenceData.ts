import {Location} from '@interfaces/geolocation';
import {BasicCoordsType} from '@type/coords';

export const IDENTIFIER = 'APP_CURRENT_GLOBAL_LOCATION';

export const transfromToProperFormat = (
    location: Location | undefined,
): BasicCoordsType | undefined => {
    let result;
    if (location?.coords) {
        result = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        };
    }

    return result;
};

export const shouldOmit = (identifier: string | undefined) => {
    return identifier && identifier !== IDENTIFIER ? true : false;
};

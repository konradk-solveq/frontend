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

/**
 * use only if you're sure you don't need other fields than coords, but need the Location type
 */

export const transformCoordsToLocation = (
    coords: BasicCoordsType | undefined,
): Location | undefined => {
    let result;
    if (coords) {
        result = {
            activity: {activity: '', confidence: 0},
            battery: {is_charging: false, level: 100},
            odometer: 0,
            uuid: '',
            coords: {
                latitude: coords.latitude,
                longitude: coords.longitude,
                accuracy: 0,
            },
            timestamp: `${new Date().getTime()}`,
            is_moving: false,
        };
    }

    return result;
};

export const shouldOmit = (identifier: string | undefined) => {
    return identifier && identifier !== IDENTIFIER ? true : false;
};

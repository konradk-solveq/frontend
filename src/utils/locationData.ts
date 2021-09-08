import {Location} from '@interfaces/geolocation';

export const isLocationValidate = (location: Location) => {
    const isLatitudeWrong =
        location?.coords?.latitude > -1 && location?.coords?.latitude < 1;

    const isLongitudeWrong =
        location?.coords?.longitude > -1 && location?.coords?.longitude < 1;

    return !isLatitudeWrong && !isLongitudeWrong;
};

import {Location} from '@interfaces/geolocation';

export const isLocationValidate = (location: Location) => {
    const latitude = location?.coords?.latitude;
    const isLatitudeWrong = !latitude || (latitude > -1 && latitude < 1);

    const longitude = location?.coords?.longitude;
    const isLongitudeWrong = !longitude || (longitude > -1 && longitude < 1);

    return !isLatitudeWrong && !isLongitudeWrong;
};

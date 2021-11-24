import {LatLng} from 'react-native-maps';

export const getCenterCameraCoords = (
    coordsFromTracker: {lat: number; lon: number} | undefined,
    locationCoords: LatLng | null,
    previousCoords: LatLng | undefined,
) => {
    let location: LatLng | undefined;
    if (coordsFromTracker) {
        location = {
            latitude: coordsFromTracker.lat,
            longitude: coordsFromTracker.lon,
        };
    } else if (locationCoords) {
        location = {
            latitude: locationCoords.latitude,
            longitude: locationCoords.longitude,
        };
    } else if (previousCoords) {
        location = previousCoords;
    }

    return location;
};

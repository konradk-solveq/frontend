import BackgroundGeolocation, {
    Location,
    LocationError,
} from 'react-native-background-geolocation';

import {LocationDataI} from '../interfaces/geolocation';

/* TODO: catch errors */
export const initBGeolocalization = async () => {
    const state = await BackgroundGeolocation.ready({
        reset: true,
        stopOnTerminate: false,
        startOnBoot: true,
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        locationAuthorizationRequest: 'Always',
        locationAuthorizationAlert: {
            titleWhenNotEnabled: 'Location-services not enabled',
            titleWhenOff: 'Location-services OFF',
            instructions: "You must enable 'Always' in location-services",
            cancelButton: 'Cancel',
            settingsButton: 'Settings',
        },
        backgroundPermissionRationale: {
            title: "Allow access to this device's location in the background?",
            message:
                "In order to allow track activity when app is in the background, please enable 'Allow all the time permission",
            positiveAction: 'Change to Allow all the time',
        },
        distanceFilter: 40,
        stopTimeout: 5,
        debug: __DEV__ ? true : false,
        logLevel: __DEV__
            ? BackgroundGeolocation.LOG_LEVEL_VERBOSE
            : BackgroundGeolocation.LOG_LEVEL_OFF,
        maxDaysToPersist: 14,
        desiredOdometerAccuracy: 10,
    });

    return state;
};

export const getCurrentLocation = async () => {
    const location = await BackgroundGeolocation.getCurrentPosition({
        timeout: 30,
        maximumAge: 5000,
        desiredAccuracy: 10,
        samples: 3,
    });

    return location;
};

export const getLatLng = async () => {
    const location = await getCurrentLocation();
    const lat = location.coords.latitude;
    const lng = location.coords.longitude;
    return {lat, lng};
};

export const getBackgroundGeolocationState = async () => {
    const state = await BackgroundGeolocation.getState();

    return state;
};

export const startBackgroundGeolocation = async (keep?: boolean) => {
    if (!keep) {
        await BackgroundGeolocation.resetOdometer();
    }

    const state = await BackgroundGeolocation.start();

    return state;
};

export const stopBackgroundGeolocation = async () => {
    const state = await BackgroundGeolocation.stop();
    console.log('stopBackgroundGeolocation', state.enabled);
    return state;
};

export const cleanUp = () => {
    BackgroundGeolocation.removeListeners();
};

export const onLocationChange = async (
    onLocation: (data: Location) => void,
    onError: (error: LocationError) => void,
) => {
    BackgroundGeolocation.onLocation(onLocation, onError);
};

export const transformGeoloCationData = (data: Location): LocationDataI => {
    const location = {
        uuid: data.uuid,
        timestamp: data.timestamp,
        coords: {
            latitude: data.coords.latitude,
            longitude: data.coords.longitude,
            altitude: data.coords.altitude,
            speed: data.coords.speed,
        },
        odomenter: data.odometer,
    };

    return location;
};

export const getLocations = async () => {
    const locations = await BackgroundGeolocation.getLocations();

    return locations;
};

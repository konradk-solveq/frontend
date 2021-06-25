import BackgroundGeolocation, {
    Location,
    LocationError,
} from 'react-native-background-geolocation-android';
import GetLocation from 'react-native-get-location';

import {LocationDataI} from '../interfaces/geolocation';

/* TODO: catch errors */
export const initBGeolocalization = async (notificationTitle: string) => {
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
        distanceFilter: 10,
        stopTimeout: 1,
        debug: __DEV__ ? true : false,
        logLevel: __DEV__
            ? BackgroundGeolocation.LOG_LEVEL_VERBOSE
            : BackgroundGeolocation.LOG_LEVEL_OFF,
        maxDaysToPersist: 5,
        desiredOdometerAccuracy: 10,
        notification: {
            text: notificationTitle,
            smallIcon: 'drawable/ic_launcher_round',
        },
        preventSuspend: true,
        heartbeatInterval: 60,
        activityType: BackgroundGeolocation.ACTIVITY_TYPE_FITNESS,
    });

    return state;
};

export const getCurrentLocation = async (routeId?: string) => {
    const location = await BackgroundGeolocation.getCurrentPosition({
        timeout: 30,
        maximumAge: 500,
        desiredAccuracy: 10,
        samples: 6,
        persist: true,
        extras: {
            route_id: routeId || '',
        },
    });

    return location;
};

export const getLatLng = async () => {
    const location = await getCurrentLocation();
    const lat = location.coords.latitude;
    const lng = location.coords.longitude;
    return {lat, lng};
};
/**
 * TODO: change to listen for geofances constantly.
 * Loc should be reqested only on beginging and set geofacne (let say about 1km).
 * onExit event locaclization should be updated.
 */
export const getLatLngFromForeground = async () => {
    const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
    });
    const lat = location.latitude;
    const lng = location.longitude;
    return {lat, lng};
};

export const getBackgroundGeolocationState = async () => {
    const state = await BackgroundGeolocation.getState();

    return state;
};

export const startBackgroundGeolocation = async (
    routeId: string,
    keep?: boolean,
) => {
    if (!keep) {
        await BackgroundGeolocation.resetOdometer();
    }
    await BackgroundGeolocation.setConfig({
        isMoving: true,
        extras: {
            route_id: routeId,
        },
    });

    const state = await BackgroundGeolocation.start();
    await BackgroundGeolocation.changePace(true);

    return state;
};

export const stopBackgroundGeolocation = async () => {
    await BackgroundGeolocation.changePace(false);
    const state = await BackgroundGeolocation.stop();
    await BackgroundGeolocation.setConfig({
        isMoving: false,
        extras: {
            route_id: '',
        },
    });

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
        odometer: data.odometer,
    };

    return location;
};

export const getLocations = async () => {
    const locations = await BackgroundGeolocation.getLocations();

    return locations;
};

export const requestGeolocationPermission = async () => {
    const status = await BackgroundGeolocation.requestPermission();

    return status;
};

export const pauseTracingLocation = async () => {
    await BackgroundGeolocation.changePace(false);
};

export const resumeTracingLocation = async () => {
    await BackgroundGeolocation.changePace(true);
};

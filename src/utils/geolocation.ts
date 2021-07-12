import {Platform} from 'react-native';
import BackgroundGeolocation, {
    Location,
    LocationError,
} from 'react-native-background-geolocation-android';
import {
    checkMultiple,
    PERMISSIONS,
    RESULTS,
    request,
} from 'react-native-permissions';
import {I18n} from '../../I18n/I18n';

import {LocationDataI} from '../interfaces/geolocation';

const isIOS = Platform.OS === 'ios';

/* TODO: catch errors */
export const initBGeolocalization = async (notificationTitle: string) => {
    const trans: any = I18n.t('Geolocation.backgroundPermissionRationale');

    const state = await BackgroundGeolocation.ready({
        reset: true,
        stopOnTerminate: false,
        startOnBoot: true,
        desiredAccuracy: isIOS
            ? BackgroundGeolocation.DESIRED_ACCURACY_NAVIGATION
            : BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        locationAuthorizationRequest: 'Always',
        locationAuthorizationAlert: {
            titleWhenNotEnabled: trans.titleWhenNotEnabled,
            titleWhenOff: trans.titleWhenOff,
            instructions: trans.instructions,
            cancelButton: trans.cancelButton,
            settingsButton: trans.settingsButton,
        },
        backgroundPermissionRationale: {
            title: trans.title,
            message: trans.message,
            positiveAction: trans.positiveAction,
            negativeAction: trans.negativeAction,
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

export const getCurrentLocation = async (
    routeId?: string,
    samples?: number,
    accuracy?: number,
) => {
    const location = await BackgroundGeolocation.getCurrentPosition({
        timeout: 30,
        maximumAge: 500,
        desiredAccuracy: accuracy || 10,
        samples: samples || 6,
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
    const location = await getCurrentLocation('', 1);
    const lat = location.coords.latitude;
    const lng = location.coords.longitude;
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
        notification: {
            text: 'Nagrywanie trasy',
        },
    });

    const state = await BackgroundGeolocation.start();
    await BackgroundGeolocation.changePace(true);

    return state;
};

export const stopBackgroundGeolocation = async () => {
    await BackgroundGeolocation.changePace(false);
    await BackgroundGeolocation.setConfig({
        isMoving: false,
        extras: {
            route_id: '',
        },
        notification: {
            text: 'Pobieranie lokalizacji',
        },
    });
    const state = await BackgroundGeolocation.stop();

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

export const onPostitionWatch = async (
    onLocation: (data: Location) => void,
    onError: (error: LocationError) => void,
) => {
    BackgroundGeolocation.watchPosition(onLocation, onError);
};

export const cleaUpPositionWatcher = () => {
    BackgroundGeolocation.stopWatchPosition();
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

/* Set plugin to stationary state - doesnt disable tracking permamently */
export const pauseTracingLocation = async () => {
    await BackgroundGeolocation.changePace(false);
};

/* Set plugin to moving state */
export const resumeTracingLocation = async () => {
    await BackgroundGeolocation.changePace(true);
};

export const askFineLocationPermission = async () => {
    let permission = 'unavailable';
    try {
        const res = await request(
            Platform.select({
                android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
            }),
        );
        permission = res;
    } catch (error) {}

    return permission;
};

export const checkAndroidLocationPermission = async () => {
    const locationPermissions = {fineLocation: false, coarseLocation: false};
    try {
        const result = await checkMultiple([
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        ]);

        switch (result[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]) {
            case RESULTS.LIMITED:
                locationPermissions.fineLocation = true;
                break;
            case RESULTS.GRANTED:
                locationPermissions.fineLocation = true;
                break;
        }
        switch (result[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]) {
            case RESULTS.LIMITED:
                locationPermissions.coarseLocation = true;
                break;
            case RESULTS.GRANTED:
                locationPermissions.coarseLocation = true;
                break;
        }
    } catch (error) {}

    return locationPermissions;
};

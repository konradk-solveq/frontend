import {Platform} from 'react-native';
import BackgroundGeolocation, {
    Location,
    LocationError,
} from 'react-native-background-geolocation-android';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {
    checkMultiple,
    PERMISSIONS,
    RESULTS,
    request,
} from 'react-native-permissions';
import logger from './crashlytics';
import {I18n} from '../../I18n/I18n';

import {LocationDataI} from '../interfaces/geolocation';

const isIOS = Platform.OS === 'ios';

export const transformLocationErrorCode = (e: LocationError | any) => {
    let errorMessage = e;
    switch (e) {
        case 0 || '0':
            errorMessage = `Location unknown - [code: ${errorMessage}]`;
            break;
        case 1 || '1':
            errorMessage = `Location permission denied - [code: ${errorMessage}]`;
            break;
        case 2 || '2':
            errorMessage = `Network error - [code: ${errorMessage}]`;
            break;
        case 408 || '408':
            errorMessage = `Location timeout - [code: ${errorMessage}]`;
            break;
        case 499 || '499':
            errorMessage = `Location request cancelled - [code: ${errorMessage}]`;
            break;
    }

    return errorMessage;
};

/* TODO: catch errors */
export const initBGeolocalization = async (notificationTitle: string) => {
    const trans: any = I18n.t('Geolocation.backgroundPermissionRationale');
    const trans2: any = I18n.t('Geolocation.locationAuthorizationAlert');

    try {
        const state = await BackgroundGeolocation.ready({
            reset: true,
            stopOnTerminate: false,
            startOnBoot: true,
            desiredAccuracy: isIOS
                ? BackgroundGeolocation.DESIRED_ACCURACY_NAVIGATION
                : BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
            locationAuthorizationRequest: 'Always',
            locationAuthorizationAlert: {
                titleWhenNotEnabled: trans2.titleWhenNotEnabled,
                titleWhenOff: trans2.titleWhenOff,
                instructions: trans2.instructions,
                cancelButton: trans2.cancelButton,
                settingsButton: trans2.settingsButton,
            },
            disableLocationAuthorizationAlert: isIOS,
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
    } catch (e) {
        console.warn('[initBGeolocalization - error]', e);
        logger.log(`[initBGeolocalization] - ${e}`);
        const error = new Error(e);
        logger.recordError(error);
    }
};

export const getCurrentLocation = async (
    routeId?: string,
    samples?: number,
    accuracy?: number,
    notPersist?: boolean,
) => {
    try {
        const location = await BackgroundGeolocation.getCurrentPosition({
            timeout: 30,
            maximumAge: 500,
            desiredAccuracy: accuracy || 10,
            samples: samples || 6,
            persist: !notPersist,
            extras: {
                route_id: routeId || '',
            },
        });

        return location;
    } catch (e) {
        console.log('[getCurrentLocation - e]', e);
        logger.log(`[getCurrentLocation] - ${e}`);
        const errorMessage = transformLocationErrorCode(e);
        const error = new Error(errorMessage);
        logger.recordError(error);
    }
};

export const getLatLng = async () => {
    const location = await getCurrentLocation();
    if (!location) {
        return {lat: undefined, lng: undefined};
    }

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
    const location = await getCurrentLocation('', 1, 10, true);
    if (!location) {
        return {lat: undefined, lng: undefined};
    }

    const lat = location.coords.latitude;
    const lng = location.coords.longitude;
    return {lat, lng};
};

export const getBackgroundGeolocationState = async () => {
    try {
        const state = await BackgroundGeolocation.getState();

        return state;
    } catch (e) {
        console.log('[getBackgroundGeolocationState - error]', e);
        logger.log(`[getBackgroundGeolocationState] - ${e}`);
        const error = new Error(e);
        logger.recordError(error);
    }
};

export const startBackgroundGeolocation = async (
    routeId: string,
    keep?: boolean,
) => {
    try {
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
        await resumeTracingLocation();

        return state;
    } catch (e) {
        console.warn('[startBackgroundGeolocation - error]', e);
        logger.log(`[startBackgroundGeolocation] - ${e}`);
        const error = new Error(e);
        logger.recordError(error);
    }
};

export const stopBackgroundGeolocation = async () => {
    try {
        await pauseTracingLocation();
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
    } catch (e) {
        console.warn('[stopBackgroundGeolocation - error]', e);
        logger.log(`[stopBackgroundGeolocation] - ${e}`);
        const error = new Error(e);
        logger.recordError(error);
    }
};

export const cleanUp = () => {
    BackgroundGeolocation.removeListeners();
};

export const onLocationChange = async (
    onLocation: (data: Location) => void,
    onError: (error: LocationError) => void,
) => {
    try {
        BackgroundGeolocation.onLocation(onLocation, onError);
    } catch (e) {
        console.log('[onLocationChange - error]', e);
        logger.log(`[onLocationChange] - ${e}`);
        const errorMessage = transformLocationErrorCode(e);
        const error = new Error(errorMessage);
        logger.recordError(error);
    }
};

export const onPostitionWatch = async (
    onLocation: (data: Location) => void,
    onError: (error: LocationError) => void,
) => {
    try {
        BackgroundGeolocation.watchPosition(onLocation, onError);
    } catch (e) {
        console.log('[onPostitionWatch - error]', e);
        logger.log(`[onPostitionWatch] - ${e}`);
        const errorMessage = transformLocationErrorCode(e);
        const error = new Error(errorMessage);
        logger.recordError(error);
    }
};

export const cleaUpPositionWatcher = () => {
    try {
        BackgroundGeolocation.stopWatchPosition();
    } catch (e) {
        console.warn('[cleaUpPositionWatcher - error]', e);
        logger.log(`[cleaUpPositionWatcher] - ${e}`);
        const errorMessage = transformLocationErrorCode(e);
        const error = new Error(errorMessage);
        logger.recordError(error);
    }
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
    try {
        const locations = await BackgroundGeolocation.getLocations();

        return locations;
    } catch (e) {
        console.warn('[getLocations - error]', e);
        logger.log(`[getLocations] - ${e}`);
        const error = new Error(e);
        logger.recordError(error);
    }
};

export const requestGeolocationPermission = async () => {
    try {
        const status = await BackgroundGeolocation.requestPermission();

        return status;
    } catch (e) {
        console.warn('[requestGeolocationPermission - error]', e);
        logger.log(`[requestGeolocationPermission] - ${e}`);
        const error = new Error(e);
        logger.recordError(error);
    }
};

/* Set plugin to stationary state - doesnt disable tracking permamently */
export const pauseTracingLocation = async () => {
    try {
        const state = await getBackgroundGeolocationState();
        if (state?.enabled) {
            await BackgroundGeolocation.changePace(false);
        }
    } catch (e) {
        console.log('[pauseTracingLocation - error]', e);
        logger.log(`[pauseTracingLocation] - ${e}`);
        const error = new Error(e);
        logger.recordError(error);
    }
};

/* Set plugin to moving state */
export const resumeTracingLocation = async () => {
    try {
        const state = await getBackgroundGeolocationState();
        if (state?.enabled) {
            await BackgroundGeolocation.changePace(true);
        }
    } catch (e) {
        console.log('[resumeTracingLocation - error]', e);
        logger.log(`[resumeTracingLocation] - ${e}`);
        const errorMessage = transformLocationErrorCode(e);
        const error = new Error(errorMessage);
        logger.recordError(error);
    }
};

export const pauseBackgroundGeolocation = async () => {
    try {
        await BackgroundGeolocation.changePace(false);
        const state = await BackgroundGeolocation.stop();

        return state;
    } catch (e) {
        console.log('[pauseBackgroundGeolocation - error]', e);
        logger.log(`[pauseBackgroundGeolocation] - ${e}`);
        const errorMessage = transformLocationErrorCode(e);
        const error = new Error(errorMessage);
        logger.recordError(error);
    }
};

export const resumeBackgroundGeolocation = async () => {
    try {
        await BackgroundGeolocation.changePace(true);
        const state = await BackgroundGeolocation.start();

        return state;
    } catch (e) {
        console.log('[resumeBackgroundGeolocation - error]', e);
        logger.log('[resumeBackgroundGeolocation]');
        const error = new Error(e);
        logger.recordError(error);
    }
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
    } catch (e) {
        console.log('[askFineLocationPermission - error]', e);
        logger.log(`[askFineLocationPermission] - ${e}`);
        const error = new Error(e);
        logger.recordError(error);
    }

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
    } catch (e) {
        console.log('[checkAndroidLocationPermission - error]', e);
        logger.log(`[checkAndroidLocationPermission] - ${e}`);
        const error = new Error(e);
        logger.recordError(error);
    }

    return locationPermissions;
};

export const openGPSModule = async () => {
    try {
        const res = await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded(
            {
                interval: 10000,
                fastInterval: 5000,
            },
        );

        return res;
    } catch (error) {
        return 'denied';
    }
};

export const areCoordsSame = (
    oldCoords: LocationDataI | undefined,
    newCoords: Location,
) => {
    if (!oldCoords) {
        return false;
    }

    return (
        newCoords.coords.latitude === oldCoords?.coords.latitude &&
        newCoords.coords.longitude === oldCoords?.coords.longitude
    );
};

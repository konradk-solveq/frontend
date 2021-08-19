import {Platform} from 'react-native';
import BackgroundGeolocation, {
    Location,
    LocationError,
} from 'react-native-background-geolocation-android';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {
    checkMultiple,
    check,
    PERMISSIONS,
    RESULTS,
    request,
} from 'react-native-permissions';

import logger from '@utils/crashlytics';
import {LocationDataI} from '@interfaces/geolocation';
import {BasicCoordsType} from '@type/coords';
import {I18n} from '@translations/I18n';

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
            stopOnTerminate: true,
            startOnBoot: false,
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
            enableTimestampMeta: !isIOS,
            distanceFilter: 10,
            stopTimeout: 5,
            debug: __DEV__ ? true : false,
            logLevel: __DEV__
                ? BackgroundGeolocation.LOG_LEVEL_VERBOSE
                : BackgroundGeolocation.LOG_LEVEL_OFF,
            maxDaysToPersist: 5,
            desiredOdometerAccuracy: 10,
            notification: {
                text: notificationTitle,
                smallIcon: 'drawable/ic_launcher_round',
                priority: BackgroundGeolocation.NOTIFICATION_PRIORITY_MIN,
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
            maximumAge: 0,
            desiredAccuracy: accuracy || 5,
            samples: samples || 8,
            persist: !notPersist,
            extras: {
                route_id: routeId || '',
            },
        });

        return location;
    } catch (e) {
        const errorMessage = transformLocationErrorCode(e);
        console.log('[getCurrentLocation - e]', errorMessage);
        logger.log(`[getCurrentLocation] - ${errorMessage}`);
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

export const getLatLngFromForeground = async (): Promise<
    BasicCoordsType | undefined
> => {
    const location = await getCurrentLocation('', 4, 10, true);
    if (!location) {
        return undefined;
    }

    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;
    return {latitude, longitude};
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
            stopOnTerminate: false,
            startOnBoot: true,
            isMoving: true,
            extras: {
                route_id: routeId,
            },
            notification: {
                text: 'Nagrywanie trasy',
                priority: BackgroundGeolocation.NOTIFICATION_PRIORITY_MAX,
            },
        });

        const state = await startBackgroundGeolocationPlugin(true);
        await resumeTracingLocation();

        return state;
    } catch (e) {
        const errorMessage = transformLocationErrorCode(e);
        console.warn('[startBackgroundGeolocation - error]', errorMessage);
        logger.log(`[startBackgroundGeolocation] - ${errorMessage}`);
        const error = new Error(errorMessage);
        logger.recordError(error);
    }
};

export const stopBackgroundGeolocation = async () => {
    try {
        await BackgroundGeolocation.setConfig({
            stopOnTerminate: true,
            startOnBoot: false,
            isMoving: false,
            extras: {
                route_id: '',
            },
            notification: {
                text: 'Pobieranie lokalizacji',
                priority: BackgroundGeolocation.NOTIFICATION_PRIORITY_MIN,
            },
        });

        const state = await stopBackgroundGeolocationPlugin();
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

export const cleanUpListener = (listener: string, handler: () => void) => {
    try {
        BackgroundGeolocation.removeListener(listener, handler);
    } catch (e) {
        console.warn(`[cleanUpListener - [${listener}] - error]`, e);
        logger.log(`[cleanUpListener] - [${listener}] - ${e}`);
        const error = new Error(e);
        logger.recordError(error);
    }
};

export const onLocationChange = async (
    onLocation: (data: Location) => void,
    onError: (error: LocationError) => void,
) => {
    try {
        BackgroundGeolocation.onLocation(onLocation, onError);
    } catch (e) {
        const errorMessage = transformLocationErrorCode(e);
        console.log('[onLocationChange - error]', errorMessage);
        logger.log(`[onLocationChange] - ${errorMessage}`);
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
        const errorMessage = transformLocationErrorCode(e);
        console.log('[onPostitionWatch - error]', errorMessage);
        logger.log(`[onPostitionWatch] - ${errorMessage}`);
        const error = new Error(errorMessage);
        logger.recordError(error);
    }
};

export const cleaUpPositionWatcher = () => {
    try {
        BackgroundGeolocation.stopWatchPosition();
    } catch (e) {
        const errorMessage = transformLocationErrorCode(e);
        console.warn('[cleaUpPositionWatcher - error]', errorMessage);
        logger.log(`[cleaUpPositionWatcher] - ${errorMessage}`);
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
        if (state?.enabled && !state?.isMoving) {
            await BackgroundGeolocation.changePace(true);
        }
    } catch (e) {
        const errorMessage = transformLocationErrorCode(e);
        console.log('[resumeTracingLocation - error]', errorMessage);
        logger.log(`[resumeTracingLocation] - ${errorMessage}`);
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
        const errorMessage = transformLocationErrorCode(e);
        console.log('[pauseBackgroundGeolocation - error]', errorMessage);
        logger.log(`[pauseBackgroundGeolocation] - ${errorMessage}`);
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
        const errorMessage = transformLocationErrorCode(e);
        console.log('[resumeBackgroundGeolocation - error]', errorMessage);
        logger.log(`[resumeBackgroundGeolocation] ${errorMessage}`);
        const error = new Error(errorMessage);
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

export const checkDeviceHasLocationAlwaysPermission = async () => {
    let locationPermission = false;
    try {
        if (isIOS) {
            const result = await check(PERMISSIONS.IOS.LOCATION_ALWAYS);
            if (result === RESULTS.GRANTED) {
                locationPermission = true;
            }
        } else {
            const result = await check(
                PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
            );
            if (result === RESULTS.GRANTED) {
                locationPermission = true;
            }
        }
    } catch (e) {
        console.log('[checkDeviceHasLocationAlwaysPermission - error]', e);
        logger.log(`[checkDeviceHasLocationAlwaysPermission] - ${e}`);
        const error = new Error(e);
        logger.recordError(error);
    }

    return locationPermission;
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

export const addGeofence = async (
    coords: BasicCoordsType,
    identifier: string,
    radius?: number,
    notifyOnEntry?: boolean,
    notifyOnExit?: boolean,
    notifyOnDwell?: boolean,
) => {
    try {
        await BackgroundGeolocation.addGeofence({
            identifier: identifier,
            radius: radius || 1000,
            latitude: coords.latitude,
            longitude: coords.longitude,
            notifyOnEntry: notifyOnEntry || false,
            notifyOnExit: notifyOnExit || false,
            notifyOnDwell: notifyOnDwell || false,
        });
    } catch (e) {
        console.log('[addGeofence - error]', e);
        logger.log(`[addGeofence] - ${e}`);
        const error = new Error(e);
        logger.recordError(error);
    }
};

export const onGeofenceChangeListener = async (
    callback: () => void,
    startPlugin: boolean,
) => {
    try {
        /**
         * Listener works only when plugin is started.
         */
        if (startPlugin) {
            await startMonitoringGeofences();
        }

        BackgroundGeolocation.onGeofence(callback);
    } catch (e) {
        console.log('[onGeofenceChangeListener - error]', e);
        logger.log(`[onGeofenceChangeListener] - ${e}`);
        const error = new Error(e);
        logger.recordError(error);
    }
};

export const setGeofenceFromCurrentLocation = async (
    identifier: string,
    location?: BasicCoordsType,
    radius?: number,
    notifyOnEntry?: boolean,
    notifyOnExit?: boolean,
    notifyOnDwell?: boolean,
    omit?: boolean,
) => {
    try {
        const loc = location || (await getLatLngFromForeground());

        if (loc?.latitude && loc?.longitude && !omit) {
            await addGeofence(
                {
                    latitude: loc.latitude,
                    longitude: loc.longitude,
                },
                identifier,
                radius,
                notifyOnEntry,
                notifyOnExit,
                notifyOnDwell,
            );
        }

        return loc;
    } catch (e) {
        console.log('[setGeofenceFromCurrentLocation - error]', e);
        logger.log(`[setGeofenceFromCurrentLocation] - ${e}`);
        const error = new Error(e);
        logger.recordError(error);
    }
};

export const removeGeofence = async (identifier: string) => {
    try {
        await BackgroundGeolocation.removeGeofence(identifier);
    } catch (e) {
        console.log('[removeGeofence - error]', e);
        logger.log(`[removeGeofence] - ${e}`);
        const error = new Error(e);
        logger.recordError(error);
    }
};

export const startBackgroundGeolocationPlugin = async (force?: boolean) => {
    try {
        let state = await getBackgroundGeolocationState();
        if (!state?.enabled || force) {
            await BackgroundGeolocation.start();
            state = await getBackgroundGeolocationState();
        }

        return state;
    } catch (e) {
        console.log('[startBackgroundGeolocationPlugin - error]', e);
        logger.log(`[startBackgroundGeolocationPlugin] - ${e}`);
        const error = new Error(e);
        logger.recordError(error);
    }
};

export const startMonitoringGeofences = async (forceToStart?: boolean) => {
    try {
        let state = await getBackgroundGeolocationState();
        if (!state?.enabled || forceToStart) {
            await BackgroundGeolocation.startGeofences();
            state = await getBackgroundGeolocationState();
        }

        return state;
    } catch (e) {
        console.log('[startMonitoringGeofences - error]', e);
        logger.log(`[startMonitoringGeofences] - ${e}`);
        const error = new Error(e);
        logger.recordError(error);
    }
};

export const stopBackgroundGeolocationPlugin = async () => {
    try {
        let state = await getBackgroundGeolocationState();
        if (state?.enabled) {
            state = await BackgroundGeolocation.stop();
        }
        return state;
    } catch (e) {
        console.log('[stopBackgroundGeolocationPlugin - error]', e);
        logger.log(`[stopBackgroundGeolocationPlugin] - ${e}`);
        const error = new Error(e);
        logger.recordError(error);
    }
};

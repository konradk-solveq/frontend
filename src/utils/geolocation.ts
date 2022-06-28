import {Platform} from 'react-native';
import BackgroundGeolocation, {
    Config,
    Location,
    LocationError,
    State,
    ProviderChangeEvent,
} from 'react-native-background-geolocation-android';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {
    checkMultiple,
    check,
    PERMISSIONS,
    RESULTS,
    request,
} from 'react-native-permissions';
import GetLocation from 'react-native-get-location';

import {LocationDataI, GeofenceEvent} from '@interfaces/geolocation';
import {BasicCoordsType} from '@type/coords';
import i18next from '@translations/i18next';
import {getTrackerData} from '@hooks/utils/localizationTracker';
import {isLocationValidate} from './locationData';
import {
    loggErrorMessage,
    loggErrorWithScope,
    sentryLogLevel,
} from '@sentryLogger/sentryLogger';
import {getTimeInUTCMilliseconds} from './transformData';

const isIOS = Platform.OS === 'ios';
export const LOCATION_ACCURACY = 60;
const GPS_OFF_TIMEOUT = isIOS ? 30 : 15;

export const transformLocationErrorCode = (e: LocationError | any) => {
    try {
        let errorMessage = e?.message || e;
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
    } catch (error) {
        return e;
    }
};

/* TODO: catch errors */
export const initBGeolocalization = async (notificationTitle: string) => {
    const trans: any = i18next.t('Geolocation.backgroundPermissionRationale', {
        returnObjects: true,
    });
    const trans2: any = i18next.t('Geolocation.locationAuthorizationAlert', {
        returnObjects: true,
    });

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
            stopTimeout: __DEV__ ? 1 : GPS_OFF_TIMEOUT,
            debug: __DEV__ ? true : false,
            logLevel: __DEV__
                ? BackgroundGeolocation.LOG_LEVEL_VERBOSE
                : BackgroundGeolocation.LOG_LEVEL_ERROR,
            maxDaysToPersist: __DEV__ ? 1 : 3,
            desiredOdometerAccuracy: LOCATION_ACCURACY,
            notification: {
                text: notificationTitle,
                smallIcon: 'drawable/ic_launcher_round',
                priority: BackgroundGeolocation.NOTIFICATION_PRIORITY_MIN,
            },
            preventSuspend: true,
            heartbeatInterval: 60,
            activityType: BackgroundGeolocation.ACTIVITY_TYPE_FITNESS,
            // speedJumpFilter: 150,
            stationaryRadius: 25,
        });

        return state;
    } catch (e) {
        console.warn('[initBGeolocalization - error]', e);
        const error = new Error(e);

        loggErrorWithScope(error, 'initBGeolocalization');
    }
};

/**
 *
 * @param routeId
 * @param samples
 * @param accuracy
 * @param notPersist
 * @param timeout - in sedonds
 * @param maximumAge - in milliseconds
 * @returns
 */
export const getCurrentLocation = async (
    routeId?: string,
    samples?: number,
    accuracy?: number,
    notPersist?: boolean,
    timeout?: number,
    maximumAge?: number,
    forceGettingLocation?: boolean,
) => {
    try {
        const state = await getBackgroundGeolocationState();
        if (!state?.enabled && !forceGettingLocation) {
            return;
        }

        const location = await BackgroundGeolocation.getCurrentPosition({
            timeout: timeout || 30,
            maximumAge: maximumAge || 0,
            desiredAccuracy: accuracy || 5,
            samples: samples || 8,
            persist: !notPersist,
            extras: {
                route_id: routeId || '',
            },
        });

        if (!location || !isLocationValidate(location)) {
            return;
        }

        return location;
    } catch (e) {
        const errorMessage = transformLocationErrorCode(e);
        console.log('[getCurrentLocation - e]', errorMessage);
        const error = new Error(errorMessage);

        loggErrorMessage(error, 'getCurrentLocation', sentryLogLevel.Log);
    }
};

export const getLatLngFromForeground = async (
    force?: boolean,
): Promise<BasicCoordsType | undefined> => {
    const location = await getCurrentLocation(
        '',
        4,
        10,
        true,
        undefined,
        undefined,
        force,
    );
    if (!location || !isLocationValidate(location)) {
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
        const error = new Error(e);

        loggErrorWithScope(error, 'getBackgroundGeolocationState');
    }
};

export const getDebugLevelMode = (active?: boolean) => {
    if (__DEV__) {
        return BackgroundGeolocation.LOG_LEVEL_VERBOSE;
    }

    if (active) {
        return BackgroundGeolocation.LOG_LEVEL_DEBUG;
    }

    return BackgroundGeolocation.LOG_LEVEL_ERROR;
};

export const startBackgroundGeolocation = async (
    routeId: string,
    keep?: boolean,
    debugModeActive?: boolean,
) => {
    const trans: any = i18next.t('Geolocation.routeRecordingNotification', {
        returnObjects: true,
    });
    let state: State | undefined;
    try {
        await BackgroundGeolocation.setConfig({
            stopOnTerminate: false,
            startOnBoot: true,
            isMoving: true,
            logLevel: getDebugLevelMode(debugModeActive),
            extras: {
                route_id: routeId,
            },
            notification: {
                text: trans.text,
                priority: BackgroundGeolocation.NOTIFICATION_PRIORITY_MAX,
                sticky: true,
            },
            pausesLocationUpdatesAutomatically: false,
            showsBackgroundLocationIndicator: true,
        });
        state = await startBackgroundGeolocationPlugin(true);

        if (!keep) {
            BackgroundGeolocation.resetOdometer();
        }
        setTimeout(async () => {
            await resumeTracingLocation();
        }, 1000);
    } catch (e) {
        const errorMessage = transformLocationErrorCode(e);
        console.warn('[startBackgroundGeolocation - error]', errorMessage);
        const error = new Error(errorMessage);

        loggErrorWithScope(error, 'startBackgroundGeolocation');
    } finally {
        return state;
    }
};

export const stopBackgroundGeolocation = async () => {
    const trans: any = i18next.t('Geolocation.notification', {
        returnObjects: true,
    });
    try {
        await BackgroundGeolocation.setConfig({
            stopOnTerminate: true,
            startOnBoot: false,
            isMoving: false,
            extras: undefined,
            logLevel: getDebugLevelMode(),
            notification: {
                text: trans.text,
                priority: BackgroundGeolocation.NOTIFICATION_PRIORITY_MIN,
                sticky: false,
            },
            pausesLocationUpdatesAutomatically: undefined,
            showsBackgroundLocationIndicator: undefined,
        });

        const state = await stopBackgroundGeolocationPlugin();
        if (state?.odometer && state?.odometer > 0) {
            BackgroundGeolocation.resetOdometer();
        }

        return state;
    } catch (e) {
        console.warn('[stopBackgroundGeolocation - error]', e);
        const error = new Error(e);

        loggErrorWithScope(error, 'stopBackgroundGeolocation');
    }
};

export const cleanUp = () => {
    BackgroundGeolocation.removeListeners();
};

export const cleanUpListener = (
    listener: string,
    handler: (param?: any) => void,
) => {
    try {
        BackgroundGeolocation.removeListener(listener, handler);
    } catch (e) {
        console.warn(`[cleanUpListener - [${listener}] - error]`, e);
        const error = new Error(e);

        loggErrorWithScope(error, 'cleanUpListener');
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
        const error = new Error(errorMessage);

        loggErrorWithScope(error, 'onLocationChange');
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
        const error = new Error(errorMessage);

        loggErrorWithScope(error, 'onPostitionWatch');
    }
};

export const cleaUpPositionWatcher = () => {
    try {
        BackgroundGeolocation.stopWatchPosition();
    } catch (e) {
        const errorMessage = transformLocationErrorCode(e);
        console.warn('[cleaUpPositionWatcher - error]', errorMessage);
        const error = new Error(errorMessage);

        loggErrorWithScope(error, 'cleaUpPositionWatcher');
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
            accuracy: data.coords.accuracy,
        },
        odometer: data.odometer,
        provider: data.provider,
        is_moving: data.is_moving,
        activity: data.activity,
    };

    return location;
};

export const getLocations = async () => {
    try {
        const locations = await BackgroundGeolocation.getLocations();

        return locations;
    } catch (e) {
        console.warn('[getLocations - error]', e);
        const error = new Error(e);

        loggErrorWithScope(error, 'getLocations');
    }
};

export const requestGeolocationPermission = async () => {
    try {
        const status = await BackgroundGeolocation.requestPermission();

        return status;
    } catch (e) {
        console.warn('[requestGeolocationPermission - error]', e);
        const error = new Error(e);

        loggErrorWithScope(error, 'requestGeolocationPermission');
    }
};

/**
 *
 * @param routeId
 * @returns
 */
export const getLastLocationByRoutId = async (
    routeId: string,
    locationsData?: any[],
) => {
    if (!routeId) {
        return;
    }

    const locations = locationsData || (await getLocations());
    if (!locations?.length) {
        return;
    }

    try {
        let lastLocation: any;
        for (let index = locations.length - 1; index > 0; index--) {
            const l: any = locations[index];
            if (!l || !l?.coords) {
                continue;
            }

            if (l?.extras?.route_id === routeId) {
                lastLocation = {
                    ...l,
                    coords: {
                        ...l.coords,
                        speed: undefined,
                    },
                };
                break;
            }
        }

        if (!lastLocation) {
            return;
        }
        return getTrackerData(lastLocation);
    } catch (error) {
        console.warn('[getLastLocationByRoutId - error]', error);
    }
};

/* Force plugin to stationary state - doesnt disable tracking permamently */
export const pauseTracingLocation = async (clearRouteId?: boolean) => {
    try {
        if (clearRouteId) {
            await BackgroundGeolocation.setConfig({extras: {}});
            await setConfig({
                showsBackgroundLocationIndicator: false,
            });
        }

        const state = await getBackgroundGeolocationState();
        if (state?.enabled) {
            await BackgroundGeolocation.changePace(false);
        }
    } catch (e) {
        const errorMessage = transformLocationErrorCode(e);
        console.log('[pauseTracingLocation - error]', e);
        const error = new Error(errorMessage);

        loggErrorWithScope(error, 'pauseTracingLocation');
    }
};

/* Force plugin to moving state */
export const resumeTracingLocation = async (routeId?: string) => {
    try {
        if (routeId) {
            await BackgroundGeolocation.setConfig({
                extras: {
                    route_id: routeId,
                },
            });
            await setConfig({
                showsBackgroundLocationIndicator: true,
            });
        }

        const state = await getBackgroundGeolocationState();
        if (state?.enabled) {
            await BackgroundGeolocation.changePace(true);
        }
    } catch (e) {
        const errorMessage = transformLocationErrorCode(e);
        console.log('[resumeTracingLocation - error]', errorMessage);
        const error = new Error(errorMessage);

        loggErrorWithScope(errorMessage, 'resumeTracingLocation');
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

        loggErrorWithScope(errorMessage, 'pauseBackgroundGeolocation');
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

        loggErrorWithScope(errorMessage, 'resumeBackgroundGeolocation');
    }
};

export const askFineLocationPermission = async () => {
    let permission = 'unavailable';
    try {
        const res = await request(
            //@ts-ignore
            Platform.select({
                android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
            }),
        );
        permission = res;
    } catch (e) {
        console.log('[askFineLocationPermission - error]', e);

        loggErrorWithScope(e, 'askFineLocationPermission');
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

        loggErrorWithScope(e, 'checkAndroidLocationPermission');
    }

    return locationPermissions;
};

export const checkDeviceHasLocationAlwaysPermission = async () => {
    let locationPermission = false;
    try {
        /**
         * Logged some issues, so added temp solution
         * https://github.com/facebook/react-native/issues/10009#issuecomment-347839488
         */
        locationPermission = await new Promise<boolean>(resolve => {
            setTimeout(async () => {
                if (isIOS) {
                    const result = await check(PERMISSIONS.IOS.LOCATION_ALWAYS);
                    if (result === RESULTS.GRANTED) {
                        resolve(true);
                    }
                } else {
                    const result = await check(
                        PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
                    );
                    if (result === RESULTS.GRANTED) {
                        resolve(true);
                    }
                }
            }, 0);
        });
    } catch (e) {
        console.log('[checkDeviceHasLocationAlwaysPermission - error]', e);

        loggErrorWithScope(e, 'checkDeviceHasLocationAlwaysPermission');
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

        loggErrorWithScope(e, 'addGeofence');
    }
};

export const onGeofenceChangeListener = async (
    callback: (event: GeofenceEvent) => void,
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

        loggErrorWithScope(e, 'onGeofenceChangeListener');
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

        loggErrorWithScope(e, 'setGeofenceFromCurrentLocation');
    }
};

export const removeGeofence = async (identifier: string) => {
    try {
        await BackgroundGeolocation.removeGeofence(identifier);
    } catch (e) {
        console.log('[removeGeofence - error]', e);

        loggErrorWithScope(e, 'removeGeofence');
    }
};

export const startBackgroundGeolocationPlugin = async (force?: boolean) => {
    let state;
    try {
        state = await getBackgroundGeolocationState();
        if (!state?.enabled || force) {
            const st = await BackgroundGeolocation.start();
            if (!st) {
                state = await getBackgroundGeolocationState();
            } else {
                state = st;
            }
        }
    } catch (e) {
        console.log('[startBackgroundGeolocationPlugin - error]', e);

        loggErrorWithScope(e, 'startBackgroundGeolocationPlugin');
    } finally {
        return state;
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

        loggErrorWithScope(e, 'startMonitoringGeofences');
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

        loggErrorWithScope(e, 'stopBackgroundGeolocationPlugin');
    }
};

export const getLocationWithLowAccuracy = async () => {
    try {
        const location = await GetLocation.getCurrentPosition({
            enableHighAccuracy: false,
            timeout: 5000,
        });
        if (!location) {
            return undefined;
        }

        const loc: LocationDataI = {
            coords: {
                altitude: location.altitude,
                latitude: location.latitude,
                longitude: location.longitude,
                speed: location.speed,
            },
            odometer: 0,
            timestamp: '',
            uuid: `${location.time}`,
        };

        return loc;
    } catch (error) {
        console.warn('[getLocationWithLowAccuracy - error]', error);
    }
};

export const onWatchPostionChangeListener = async (
    callback: (location: Location) => void,
    interval?: number,
    timeout?: number,
    notPersist?: boolean,
) => {
    try {
        BackgroundGeolocation.watchPosition(callback, () => {}, {
            interval: interval || 1000,
            timeout: timeout || 30000,
            desiredAccuracy: isIOS ? -2 : -1,
            persist: !notPersist,
        });
    } catch (e) {
        console.log('[onWatchPostionChangeListener - error]', e);
        const error = new Error(e);

        loggErrorWithScope(e, 'onWatchPostionChangeListener');
    }
};

export const stopWatchPostionChangeListener = async () => {
    try {
        await BackgroundGeolocation.stopWatchPosition();
    } catch (e) {
        console.log('[stopWatchPostionChangeListener - error]', e);

        loggErrorWithScope(e, 'stopWatchPostionChangeListener');
    }
};

export const setConfigWithLocationPermission = async (
    type: 'Always' | 'WhenInUse' | 'Any',
) => {
    try {
        await BackgroundGeolocation.setConfig({
            locationAuthorizationRequest: type,
        });
    } catch (e) {
        console.log('[setLocationPermission - error]', e);

        loggErrorWithScope(e, 'setLocationPermission');
    }
};

export const resetOdometer = async () => {
    try {
        await BackgroundGeolocation.resetOdometer();
    } catch (e) {
        console.log('[resetOdometer - error]', e);

        loggErrorWithScope(e, 'resetOdometer');
    }
};

export const setConfig = async (config: Config) => {
    try {
        await BackgroundGeolocation.setConfig(config);
    } catch (e) {
        console.log('[geolocation - setConfig - error]', e);

        loggErrorWithScope(e, 'geolocation-setConfig');
    }
};

export const setDebugLogLevel = async () => {
    try {
        await setConfig({
            logLevel: BackgroundGeolocation.LOG_LEVEL_DEBUG,
        });
    } catch (e) {
        console.log('[geolocation - setDebugLogLevel - error]', e);

        loggErrorWithScope(e, 'geolocation-setDebugLogLevel');
    }
};

export const setErrorLogLevel = async () => {
    try {
        await setConfig({
            logLevel: BackgroundGeolocation.LOG_LEVEL_ERROR,
        });
    } catch (e) {
        console.log('[geolocation - setErrorLogLevel - error]', e);

        loggErrorWithScope(e, 'geolocation-setErrorLogLevel');
    }
};

export const getGeolocationLogs = async (start?: string, end?: string) => {
    try {
        const Logger = BackgroundGeolocation.logger;

        if (!start || !end) {
            const log = await Logger.getLog();
            return log;
        }

        const log = await Logger.getLog({
            start: getTimeInUTCMilliseconds(start, true),
            end: getTimeInUTCMilliseconds(end, true),
            order: Logger.ORDER_DESC,
            limit: 100000,
        });

        return log;
    } catch (e) {
        console.log('[geolocation - getGeolocationLogs - error]', e);

        loggErrorWithScope(e, 'geolocation-getGeolocationLogs');
    }
};

export const getProviderState = async () => {
    try {
        return await BackgroundGeolocation.getProviderState();
    } catch (e) {
        console.log('[getProviderState - error]', e);

        loggErrorWithScope(e, 'getProviderState');
    }
};

export const onProviderChangeListener = (
    callback: (event: ProviderChangeEvent) => void,
) => {
    try {
        return BackgroundGeolocation.onProviderChange(callback);
    } catch (e) {
        console.log('[onProviderChangeListener - error]', e);

        loggErrorWithScope(e, 'onProviderChangeListener');
    }
};

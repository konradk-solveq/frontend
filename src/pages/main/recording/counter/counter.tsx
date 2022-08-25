import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {GestureResponderEvent, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

import {useAppDispatch, useAppSelector} from '@hooks/redux';
import useAppState from '@hooks/useAppState';
import useLocalizationTracker from '@hooks/useLocalizationTracker';
import {
    abortSyncCurrentRouteData,
    setCurrentRoutePauseTime,
    setCurrentRouteRecordTime,
} from '@storage/actions/routes';
import {
    setFocusedOnRecordingScreenState,
    setHeavyTaskProcessingState,
} from '@storage/actions/app';

import {DEFAULT_DISTANCE} from '@hooks/utils/localizationTracker';
import {
    trackerActiveSelector,
    trackerPauseTimeSelector,
    trackerRecordingStateSelector,
    trackerStartTimeSelector,
} from '@storage/selectors/routes';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';
import useCustomBackNavButton from '@hooks/useCustomBackNavBtn';
import useCompassHook from '@hooks/useCompassHook';
import {MIN_ROUTE_LENGTH} from '@helpers/global';

import {BothStackRoute} from '@navigation/route';
import {CounterDataContext} from '@pages/main/recording/counter/context/counterContext';
import {Alert as CustomAlert} from '@components/alerts';
import {CounterContainer} from '@containers/Recording';
import GenericScreen from '@pages/template/GenericScreen';
import Map from './map';
import NotificationList, {
    NotificationListItemI,
} from '@components/notifications/NotificationList';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import {Notification} from '@components/notifications';
import UnifiedLocationNotification from '@notifications/UnifiedLocationNotification';
import {LocationButtonT} from './components/LocationButton';
import {RecordTimeAction} from '@interfaces/geolocation';
import {getTimeInUTCSeconds} from '@utils/transformData';
import MapControlButtons from '@pages/main/recording/counter/components/MapControlButtons';

const recordingNotification = {
    key: 'pause-notifications',
    title: 'Nagrywanie zatrzymane',
    icon: MykrossIconFont.MYKROSS_ICON_PAUSE,
    action: () => {},
};

const returnToPreviousScreen = (nav: any) => {
    if (nav.canGoBack()) {
        nav.goBack();
        return;
    }
    nav.replace(BothStackRoute.TAB_MENU_SCREEN);
};

const setTotalTime = (pTime: {start: number; total: number}) => {
    return pTime.start > 0 ? pTime.total + (Date.now() - pTime.start) : 0;
};

interface Props {
    navigation: any;
    route: any;
}

const Counter: React.FC<Props> = ({navigation, route}: Props) => {
    const {t} = useMergedTranslation('MainCounter');
    const {top} = useSafeAreaInsets();
    const dispatch = useAppDispatch();
    const mountedRef = useRef(false);
    const recordingState = useAppSelector(trackerRecordingStateSelector);

    const isTrackerActive = useAppSelector(trackerActiveSelector);
    const trackerStartTime = useAppSelector(trackerStartTimeSelector);
    const trackerPauseTime = useAppSelector(trackerPauseTimeSelector);
    const mapID = route?.params?.mapID;
    const isPlanned = route?.params?.isPlanned;

    const [autoFindMe, setAutoFindMe] = useState<number>(1);

    const [headingOn, setHeadingOn] = useState<boolean>(true);
    const [pauseTime, setPauseTime] = useState({
        start: 0,
        total: 0,
    });
    const [beforeRecording, setBeforeRecording] = useState<boolean>(true);

    const [notifications, setNotifications] = useState<NotificationListItemI[]>(
        [],
    );

    /**
     * Read notifications container height
     */
    const [notificationsHeight, setNotificationsHeight] = useState(0);

    const handleNotificationsLayoutChange = useCallback(e => {
        if (!e?.nativeEvent?.layout) {
            return;
        }
        // need to subtract the extra padding from the notifications container (getFVerticalPx(96))
        setNotificationsHeight(
            e.nativeEvent.layout.height - getFVerticalPx(96),
        );
    }, []);

    /**
     * Height which defines how much space is left for content when modal open
     */
    const heightOfNotificationContainer = useMemo(() => {
        return notificationsHeight > 0 ? notificationsHeight : 0;
    }, [notificationsHeight]);

    /**
     * Shows alert with error when recorded route is shorter than 100 m
     */
    const [showToShortRouteAlert, setShowToShortRouteAlert] = useState(false);

    const locData = useLocalizationTracker(true);
    const {
        startTracker,
        stopTracker,
        pauseTracker,
        resumeTracker,
        followedRouteId,
        isActive,
        restoredPath,
    } = useMemo(() => locData, [locData]);
    const trackerData = useMemo(() => locData?.trackerData, [
        locData?.trackerData,
    ]);

    const [renderPath, setRenderPath] = useState(false);

    /**
     * Can go back to previous screen only when recording is not active
     */
    const heandleGoBackClick = useCallback(async () => {
        if (!recordingState || recordingState === 'not-started') {
            returnToPreviousScreen(navigation);
        }
    }, [recordingState, navigation]);
    /**
     * Override default action for back button
     */
    useCustomBackNavButton(heandleGoBackClick, true);

    /**
     * Hide NavBar if recording is active
     * and do not revert this after recording is stopped
     */
    useEffect(() => {
        if (recordingState && recordingState !== 'not-started') {
            navigation.setOptions({
                tabBarVisible: false,
                tabBarIcon: () => null,
            });
        }
    }, [navigation, recordingState]);

    useEffect(() => {
        mountedRef.current = true;

        return () => {
            mountedRef.current = false;
        };
    }, []);

    useEffect(() => {
        dispatch(setFocusedOnRecordingScreenState(true));

        return () => {
            dispatch(setFocusedOnRecordingScreenState(false));
        };
    }, [dispatch]);

    /**
     * Reset params on unmount
     */
    useEffect(() => {
        return () => {
            navigation.setParams({
                mapID: undefined,
            });
        };
    }, [navigation]);

    /* Re-run counter after app restart */
    useEffect(() => {
        if (isTrackerActive && mountedRef.current) {
            setBeforeRecording(false);
            setPauseTime({start: 0, total: trackerPauseTime});
            startTracker(mapID, false, false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (pauseTime.total > 0) {
            dispatch(setCurrentRoutePauseTime(pauseTime.total));
        }
    }, [dispatch, pauseTime.total]);

    /**
     * Do not render path when app is not active
     */
    const {appStateVisible} = useAppState();
    const prevAppStateRef = useRef('active');
    useEffect(() => {
        if (!isActive || !mountedRef.current) {
            return;
        }
        if (
            appStateVisible === 'background' &&
            prevAppStateRef.current === 'active'
        ) {
            setRenderPath(false);
            prevAppStateRef.current = 'background';
        } else {
            setRenderPath(true);
            prevAppStateRef.current = 'active';
        }
    }, [appStateVisible, isActive]);

    /**
     * Helper to prevent starting location plugin when stop recording
     */
    const recordingFinishedRef = useRef(false);
    /**
     * When true start stop recording
     */
    const [startStoppingRecroding, setStartStoppingRecroding] = useState(false);
    /**
     * Helper to pass data to ThankYouPage screen
     */
    const totalDistanceRef = useRef(DEFAULT_DISTANCE);
    /**
     * Helper to pass data to ThankYouPage screen
     */
    const totalOdomoeterRef = useRef(0);

    const checkIfRouteIsLongEnough = useCallback(() => {
        const isToShort = totalOdomoeterRef.current <= MIN_ROUTE_LENGTH;
        if (isToShort) {
            return false;
        }

        return true;
    }, []);

    /**
     * Navigation to next screen with route summary
     */
    const navigateToTHPPage = useCallback(() => {
        dispatch(setHeavyTaskProcessingState(true));
        /**
         * Copied from previous version
         */
        const totTime = setTotalTime(pauseTime);
        dispatch(setCurrentRoutePauseTime(totTime));

        navigation.navigate({
            name: 'ThankYouPageTab',
            params: {
                distance: totalDistanceRef.current,
                time: trackerStartTime
                    ? Date.now() - Date.parse(trackerStartTime.toUTCString())
                    : undefined,
                pause: totTime || pauseTime.total,
            },
        });
    }, [dispatch, navigation, pauseTime, trackerStartTime]);

    /**
     * Do copy of odometer and distance to pass as navigation params
     */
    useEffect(() => {
        totalOdomoeterRef.current = trackerData?.odometer || 0;
        totalDistanceRef.current = trackerData?.distance || DEFAULT_DISTANCE;
    }, [trackerData?.distance, trackerData?.odometer]);

    /**
     * Stop recording and check whether route is long enough
     */
    useEffect(() => {
        if (startStoppingRecroding) {
            recordingFinishedRef.current = true;
            /**
             * Partially copied from previous version
             */
            setStartStoppingRecroding(false);
            (async function () {
                setBeforeRecording(true);
                const isLongEnough = checkIfRouteIsLongEnough();

                /**
                 * Skip processing to avoid setting new state on onmounted component
                 */
                stopTracker(!isLongEnough, true, true);

                if (!isLongEnough) {
                    setShowToShortRouteAlert(true);
                } else {
                    navigateToTHPPage();
                }
            })();
        }
    }, [
        stopTracker,
        checkIfRouteIsLongEnough,
        navigateToTHPPage,
        startStoppingRecroding,
    ]);

    const compassHeading = useCompassHook();

    const onCloseShortRouteAlertHandler = useCallback(() => {
        dispatch(abortSyncCurrentRouteData(true, true));
        navigation.goBack();
    }, [dispatch, navigation]);

    /**
     * Start tracking
     */
    const onPressStartHandler = useCallback(async () => {
        /**
         * Copied from previous version
         */
        if (!isActive && !recordingFinishedRef.current) {
            setBeforeRecording(false);
            setRenderPath(true);
            startTracker(mapID, false, true);
        }
    }, [isActive, mapID, startTracker]);

    /**
     * Stop tracking
     */
    const onPressStopHandler = useCallback(async () => {
        setStartStoppingRecroding(true);
    }, []);

    /**
     * Pause/resume tracking
     */
    const onPressPauseResumeHandler = useCallback(
        async (e: GestureResponderEvent, shouldPause) => {
            const pauseDT = Date.now();
            /**
             * Copied from prevoius version
             */
            if (shouldPause) {
                /**
                 * Add pause start event
                 */
                dispatch(
                    setCurrentRouteRecordTime({
                        action: RecordTimeAction.START_PAUSE,
                        time: getTimeInUTCSeconds(pauseDT),
                    }),
                );
                /**
                 * Add pause notification
                 */
                setNotifications(prev => [...prev, recordingNotification]);
                setPauseTime(prevPT => ({
                    ...prevPT,
                    start: pauseDT,
                }));
                pauseTracker();
            } else {
                /**
                 * Add pause end event
                 */
                dispatch(
                    setCurrentRouteRecordTime({
                        action: RecordTimeAction.END_PAUSE,
                        time: getTimeInUTCSeconds(pauseDT),
                    }),
                );
                /**
                 * Remove pause notification
                 */
                setNotifications(prev => [
                    ...prev.filter(n => n.key !== 'pause-notifications'),
                ]);

                setPauseTime(prevPT => {
                    const newTotalTime = setTotalTime(prevPT);
                    return {
                        ...prevPT,
                        total: newTotalTime,
                        start: 0 /* clear to avoid double counting when recording is finished */,
                    };
                });
                resumeTracker();
            }
        },
        [dispatch, pauseTracker, resumeTracker],
    );

    const [mapRotated, setMapRotated] = useState(false);

    const [mapToNorth, setMapToNorth] = useState(false);

    const onPressLocationButtonHandler = useCallback(
        (actionType: LocationButtonT) => {
            switch (actionType) {
                case 'default':
                    /**
                     * Disable heading, leave following user position
                     * if enabled
                     */
                    setHeadingOn(false);
                    break;
                case 'follow':
                    /**
                     * If needed enable following user position
                     * and enable heading
                     */
                    setHeadingOn(true);
                    setAutoFindMe(prev => ++prev);
                    break;
                case 'center':
                    /**
                     * Center on user position
                     */
                    setAutoFindMe(prev => ++prev);
                    break;
                case 'north':
                    setMapToNorth(true);
                    setMapRotated(false);
                    break;
                default:
                    break;
            }
        },
        [],
    );

    const onMapRotatedHandler = useCallback(
        (angle: number) => {
            if (Math.abs(angle - compassHeading) > 10) {
                setMapRotated(true);
            }
        },
        [compassHeading],
    );

    const mapHeadingResetHandler = useCallback(() => {
        setMapToNorth(false);
    }, []);

    const onCompassButtonPressHandler = useCallback(() => {
        onPressLocationButtonHandler('north');
    }, [onPressLocationButtonHandler]);

    return (
        <GenericScreen
            hideBackArrow
            noHeader
            transculentStatusBar
            transculentBottom>
            <View style={styles.container}>
                <Map
                    routeId={followedRouteId || mapID}
                    isPlanned={isPlanned}
                    trackerData={trackerData}
                    autoFindMe={autoFindMe}
                    headingOn={headingOn}
                    compassHeading={compassHeading}
                    renderPath={renderPath}
                    restoredPath={restoredPath}
                    autoFindMeSwith={(e: number) => setAutoFindMe(e)}
                    beforeRecording={beforeRecording}
                    onMapRotation={onMapRotatedHandler}
                    resetMapToNorth={mapToNorth}
                    onMapHeadingReset={mapHeadingResetHandler}
                />

                <MapControlButtons
                    isActive={isActive}
                    mapRotated={mapRotated}
                    onCompassButtonPressHandler={onCompassButtonPressHandler}
                    onPressLocationButtonHandler={onPressLocationButtonHandler}
                    compassHeading={compassHeading}
                    locationInactive={!autoFindMe}
                />

                <CounterDataContext.Provider
                    value={{
                        trackerData,
                        pauseTime: pauseTime.total,
                    }}>
                    <CounterContainer
                        onPressStart={onPressStartHandler}
                        onPressStop={onPressStopHandler}
                        onPressPauseResume={onPressPauseResumeHandler}
                        totalDistance={totalOdomoeterRef.current}
                        topSpace={heightOfNotificationContainer}
                    />
                </CounterDataContext.Provider>

                <View style={[styles.notificationsContainer, {top}]}>
                    <NotificationList
                        onLayout={handleNotificationsLayoutChange}>
                        {[
                            ...notifications.map(notification => (
                                <Notification {...notification} />
                            )),
                            <UnifiedLocationNotification
                                showGPSStatus
                                locationNotAlwaysNotification
                                key={'location-notification'}
                            />,
                        ]}
                    </NotificationList>
                </View>

                <CustomAlert
                    show={showToShortRouteAlert}
                    onPress={onCloseShortRouteAlertHandler}
                    text={t('alerts.tooShort.message')}
                    pressText={t('alerts.tooShort.action')}
                    numberOfLines={3}
                    noCancel
                    contentStyle={{
                        height: getFHorizontalPx(244),
                        paddingHorizontal: getFHorizontalPx(20),
                    }}
                />
            </View>
        </GenericScreen>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    notificationsContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 20,
    },
});

export default React.memo(Counter);

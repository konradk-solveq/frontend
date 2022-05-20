import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
    StyleSheet,
    View,
    Animated,
    Alert,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

import {useNotificationContext} from '@providers/topNotificationProvider/TopNotificationProvider';
import {getHorizontalPx, getVerticalPx, getHeightPx} from '@helpers/layoutFoo';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import useAppState from '@hooks/useAppState';
import {getBike} from '@helpers/transformUserBikeData';
import BikeSelectorList from './bikeSelectorList/bikeSelectorList';
import useLocalizationTracker from '@hooks/useLocalizationTracker';
import {
    setCurrentRoutePauseTime,
    setRouteMapVisibility,
    abortSyncCurrentRouteData,
} from '@storage/actions/routes';

import StackHeader from './stackHeader/stackHeader';

import {UserBike} from '@models/userBike.model';
import {
    trackerActiveSelector,
    trackerPauseTimeSelector,
    trackerStartTimeSelector,
} from '@storage/selectors/routes';
import {getFHorizontalPx} from '@theme/utils/appLayoutDimensions';
import useCustomBackNavButton from '@hooks/useCustomBackNavBtn';
import useCustomSwipeBackNav from '@hooks/useCustomSwipeBackNav';
import ErrorBoundary from '@providers/errorBoundary/ErrorBoundary';
import useCompassHook from '@hooks/useCompassHook';

import ActionButtons from './actionButtons';
import Map from './map';
import {BothStackRoute, RegularStackRoute} from '@navigation/route';
import NativeCounter from './nativeCounter/nativeCounter';
import {CounterDataContext} from './nativeCounter/counterContext/counterContext';
import Apla from './apla';
import DataPreview from '@sharedComponents/dataPreview/dataPreview';
import {Alert as CustomAlert} from '@components/alerts';

import {TESTING_MODE} from '@env';

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

const BIKE_LIST_TOP_BIG = getHorizontalPx(142);
const BIKE_LIST_TOP_SMALL = getHorizontalPx(42);
const ANIMATION_DURATION = 700;
interface Props {
    navigation: any;
    route: any;
}

const Counter: React.FC<Props> = ({navigation, route}: Props) => {
    const {t} = useMergedTranslation('MainCounter');
    const dispatch = useAppDispatch();
    const mountedRef = useRef(false);
    const notificationContext = useNotificationContext();
    const initShowMapRef = useRef(false);

    const isTrackerActive = useAppSelector(trackerActiveSelector);
    const trackerStartTime = useAppSelector(trackerStartTimeSelector);
    const trackerPauseTime = useAppSelector(trackerPauseTimeSelector);

    const bikes = useAppSelector<UserBike[]>(state => state.bikes.list);
    const [bike, setBike] = useState<UserBike | null>(bikes?.[0] || null);

    const [myRouteNumber, setMyRouteNumber] = useState(0);
    const [autoFindMe, setAutoFindMe] = useState<number>(1);
    const [headingOn, setHeadingOn] = useState<boolean>(true);
    const [pauseTime, setPauseTime] = useState({
        start: 0,
        total: 0,
    });
    const [beforeRecording, setBeforeRecording] = useState<boolean>(true);

    /* Shows alert with error when recorded route is shorter than 100 m */
    const [showToShortRouteAlert, setShowToShortRouteAlert] = useState(false);

    const {top} = useSafeAreaInsets();

    // trakowanie
    const {
        trackerData,
        startTracker,
        stopTracker,
        pauseTracker,
        resumeTracker,
        followedRouteId,
        isActive,
        restoredPath,
        processing,
    } = useLocalizationTracker(true, true);

    const [mapHiden, setMapHiden] = useState(true);
    const [renderMap, setRenderMap] = useState(false);
    const [renderPath, setRenderPath] = useState(false);

    const bileListTop = useRef(new Animated.Value(BIKE_LIST_TOP_BIG)).current;

    // zmiana roweru
    const onChangeBikeHandler = (frameNumber: string) => {
        if (frameNumber === bike?.description.serial_number) {
            return;
        }
        const newBike = getBike(bikes, frameNumber);
        if (newBike) {
            setBike(newBike);
        }
        const message = t('bikeChanged', {
            name: newBike?.description.name || '',
        });
        notificationContext.setNotificationVisibility(message);
    };

    const [pageState, setPageState] = useState('start');

    const [leftBtnTile, setLeftBtnTile] = useState('');
    const [rightBtnTile, setRightBtnTile] = useState('');
    const [headerTitle, setHeaderTitle] = useState('');
    const [pause, setPause] = useState(true);

    useEffect(() => {
        mountedRef.current = true;

        return () => {
            mountedRef.current = false;
        };
    }, []);

    /* Re-run counter after app restart */
    useEffect(() => {
        if (isTrackerActive) {
            setBeforeRecording(false);
            setPageState('record');
            setPauseTime({start: 0, total: trackerPauseTime});
            startTracker(route?.params?.mapID);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (pauseTime.total > 0) {
            dispatch(setCurrentRoutePauseTime(pauseTime.total));
        }
    }, [dispatch, pauseTime.total]);

    useEffect(() => {
        Animated.timing(bileListTop, {
            toValue: mapHiden ? BIKE_LIST_TOP_BIG : BIKE_LIST_TOP_SMALL,
            duration: ANIMATION_DURATION,
            useNativeDriver: false,
        }).start();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapHiden, bileListTop, BIKE_LIST_TOP_SMALL]);

    // zmiana stanu strony na lewym przycisku
    const heandleLeftBtnClick = useCallback(() => {
        if (!mountedRef.current) {
            return;
        }

        switch (pageState) {
            case 'start':
                returnToPreviousScreen(navigation);
                break;
            case 'record':
                setPageState('pause');
                break;
            case 'pause':
                setPageState('record');
                setMyRouteNumber(myRouteNumber + 1);
                break;
            case 'cancelText':
                setPageState(pause ? 'pause' : 'record');
                break;
            case 'endMessage':
                setPageState(pause ? 'pause' : 'record');
                if (!pause) {
                    setMyRouteNumber(myRouteNumber + 1);
                }
                break;
            default: {
                Alert.alert('', 'błąd podpięcia funkcji pod przyciski', [
                    {
                        text: 'Ok',
                    },
                ]);
            }
        }
    }, [myRouteNumber, navigation, pageState, pause]);

    const navigateToTHPPage = useCallback(
        (pTime?: number) => {
            /**
             * If distance isn't greater than 100m back to home screen.
             */
            if (
                trackerData?.odometer === undefined ||
                trackerData?.odometer <= 100
            ) {
                setShowToShortRouteAlert(true);
                return;
            }

            navigation.navigate({
                name: RegularStackRoute.COUNTER_THANK_YOU_PAGE_SCREEN,
                params: {
                    distance: trackerData?.distance,
                    time: trackerStartTime
                        ? Date.now() -
                          Date.parse(trackerStartTime.toUTCString())
                        : undefined,
                    pause: pTime || pauseTime.total,
                },
            });
        },
        [
            navigation,
            pauseTime,
            trackerStartTime,
            trackerData?.distance,
            trackerData?.odometer,
        ],
    );

    // zmiana stanu strony na prawym przycisku
    const heandleRightBtnClick = useCallback(async () => {
        if (!mountedRef.current) {
            return;
        }

        switch (pageState) {
            case 'start':
                setPageState('record');
                setBeforeRecording(false);
                await startTracker(route?.params?.mapID);
                break;
            case 'record':
                setPageState('endMessage');
                break;
            case 'pause':
                setPageState('endMessage');
                break;
            case 'cancelText':
                await stopTracker(true);
                returnToPreviousScreen(navigation);
                break;
            case 'endMessage':
                await stopTracker();
                if (!isTrackerActive) {
                    return;
                }
                const totTime = setTotalTime(pauseTime);
                dispatch(setCurrentRoutePauseTime(totTime));
                navigateToTHPPage(totTime);
                // do ekranu zakończenia
                break;
            default: {
                Alert.alert('', 'błąd podpięcia funkcji pod przyciski', [
                    {
                        text: 'Ok',
                    },
                ]);
            }
        }
    }, [
        dispatch,
        pauseTime,
        navigation,
        startTracker,
        stopTracker,
        navigateToTHPPage,
        pageState,
        route?.params?.mapID,
        isTrackerActive,
    ]);

    // zmiana funckji strzałki headera
    const heandleGoBackClick = async () => {
        switch (pageState) {
            case 'start':
                returnToPreviousScreen(navigation);
                break;
            default:
                setPageState('cancelText');
                break;
        }
    };

    useCustomBackNavButton(heandleGoBackClick, true);
    useCustomSwipeBackNav(
        heandleGoBackClick,
        pageState !== 'start' && pageState !== 'cancelText',
    );

    // zmiana funkcji przycisków i strzałki headera
    useEffect(() => {
        switch (pageState) {
            case 'start':
                // eslint-disable-next-line no-lone-blocks
                {
                    setLeftBtnTile(t('btnCancel'));
                    setRightBtnTile(t('btnStart'));
                    setHeaderTitle(t('headerStart'));
                    setPause(true);
                }
                break;
            case 'record':
                // eslint-disable-next-line no-lone-blocks
                {
                    if (!isActive && isTrackerActive) {
                        resumeTracker();
                    }
                    setLeftBtnTile(t('btnPauza'));
                    setRightBtnTile(t('btnEnd'));
                    setHeaderTitle(t('headerRecord'));

                    setPauseTime(prevPT => {
                        const newTotalTime = setTotalTime(prevPT);
                        return {
                            ...prevPT,
                            total: newTotalTime,
                        };
                    });
                    setPause(false);
                }
                break;
            case 'pause':
                // eslint-disable-next-line no-lone-blocks
                {
                    pauseTracker();
                    setLeftBtnTile(t('btnPauzaOff'));
                    setHeaderTitle(t('headerPause'));
                    setPauseTime(prevPT => ({
                        ...prevPT,
                        start: Date.now(),
                    }));
                    setPause(true);
                }
                break;
            case 'cancelText':
                // eslint-disable-next-line no-lone-blocks
                {
                    setLeftBtnTile(t('btnCancel'));
                    setRightBtnTile(t('btnBreak'));
                }
                break;
            case 'endMessage':
                // eslint-disable-next-line no-lone-blocks
                {
                    pauseTracker();
                    setLeftBtnTile(t('btnCancel'));
                    setRightBtnTile(t('btnEnd'));
                    setHeaderTitle(t('headerPause'));
                    if (!pause) {
                        setPauseTime(prevPT => ({
                            ...prevPT,
                            start: Date.now(),
                        }));
                    }
                }
                break;
            default: {
                Alert.alert('', 'błąd przypisania wartości "pageState"', [
                    {
                        text: 'Ok',
                    },
                ]);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageState, t]);

    const onHideMapHandler = (state: boolean) => {
        initShowMapRef.current = true;
        setTimeout(
            () => {
                setRenderPath(!state);
            },
            !state ? 0 : 250,
        );
        setMapHiden(state);
        dispatch(setRouteMapVisibility(!state));
    };

    // Delay map loading because of performance issue
    useEffect(() => {
        let t: NodeJS.Timeout;
        if (!renderMap) {
            t = setTimeout(() => {
                setRenderMap(true);
            }, 2000);
        }

        return () => {
            clearTimeout(t);
        };
    }, [renderMap]);

    /**
     * Do not render path when app is not active
     */
    const {appStateVisible} = useAppState();
    const prevAppStateRef = useRef('active');
    useEffect(() => {
        if (!isActive || !initShowMapRef.current) {
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

    const compassHeading = useCompassHook();
    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            width: getHorizontalPx(414),
            top: top,
            height: getVerticalPx(896) - top,
        },
        bikeList: {
            position: 'absolute',
            zIndex: 5,
            top: 0,
            height: getVerticalPx(250),
            width: '100%',
        },
        bikeListInner: {
            position: 'absolute',
            top: getVerticalPx(45),
            height: getHeightPx(),
        },
        apla: {
            position: 'absolute',
            left: 0,
            top: 0,
            width: getHorizontalPx(414),
            height: getVerticalPx(896),
            zIndex: 5,
        },
    });

    const onCloseShortRouteAlertHandler = useCallback(() => {
        dispatch(abortSyncCurrentRouteData(true, true));
        navigation.goBack();
    }, [dispatch, navigation]);

    return (
        <SafeAreaView>
            <StatusBar backgroundColor="#fff" />
            <ErrorBoundary onError={() => onHideMapHandler(true)}>
                <View style={styles.container}>
                    <CounterDataContext.Provider
                        value={{
                            trackerData,
                            pauseTime: pauseTime.total,
                        }}>
                        <NativeCounter
                            time={trackerStartTime}
                            isRunning={isActive}
                            mapHiden={mapHiden}
                            setMapHiden={onHideMapHandler}
                            duration={ANIMATION_DURATION}
                            aplaShow={
                                pageState === 'cancelText' ||
                                pageState === 'endMessage'
                            }
                            autoFindMeSwith={(e: number) => setAutoFindMe(e)}
                            autoFindMe={autoFindMe}
                            headingSwitch={(e: boolean) => setHeadingOn(e)}
                            compassHeading={compassHeading}
                        />
                    </CounterDataContext.Provider>

                    <StackHeader
                        onpress={heandleGoBackClick}
                        inner={headerTitle}
                        whiteArrow={
                            !pause && pageState !== 'endMessage' && mapHiden
                        }
                        titleOn={true}
                        started={
                            pageState === 'record' ||
                            (pageState === 'cancelText' && !pause)
                        }
                        mapHiden={mapHiden}
                        duration={ANIMATION_DURATION}
                    />

                    {bikes && (
                        <View pointerEvents="box-none" style={styles.bikeList}>
                            <Animated.View
                                pointerEvents="box-none"
                                style={[
                                    styles.bikeListInner,
                                    {
                                        top: bileListTop,
                                    },
                                ]}>
                                <BikeSelectorList
                                    list={bikes}
                                    callback={onChangeBikeHandler}
                                    currentBike={
                                        bike?.description?.serial_number
                                    }
                                    buttonText={'add'}
                                    mapHiden={mapHiden}
                                    duration={ANIMATION_DURATION}
                                />
                            </Animated.View>
                        </View>
                    )}

                    <View style={styles.apla} pointerEvents="none">
                        <Apla
                            show={
                                pageState === 'cancelText' ||
                                pageState === 'endMessage'
                            }
                            message={
                                pageState === 'cancelText'
                                    ? t('cancelText')
                                    : t('endText')
                            }
                            duration={ANIMATION_DURATION}
                        />
                    </View>

                    <ActionButtons
                        leftBtnTitle={leftBtnTile}
                        leftBtnCallback={heandleLeftBtnClick}
                        rightBtnTitle={rightBtnTile}
                        rightBtnCallback={heandleRightBtnClick}
                        disabled={processing}
                        loading={processing}
                    />

                    {renderMap && (
                        <Map
                            routeId={followedRouteId || route?.params?.mapID}
                            trackerData={trackerData}
                            autoFindMe={autoFindMe}
                            headingOn={headingOn}
                            compassHeading={compassHeading}
                            renderPath={renderPath}
                            restoredPath={restoredPath}
                            autoFindMeSwith={(e: number) => setAutoFindMe(e)}
                            beforeRecording={beforeRecording}
                        />
                    )}

                    <CustomAlert
                        show={showToShortRouteAlert}
                        onPress={onCloseShortRouteAlertHandler}
                        text={t('alerts.tooShort.message')}
                        pressText={t('alerts.tooShort.action')}
                        noCancel
                        contentStyle={{
                            height: getFHorizontalPx(244),
                            paddingHorizontal: getFHorizontalPx(20),
                        }}
                    />

                    {TESTING_MODE === 'true' && (
                        <DataPreview
                            title={'podgląd danych'}
                            trackerStartTime={trackerStartTime}
                            reduxData={['counter']}
                            dataList={[
                                {
                                    name: 'my Route Number',
                                    value: myRouteNumber,
                                },
                                {
                                    name: 'route params mapID',
                                    value: route?.params?.mapID,
                                },
                                {},
                                {section: 'page states'},
                                {
                                    name: 'page State',
                                    value: pageState,
                                },
                                {
                                    name: 'map Hiden',
                                    value: mapHiden,
                                },
                                {
                                    name: 'auto Find Me',
                                    value: autoFindMe,
                                },
                                {},
                                {section: 'data from tracker'},
                                {
                                    name: 'is Active',
                                    value: isActive,
                                },
                                {
                                    name: 'is Tracker Active',
                                    value: isTrackerActive,
                                },
                                {
                                    name: 'Start Time',
                                    value: trackerStartTime,
                                },
                                {
                                    name: 'Pause Time',
                                    value: trackerPauseTime,
                                },
                                {
                                    name: 'Total Time',
                                    value: setTotalTime(pauseTime),
                                },
                                {
                                    name: 'followed Route Id',
                                    value: followedRouteId,
                                },
                                {
                                    name: 'distance',
                                    value: trackerData?.distance,
                                },
                                {
                                    name: 'coords.lat',
                                    value: trackerData?.coords.lat,
                                },
                                {
                                    name: 'coords.lon',
                                    value: trackerData?.coords.lon,
                                },
                                {},
                                {section: 'pause'},
                                {
                                    name: 'is on',
                                    value: pause,
                                },
                                {
                                    name: 'state',
                                    value: pageState,
                                },
                                {
                                    name: 'start time',
                                    value: pauseTime.start,
                                },
                                {
                                    name: 'total time',
                                    value: pauseTime.total,
                                },
                            ]}
                        />
                    )}
                </View>
            </ErrorBoundary>
        </SafeAreaView>
    );
};

export default Counter;

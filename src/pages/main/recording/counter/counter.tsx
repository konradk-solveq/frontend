import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
    StyleSheet,
    View,
    Animated,
    Platform,
    StatusBar,
    Alert,
    InteractionManager,
} from 'react-native';

import I18n from 'react-native-i18n';

import {useNotificationContext} from '@providers/topNotificationProvider/TopNotificationProvider';
import {
    getVerticalPx,
    getStackHeaderHeight,
    getHorizontalPx,
} from '../../../../helpers/layoutFoo';
import {useAppDispatch, useAppSelector} from '../../../../hooks/redux';
import {getBike} from '../../../../helpers/transformUserBikeData';
import BikeSelectorList from './bikeSelectorList/bikeSelectorList';
import useLocalizationTracker from '../../../../hooks/useLocalizationTracker';
import {
    setCurrentRoutePauseTime,
    setRouteMapVisibility,
} from '../../../../storage/actions/routes';

import StackHeader from './stackHeader/stackHeader';

import {UserBike} from '../../../../models/userBike.model';
import useStatusBarHeight from '../../../../hooks/statusBarHeight';
import {
    trackerActiveSelector,
    trackerPauseTimeSelector,
    trackerStartTimeSelector,
} from '../../../../storage/selectors/routes';
import useCustomBackNavButton from '../../../../hooks/useCustomBackNavBtn';
import useCustomSwipeBackNav from '../../../../hooks/useCustomSwipeBackNav';
import ErrorBoundary from '@providers/errorBoundary/ErrorBoundary';

import ActionButtons from './actionButtons';
import Map from './map';
import {BothStackRoute, RegularStackRoute} from '../../../../navigation/route';
import NativeCounter from './nativeCounter/nativeCounter';
import {CounterDataContext} from './nativeCounter/counterContext/counterContext';
import Apla from './apla';
import {ShortCoordsType} from '@type/coords';
import {restoreRouteDataFromSQL} from '@utils/routePath';
import DataPreview from '../../../../sharedComponents/dataPreview/dataPreview';
import CompassHeading from 'react-native-compass-heading';

import {TESTING_MODE} from '@env';
import useAppState from '@src/hooks/useAppState';

const isIOS = Platform.OS === 'ios';

interface Props {
    navigation: any;
    route: any;
}

const returnToPreviousScreen = (nav: any) => {
    if (nav.canGoBack()) {
        nav.goBack();
        return;
    }
    nav.replace(BothStackRoute.MAIN_MENU_SCREEN);
};

const setTotalTime = (pTime: {start: number; total: number}) => {
    return pTime.start > 0 ? pTime.total + (Date.now() - pTime.start) : 0;
};

const Counter: React.FC<Props> = ({navigation, route}: Props) => {
    const trans: any = I18n.t('MainCounter');
    const dispatch = useAppDispatch();
    const notificationContext = useNotificationContext();

    const isTrackerActive = useAppSelector(trackerActiveSelector);
    const trackerStartTime = useAppSelector(trackerStartTimeSelector);
    const trackerPauseTime = useAppSelector(trackerPauseTimeSelector);

    const bikes = useAppSelector<UserBike[]>(state => state.bikes.list);
    const [bike, setBike] = useState<UserBike | null>(bikes?.[0] || null);
    const statusBarHeight = useStatusBarHeight();
    const headerHeight = getStackHeaderHeight() - statusBarHeight;

    const [myRouteNumber, setMyRouteNumber] = useState(0);
    const [autoFindMe, setAutoFindMe] = useState(true);
    const [headingOn, setHeadingOn] = useState<boolean>(true);
    const [pauseTime, setPauseTime] = useState({
        start: 0,
        total: 0,
    });

    const ANIMATION_DURATION = 666;

    const mountRef = useRef(false);

    const trackerDataAgregatorRef = useRef<ShortCoordsType[]>([]);

    // trakowanie
    const {
        trackerData,
        startTracker,
        stopTracker,
        pauseTracker,
        resumeTracker,
        followedRouteId,
        isActive,
        currentRouteId,
    } = useLocalizationTracker(true, true);

    const [mapHiden, setMapHiden] = useState(true);
    const [renderMap, setRenderMap] = useState(false);

    const bileListTop = useRef(
        new Animated.Value(headerHeight + getVerticalPx(50)),
    ).current;

    // zmiana roweru
    const onChangeBikeHandler = (frameNumber: string) => {
        if (frameNumber === bike?.description.serial_number) {
            return;
        }
        const newBike = getBike(bikes, frameNumber);
        if (newBike) {
            setBike(newBike);
        }
        const message = I18n.t('MainCounter.bikeChanged', {
            name: newBike?.description.name || '',
        });
        notificationContext.setNotificationVisibility(message);
    };

    const [pageState, setPageState] = useState('start');

    const [leftBtnTile, setLeftBtnTile] = useState('');
    const [rightBtnTile, setRightBtnTile] = useState('');
    const [headerTitle, setHeaderTitle] = useState('');
    const [pause, setPause] = useState(true);

    /* Re-run counter after app restart */
    useEffect(() => {
        if (isTrackerActive) {
            setPageState('record');
            setPauseTime({start: 0, total: trackerPauseTime});
            startTracker(true, route?.params?.mapID);
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
            toValue: mapHiden
                ? headerHeight + getVerticalPx(50)
                : headerHeight + getVerticalPx(isIOS ? -22 : -54),
            duration: ANIMATION_DURATION,
            useNativeDriver: false,
        }).start();
    }, [mapHiden, headerHeight, bileListTop]);

    // zmiana stanu strony na lewym przycisku
    const heandleLeftBtnClick = useCallback(() => {
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
        [navigation, pauseTime, trackerStartTime, trackerData?.distance],
    );

    // zmiana stanu strony na prawym przycisku
    const heandleRightBtnClick = useCallback(async () => {
        switch (pageState) {
            case 'start':
                setPageState('record');
                await startTracker(false, route?.params?.mapID);
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
                const totTime = setTotalTime(pauseTime);
                dispatch(setCurrentRoutePauseTime(totTime));
                await stopTracker();
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
                    setLeftBtnTile(trans.btnCancel);
                    setRightBtnTile(trans.btnStart);
                    setHeaderTitle(trans.headerStart);
                    setPause(true);
                }
                break;
            case 'record':
                // eslint-disable-next-line no-lone-blocks
                {
                    if (!isActive && isTrackerActive) {
                        resumeTracker();
                    }
                    setLeftBtnTile(trans.btnPauza);
                    setRightBtnTile(trans.btnEnd);
                    setHeaderTitle(trans.headerRecord);

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
                    setLeftBtnTile(trans.btnPauzaOff);
                    setHeaderTitle(trans.headerPause);
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
                    setLeftBtnTile(trans.btnCancel);
                    setRightBtnTile(trans.btnBreak);
                }
                break;
            case 'endMessage':
                // eslint-disable-next-line no-lone-blocks
                {
                    pauseTracker();
                    setLeftBtnTile(trans.btnCancel);
                    setRightBtnTile(trans.btnEnd);
                    setHeaderTitle(trans.headerPause);
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
    }, [pageState, trans]);

    const onHideMapHandler = (state: boolean) => {
        setTimeout(
            () => {
                setRenderMap(!state);
            },
            !state ? 0 : 1000,
        );
        setMapHiden(state);
        dispatch(setRouteMapVisibility(!state));
    };

    // kompas mapy - przeniesiony z mapy, żby spuścić do innych komponentów
    const mountedRef = useRef(false);
    const compasHeadingdRef = useRef(0);

    const [compassHeading, setCompassHeading] = useState(0);

    useEffect(() => {
        mountedRef.current = true;

        return () => {
            mountedRef.current = false;
        };
    }, []);

    useEffect(() => {
        const degree_update_rate = 5;
        if (mountedRef.current) {
            CompassHeading.start(degree_update_rate, ({heading}) => {
                const lastHeading = compasHeadingdRef.current;
                compasHeadingdRef.current = heading;
                if (Math.abs(lastHeading - heading) >= degree_update_rate) {
                    setCompassHeading(heading);
                }
            });
        }
        return () => {
            CompassHeading.stop();
        };
    }, []);

    // setObjSize(334, 50);
    const styles = StyleSheet.create({
        stackHeader: {
            zIndex: 3,
        },
        container: {
            width: '100%',
            height: '100%',
        },
        bikeList: {
            position: 'absolute',
            zIndex: 5,
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

    useEffect(() => {
        if (trackerData && trackerData?.coords) {
            const pos = {
                latitude: trackerData.coords.lat,
                longitude: trackerData.coords.lon,
                timestamp: trackerData.timestamp,
            };

            trackerDataAgregatorRef.current = [
                ...trackerDataAgregatorRef.current,
                pos,
            ];
        }
    }, [trackerData]);

    /**
     * Restore path from SQL after re-launch.
     */
    useEffect(() => {
        if (!mountRef.current) {
            if (currentRouteId && isTrackerActive) {
                const asynchFetchPath = async () => {
                    InteractionManager.runAfterInteractions(async () => {
                        const newRoute = await restoreRouteDataFromSQL(
                            currentRouteId,
                            [],
                        );
                        if (newRoute?.length) {
                            trackerDataAgregatorRef.current = [newRoute[0]];
                            setTimeout(() => {
                                trackerDataAgregatorRef.current = newRoute;
                            }, 500);
                        }
                    });
                };

                asynchFetchPath();
            }

            mountRef.current = true;
        }

        return () => {
            mountRef.current = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // const {appIsActive} = useAppState();
    // /**
    //  * On IOS there is memory leak issue,
    //  * so we disable map when app goss to background.
    //  */
    // useEffect(() => {
    //     if (isActive && isIOS) {
    //         if (!appIsActive) {
    //             setRenderMap(false);
    //         } else {
    //             setRenderMap(true);
    //         }
    //     }
    // }, [isActive, appIsActive]);

    return (
        <>
            <StatusBar backgroundColor="#ffffff" />
            <ErrorBoundary onError={() => onHideMapHandler(true)}>
                <View style={styles.container}>
                    <StackHeader
                        onpress={heandleGoBackClick}
                        inner={headerTitle}
                        whiteArow={
                            !pause && pageState !== 'endMessage' && mapHiden
                        }
                        titleOn={true}
                        style={styles.stackHeader}
                        started={
                            pageState === 'record' ||
                            (pageState === 'cancelText' && !pause)
                        }
                        mapHiden={mapHiden}
                        duration={ANIMATION_DURATION}
                    />

                    {bikes && (
                        <Animated.View
                            pointerEvents="box-none"
                            style={[
                                styles.bikeList,
                                {
                                    top: bileListTop,
                                },
                            ]}>
                            <BikeSelectorList
                                list={bikes}
                                callback={onChangeBikeHandler}
                                currentBike={bike?.description?.serial_number}
                                buttonText={'add'}
                                mapHiden={mapHiden}
                                duration={ANIMATION_DURATION}
                            />
                        </Animated.View>
                    )}

                    <View style={styles.apla} pointerEvents="none">
                        <Apla
                            show={
                                pageState === 'cancelText' ||
                                pageState === 'endMessage'
                            }
                            message={
                                pageState === 'cancelText'
                                    ? trans.cancelText
                                    : trans.endText
                            }
                            duration={ANIMATION_DURATION}
                        />
                    </View>

                    <ActionButtons
                        leftBtnTitle={leftBtnTile}
                        leftBtnCallback={heandleLeftBtnClick}
                        rightBtnTitle={rightBtnTile}
                        rightBtnCallback={heandleRightBtnClick}
                    />

                    <CounterDataContext.Provider
                        value={{
                            trackerData,
                            treackerDataAgregator:
                                trackerDataAgregatorRef.current,
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
                            autoFindMeSwith={(e: boolean) => setAutoFindMe(e)}
                            headingSwitch={(e: boolean) => setHeadingOn(e)}
                            compassHeading={compassHeading}
                        />
                        {renderMap && (
                            <Map
                                routeId={
                                    followedRouteId || route?.params?.mapID
                                }
                                trackerData={trackerData}
                                autoFindMe={autoFindMe}
                                headingOn={headingOn}
                                compassHeading={compassHeading}
                                mountedRef={mountedRef}
                            />
                        )}

                        {TESTING_MODE === true && (
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
                    </CounterDataContext.Provider>
                </View>
            </ErrorBoundary>
        </>
    );
};

export default Counter;

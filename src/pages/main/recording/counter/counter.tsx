import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
    StyleSheet,
    View,
    Animated,
    Platform,
    StatusBar,
    Alert,
} from 'react-native';

import I18n from 'react-native-i18n';

import {
    getVerticalPx,
    getStackHeaderHeight,
} from '../../../../helpers/layoutFoo';
import {useAppDispatch, useAppSelector} from '../../../../hooks/redux';
import {getBike} from '../../../../helpers/transformUserBikeData';
import BikeSelectorList from './bikeSelectorList/bikeSelectorList';
import useLocalizationTracker from '../../../../hooks/useLocalizationTracker';
import {setCurrentRoutePauseTime} from '../../../../storage/actions/routes';

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

import MarkPointer from './markPointer';
import CounterActionButtons from './counterActionButtons';
import CounterMapView from './counterMapView';
import {RegularStackRoute} from '../../../../navigation/route';
import NativeCounter from './nativeCounter/nativeCounter';
import {
    CounterCallbackContext,
    CounterDataContext,
} from './nativeCounter/counterContext/counterContext';
import NativeTopInfo from './nativeTopInfo/nativeTopInfo';
import ShowMoreModal from '../../world/components/showMoreModal/showMoreModal';

const isIOS = Platform.OS === 'ios';

interface Props {
    navigation: any;
    route: any;
}

const Counter: React.FC<Props> = ({navigation, route}: Props) => {
    const trans: any = I18n.t('MainCounter');
    const dispatch = useAppDispatch();

    const isTrackerActive = useAppSelector(trackerActiveSelector);
    const trackerStartTime = useAppSelector(trackerStartTimeSelector);
    const trackerPauseTime = useAppSelector(trackerPauseTimeSelector);

    const bikes = useAppSelector<UserBike[]>(state => state.bikes.list);
    const [bike, setBike] = useState<UserBike | null>(bikes?.[0] || null);
    const statusBarHeight = useStatusBarHeight();
    const headerHeight = getStackHeaderHeight() - statusBarHeight;
    const marginTopOnIos = isIOS ? -statusBarHeight : 0;

    const [myRouteNumber, setMyRouteNumber] = useState(0);
    const [pauseTime, setPauseTime] = useState({
        start: 0,
        total: 0,
    });

    // trakowanie
    const {
        trackerData,
        startTracker,
        stopTracker,
        pauseTracker,
        resumeTracker,
        followedRouteId,
        isActive,
    } = useLocalizationTracker(true);

    const bikeSelectorListPositionY = useRef(
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

    // zmiana stanu strony na lewym przycisku
    const heandleLeftBtnClick = useCallback(() => {
        switch (pageState) {
            case 'start':
                navigation.goBack();
                break;
            case 'record':
                setPageState('pause');
                break;
            case 'pause':
                setPageState('record');
                setMyRouteNumber(myRouteNumber + 1);
                break;
            case 'cancelText':
                setPageState('record');
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

    const navigateToTHPPage = useCallback(() => {
        navigation.navigate({
            name: RegularStackRoute.COUNTER_THANK_YOU_PAGE_SCREEN,
            params: {
                distance: trackerData?.distance,
                time: Date.now() - Date.parse(trackerStartTime.toUTCString()),
                pause: pauseTime.total,
            },
        });
    }, [navigation, pauseTime, trackerStartTime, trackerData?.distance]);

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
                navigation.goBack();
                break;
            case 'endMessage':
                // TODO
                await stopTracker();
                navigateToTHPPage();
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
                navigation.goBack();
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
                setLeftBtnTile(trans.btnCancel);
                setRightBtnTile(trans.btnStart);
                setHeaderTitle(trans.headerStart);
                setPause(true);
                break;
            case 'record':
                resumeTracker();
                setLeftBtnTile(trans.btnPauza);
                setRightBtnTile(trans.btnEnd);
                setHeaderTitle(trans.headerRecord);
                setPause(false);
                setPauseTime(prevPT => {
                    const newTotalTime = prevPT.start
                        ? prevPT.total + (Date.now() - prevPT.start)
                        : 0;

                    return {
                        ...prevPT,
                        total: newTotalTime,
                    };
                });
                break;
            case 'pause':
                pauseTracker();
                setLeftBtnTile(trans.btnPauzaOff);
                setHeaderTitle(trans.headerPause);
                setPause(true);
                setPauseTime(prevPT => ({
                    ...prevPT,
                    start: Date.now(),
                }));
                break;
            case 'cancelText':
                setLeftBtnTile(trans.btnCancel);
                setRightBtnTile(trans.btnBreak);
                break;
            case 'endMessage':
                dispatch(setCurrentRoutePauseTime(pauseTime.total));
                pauseTracker();
                setLeftBtnTile(trans.btnCancel);
                setRightBtnTile(trans.btnEnd);
                setHeaderTitle(trans.headerPause);
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

    // setObjSize(334, 50);
    const styles = StyleSheet.create({
        stackHeader: {
            zIndex: 2,
        },
        innerContainer: {
            flex: 1,
        },
        bikeList: {
            zIndex: 1,
            marginTop: marginTopOnIos,
            position: 'absolute',
        },
    });

    return (
        <>
            <StatusBar backgroundColor="#ffffff" />
            <View style={styles.innerContainer}>
                <CounterMapView
                    routeId={followedRouteId || route?.params?.mapID}
                    trackerData={trackerData}
                    routeNumber={myRouteNumber}
                />

                <MarkPointer />

                <NativeTopInfo
                    started={
                        pageState === 'record' || pageState === 'cancelText'
                    }
                />

                <CounterDataContext.Provider value={trackerData}>
                    <CounterCallbackContext.Provider
                        value={() => console.log('[CounterCallbackContext]')}>
                        <NativeCounter
                            time={trackerStartTime}
                            isRunning={isActive}
                        />
                    </CounterCallbackContext.Provider>
                </CounterDataContext.Provider>

                {bikes && (
                    <Animated.View
                        style={[
                            styles.bikeList,
                            {
                                top: bikeSelectorListPositionY,
                            },
                        ]}>
                        <BikeSelectorList
                            list={bikes}
                            callback={onChangeBikeHandler}
                            currentBike={bike?.description?.serial_number}
                            buttonText={'add'}
                        />
                    </Animated.View>
                )}

                <CounterActionButtons
                    leftBtnTitle={leftBtnTile}
                    leftBtnCallback={heandleLeftBtnClick}
                    rightBtnTitle={rightBtnTile}
                    rightBtnCallback={heandleRightBtnClick}
                    withBackground={
                        pageState === 'cancelText' || pageState === 'endMessage'
                    }
                    message={
                        pageState === 'cancelText'
                            ? trans.cancelText
                            : trans.endText
                    }
                />

                <StackHeader
                    onpress={heandleGoBackClick}
                    inner={headerTitle}
                    whiteArow={!pause}
                    titleOn={true}
                    style={styles.stackHeader}
                />
            </View>
        </>
    );
};

export default Counter;

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
import {useAppSelector} from '../../../../hooks/redux';
import {getBike} from '../../../../helpers/transformUserBikeData';
import BikeSelectorList from './bikeSelectorList/bikeSelectorList';
import useLocalizationTracker from '../../../../hooks/useLocalizationTracker';

import StackHeader from './stackHeader/stackHeader';

import {UserBike} from '../../../../models/userBike.model';
import useStatusBarHeight from '../../../../hooks/statusBarHeight';
import {
    trackerActiveSelector,
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
    const isTrackerActive = useAppSelector(trackerActiveSelector);
    const trackerStartTime = useAppSelector(trackerStartTimeSelector);

    const bikes = useAppSelector<UserBike[]>(state => state.bikes.list);
    const [bike, setBike] = useState<UserBike | null>(bikes?.[0] || null);
    const statusBarHeight = useStatusBarHeight();
    const headerHeight = getStackHeaderHeight() - statusBarHeight;
    const marginTopOnIos = isIOS ? -statusBarHeight : 0;

    const [myRouteNumber, setMyRouteNumber] = useState(0);
    const [pauseTime, setPauseTime] = useState(0);

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
            startTracker(true, route?.params?.mapID);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // zmiana stanu strony na lewym przycisku
    const heandleLeftBtnClick = useCallback(() => {
        switch (pageState) {
            case 'start':
                navigation.goBack();
                break;
            case 'record':
                setPageState('pause');
                // setJs('setPauseOn();true;');
                break;
            case 'pause':
                setPageState('record');
                // setJs('hideAlert();setPauseOff();true;');
                setMyRouteNumber(myRouteNumber + 1);
                break;
            case 'cancelText':
                setPageState('record');
                // setJs('hideAlert();true;');
                break;
            case 'endMessage':
                setPageState(pause ? 'pause' : 'record');
                // setJs('hideAlert();true;');
                if (!pause) {
                    // setJs('start();setPauseOff();true;');
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
                pause: pauseTime,
            },
        });
    }, [navigation, pauseTime, trackerStartTime, trackerData?.distance]);

    // zmiana stanu strony na prawym przycisku
    const heandleRightBtnClick = useCallback(async () => {
        console.log('right buttm', pageState)
        switch (pageState) {
            case 'start':
                setPageState('record');
                // setJs('start();setPauseOff();true;');
                await startTracker(false, route?.params?.mapID);
                break;
            case 'record':
                setPageState('endMessage');
                // setJs('setPauseOn();true;');
                break;
            case 'pause':
                setPageState('endMessage');
                // setJs('setPauseOn();true;');
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
                console.log('[goback]');
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
                break;
            case 'pause':
                pauseTracker();
                setLeftBtnTile(trans.btnPauzaOff);
                setHeaderTitle(trans.headerPause);
                setPause(true);
                break;
            case 'cancelText':
                setLeftBtnTile(trans.btnCancel);
                setRightBtnTile(trans.btnBreak);
                break;
            case 'endMessage':
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
    }, [pageState, trans]);

    // funkcje wywoływane przez js z webview
    const heandleOnMessage = e => {
        let val = e.nativeEvent.data.split(';');

        switch (val[0]) {
            case 'pause':
                setPauseTime(JSON.parse(val[1]));
                break;
        }
    };

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

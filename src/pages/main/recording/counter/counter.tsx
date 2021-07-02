import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    TouchableWithoutFeedback,
    Animated,
    Easing,
    Platform,
    StatusBar,
    Alert,
} from 'react-native';
import {WebView} from 'react-native-webview';

import I18n from 'react-native-i18n';

import {
    setObjSize,
    getWidthPxOf,
    getHorizontalPx,
    getVerticalPx,
    getStackHeaderHeight,
} from '../../../../helpers/layoutFoo';
import {useAppSelector} from '../../../../hooks/redux';
import {getBike} from '../../../../helpers/transformUserBikeData';
import BikeSelectorList from './bikeSelectorList/bikeSelectorList';
import useLocalizationTracker from '../../../../hooks/useLocalizationTracker';

import StackHeader from './stackHeader/stackHeader';

import styleHtml from './styleHtml';
import htmlHtml from './htmlHtml';
import transHtml from './transHtml';
import counterHtml from './counterHtml';
import fooHtml from './fooHtml';

import {UserBike} from '../../../../models/userBike.model';
import useStatusBarHeight from '../../../../hooks/statusBarHeight';
import {
    trackerActiveSelector,
    trackerStartTimeSelector,
} from '../../../../storage/selectors/routes';
import useCustomBackNavButton from '../../../../hooks/useCustomBackNavBtn';
import useCustomSwipeBackNav from '../../../../hooks/useCustomSwipeBackNav';
import CounterGradient from './counterGradient';
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

const {width} = Dimensions.get('window');

interface Props {
    navigation: any;
    route: any;
}

const Counter: React.FC<Props> = ({navigation, route}: Props) => {
    const trans = I18n.t('MainCounter');
    const isTrackerActive = useAppSelector(trackerActiveSelector);
    const trackerStartTime = useAppSelector(trackerStartTimeSelector);

    const bikes = useAppSelector<UserBike[]>(state => state.bikes.list);
    const [bike, setBike] = useState<UserBike | null>(bikes?.[0] || null);
    const statusBarHeight = useStatusBarHeight();
    const headerHeight = getStackHeaderHeight() - statusBarHeight;
    const marginTopOnIos = Platform.OS === 'ios' ? statusBarHeight : 0;
    const [onMapLoaded, setOnMapLoaded] = useState(false);

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

    useEffect(() => {
        if (trackerData) {
            // setJs(`setValues(${JSON.stringify(trackerData)});true;`);
        }
    }, [trackerData]);

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

    // położenie listy rowerów
    const animateElemsOnMapOff = () => {
        Animated.timing(bikeSelectorListPositionY, {
            toValue: headerHeight + getVerticalPx(50),
            duration: 500,
            easing: Easing.quad,
            useNativeDriver: false,
        }).start();
    };

    const animateElemsOnMapOn = () => {
        Animated.timing(bikeSelectorListPositionY, {
            toValue: headerHeight + getVerticalPx(-70),
            duration: 500,
            easing: Easing.quad,
            useNativeDriver: false,
        }).start();
    };

    // inicjalizacja elementów webviwe
    // const animSvgRef = useRef();
    // const setJs = (foo: string) => animSvgRef.current.injectJavaScript(foo);

    const [pageState, setPageState] = useState('start');

    const [leftBtnTile, setLeftBtnTile] = useState('');
    const [rightBtnTile, setRightBtnTile] = useState('');
    const [headerTitle, setHeaderTitle] = useState('');
    const [pause, setPause] = useState(true);

    const [mapBtnPos, setMapBtnPos] = useState(0);
    const [mapBtnPosMemo, setMapBtnPosMemo] = useState(0);
    const [mapOn, setMapOn] = useState(false);

    /* Re-run counter after app restart */
    useEffect(() => {
        if (isTrackerActive) {
            setPageState('record');
            const startTime = trackerStartTime
                ? Date.parse(trackerStartTime.toUTCString())
                : null;
            // setJs(`start(${startTime});setPauseOff();true;`);
            startTracker(true, route?.params?.mapID);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onMapLoaded]);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigation, pauseTime, trackerStartTime]);

    // zmiana stanu strony na prawym przycisku
    const heandleRightBtnClick = useCallback(async () => {
        switch (pageState) {
            case 'start':
                setPageState('record');
                // setJs('start();setPauseOff();true;');
                await startTracker(false, route?.params?.mapID);
                break;
            case 'record':
                // await startTracker();
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
                {
                    // pauseTracker();
                    setLeftBtnTile(trans.btnCancel);
                    setRightBtnTile(trans.btnStart);
                    setHeaderTitle(trans.headerStart);
                    setPause(true);
                    // animateElemsOnMapOn();
                }
                break;
            case 'record':
                {
                    resumeTracker();
                    setLeftBtnTile(trans.btnPauza);
                    setRightBtnTile(trans.btnEnd);
                    setHeaderTitle(trans.headerRecord);
                    setPause(false);
                }
                break;
            case 'pause':
                {
                    pauseTracker();
                    setLeftBtnTile(trans.btnPauzaOff);
                    setHeaderTitle(trans.headerPause);
                    setPause(true);
                }
                break;
            case 'cancelText':
                {
                    setLeftBtnTile(trans.btnCancel);
                    setRightBtnTile(trans.btnBreak);
                    // setJs('showAlert(1, "' + trans.cancelText + '");true;');
                }
                break;
            case 'endMessage':
                {
                    pauseTracker();
                    setLeftBtnTile(trans.btnCancel);
                    setRightBtnTile(trans.btnEnd);
                    // setJs('showAlert(2, "' + trans.endText + '");true;');
                    // setJs('getPauseTime();true;');
                    setHeaderTitle(trans.headerPause);
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
        // setJs('setMini();true;');
    }, [pageState]);

    // funkcje wywoływane przez js z webview
    const heandleOnMessage = e => {
        let val = e.nativeEvent.data.split(';');

        switch (val[0]) {
            case 'map is ready':
                {
                    // setJs(
                    //     `setPositionOnMap({lat: ${
                    //         location?.lat || '53.009342618210624'
                    //     }, lng: ${
                    //         location?.lon || '20.890509251985964'
                    //     } });true;`,
                    // );
                }
                break;
            case 'mapBtn':
                {
                    let posY = JSON.parse(val[1]);
                    setMapBtnPosMemo(posY);
                    setMapBtnPos(posY[0]);
                }
                break;
            case 'pause':
                {
                    setPauseTime(JSON.parse(val[1]));
                }
                break;
        }
    };

    // funkcje kierowane z RN do js w webview
    const heandleMapVisibility = () => {
        if (mapOn) {
            // setJs('setMaxi();true;');
            animateElemsOnMapOff();
            setMapBtnPos(mapBtnPosMemo[0]);
            setMapOn(false);
        } else {
            // setJs('setMini();true;');
            animateElemsOnMapOn();
            setMapBtnPos(mapBtnPosMemo[1]);
            setMapOn(true);
        }
    };

    setObjSize(334, 50);
    let mapBtnSize = 60;
    const styles = StyleSheet.create({
        innerContainer: {
            flex: 1,
        },
        map: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: getHorizontalPx(414),
            height: getVerticalPx(896) - statusBarHeight,
        },
        markWrap: {
            position: 'absolute',
            left: '50%',
            top: '50%',
        },
        mark: {
            width: 31,
            height: 31,
            left: -15.5,
            top: -15.5,
        },
        fullView: {
            backgroundColor: 'transparent',
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
        },
        gradient: {
            backgroundColor: 'transparent',
            position: 'absolute',
            width: width,
            height: width,
            top: 0,
            left: 0,
        },
        bikeList: {
            zIndex: 1,
            marginTop: marginTopOnIos,
            position: 'absolute',
        },
        mapBtn: {
            position: 'absolute',
            width: mapBtnSize,
            height: mapBtnSize,
            left: (getHorizontalPx(414) - mapBtnSize) / 2,
            top: mapBtnPos - mapBtnSize / 2,
            // backgroundColor: 'green',
            // opacity: .3,
        },
        bottons: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: getHorizontalPx(334),
            left: getHorizontalPx(40),
            position: 'absolute',
            bottom: getVerticalPx(65),
            height: 50,
        },
        btn: {
            width: getWidthPxOf(157),
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

                <NativeTopInfo started={pageState === 'record'} />

                <CounterDataContext.Provider value={trackerData}>
                    <CounterCallbackContext.Provider
                        value={() => console.log('[CounterCallbackContext]')}>
                        <NativeCounter
                            time={trackerStartTime}
                            isRunning={isActive}
                        />
                    </CounterCallbackContext.Provider>
                </CounterDataContext.Provider>

                {/* <View style={styles.fullView} pointerEvents="none">
                    <WebView
                        style={styles.fullView}
                        originWhitelist={['*']}
                        scalesPageToFit={true}
                        useWebKit={Platform.OS === 'ios'}
                        scrollEnabled={false}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        onLoadEnd={() => setOnMapLoaded(true)}
                        source={{
                            html:
                                '<!DOCTYPE html><html lang="pl-PL"><head><meta http-equiv="Content-Type" content="text/html;  charset=utf-8"><meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" /><style>html,body,svg {margin:0;padding:0;height:100%;width:100%;overflow:hidden;background-color:transparent} svg{position:fixed}</style></head><body>' +
                                styleHtml +
                                htmlHtml +
                                transHtml +
                                counterHtml +
                                fooHtml +
                                '</body></html>',
                            baseUrl:
                                Platform.OS === 'ios'
                                    ? ''
                                    : 'file:///android_asset/',
                        }}
                        javaScriptEnabled={true}
                        ref={animSvgRef}
                        onMessage={heandleOnMessage}
                    />
                </View> */}

                <CounterGradient showGradient={!mapOn} />

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

                <TouchableWithoutFeedback onPress={heandleMapVisibility}>
                    <View style={styles.mapBtn} />
                </TouchableWithoutFeedback>

                <CounterActionButtons
                    leftBtnTitle={leftBtnTile}
                    leftBtnCallback={heandleLeftBtnClick}
                    rightBtnTitle={rightBtnTile}
                    rightBtnCallback={heandleRightBtnClick}
                />

                <StackHeader
                    onpress={heandleGoBackClick}
                    inner={headerTitle}
                    whiteArow={!pause && !mapOn}
                    titleOn={!mapOn}
                    style={{
                        zIndex: 2,
                    }}
                />
            </View>
        </>
    );
};

export default Counter;

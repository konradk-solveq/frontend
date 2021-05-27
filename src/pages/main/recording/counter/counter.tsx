import React, {useEffect, useState, useRef} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Dimensions,
    TouchableWithoutFeedback,
    Animated,
    Easing,
    Platform,
    StatusBar,
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

import BigRedBtn from '../../../../sharedComponents/buttons/bigRedBtn';
import BigWhiteBtn from '../../../../sharedComponents/buttons/bigWhiteBtn';
import StackHeader from './stackHeader/stackHeader';

import styleHtml from './styleHtml';
import htmlHtml from './htmlHtml';
import transHtml from './transHtml';
import counterHtml from './counterHtml';
import mapHtml from './mapHtml';
import fooHtml from './fooHtml';

import gradient from './gradientSvg';
import {UserBike} from '../../../../models/userBike.model';
import useStatusBarHeight from '../../../../hooks/statusBarHeight';
import {trackerActiveSelector} from '../../../../storage/selectors/routes';

const {width} = Dimensions.get('window');

interface Props {
    navigation: any;
}

const Counter: React.FC<Props> = ({navigation}: Props) => {
    const trans = I18n.t('MainCounter');
    const isTrackerActive = useAppSelector(trackerActiveSelector);

    const bikes = useAppSelector<UserBike[]>(state => state.bikes.list);
    const [bike, setBike] = useState<UserBike | null>(bikes?.[0] || null);
    const statusBarHeight = useStatusBarHeight();
    const headerHeight = getStackHeaderHeight() - statusBarHeight;
    const marginTopOnIos = Platform.OS === 'ios' ? statusBarHeight : 0;

    const bikeSelectorListPositionY = useRef(
        new Animated.Value(headerHeight + getVerticalPx(50)),
    ).current;

    const {trackerData, startTracker, stopTracker} = useLocalizationTracker(
        true,
    );

    useEffect(() => {
        setJs(`setValues(${JSON.stringify(trackerData)});true;`);
    }, [trackerData]);

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
    const animSvgRef = useRef();
    const setJs = (foo: string) => animSvgRef.current.injectJavaScript(foo);

    const gradientRef = useRef();
    const gradientJs = (foo: string) =>
        gradientRef.current.injectJavaScript(foo);

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
            heandleRightBtnClick(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const heandleLeftBtnClick = () => {
        switch (pageState) {
            case 'start':
                {
                    navigation.goBack();
                }
                break;
            case 'record':
                {
                    setPageState('pause');
                    setJs('setPauseOn();true;');
                }
                break;
            case 'pause':
                {
                    setPageState('record');
                    setJs('hideAlert();setPauseOff();true;');
                }
                break;
            case 'cancelText':
                {
                    setPageState('record');
                    setJs('hideAlert();true;');
                }
                break;
            case 'endMessage':
                {
                    setPageState('record');
                    setJs('hideAlert();true;');
                }
                break;
        }
    };

    const heandleRightBtnClick = async (keepState?: boolean) => {
        switch (pageState) {
            case 'start':
                {
                    await startTracker(keepState);
                    setPageState('record');
                    setJs('start();setPauseOff();true;');
                }
                break;
            case 'record':
                {
                    // await startTracker();
                    setPageState('endMessage');
                }
                break;
            case 'cancelText':
                {
                    await stopTracker();
                    navigation.goBack();
                }
                break;
            case 'endMessage':
                {
                    // TODO
                    await stopTracker();
                    navigation.navigate({
                        name: 'CounterThankYouPage',
                        params: {
                            distance: trackerData?.distance,
                        },
                    });
                    // do ekranu zakończenia
                }
                break;
        }
    };

    const heandleGoBackClick = () => {
        switch (pageState) {
            case 'start':
                {
                    navigation.goBack();
                }
                break;
            default:
                {
                    setPageState('cancelText');
                }
                break;
        }
    };

    useEffect(() => {
        switch (pageState) {
            case 'start':
                {
                    setLeftBtnTile(trans.btnCancel);
                    setRightBtnTile(trans.btnStart);
                    setHeaderTitle(trans.headerStart);
                    setPause(true);
                    // animateElemsOnMapOn();
                }
                break;
            case 'record':
                {
                    setLeftBtnTile(trans.btnPauza);
                    setRightBtnTile(trans.btnEnd);
                    setHeaderTitle(trans.headerRecord);
                    setPause(false);
                }
                break;
            case 'pause':
                {
                    setLeftBtnTile(trans.btnPauzaOff);
                    setHeaderTitle(trans.headerPause);
                    setPause(true);
                }
                break;
            case 'cancelText':
                {
                    setLeftBtnTile(trans.btnCancel);
                    setRightBtnTile(trans.btnBreak);
                    setJs('showAlert(1, "' + trans.cancelText + '");true;');
                }
                break;
            case 'endMessage':
                {
                    setLeftBtnTile(trans.btnCancel);
                    setRightBtnTile(trans.btnEnd);
                    setJs('showAlert(2, "' + trans.endText + '");true;');
                }
                break;
        }
        // setJs('setMini();true;');
    }, [pageState]);

    const heandleOnMessage = e => {
        let val = e.nativeEvent.data.split(';');

        switch (val[0]) {
            case 'map is ready':
                {
                    setJs(
                        'setPositionOnMap({lat: 53.009342618210624, lng: 20.890509251985964 });true;',
                    );
                }
                break;
            case 'mapBtn':
                {
                    let posY = JSON.parse(val[1]);
                    setMapBtnPosMemo(posY);
                    setMapBtnPos(posY[0]);
                }
                break;
        }
    };

    const heandleMapVisibility = () => {
        if (mapOn) {
            setJs('setMaxi();true;');
            animateElemsOnMapOff();
            setMapBtnPos(mapBtnPosMemo[0]);
            gradientJs('show();true;');
            setMapOn(false);
        } else {
            setJs('setMini();true;');
            animateElemsOnMapOn();
            setMapBtnPos(mapBtnPosMemo[1]);
            gradientJs('hide();true;');
            setMapOn(true);
        }
    };

    setObjSize(334, 50);
    let mapBtnSize = 60;
    const styles = StyleSheet.create({
        container: {
            // flex: 1,
            marginTop: marginTopOnIos,
            backgroundColor: 'transparent',
        },
        innerContainer: {
            flex: 1,
        },
        fullView: {
            backgroundColor: 'transparent',
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
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
                <View style={styles.fullView}>
                    <WebView
                        style={styles.fullView}
                        originWhitelist={['*']}
                        scalesPageToFit={true}
                        useWebKit={Platform.OS === 'ios'}
                        scrollEnabled={false}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        source={{
                            html:
                                '<!DOCTYPE html><html lang="pl-PL"><head><meta http-equiv="Content-Type" content="text/html;  charset=utf-8"><meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" /><style>html,body,svg {margin:0;padding:0;height:100%;width:100%;overflow:hidden;background-color:transparent} svg{position:fixed}</style></head><body>' +
                                styleHtml +
                                htmlHtml +
                                transHtml +
                                counterHtml +
                                mapHtml +
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
                </View>
                <View style={styles.gradient} pointerEvents="none">
                    <WebView
                        style={styles.fullView}
                        originWhitelist={['*']}
                        scalesPageToFit={true}
                        useWebKit={Platform.OS === 'ios'}
                        scrollEnabled={false}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        source={{
                            html:
                                '<!DOCTYPE html><html lang="pl-PL"><head><meta http-equiv="Content-Type" content="text/html;  charset=utf-8"><meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" /><style>html,body,svg {margin:0;padding:0;height:100%;width:100%;overflow:hidden;background-color:transparent} svg{position:fixed}</style></head><body>' +
                                gradient +
                                '</body></html>',
                            baseUrl:
                                Platform.OS === 'ios'
                                    ? ''
                                    : 'file:///android_asset/',
                        }}
                        javaScriptEnabled={true}
                        ref={gradientRef}
                    />
                </View>
                <SafeAreaView style={styles.container}>
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
                </SafeAreaView>

                <TouchableWithoutFeedback
                    onPress={() => heandleMapVisibility()}>
                    <View style={styles.mapBtn} />
                </TouchableWithoutFeedback>

                <View style={styles.bottons}>
                    <View style={styles.btn}>
                        <BigWhiteBtn
                            title={leftBtnTile}
                            onpress={heandleLeftBtnClick}
                        />
                    </View>

                    <View style={styles.btn}>
                        <BigRedBtn
                            title={rightBtnTile}
                            onpress={heandleRightBtnClick}
                        />
                    </View>
                </View>

                <StackHeader
                    onpress={heandleGoBackClick}
                    inner={headerTitle}
                    pause={pause}
                />
            </View>
        </>
    );
};

export default Counter;

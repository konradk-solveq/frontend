import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableWithoutFeedback,
    Animated,
    Easing,
    Platform
} from 'react-native';
import { WebView } from 'react-native-webview';
import Svg, { G, Path, Circle } from 'react-native-svg';

import I18n from 'react-native-i18n';

import {
    setObjSize,
    getWidthPxOf,
    getHorizontalPx,
    getVerticalPx,
} from '../../../../helpers/layoutFoo';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { getBike } from '../../../../helpers/transformUserBikeData';
import BikeSelectorList from './bikeSelectorList/bikeSelectorList';

import BigRedBtn from '../../../../sharedComponents/buttons/bigRedBtn';
import BigWhiteBtn from '../../../../sharedComponents/buttons/bigWhiteBtn';
import StackHeader from './stackHeader/stackHeader';

import counterHtml from './counterHtml';
import mapHtml from './mapHtml';



interface Props {
    navigation: any;
}

const Counter: React.FC<Props> = ({ navigation }: Props) => {
    const trans = I18n.t('MainCounter');
    const dispatch = useAppDispatch();
    const bikes = useAppSelector<UserBike[]>(state => state.bikes.list);
    const [bike, setBike] = useState<UserBike | null>(bikes?.[0] || null);

    // lista rowerów
    useEffect(() => {
        setBike(bikes?.[0] || null);
    }, [bikes]);

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
    const setListUp = () => {
        Animated.timing(bikeSelectorListPositionY, {
            toValue: headHeight + getVerticalPx(69),
            duration: 500,
            easing: Easing.quad,
            useNativeDriver: false,
        }).start();
    }

    const setListDown = () => {
        Animated.timing(bikeSelectorListPositionY, {
            toValue: headHeight + getVerticalPx(-30),
            duration: 500,
            easing: Easing.quad,
            useNativeDriver: false,
        }).start();
    }

    // wysokośc headera
    const [headHeight, setHeadHeight] = useState(0);

    // do animacji położeni listy rowerów
    useEffect(() => {
        bikeSelectorListPositionY.setValue(headHeight + getVerticalPx(69));
    }, [headHeight])

    const bikeSelectorListPositionY = useRef(
        new Animated.Value(headHeight + getVerticalPx(69)),
    ).current;

    // inicjalizacja elementów webviwe
    const animSvgRef = useRef();
    useEffect(() => {
        animSvgRef.current.injectJavaScript(
            'init(' +
            getHorizontalPx(414) +
            ', ' +
            getVerticalPx(896) + ', { lat: 53.009342618210624, lng: 20.890509251985964 }' +
            ');true'
        );
    }, [])

    const setJs = (foo: string) => animSvgRef.current.injectJavaScript(foo);

    const [pageState, setPageState] = useState('start');

    const [leftBtnTile, setLeftBtnTile] = useState('');
    const [rightBtnTile, setRightBtnTile] = useState('');
    const [headerTitle, setHeaderTitle] = useState('');
    const [pause, setPause] = useState(true);

    const heandleLeftBtnClick = () => {
        switch (pageState) {
            case 'start': {
                navigation.goBack();
            } break;
            case 'record': {
                setPageState('pause');
                setJs('setPauseOn();true;');
            } break;
            case 'pause': {
                setPageState('record');
                setJs('hideAlert();setPauseOff();true;');
            } break;
            case 'cancelText': {
                setPageState('record');
                setJs('hideAlert();true;');
            } break;
            case 'endMessage': {
                setPageState('record');
                setJs('hideAlert();true;');
            } break;
        }
    };

    const heandleRightBtnClick = () => {
        switch (pageState) {
            case 'start': {
                setPageState('record');
                setJs('start();setPauseOff();true;');
            } break;
            case 'record': {
                setPageState('endMessage');
            } break;
            case 'cancelText': {
                navigation.goBack();
            } break;
            case 'endMessage': {
                // TODO
                // do ekranu zakończenia
            } break;
        }
    };

    const heandleGoBackClick = () => {
        switch (pageState) {
            case 'start': {
                navigation.goBack();
            } break;
            default: {
                setPageState('cancelText');
            } break;
        }
    };

    useEffect(() => {
        switch (pageState) {
            case 'start':
                {
                    setLeftBtnTile(trans.btnCancel);
                    setRightBtnTile(trans.btnStart);
                    setHeaderTitle(trans.headerStart)
                    setPause(true);
                    // setListDown();
                }
                break;
            case 'record':
                {
                    setLeftBtnTile(trans.btnPauza);
                    setRightBtnTile(trans.btnEnd);
                    setHeaderTitle(trans.headerRecord)
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
            case 'cancelText': {
                setLeftBtnTile(trans.btnCancel);
                setRightBtnTile(trans.btnBreak);
                setJs('showAlert(1, "' + trans.cancelText + '");true;');
            } break;
            case 'endMessage': {
                setLeftBtnTile(trans.btnCancel);
                setRightBtnTile(trans.btnEnd);
                setJs('showAlert(2, "' + trans.endText + '");true;');

            } break;
        }
        // setJs('setMini();true;');
    }, [pageState])

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
        },
        bikeList: {
            position: 'absolute',
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
        fullView: {
            backgroundColor: 'transparent',
            width: '100%',
            height: '100%',
        },
    });

    return (
        <SafeAreaView style={styles.container}>

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
                            counterHtml +
                            mapHtml +
                            '</body></html>',
                        baseUrl:
                            Platform.OS === 'ios'
                                ? ''
                                : 'file:///android_asset/',
                    }}
                    javaScriptEnabled={true}
                    ref={animSvgRef}
                />
            </View>

            {bikeSelectorListPositionY && <Animated.View
                style={[
                    styles.bikeList,
                    {
                        top: bikeSelectorListPositionY
                    }]}>
                <BikeSelectorList
                    list={bikes}
                    callback={onChangeBikeHandler}
                    currentBike={bike?.description?.serial_number}
                    buttonText={'add'}
                />
            </Animated.View>}


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
                getHeight={setHeadHeight}
                inner={headerTitle}
                pause={pause}
            />
        </SafeAreaView>
    );
};

export default Counter;

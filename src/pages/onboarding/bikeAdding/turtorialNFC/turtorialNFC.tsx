import React, {useCallback, useEffect, useState, useRef} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    ScrollView,
    Alert,
    Platform,
} from 'react-native';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import AnimSvg from '@helpers/animSvg';
import {initNfc, nfcIsEnabled, readNdef, cleanUp} from '@helpers/nfc';

import StackHeader from '@sharedComponents/navi/stackHeader/stackHeader';
import BigRedBtn from '@sharedComponents/buttons/bigRedBtn';
import BigWhiteBtn from '@sharedComponents/buttons/bigWhiteBtn';

import {
    bikesListSelector,
    loadingBikesSelector,
    userNameSelector,
} from '@storage/selectors';
import {
    getFontSize,
    getHorizontalPx,
    getVerticalPx,
    mainButtonsHeight,
} from '@helpers/layoutFoo';
import {useAppSelector, useAppDispatch} from '@hooks/redux';
import {setBikesListByFrameNumber} from '@storage/actions';
import Loader from '../loader/loader';
import ScanModal from './scanModal.android';
import nfcBikeSvg from './nfcBikeBackgoundSvg';
import {BothStackRoute} from '@navigation/route';
import {commonStyle as comStyle} from '@helpers/commonStyle';
import {getAppLayoutConfig as get} from '@theme/appLayoutConfig';
import {
    setOnboardingFinished,
    setDeepLinkActionForScreen,
} from '@storage/actions';
import {onboardingFinishedSelector} from '@storage/selectors';

const isAndroid = Platform.OS === 'android';

interface Props {
    navigation: any;
    name: string;
    getName: Function;
}

const TurtorialNFC: React.FC<Props> = (props: Props) => {
    const refTimer = useRef<any>();
    const {t} = useMergedTranslation('TutorialNFC');
    const dispatch = useAppDispatch();
    const nfcIsOnRef = useRef(false);

    const isLoading = useAppSelector(loadingBikesSelector);
    const bikesList = useAppSelector(bikesListSelector);
    const name = useAppSelector(userNameSelector);
    const userName = name ? ' ' + name : ' ' + t('defaultName');

    const [showScanModal, setShowScanModal] = useState<boolean>(false);
    const [startScanNFC, setStartScanNFC] = useState<boolean>(false);

    useEffect(() => {
        if (!nfcIsOnRef.current) {
            nfcIsEnabled().then(r => {
                if (r) {
                    initNfc().then(res => {
                        nfcIsOnRef.current = res;
                    });
                }
            });
        }
        return () => {
            cleanUp();
            nfcIsOnRef.current = false;
        };
    }, []);

    const goForwardHandler = useCallback(
        async (frame: string) => {
            const trimmedInputFrame = frame?.trim();
            try {
                await dispatch(setBikesListByFrameNumber(trimmedInputFrame));
                setStartScanNFC(false);
                props.navigation.navigate({
                    name: BothStackRoute.BIKE_SUMMARY_SCREEN,
                    params: {frameNumber: trimmedInputFrame},
                });
                return;
            } catch (error) {
                if (error.notFound) {
                    props.navigation.navigate({
                        name: BothStackRoute.BIKE_DATA_SCREEN,
                        params: {frameNumber: trimmedInputFrame},
                    });
                    return;
                }
                const errorMessage = error?.errorMessage || 'Error';
                Alert.alert('Error', errorMessage);
            }
        },
        [dispatch, props.navigation],
    );

    const readNFCTag = useCallback(async () => {
        readNdef()
            .then(res => {
                res.forEach(e => {
                    if (e[0] === 'text') {
                        setShowScanModal(false);
                        goForwardHandler(e[1]);
                    }
                });
            })
            .catch(e => {
                if (e === 'CANCELED') {
                    refTimer.current = setTimeout(
                        () => {
                            setStartScanNFC(false);
                            nfcIsOnRef.current = false;
                        },
                        isAndroid ? 0 : 1500,
                    );
                }
            });
    }, [goForwardHandler]);

    const cancelScanByNfcHandler = useCallback(() => {
        setShowScanModal(false);
        if (startScanNFC) {
            setStartScanNFC(false);
            nfcIsOnRef.current = false;
        }
    }, [startScanNFC]);

    useEffect(() => {
        if (nfcIsOnRef.current) {
            if (startScanNFC) {
                readNFCTag();
            }
            return;
        }
        if (startScanNFC) {
            nfcIsEnabled().then(r => {
                if (r) {
                    readNFCTag();
                } else {
                    Alert.alert('', t('alertMessage'), [
                        {text: 'Ok', onPress: () => cancelScanByNfcHandler()},
                    ]);
                }
            });
        }

        return () => clearTimeout(refTimer.current);
    }, [readNFCTag, t, startScanNFC, cancelScanByNfcHandler]);

    const heandleScanByNfc = async () => {
        if (!isAndroid) {
            onScanNfcHandler();
            return;
        }
        setShowScanModal(true);
    };

    const onScanNfcHandler = () => {
        setStartScanNFC(true);
    };

    const onboardingFinished = useAppSelector<boolean>(
        onboardingFinishedSelector,
    );
    const onGoForwrdHandle = () => {
        if (!onboardingFinished) {
            dispatch(setOnboardingFinished(true));
            dispatch(setDeepLinkActionForScreen('HomeTab'));
        }
        props.navigation.reset({
            index: 0,
            routes: [{name: BothStackRoute.TAB_MENU_SCREEN}],
        });
    };

    const styles = StyleSheet.create({
        title: {
            width: getHorizontalPx(334),
            left: getHorizontalPx(40),
            marginTop: getVerticalPx(30),
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: getFontSize(30),
            lineHeight: getFontSize(40),
            color: '#313131',
            textAlign: 'left',
        },
        nfc_bike: {
            width: getHorizontalPx(334),
            height: getHorizontalPx(268),
            left: getHorizontalPx(40),
            marginTop: getVerticalPx(30),
        },
        text: {
            width: getHorizontalPx(334),
            left: getHorizontalPx(40),
            marginTop: getVerticalPx(20),
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: getFontSize(18),
            lineHeight: getFontSize(22),
            color: '#555555',
            textAlign: 'left',
        },
        btnNfc: {
            width: getHorizontalPx(334),
            left: getHorizontalPx(40),
            height: mainButtonsHeight(50),
            marginTop: getVerticalPx(52),
        },
        btnHand: {
            width: getHorizontalPx(334),
            height: mainButtonsHeight(50),
            left: getHorizontalPx(40),
            marginTop: getVerticalPx(30),
            marginBottom: getVerticalPx(65) + get.headerH(),
        },
        skip: {
            marginBottom: getVerticalPx(30),
            height: mainButtonsHeight(50),
        },
    });

    if (isLoading) {
        return <Loader />;
    }

    const title =
        bikesList?.length > 0 ? t('titleNext') : t('title', {name: userName});
    return (
        <SafeAreaView style={comStyle.container}>
            <View style={comStyle.scroll}>
                <ScrollView>
                    <Text style={styles.title}>{title}</Text>

                    <AnimSvg style={styles.nfc_bike} source={nfcBikeSvg} />

                    <Text style={styles.text}>{t('tekst')}</Text>

                    <View style={styles.btnNfc}>
                        <BigRedBtn
                            title={t('btnNfc')}
                            disabled={startScanNFC}
                            onpress={() => heandleScanByNfc()}
                        />
                    </View>

                    <View style={styles.btnHand}>
                        <BigWhiteBtn
                            style={styles.skip}
                            title={t('btnSkip')}
                            onpress={() => onGoForwrdHandle()}
                        />

                        <BigWhiteBtn
                            title={t('btnHand')}
                            onpress={() =>
                                props.navigation.navigate({
                                    name:
                                        BothStackRoute.ADDING_BY_NUMBER_SCREEN,
                                    params: {emptyFrame: true},
                                })
                            }
                        />
                    </View>
                </ScrollView>
            </View>

            <StackHeader
                onpress={() => props.navigation.goBack()}
                inner={t('header')}
                style={{backgroundColor: '#fff'}}
            />

            {isAndroid && (
                <ScanModal
                    showModal={showScanModal}
                    startScan={onScanNfcHandler}
                    onPressCancel={cancelScanByNfcHandler}
                />
            )}
        </SafeAreaView>
    );
};

export default TurtorialNFC;

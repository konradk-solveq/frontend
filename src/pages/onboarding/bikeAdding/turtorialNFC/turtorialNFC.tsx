import React, {useCallback, useEffect, useState} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    ScrollView,
    Alert,
    Platform,
} from 'react-native';
import I18n from 'react-native-i18n';
import AnimSvg from '../../../../helpers/animSvg';
import {
    initNfc,
    nfcIsEnabled,
    readNdef,
    cleanUp,
} from '../../../../helpers/nfc';

import StackHeader from '../../../../sharedComponents/navi/stackHeader/stackHeader';
import BigRedBtn from '../../../../sharedComponents/buttons/bigRedBtn';
import BigWhiteBtn from '../../../../sharedComponents/buttons/bigWhiteBtn';

import {getHorizontalPx, getVerticalPx} from '../../../../helpers/layoutFoo';
import {useAppSelector, useAppDispatch} from '../../../../hooks/redux';
import {setBikesListByFrameNumber} from '../../../../storage/actions';
import Loader from '../loader/loader';
import ScanModal from './scanModal.android';

const isAndroid = Platform.OS === 'android';

import nfcBikeSvg from './nfcBikeBackgoundSvg';
import {Bike} from '../../../../models/bike.model';
interface Props {
    navigation: any;
    name: string;
    getName: Function;
}

const TurtorialNFC: React.FC<Props> = (props: Props) => {
    const trans: any = I18n.t('TurtorialNFC');
    const dispatch = useAppDispatch();

    const isLoading = useAppSelector<boolean>(state => state.bikes.loading);
    const bikesList = useAppSelector<Bike[]>(state => state.bikes.list);
    const name = useAppSelector<string>(state => state.user.userName);
    const userName = name ? ' ' + name : ' ' + trans.defaultName;

    const [showScanModal, setShowScanModal] = useState<boolean>(false);
    const [startScanNFC, setStartScanNFC] = useState<boolean>(false);

    const [inputFrame, setInputFrame] = useState('');
    const [nfcIsOn, setNfcIsoOn] = useState(false);

    useEffect(() => {
        if (startScanNFC) {
            nfcIsEnabled().then(r => {
                if (r) {
                    initNfc().then(() => {
                        setNfcIsoOn(true);
                    });
                } else {
                    Alert.alert('', trans.alertMessage);
                }
            });
        }
        return () => cleanUp();
    }, [startScanNFC, trans.alertMessage]);

    const goForwardHandler = useCallback(
        async (frame: string) => {
            const trimmedInputFrame = frame?.trim();
            try {
                await dispatch(setBikesListByFrameNumber(trimmedInputFrame));
                props.navigation.navigate({
                    name: 'BikeSummary',
                    params: {frameNumber: trimmedInputFrame},
                });
                return;
            } catch (error) {
                if (error.notFound) {
                    props.navigation.navigate({
                        name: 'BikeData',
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

    useEffect(() => {
        if (nfcIsOn) {
            readNdef().then(res => {
                res.forEach(e => {
                    if (e[0] === 'text') {
                        setShowScanModal(false);
                        setInputFrame(e[1]);
                        goForwardHandler(e[1]);
                    }
                });
            });
        }
    }, [nfcIsOn, inputFrame, goForwardHandler]);

    const [headHeight, setHeadHeightt] = useState(0);

    const heandleScanByNfc = () => {
        if (!isAndroid) {
            onScanNfcHandler();
            return;
        }
        setShowScanModal(true);
    };

    const cancelScanByNfcHandler = () => {
        if (startScanNFC) {
            setStartScanNFC(false);
            setNfcIsoOn(false);
        }
        setShowScanModal(false);
    };

    const onScanNfcHandler = () => {
        setStartScanNFC(true);
    };

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
        },
        scroll: {
            width: '100%',
            height: '100%',
            top: headHeight,
        },
        title: {
            width: getHorizontalPx(334),
            left: getHorizontalPx(40),
            marginTop: getVerticalPx(30),
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: 30,
            lineHeight: 40,
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
            fontSize: 18,
            lineHeight: 22,
            color: '#555555',
            textAlign: 'left',
        },
        btnNfc: {
            width: getHorizontalPx(334),
            left: getHorizontalPx(40),
            height: 50,
            marginTop: getVerticalPx(52),
        },
        btnHand: {
            width: getHorizontalPx(334),
            height: 50,
            left: getHorizontalPx(40),
            // marginTop: getVerticalPx(30),
            marginTop: getVerticalPx(30),
            marginBottom: getVerticalPx(65) + headHeight,
        },
    });

    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <Loader />
            </SafeAreaView>
        );
    }

    const title =
        bikesList?.length > 0
            ? trans.titleNext
            : trans.title_1 + userName + trans.title_2;
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.scroll}>
                <ScrollView>
                    <Text style={styles.title}>{title}</Text>

                    <AnimSvg style={styles.nfc_bike} source={nfcBikeSvg} />

                    <Text style={styles.text}>{trans.tekst}</Text>

                    <View style={styles.btnNfc}>
                        <BigRedBtn
                            title={trans.btnNfc}
                            onpress={() => heandleScanByNfc()}
                        />
                    </View>

                    <View style={styles.btnHand}>
                        <BigWhiteBtn
                            title={trans.btnHand}
                            onpress={() =>
                                props.navigation.navigate('AddingByNumber')
                            }
                        />
                    </View>
                </ScrollView>
            </View>

            <StackHeader
                onpress={() => props.navigation.goBack()}
                inner={trans.header}
                getHeight={setHeadHeightt}
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

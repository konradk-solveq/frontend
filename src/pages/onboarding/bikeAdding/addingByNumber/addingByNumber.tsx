import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    Alert,
    ScrollView,
    Keyboard,
} from 'react-native';
import I18n from 'react-native-i18n';

import {useAppSelector, useAppDispatch} from '@hooks/redux';
import {setBikesListByFrameNumber} from '@storage/actions';
import {validateData} from '@utils/validation/validation';
import {userBikeValidationRules} from '@models/bike.model';
import {loadingBikesSelector, frameNumberSelector} from '@storage/selectors';

import StackHeader from '@sharedComponents/navi/stackHeader/stackHeader';
import OneLineTekst from '@sharedComponents/inputs/oneLineTekst';
import TranspLightBtn from '@sharedComponents/buttons/transpLightBtn';
import BigRedBtn from '@sharedComponents/buttons/bigRedBtn';

import {
    setObjSize,
    getWidthPx,
    getVertical,
    getVerticalPx,
    getCenterLeftPx,
    getPosWithMinHeight,
    getHorizontalPx,
    getFontSize,
    mainButtonsHeight,
} from '@helpers/layoutFoo';
import Loader from '../loader/loader';
import {BothStackRoute} from '@navigation/route';
import {getAppLayoutConfig as get} from '@theme/appLayoutConfig';
import {commonStyle as comStyle} from '@helpers/commonStyle';

interface Props {
    navigation: any;
    route: any;
}

const AddingByNumber: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();
    const frame: string = useAppSelector(frameNumberSelector);
    const isLoading: boolean = useAppSelector(loadingBikesSelector);

    const trans: any = I18n.t('AddingByNumber');

    const [inputFrame, setInputFrame] = useState('');
    const [canGoFoward, setCanGoFoward] = useState(false);
    const [forceMessageWrong, setForceMessageWrong] = useState('');

    // do wyliczania wysokości ekranu z klawiaturą i bez
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const keyboardDidShow = (e: any) =>
        setKeyboardHeight(e.endCoordinates.height);
    const keyboardDidHide = (e: any) =>
        setKeyboardHeight(e.endCoordinates.height);

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', keyboardDidHide);

        return () => {
            Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
            Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
        };
    }, []);

    // do pobrania nazwy użytkownika zz local sorage
    useEffect(() => {
        if (props.route?.params?.emptyFrame) {
            setInputFrame(frame);
        }
    }, [frame, props.route?.params?.emptyFrame]);

    // do wstawiania wartości do inputa i reset powiadomień o błdnym wypełnieniu
    const handleInputFrame = (value: string) => {
        setInputFrame(value);
        setForceMessageWrong('');
    };

    // valizadja poprawności inputa
    const handleValidationOk = (value: string) => {
        return validateData(userBikeValidationRules.serial_number, value);
    };

    // validacja błędów, tu: czy wszystkie znaki są cyframi
    const handleValidationWrong = () => {
        // const reg = new RegExp('^[0-9]+$');
        // if (value.length > 0 && !reg.test(value)) return true;
        return false;
    };

    // walidacja po naciśnięciu przyciku 'Dalej'
    const handleGoFoward = async () => {
        if (canGoFoward) {
            const trimmedInputFrame = inputFrame?.trim();
            try {
                await dispatch(setBikesListByFrameNumber(trimmedInputFrame));
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
        } else {
            setForceMessageWrong('Pole wymagane');
        }
    };

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        area: {
            width: '100%',
            height: getVerticalPx(896) - keyboardHeight,
            minHeight: getVerticalPx(450) + get.headerH(),
        },
        inputAndPlaceholder: getPosWithMinHeight(334, 90, 351 - 100, 100),
        title: {
            position: 'absolute',
            width: getWidthPx(),
            left: getCenterLeftPx(),
            top: getVertical(138 - 100),
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: getFontSize(30),
            lineHeight: getFontSize(38),
            color: '#555555',
            textAlign: 'left',
        },
        infoBtn: {
            position: 'relative',
            height: getHorizontalPx(29),
            marginTop: 3,
            width: getWidthPx(),
        },
        botton: {
            position: 'absolute',
            width: getWidthPx(),
            height: mainButtonsHeight(50),
            left: getCenterLeftPx(),
            bottom: getVerticalPx(65 + 100),
        },
    });

    if (isLoading) {
        return <Loader />;
    }

    return (
        <SafeAreaView style={comStyle.container}>
            <ScrollView
                keyboardShouldPersistTaps={'always'}
                style={comStyle.scroll}>
                <View style={styles.area}>
                    <Text style={styles.title}>{trans.text}</Text>

                    <View style={styles.inputAndPlaceholder}>
                        <OneLineTekst
                            placeholder={trans.placeholder}
                            onChangeText={handleInputFrame}
                            validationOk={handleValidationOk}
                            validationWrong={handleValidationWrong}
                            messageWrong={trans.messageWrong}
                            value={inputFrame}
                            validationStatus={setCanGoFoward}
                            forceMessageWrong={forceMessageWrong}
                        />

                        <TranspLightBtn
                            style={styles.infoBtn}
                            title={trans.infoBtn}
                            algin="right"
                            color="#3587ea"
                            onpress={() =>
                                props.navigation.navigate(
                                    BothStackRoute.ADDING_INFO_SCREEN,
                                )
                            }
                        />
                    </View>

                    <BigRedBtn
                        style={styles.botton}
                        title={trans.btn}
                        onpress={() => handleGoFoward()}
                    />
                </View>
            </ScrollView>

            <StackHeader
                onpress={() => props.navigation.goBack()}
                inner={trans.head}
            />
        </SafeAreaView>
    );
};

export default AddingByNumber;

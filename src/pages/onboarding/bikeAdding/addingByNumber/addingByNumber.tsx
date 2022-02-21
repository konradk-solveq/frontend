import React, {useEffect, useMemo, useState} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    Alert,
    ScrollView,
    Keyboard,
} from 'react-native';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

import {useAppSelector, useAppDispatch} from '@hooks/redux';
import {setBikesListByFrameNumber} from '@storage/actions';
import {validateData} from '@utils/validation/validation';
import {userBikeValidationRules} from '@models/bike.model';
import {
    loadingBikesSelector,
    frameNumberSelector,
    onboardingFinishedSelector,
} from '@storage/selectors';

import StackHeader from '@sharedComponents/navi/stackHeader/stackHeader';
import OneLineTekst from '@sharedComponents/inputs/oneLineTekst';
import TranspLightBtn from '@sharedComponents/buttons/transpLightBtn';
import BigRedBtn from '@sharedComponents/buttons/bigRedBtn';
import BigWhiteBtn from '@sharedComponents/buttons/bigWhiteBtn';

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
import {RegularStackRoute, OnboardingStackRoute} from '@navigation/route';
import {commonStyle as comStyle} from '@helpers/commonStyle';
import {
    setOnboardingFinished,
    setDeepLinkActionForScreen,
} from '@storage/actions';
interface Props {
    navigation: any;
    route: any;
}

const AddingByNumber: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();
    const frame: string = useAppSelector(frameNumberSelector);
    const isLoading: boolean = useAppSelector(loadingBikesSelector);
    const isOnboardingFinished = useAppSelector(onboardingFinishedSelector);
    const bikeSummaryRouteName = useMemo(
        () =>
            !isOnboardingFinished
                ? OnboardingStackRoute.BIKE_SUMMARY_ONBOARDING_SCREEN
                : RegularStackRoute.BIKE_SUMMARY_SCREEN,
        [isOnboardingFinished],
    );
    const bikeDataRouteName = useMemo(
        () =>
            !isOnboardingFinished
                ? OnboardingStackRoute.BIKE_DATA_ONBOARDING_SCREEN
                : RegularStackRoute.BIKE_DATA_SCREEN,
        [isOnboardingFinished],
    );
    const bikeInfoRouteName = useMemo(
        () =>
            !isOnboardingFinished
                ? OnboardingStackRoute.ADDING_INFO_ONBOARDING_SCREEN
                : RegularStackRoute.ADDING_INFO_SCREEN,
        [isOnboardingFinished],
    );

    const {t} = useMergedTranslation('AddingByNumber');

    const [inputFrame, setInputFrame] = useState('');
    const [canGoFoward, setCanGoFoward] = useState(false);
    const [forceMessageWrong, setForceMessageWrong] = useState('');

    // do wyliczania wysokości ekranu z klawiaturą i bez
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const keyboardDidShow = (e: any) =>
        setKeyboardHeight(e.endCoordinates.height);
    const keyboardDidHide = () => setKeyboardHeight(0);

    useEffect(() => {
        const didShow = Keyboard.addListener(
            'keyboardDidShow',
            keyboardDidShow,
        );
        const didHide = Keyboard.addListener(
            'keyboardDidHide',
            keyboardDidHide,
        );

        return () => {
            didShow.remove();
            didHide.remove();
        };
    }, []);

    // do pobrania nazwy użytkownika zz local sorage
    useEffect(() => {
        if (frame && !props.route?.params?.emptyFrame) {
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
                    name: bikeSummaryRouteName,
                    params: {frameNumber: trimmedInputFrame},
                });
                return;
            } catch (error) {
                if (error.notFound) {
                    props.navigation.navigate({
                        name: bikeDataRouteName,
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

    const onboardingFinished = useAppSelector<boolean>(
        onboardingFinishedSelector,
    );
    const onGoForwrdHandle = () => {
        if (!onboardingFinished) {
            dispatch(setOnboardingFinished(true));
            dispatch(setDeepLinkActionForScreen('HomeTab'));
        }
    };

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        area: {
            width: '100%',
            height: getVerticalPx(896) - keyboardHeight - getVerticalPx(100),
            minHeight: getVerticalPx(400) - getHorizontalPx(100),
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

        btnHand: {
            position: 'absolute',
            width: getHorizontalPx(334),
            height:
                mainButtonsHeight(50 + 50) +
                getVerticalPx(keyboardHeight === 0 ? 30 : 10),
            left: getHorizontalPx(40),
            marginTop: getVerticalPx(30),
            marginBottom: getVerticalPx(65),
            bottom: 0,
        },
        botton: {
            width: getHorizontalPx(334),
            height: mainButtonsHeight(50),
            marginBottom: getVerticalPx(keyboardHeight === 0 ? 30 : 10),
        },
        skip: {
            height: mainButtonsHeight(50),
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
                    <Text style={styles.title}>{t('text')}</Text>

                    <View style={styles.inputAndPlaceholder}>
                        <OneLineTekst
                            placeholder={t('placeholder')}
                            onChangeText={handleInputFrame}
                            validationOk={handleValidationOk}
                            validationWrong={handleValidationWrong}
                            messageWrong={t('messageWrong')}
                            value={inputFrame}
                            validationStatus={setCanGoFoward}
                            forceMessageWrong={forceMessageWrong}
                            testId="frame-number-input"
                        />

                        <TranspLightBtn
                            style={styles.infoBtn}
                            title={t('infoBtn')}
                            algin="right"
                            color="#3587ea"
                            onpress={() =>
                                props.navigation.navigate(bikeInfoRouteName)
                            }
                        />
                    </View>

                    <View style={styles.btnHand}>
                        <BigRedBtn
                            style={styles.botton}
                            title={t('btn')}
                            onpress={() => handleGoFoward()}
                            testID="adding-by-number-next-btn"
                        />

                        <BigWhiteBtn
                            style={styles.skip}
                            title={t('btnSkip')}
                            onpress={() => onGoForwrdHandle()}
                        />
                    </View>
                </View>
            </ScrollView>

            <StackHeader
                onpress={() => props.navigation.goBack()}
                inner={t('head')}
            />
        </SafeAreaView>
    );
};

export default AddingByNumber;

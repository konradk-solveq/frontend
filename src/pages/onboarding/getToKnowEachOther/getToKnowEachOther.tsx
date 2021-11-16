
import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    ScrollView,
    Keyboard,
} from 'react-native';
import I18n from 'react-native-i18n';
import {setUserName} from '../../../storage/actions/index';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';

import {
    setObjSize,
    getWidthPx,
    getWidthPxOf,
    getHorizontalPx,
    getVerticalPx,
    getVertical,
    getCenterLeftPx,
    getPosWithMinHeight,
    getFontSize,
    mainButtonsHeight,
} from '../../../helpers/layoutFoo';
import {validateData} from '../../../utils/validation/validation';
import {userUserValidationRules} from '../../../models/user.model';
import {nfcIsSupported} from '../../../helpers/nfc';

import KroosLogo from '../../../sharedComponents/svg/krossLogo';
import BigWhiteBtn from '../../../sharedComponents/buttons/bigWhiteBtn';
import BigRedBtn from '../../../sharedComponents/buttons/bigRedBtn';
import StackHeader from '../../../sharedComponents/navi/stackHeader/stackHeader';
import {BothStackRoute, OnboardingStackRoute} from '../../../navigation/route';
import {OneLineText} from '@sharedComponents/inputs';

const getErrorMessage = (value: string, rules: any[]) => {
    const trans: any = I18n.t('GetToKnowEachOther');

    const minLength = rules.find(r => r?.min)?.min;
    const maxLength = rules.find(r => r?.max)?.max;
    const errMessateShort =
        value && minLength > value?.length && trans.toShortValue;
    const errMessateLong = maxLength < value?.length && trans.toLongValue;
    const errorMessageEmpty = trans.emptyValue;

    return errMessateShort || errMessateLong || errorMessageEmpty;
};

interface Props {
    navigation: any;
}

const GetToKnowEachOther: React.FC<Props> = ({navigation}: Props) => {
    const dispatch = useAppDispatch();
    const trans: any = I18n.t('GetToKnowEachOther');

    const name: string = useAppSelector(state => state.user.userName);

    const [inputName, setInputName] = useState('');
    const [isInputValid, setIsInputValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [nfc, setNfc] = useState();

    nfcIsSupported().then(r => {
        setNfc(r);
    });

    useEffect(() => {
        if (typeof name === 'string') {
            setInputName(name);
        }
    }, [name]);

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

    const onValidateInput = (value: string) => {
        setInputName(value);
        const rules: any[] = userUserValidationRules.userName;
        const valid = validateData(rules, value);

        const errMessage = getErrorMessage(value, rules);

        setErrorMessage(valid ? '' : errMessage);
        setIsInputValid(valid);
    };

    const goFoward = () => {
        if (nfc) {
            navigation.navigate(BothStackRoute.TURTORIAL_NFC_SCREEN);
        } else {
            navigation.navigate(BothStackRoute.ADDING_BY_NUMBER_SCREEN);
        }
    };

    const hadleOnpress = (inputName: string) => {
        dispatch(setUserName(inputName));
        goFoward();
    };

    const hadleOnpressWithName = (value: string) => {
        if (!isInputValid) {
            onValidateInput(value);
            return;
        }

        dispatch(setUserName(value));
        goFoward();
    };

    const [headHeight, setHeadHeight] = useState(0);

    setObjSize(334, 50);
    const bottons = {
        position: 'absolute',
        width: getWidthPx(),
        height: mainButtonsHeight(50),
        left: getCenterLeftPx(),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: getVerticalPx(65 + 100), // 100 - przesunięcie dla scroll o headera
    };

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
        },
        scroll: {
            top: headHeight,
        },
        area: {
            width: '100%',
            height: getVerticalPx(896) - keyboardHeight,
            minHeight: getVertical(414),
        },
        title: {
            width: getWidthPx(),
            left: getCenterLeftPx(),
            top: getVertical(138 - 100),
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: getFontSize(30),
            lineHeight: getFontSize(38),
            color: '#313131',
        },
        logo: {
            position: 'absolute',
            left: getHorizontalPx(152),
            top: getVerticalPx(66),
            width: getHorizontalPx(110),
            height: getHorizontalPx(20),
        },
        inputAndPlaceholder: getPosWithMinHeight(334, 90, 380 - 150, 50),
        input: {
            height: getHorizontalPx(50),
            marginTop: getHorizontalPx(6),
        },
        bottons,
        btn: {
            height: mainButtonsHeight(50),
            width: getWidthPxOf(157),
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                keyboardShouldPersistTaps={'always'}
                style={styles.scroll}>
                <View style={styles.area}>
                    <Text style={styles.title}>{trans.title}</Text>

                    <View style={[styles.inputAndPlaceholder, styles.input]}>
                        <OneLineText
                            placeholder={trans.placeholder}
                            value={inputName}
                            validationOk={isInputValid}
                            validationWrong={!!errorMessage}
                            messageWrong={errorMessage}
                            onChangeText={onValidateInput}
                            maxLength={30}
                        />
                    </View>

                    <View style={styles.bottons}>
                        <View style={styles.btn}>
                            <BigWhiteBtn
                                title={trans.skip}
                                onpress={() => hadleOnpress('')}
                            />
                        </View>

                        <View style={styles.btn}>
                            <BigRedBtn
                                title={trans.goFoward}
                                onpress={() => hadleOnpressWithName(inputName)}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>

            <StackHeader
                onpress={() =>
                    navigation.navigate(OnboardingStackRoute.PERMITS_SCREEN)
                }
                getHeight={setHeadHeight}
                inner={''}
            />

            <View style={styles.logo}>
                <KroosLogo />
            </View>
        </SafeAreaView>
    );
};

export default GetToKnowEachOther;

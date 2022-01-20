import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    ScrollView,
    Keyboard,
} from 'react-native';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {setUserName} from '@storage/actions/index';
import {useAppDispatch, useAppSelector} from '@hooks/redux';

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
} from '@helpers/layoutFoo';
import {validateData} from '@utils/validation/validation';
import {userUserValidationRules} from '@models/user.model';
import {nfcIsSupported} from '@helpers/nfc';

import KrossLogo from '@sharedComponents/svg/krossLogo';
import BigWhiteBtn from '@sharedComponents/buttons/bigWhiteBtn';
import BigRedBtn from '@sharedComponents/buttons/bigRedBtn';
import StackHeader from '@sharedComponents/navi/stackHeader/stackHeader';
import {BothStackRoute, OnboardingStackRoute} from '@navigation/route';
import {OneLineText} from '@sharedComponents/inputs';
import {commonStyle as comStyle} from '@helpers/commonStyle';

const getErrorMessage = (value: string, rules: any[]) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {t} = useMergedTranslation('GetToKnowEachOther');

    const minLength = rules.find(r => r?.min)?.min;
    const maxLength = rules.find(r => r?.max)?.max;
    const errMessageShort =
        value && minLength > value?.length && t('toShortValue');
    const errMessageLong = maxLength < value?.length && t('toLongValue');
    const errorMessageEmpty = t('emptyValue');

    return errMessageShort || errMessageLong || errorMessageEmpty;
};

interface Props {
    navigation: any;
}

const GetToKnowEachOther: React.FC<Props> = ({navigation}: Props) => {
    const dispatch = useAppDispatch();
    const {t} = useMergedTranslation('GetToKnowEachOther');

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
        <SafeAreaView style={comStyle.container}>
            <ScrollView
                keyboardShouldPersistTaps={'always'}
                style={comStyle.scroll}>
                <View style={styles.area}>
                    <Text style={styles.title}>{t('title')}</Text>

                    <View style={[styles.inputAndPlaceholder, styles.input]}>
                        <OneLineText
                            placeholder={t('placeholder')}
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
                                title={t('skip')}
                                onpress={() => hadleOnpress('')}
                            />
                        </View>

                        <View style={styles.btn}>
                            <BigRedBtn
                                title={t('goFoward')}
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
                inner={''}
            />

            <View style={styles.logo}>
                <KrossLogo />
            </View>
        </SafeAreaView>
    );
};

export default GetToKnowEachOther;

import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {setUserName} from '@storage/actions';
import {useAppDispatch, useAppSelector} from '@hooks/redux';

import {
    setObjSize,
    getWidthPx,
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
import {getAppLayoutConfig} from '@theme/appLayoutConfig';

import OneLineTekst from '@sharedComponents/inputs/oneLineTekst';
import BigRedBtn from '@sharedComponents/buttons/bigRedBtn';
import GenericScreen from '@src/pages/template/GenericScreen';

const isIOS = Platform.OS === 'ios';

interface Props {
    navigation: any;
}

const NameChange: React.FC<Props> = ({navigation}: Props) => {
    const dispatch = useAppDispatch();
    const {t} = useMergedTranslation('NameChange');

    const name: string = useAppSelector(state => state.user.userName);

    const [inputName, setInputName] = useState('');
    const [validationStatus, setValidationStatus] = useState(false);
    const [forceMessageWrong, setForceMessageWrong] = useState('');
    const iosOffset = isIOS ? -(getAppLayoutConfig.statusBarH() || 40) : 0;

    useEffect(() => {
        setInputName(name);
    }, [name]);

    const handleSetInputName = (value: string) => {
        setForceMessageWrong('');
        setInputName(value);
    };

    const handleValidationOk = (value: string) => {
        return validateData(userUserValidationRules.userName, value);
    };

    const hadleOnpressWithName = (inputValue: string) => {
        if (inputValue.length === 0) {
            dispatch(setUserName(inputValue));
            navigation.goBack();
            return;
        }

        if (!validateData(userUserValidationRules.userName, inputName)) {
            setForceMessageWrong(t('invalidNameLengthError'));
            setValidationStatus(false);
        }

        if (!validationStatus) {
            return;
        }
        dispatch(setUserName(inputName));
        navigation.goBack();
    };

    setObjSize(334, 50);

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
        },
        scroll: {
            top: getVerticalPx(100),
        },
        outerArea: {
            flex: 1,
        },
        area: {
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
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
        inputAndPlaceholder: getPosWithMinHeight(334, 90, 380 - 100, 90),
        input: {
            height: 50,
            marginTop: getHorizontalPx(6),
        },
        btn: {
            position: 'absolute',
            width: getWidthPx(),
            height: mainButtonsHeight(50),
            left: getCenterLeftPx(),
            bottom: getVerticalPx(65 + 100), // 100 - przesunięcie dla scroll o headera
        },
        keyboardContainer: {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            paddingVertical: isIOS ? getVertical(80) : 0,
        },
    });

    return (
        <GenericScreen screenTitle={t('header')} transculentStatusBar>
            <KeyboardAvoidingView
                behavior={isIOS ? 'padding' : 'height'}
                keyboardVerticalOffset={iosOffset}
                style={styles.keyboardContainer}>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.outerArea}
                    style={styles.scroll}>
                    <View style={styles.area}>
                        <Text style={styles.title}>
                            {(name || t('defaultName')) + t('title')}
                        </Text>

                        <View
                            style={[styles.inputAndPlaceholder, styles.input]}>
                            <OneLineTekst
                                placeholder={t('placeholder')}
                                onChangeText={handleSetInputName}
                                validationOk={handleValidationOk}
                                value={inputName}
                                maxLength={20}
                                validationStatus={setValidationStatus}
                                messageWrong={t('invalidNameLengthError')}
                                forceMessageWrong={forceMessageWrong}
                            />
                        </View>

                        <BigRedBtn
                            style={styles.btn}
                            title={t('btn')}
                            onpress={() => hadleOnpressWithName(inputName)}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </GenericScreen>
    );
};

export default NameChange;

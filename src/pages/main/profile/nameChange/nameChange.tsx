import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {useAppDispatch, useAppSelector} from '@hooks/redux';

import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';

import GenericScreen from '@src/pages/template/GenericScreen';
import {TextInput} from '@src/components/inputs';
import {Header2} from '@src/components/texts/texts';
import {appContainerHorizontalMargin} from '@src/theme/commonStyle';
import {PrimaryButton} from '@src/components/buttons';
import {firstLetterToUpperCase} from '@src/utils/strings';
import {validateData} from '@src/utils/validation/validation';
import validationRules from '@utils/validation/validationRules';
import {setUserName} from '@src/storage/actions';
import {useAppNavigation} from '@src/navigation/hooks/useAppNavigation';

const NameChange: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigation = useAppNavigation();
    const {t} = useMergedTranslation('NameChange');
    const name: string = useAppSelector(state => state.user.userName);

    const [userName, setUserNameValue] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [inputHint, setInputHint] = useState('');

    const onValidate = () => {
        const rule = [validationRules.string, {[validationRules.min]: 3}];
        const isValid = validateData(rule, userName);
        return {isValid, errorMessage: t('nameInputHint')};
    };

    useEffect(() => {
        setUserNameValue(name);
    }, [name]);

    const handleSetUserName = () => {
        const inputValidation = onValidate();

        if (userName !== '' && !inputValidation.isValid) {
            setInputHint(inputValidation.errorMessage);
            setIsValid(false);
            return;
        }

        dispatch(setUserName(userName));
        navigation.goBack();
    };

    const styles = StyleSheet.create({
        wrap: {
            flex: 1,
            paddingHorizontal: appContainerHorizontalMargin,
            width: '100%',
            alignItems: 'center',
        },
        header: {
            marginTop: getFVerticalPx(40),
            marginBottom: getFVerticalPx(32),
        },
        contentArea: {
            height: '100%',
        },
        nameInput: {
            width: '100%',
        },
        saveButton: {
            marginTop: getFVerticalPx(32),
        },
    });

    return (
        <GenericScreen
            screenTitle={t('header')}
            transculentStatusBar
            contentBelowHeader>
            <View style={styles.wrap}>
                <Header2 style={styles.header}>
                    {name
                        ? `${name}, ${t('title')}`
                        : firstLetterToUpperCase(t('title'))}
                </Header2>

                <View style={styles.nameInput}>
                    <TextInput
                        onChangeValue={setUserNameValue}
                        inputName={t('placeholder')}
                        value={userName}
                        maxLength={20}
                        isValid={isValid}
                        hint={inputHint}
                        testID={'name-change'}
                    />
                </View>

                <PrimaryButton
                    style={styles.saveButton}
                    text={t('btn')}
                    onPress={handleSetUserName}
                    withoutShadow
                    testID={'name-change-submit-button'}
                />
            </View>
        </GenericScreen>
    );
};

export default NameChange;

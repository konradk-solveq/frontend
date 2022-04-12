import {Header2} from '@components/texts/texts';
import {View, ScrollView, StyleSheet} from 'react-native';
import {TextInput} from '@components/inputs';
import {PrimaryButton} from '@components/buttons';
import React from 'react';
import {getFHorizontalPx} from '@helpers/appLayoutDimensions';
import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {useForm, SubmitHandler, SubmitErrorHandler} from 'react-hook-form';
import {FormData} from '@components/types/form';
import {isString} from 'class-validator';
import {OtherBikeDataT} from '@containers/AddBike/type/bike';
import {ControlledInput} from '@components/form';
import {UserT} from '@containers/Onboarding/type/user';

const INPUT_FIELDS: UserT = {
    name: 'name',
};

interface IProps {
    onSubmit: (user: UserT) => void;
    onValidate: (
        fieldName: string,
        value?: string,
    ) => {isValid: boolean; errorMessage: string};
    isLoading?: boolean;
    testID?: string;
}

const UserIntroductionContainer = ({
    onSubmit,
    onValidate,
    isLoading = false,
    testID = 'user-introduction-container-id',
}: IProps) => {
    const {t} = useMergedTranslation('GetToKnowEachOther');
    const {control, handleSubmit, setError, getValues} = useForm<FormData>({
        mode: 'onChange',
    });

    const onValidateHandler = (val: string | any, fieldName: string) => {
        let isValid = true;
        let errorMessage = '';
        if (isString(val)) {
            const validation = onValidate(fieldName, val);
            isValid = validation.isValid;
            errorMessage = validation.errorMessage;
        }

        if (!isValid) {
            setError(fieldName, {
                message: errorMessage,
                shouldFocus: true,
            });
        }

        return isValid;
    };

    const onSubmitHandler: SubmitHandler<UserT> = data => {
        onSubmit(data);
    };

    const onInvalidSubmitHandler: SubmitErrorHandler<OtherBikeDataT> = () => {
        const formValues = getValues();
        Object.keys(formValues)?.forEach(v => {
            onValidateHandler(v, INPUT_FIELDS[v as keyof UserT]);
        });
    };

    return (
        <ScrollView
            keyboardShouldPersistTaps={'always'}
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}>
            <Header2>{t('title')}</Header2>
            <View style={styles.inputContainer}>
                <ControlledInput
                    fieldName={INPUT_FIELDS.name}
                    control={control}
                    Input={({value, onChange, isValid}) => (
                        <TextInput
                            placeholder={t('form.name.placeholder')}
                            value={value}
                            onChangeValue={onChange}
                            isValid={isValid}
                            maxLength={200}
                            testID={`${testID}-name-text-input`}
                        />
                    )}
                    onValidate={onValidateHandler}
                />
            </View>
            <PrimaryButton
                text={t('goForward')}
                onPress={handleSubmit(onSubmitHandler, onInvalidSubmitHandler)}
                disabled={!!isLoading}
                withLoader={!!isLoading}
                withoutShadow
                testID={`${testID}-submit-button`}
            />
        </ScrollView>
    );
};

export default UserIntroductionContainer;

const styles = StyleSheet.create({
    scroll: {width: '100%'},
    scrollContent: {
        alignItems: 'center',
        paddingHorizontal: getFHorizontalPx(16),
    },
    inputContainer: {
        width: '100%',
        marginBottom: getFVerticalPx(32),
    },
});

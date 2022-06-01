import React from 'react';
import {StyleSheet, View, GestureResponderEvent} from 'react-native';
import {isString} from 'class-validator';
import {SubmitErrorHandler, SubmitHandler, useForm} from 'react-hook-form';

import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {LinkButton, PrimaryButton} from '@components/buttons';
import {Header2} from '@components/texts/texts';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';
import {TextInput} from '@components/inputs';
import {ControlledInput} from '@components/form';
import {FormData} from '@components/types/form';

const FIELD_NAME = 'bikeNumber';

type BikeNumberDataT = {
    bikeNumber: string;
};

interface IProps {
    onSubmit: (bikeNumber: string) => void;
    onValidate: (
        fieldName: string,
        value?: string,
    ) => {isValid: boolean; errorMessage: string};
    onPressLink: (e: GestureResponderEvent) => void;
    isLoading?: boolean;
    testID?: string;
}

const AddBikeByNumberContainer: React.FC<IProps> = ({
    onSubmit,
    onValidate,
    onPressLink,
    isLoading = false,
    testID = 'add-bike-by-number-container-id',
}: IProps) => {
    const {t} = useMergedTranslation('AddBikeByNumberScreen.content');
    const {control, handleSubmit, setError, getValues} = useForm<FormData>({});

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

    const onSubmitHandler: SubmitHandler<BikeNumberDataT> = data => {
        onSubmit(data.bikeNumber);
    };

    const onInvalidSubmitHandler: SubmitErrorHandler<BikeNumberDataT> = () => {
        const formValues = getValues()?.[FIELD_NAME];
        onValidateHandler(formValues, FIELD_NAME);
    };

    return (
        <View style={styles.container} testID={testID}>
            <View style={styles.headerContainer}>
                <Header2 style={styles.header}>{t('header')}</Header2>
                <LinkButton
                    text={t('linkButton')}
                    onPress={onPressLink}
                    testID={`${testID}-link-button`}
                />
            </View>

            <View style={styles.inputContainer}>
                <ControlledInput
                    fieldName={FIELD_NAME}
                    control={control}
                    Input={({value, onChange, isValid}) => (
                        <TextInput
                            inputName={t('inputName')}
                            value={value}
                            onChangeValue={onChange}
                            autoCapitalize="characters"
                            isValid={isValid}
                            maxLength={100}
                            testID={`${testID}-text-input`}
                        />
                    )}
                    onValidate={onValidateHandler}
                />
            </View>

            <PrimaryButton
                text={t('submitButton')}
                onPress={handleSubmit(onSubmitHandler, onInvalidSubmitHandler)}
                style={styles.button}
                disabled={isLoading}
                withLoader={isLoading}
                testID={`${testID}-submit-button`}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: getFVerticalPx(45),
    },
    header: {
        marginBottom: getFVerticalPx(16),
    },
    inputContainer: {
        marginBottom: getFVerticalPx(32),
    },
    button: {
        width: getFHorizontalPx(294),
        height: getFVerticalPx(48),
    },
});

export default AddBikeByNumberContainer;

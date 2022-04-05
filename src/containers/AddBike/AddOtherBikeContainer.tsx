import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import {isString} from 'class-validator';
import {SubmitErrorHandler, SubmitHandler, useForm} from 'react-hook-form';

import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

import {MykrossIconFont} from '@theme/enums/iconFonts';
import {BikeType} from '@type/bike';
import {
    getFFontSize,
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';
import colors from '@theme/colors';
import {appContainerHorizontalMargin} from '@theme/commonStyle';

import {Backdrop} from '@components/backdrop';
import {IconButton, PrimaryButton} from '@components/buttons';
import {TextInput} from '@components/inputs';
import {ControlledInput} from '@components/form';
import {FormData} from '@components/types/form';
import {BottomModal} from '@components/modals';
import {HorizontalSpacer} from '@components/divider';
import {OtherBikeDataT} from '@containers/AddBike/type/bike';
import {RadioListItem} from '@containers/AddBike/components';

const INPUT_FIELDS: OtherBikeDataT = {
    bikeName: 'bikeName',
    bikeType: 'bikeType',
    manufacturer: 'manufacturer',
};

const ROW_HEIGHT = 48;
const BOTTOM_PADDING_HEIGHT = 24;

interface IProps {
    onSubmit: (bike: OtherBikeDataT) => void;
    onValidate: (
        fieldName: string,
        value?: string,
    ) => {isValid: boolean; errorMessage: string};
    bikeTypesList?: BikeType[];
    isLoading?: boolean;
    testID?: string;
}

const AddOtherBikeContainer: React.FC<IProps> = ({
    onSubmit,
    onValidate,
    bikeTypesList = [],
    isLoading = false,
    testID = 'add-other-bike-container-id',
}: IProps) => {
    const {t} = useMergedTranslation('AddOtherBikeScreen.form');
    const initBikeType = useMemo(() => bikeTypesList?.[0]?.enumValue, [
        bikeTypesList,
    ]);

    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | undefined>();
    const selectedType = useMemo(
        () =>
            bikeTypesList.find(type => type.enumValue === selectedItem)
                ?.i18nValue || t('defaultBikeType'),
        [selectedItem, bikeTypesList, t],
    );

    const {
        control,
        handleSubmit,
        setError,
        getValues,
        setValue,
    } = useForm<FormData>({
        mode: 'onChange',
        defaultValues: {
            bikeType: initBikeType,
        },
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
    const onSubmitHandler: SubmitHandler<OtherBikeDataT> = data => {
        onSubmit(data);
    };

    const onInvalidSubmitHandler: SubmitErrorHandler<OtherBikeDataT> = () => {
        const formValues = getValues();
        Object.keys(formValues)?.forEach(v => {
            onValidateHandler(v, INPUT_FIELDS[v as keyof OtherBikeDataT]);
        });
    };

    const onPressRadioButton = useCallback(
        (type: string) => {
            setValue('bikeType', type);
            setSelectedItem(type);
            setShowModal(false);
        },
        [setValue],
    );

    return (
        <>
            <View style={styles.container} testID={testID}>
                <View style={styles.inputContainer}>
                    <Pressable onPress={() => setShowModal(true)}>
                        <View pointerEvents="none">
                            <TextInput
                                editable={false}
                                placeholder={selectedType}
                                onChangeValue={() => {}} /* leave empty */
                                autoCapitalize="characters"
                                testID={`${testID}-button-input`}
                                icon={MykrossIconFont.MYKROSS_ICON_CHEVRON_DOWN}
                            />
                        </View>
                    </Pressable>
                    <ControlledInput
                        fieldName={INPUT_FIELDS.manufacturer}
                        control={control}
                        Input={({value, onChange, isValid}) => (
                            <TextInput
                                placeholder={t('manufacturer.placeholder')}
                                value={value}
                                hint={t('manufacturer.hint')}
                                onChangeValue={onChange}
                                isValid={isValid}
                                maxLength={200}
                                testID={`${testID}-manufacturer-text-input`}
                            />
                        )}
                        onValidate={onValidateHandler}
                    />
                    <ControlledInput
                        fieldName={INPUT_FIELDS.bikeName}
                        control={control}
                        Input={({value, onChange, isValid}) => (
                            <TextInput
                                placeholder={t('bikeName.placeholder')}
                                value={value}
                                hint={t('bikeName.hint')}
                                onChangeValue={onChange}
                                isValid={isValid}
                                maxLength={200}
                                testID={`${testID}-bikeName-text-input`}
                            />
                        )}
                        onValidate={onValidateHandler}
                    />
                </View>

                <PrimaryButton
                    text={t('submitButton')}
                    onPress={handleSubmit(
                        onSubmitHandler,
                        onInvalidSubmitHandler,
                    )}
                    style={styles.button}
                    disabled={isLoading}
                    withLoader={isLoading}
                    withoutShadow
                    testID={`${testID}-submit-button`}
                />
            </View>
            <BottomModal
                show={showModal}
                header={<ModalHeader onPress={() => setShowModal(false)} />}
                enableScroll
                openModalHeight={getFVerticalPx(
                    (bikeTypesList.length + 1) * ROW_HEIGHT +
                        BOTTOM_PADDING_HEIGHT,
                )} /* single radio button heigh multiplied by elements number */
            >
                <ControlledInput
                    fieldName={INPUT_FIELDS.bikeType}
                    control={control}
                    Input={({value, onChange}) => (
                        <RadioListItem
                            bikeTypes={bikeTypesList}
                            bikeType={value}
                            onPress={type => {
                                onPressRadioButton(type);
                                onChange(type);
                            }}
                            testID={`${testID}-radio-list-item`}
                        />
                    )}
                    onValidate={onValidateHandler}
                />
            </BottomModal>
            <Backdrop isVisible={showModal} />
        </>
    );
};

interface IModalProps {
    onPress: () => void;
    testID?: string;
}

const ModalHeader: React.FC<IModalProps> = React.memo(
    ({onPress, testID = 'modal-header-test-id'}: IModalProps) => {
        return (
            <>
                <HorizontalSpacer height={16} />
                <View style={styles.modalHeaderContainer} testID={testID}>
                    <View style={styles.modalHeaderButtonContainer}>
                        <IconButton
                            icon={MykrossIconFont.MYKROSS_ICON_EXIT}
                            iconColor={colors.black}
                            iconSize={20}
                            onPress={onPress}
                            style={styles.modalHeaderButton}
                        />
                    </View>
                </View>
            </>
        );
    },
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: appContainerHorizontalMargin,
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
        width: '100%',
        marginBottom: getFVerticalPx(32),
    },
    button: {
        width: getFHorizontalPx(294),
        height: getFVerticalPx(48),
    },

    modalHeaderContainer: {
        width: '100%',
        marginBottom: getFVerticalPx(24),
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalHeaderButtonContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    modalHeaderButton: {
        height: getFFontSize(20),
    },
});

export default AddOtherBikeContainer;

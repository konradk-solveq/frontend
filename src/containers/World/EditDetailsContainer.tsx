import React, {
    useState,
    useImperativeHandle,
    Ref,
    useMemo,
    useCallback,
} from 'react';
import {View, StyleSheet} from 'react-native';
import {SubmitErrorHandler, SubmitHandler, FieldValues} from 'react-hook-form';

import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {
    reValidateMapMetadataManually,
    validateData,
} from '@utils/validation/validation';
import useFormDataWithMapData, {FormControlT} from '@hooks/formDataWithMapData';
import {
    Map,
    publishMapValidationRules,
    PublishMapValidationRulesI,
} from '@models/map.model';
import {ImageType, MapFormDataResult} from '@interfaces/form';

import {MultiSelect} from '@components/inputs';
import {ControlledInput} from '@components/form';
import ImagesInput from '@components/inputs/ImagesInput';

import {Checkbox, TextInput} from '@components/inputs';
import {BodyPrimary, Header3, Subtitle} from '@components/texts/texts';
import {getFHorizontalPx, getFVerticalPx} from '@helpers/appLayoutDimensions';
import {HorizontalDivider} from '@components/divider';
import colors from '@theme/colors';
import {PrimaryButton} from '@components/buttons';
import {Alert} from '@components/alerts';
import {IProps as IAlertProps} from '@components/alerts/Alert';
import {attributes} from '@utils/constants';
import {SelectEnumOptionsType} from '@models/config.model';
import ApprovedMarker from '@src/components/icons/ApprovedMarker';
import {useToastContext} from '@providers/ToastProvider/ToastProvider';
import {isTruthyString} from '@utils/strings';

export type RouteEditFormRef = {
    submit: () => void;
};

interface IProps {
    mapData: Map | undefined;
    imagesData: {images: string[]};
    onSubmit: (
        data: MapFormDataResult,
        publish: boolean,
        imagesToAdd?: ImageType[],
        imagesToRemove?: string[],
    ) => void;
    scrollTop: () => void;
    alertData: IAlertProps;
    options: SelectEnumOptionsType;
    testID?: string;
    publish?: boolean;
    ref?: Ref<RouteEditFormRef | undefined>;
}

/* TODO: missing tests for validation */
const EditForm: React.FC<IProps> = React.forwardRef(
    (
        {
            onSubmit,
            imagesData,
            mapData,
            scrollTop,
            alertData,
            options,
            testID = 'edit-form-id',
            publish = false,
        }: IProps,
        ref,
    ) => {
        const {t} = useMergedTranslation('RoutesDetails.form');
        const {t: tvm} = useMergedTranslation('validation.fields.mapDetails');
        const {t: toastsT} = useMergedTranslation('Toasts');
        const [images, setImages] = useState<string[]>(
            imagesData?.images || [],
        );
        const [imagesToAdd, setImagesToAdd] = useState<ImageType[]>([]);
        const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);
        const isRoutePublished = useMemo(() => mapData?.isPublic, [
            mapData?.isPublic,
        ]);

        const {
            control,
            handleSubmit,
            setError,
            getValues,
        } = useFormDataWithMapData(mapData, publish);
        const toastContext = useToastContext();

        const validateFormData = useCallback(
            (data: FieldValues) => {
                const isValid = reValidateMapMetadataManually(
                    data,
                    tvm('formErrors', {returnObjects: true}),
                    setError,
                    ['publishWithName'],
                );
                if (!isValid) {
                    scrollTop();
                }

                return isValid;
            },
            [scrollTop, setError, tvm],
        );

        /**
         * Validate data when publish or route is already published
         */
        const onSubmitHandler: SubmitHandler<MapFormDataResult> = useCallback(
            data => {
                if (!publish && !isRoutePublished) {
                    onSubmit(data, false, imagesToAdd, imagesToRemove);
                    toastContext.addToast({
                        key: 'toast-details-edit',
                        title: toastsT('routeSaved'),
                        icon: <ApprovedMarker />,
                        leaveOnScreenChange: true,
                    });
                    return;
                }
                const isValid = validateFormData(data);
                if (isValid) {
                    onSubmit(data, publish, imagesToAdd, imagesToRemove);
                    toastContext.addToast({
                        key: 'toast-details-edit',
                        title: toastsT('routePublished'),
                        icon: <ApprovedMarker />,
                        leaveOnScreenChange: true,
                    });
                }
            },
            [
                imagesToAdd,
                imagesToRemove,
                isRoutePublished,
                onSubmit,
                publish,
                toastContext,
                toastsT,
                validateFormData,
            ],
        );

        /**
         * Validate data when publish or route is already published
         */
        const onInvalidSubmitHandler: SubmitErrorHandler<MapFormDataResult> = useCallback(() => {
            if (!publish && !isRoutePublished) {
                return;
            }
            const formValues = getValues();
            validateFormData(formValues);
        }, [getValues, isRoutePublished, publish, validateFormData]);

        const onValidateHandler = useCallback(
            (
                val: string | number | boolean | string[] | undefined,
                fieldName: string,
            ) => {
                if (!publish) {
                    return true;
                }
                const rules =
                    publishMapValidationRules[
                        fieldName as keyof PublishMapValidationRulesI
                    ];
                const isValid = validateData(rules, val);

                if (!isValid) {
                    scrollTop();
                }
                return isValid || tvm(`formErrors.${fieldName}`);
            },
            [publish, scrollTop, tvm],
        );

        const onAddImageHandler = useCallback((imagesTab: ImageType[]) => {
            if (imagesTab && imagesTab.length) {
                const imageUrls = imagesTab
                    .map(image => image.uri)
                    .filter(isTruthyString);

                if (imageUrls.length) {
                    setImages(prev => [...imageUrls, ...prev]);
                }
                setImagesToAdd(prev => [...imagesTab, ...prev]);
            }
        }, []);

        /**
         * Validate data when publish or route is already published
         */
        useImperativeHandle(ref, () => ({
            submit: handleSubmit(onSubmitHandler, onInvalidSubmitHandler),
        }));

        const onRemoveImageHandler = useCallback((imageUri: string) => {
            if (imageUri) {
                setImages(prev => [...prev].filter(i => i !== imageUri));
                setImagesToAdd(prev =>
                    [...prev].filter(i => i.uri !== imageUri),
                );
                setImagesToRemove(prev => [imageUri, ...prev]);
            }
        }, []);

        return (
            <View>
                <Alert
                    {...alertData}
                    onPress={
                        publish
                            ? alertData.onPress
                            : handleSubmit(onSubmitHandler)
                    }
                />
                {publish && (
                    <>
                        <View style={styles.checkboxContainer}>
                            <ControlledInput
                                fieldName="publishWithName"
                                control={control}
                                Input={({value, onChange}) => (
                                    <Checkbox
                                        checked={!value}
                                        onPress={() => onChange(!value)}
                                    />
                                )}
                                onValidate={onValidateHandler}
                            />
                            <BodyPrimary style={styles.checkboxLabel}>
                                {t('publishAsAnonymous.label')}
                            </BodyPrimary>
                        </View>
                        <HorizontalDivider style={styles.divider} />
                    </>
                )}
                <View>
                    <ControlledInput
                        fieldName="name"
                        control={control}
                        Input={({value, isValid, onChange, errMsg}) => (
                            <>
                                <TextInput
                                    placeholder={t('title.placeholder')}
                                    inputName={
                                        value ? t('title.placeholder') : ' '
                                    }
                                    keyboardType="default"
                                    onChangeValue={(v?: string) => onChange(v)}
                                    isValid={isValid}
                                    hint={t('required')}
                                    value={value}
                                    maxLength={100}
                                    testID={`${testID}-name-input`}
                                />
                                {errMsg && (
                                    <Subtitle
                                        color={colors.red}
                                        style={styles.error}>
                                        {errMsg}
                                    </Subtitle>
                                )}
                            </>
                        )}
                        onValidate={onValidateHandler}
                    />
                </View>
                <View style={styles.input}>
                    <ControlledInput
                        fieldName="description"
                        control={control}
                        Input={({value, isValid, onChange, errMsg}) => (
                            <>
                                <TextInput
                                    placeholder={t('description.placeholder')}
                                    inputName={
                                        value
                                            ? t('description.placeholder')
                                            : ' '
                                    }
                                    keyboardType="default"
                                    onChangeValue={(v?: string) => onChange(v)}
                                    isValid={isValid}
                                    hint={
                                        publish
                                            ? t('required')
                                            : `${value.length}/255`
                                    }
                                    value={value}
                                    numberOfLines={3}
                                    maxLength={255}
                                    multiline
                                    testID={`${testID}-description-input`}
                                />
                                {errMsg && (
                                    <Subtitle
                                        color={colors.red}
                                        style={styles.error}>
                                        {errMsg}
                                    </Subtitle>
                                )}
                            </>
                        )}
                        onValidate={onValidateHandler}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Header3 style={styles.photosLabel}>
                        {t('photos.label')}
                    </Header3>
                    <ImagesInput
                        images={images}
                        onAddImages={onAddImageHandler}
                        onRemoveImage={onRemoveImageHandler}
                        placeholderText={t('photos.placeholder')}
                    />
                </View>

                <Tags
                    control={control}
                    onValidateHandler={onValidateHandler}
                    options={options}
                />

                <View style={styles.buttonContainer}>
                    <PrimaryButton
                        text={publish ? t('publishButton') : t('saveButton')}
                        testID={`${testID}-submit-button`}
                        onPress={handleSubmit(
                            onSubmitHandler,
                            onInvalidSubmitHandler,
                        )}
                    />
                </View>
            </View>
        );
    },
);

export default React.memo(EditForm);

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxLabel: {
        marginLeft: getFHorizontalPx(19),
    },
    divider: {
        marginVertical: getFVerticalPx(20),
    },
    input: {
        marginTop: getFVerticalPx(24),
    },
    inputGroup: {
        marginTop: getFVerticalPx(32),
    },
    photosLabel: {
        marginBottom: getFVerticalPx(8),
    },
    buttonContainer: {
        flex: 1,
        marginBottom: getFVerticalPx(50),
        marginTop: getFVerticalPx(24),
        alignItems: 'center',
    },
    error: {
        marginLeft: getFHorizontalPx(16),
    },
});

interface ITagsProps {
    control: FormControlT;
    onValidateHandler: (
        val: string | number | boolean | string[] | undefined,
        fieldName: string,
    ) => void;
    options: SelectEnumOptionsType;
}

const Tags: React.FC<ITagsProps> = React.memo(
    ({control, onValidateHandler, options}: ITagsProps) => {
        const {t} = useMergedTranslation('RoutesDetails.form');

        return (
            <>
                <View style={styles.inputGroup}>
                    <ControlledInput
                        fieldName="difficulty"
                        control={control}
                        Input={({value, onChange, errMsg}) => {
                            return (
                                <MultiSelect
                                    key={attributes.level.name}
                                    options={options?.difficulties}
                                    optionsTransName={t(
                                        'attributes.level.name',
                                    )}
                                    predefined={value}
                                    errorMessage={errMsg}
                                    onSave={onChange}
                                    isRadioType={true}
                                    buttonBackgroundColor={colors.whiteGrey}
                                />
                            );
                        }}
                        onValidate={onValidateHandler}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <ControlledInput
                        fieldName="surface"
                        control={control}
                        Input={({value, onChange, errMsg}) => (
                            <MultiSelect
                                key={attributes.pavement.name}
                                options={options?.surfaces}
                                optionsTransName={t('attributes.pavement.name')}
                                predefined={value}
                                errorMessage={errMsg}
                                onSave={onChange}
                                buttonBackgroundColor={colors.whiteGrey}
                            />
                        )}
                        onValidate={onValidateHandler}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <ControlledInput
                        fieldName="tags"
                        control={control}
                        Input={({value, onChange, errMsg}) => (
                            <MultiSelect
                                key={attributes.tags.name}
                                options={options?.tags}
                                optionsTransName={t('attributes.tags.name')}
                                predefined={value}
                                errorMessage={errMsg}
                                onSave={onChange}
                                buttonBackgroundColor={colors.whiteGrey}
                            />
                        )}
                        onValidate={onValidateHandler}
                    />
                </View>
            </>
        );
    },
);

import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {SubmitErrorHandler, SubmitHandler} from 'react-hook-form';

import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {
    reValidateMapMetadataManually,
    validateData,
} from '@utils/validation/validation';
import {useAppSelector} from '@hooks/redux';
import useFormDataWithMapData from '@hooks/formDataWithMapData';
import {attributes} from './attributes';
import {
    Map,
    publishMapValidationRules,
    PublishMapValidationRulesI,
} from '@models/map.model';
import {userNameSelector} from '@storage/selectors';
import {ImageType, MapFormDataResult} from '@interfaces/form';

import {BigWhiteBtn, BigRedBtn} from '@sharedComponents/buttons';
import OneLineText from '@sharedComponents/inputs/oneLineText';
import {MultiSelect} from '@sharedComponents/inputs';
import Checkbox from './inputs/checkbox';
import ControlledInput from './inputs/controlledInput';
import ImagesInput from './inputs/imagesInput';

import styles from './style';

interface IProps {
    mapData: Map | undefined;
    imagesData: {images: string[]; mapImg: string};
    onSubmit: (
        data: MapFormDataResult,
        publish: boolean,
        imagesToAdd?: ImageType[],
        imagesToRemove?: string[],
    ) => void;
    scrollTop: () => void;
}

const EditForm: React.FC<IProps> = ({
    onSubmit,
    imagesData,
    mapData,
    scrollTop,
}: IProps) => {
    const {t} = useMergedTranslation('RoutesDetails.EditScreen');
    const {t: tvm} = useMergedTranslation('validation.fields.mapDetails');

    const userName = useAppSelector(userNameSelector) || t('defaultUser');

    const [images, setImages] = useState<string[]>(imagesData?.images || []);
    const [imagesToAdd, setImagesToAdd] = useState<ImageType[]>([]);
    const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);

    const {
        control,
        handleSubmit,
        setError,
        options,
        getValues,
    } = useFormDataWithMapData(mapData);

    const validateFormData = (data: MapFormDataResult) => {
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
    };

    const onSubmitHandlerWithPublish: SubmitHandler<MapFormDataResult> = data => {
        const isValid = validateFormData(data);
        if (isValid) {
            onSubmit(data, true, imagesToAdd, imagesToRemove);
        }
    };
    const onSubmitHandler: SubmitHandler<MapFormDataResult> = data => {
        onSubmit(data, false, imagesToAdd, imagesToRemove);
    };

    const onInvalidSubmitHandlerWithPublish: SubmitErrorHandler<MapFormDataResult> = () => {
        const formValues = getValues();
        validateFormData(formValues);
    };

    const onValidateHanlder = (
        val: string | number | boolean | string[] | undefined,
        fieldName: string,
    ) => {
        const rules =
            publishMapValidationRules[
                fieldName as keyof PublishMapValidationRulesI
            ];
        const isValid = validateData(rules, val);

        if (!isValid) {
            scrollTop();
        }
        return isValid || tvm(`formErrors.${fieldName}`);
    };

    const onAddImageHandler = (img: ImageType) => {
        if (img) {
            if (img.uri) {
                const imgUrl = img.uri;
                setImages(prev => [imgUrl, ...prev]);
            }
            setImagesToAdd(prev => [img, ...prev]);
        }
    };

    const onRemoveImageHandler = (imageUri: string) => {
        if (imageUri) {
            setImages(prev => [...prev].filter(i => i !== imageUri));
            setImagesToAdd(prev => [...prev].filter(i => i.uri !== imageUri));
            setImagesToRemove(prev => [imageUri, ...prev]);
        }
    };

    const isRoutePublished = mapData?.isPublic;

    return (
        <View style={styles.container}>
            <View style={styles.checkboxContainer}>
                <ControlledInput
                    fieldName="publishWithName"
                    control={control}
                    Input={({value, isValid, onChange}) => (
                        <Checkbox
                            label={`${t('publishAs')} ${userName}`}
                            value={!!value}
                            isValid={isValid}
                            onCheck={onChange}
                            disabled={mapData?.isPublic}
                        />
                    )}
                    onValidate={onValidateHanlder}
                />
            </View>
            <View>
                <ControlledInput
                    fieldName="name"
                    control={control}
                    Input={({value, isValid, onChange, errMsg}) => (
                        <OneLineText
                            placeholder={t('nameInput')}
                            keyboardType="default"
                            onChangeText={(v: string) => onChange(v)}
                            validationOk={isValid}
                            validationWrong={!!errMsg}
                            messageWrong={errMsg || 'Error'}
                            value={value}
                            maxLength={100}
                        />
                    )}
                    onValidate={onValidateHanlder}
                />
            </View>
            <View style={styles.levelContainer}>
                <ControlledInput
                    fieldName="difficulty"
                    control={control}
                    Input={({value, onChange, errMsg}) => {
                        return (
                            <MultiSelect
                                key={attributes.level.name}
                                options={options?.difficulties}
                                optionsTransName={t('attributes.level.name')}
                                predefined={value}
                                errorMessage={errMsg}
                                onSave={onChange}
                                isRadioType={true}
                            />
                        );
                    }}
                    onValidate={onValidateHanlder}
                />
            </View>
            <View style={styles.pavementContainer}>
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
                        />
                    )}
                    onValidate={onValidateHanlder}
                />
            </View>
            <View>
                <ControlledInput
                    fieldName="description"
                    control={control}
                    Input={({value, isValid, onChange, errMsg}) => (
                        <OneLineText
                            placeholder={t('intro')}
                            keyboardType="default"
                            onChangeText={(v: string) => onChange(v)}
                            validationOk={isValid}
                            validationWrong={!!errMsg}
                            messageWrong={errMsg || 'Error'}
                            value={value}
                            isMultiline
                            maxLength={1000}
                        />
                    )}
                    onValidate={onValidateHanlder}
                />
            </View>
            <View style={styles.imagesContainer}>
                <Text
                    style={[
                        styles.textStyle,
                        styles.lightFont,
                        styles.color555555,
                        styles.imagesTitle,
                    ]}>
                    {t('imagesTitle')}
                </Text>
                <ImagesInput
                    images={images}
                    onAddImage={onAddImageHandler}
                    onRemoveImage={onRemoveImageHandler}
                />
            </View>
            <View style={styles.tagsContainer}>
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
                        />
                    )}
                    onValidate={onValidateHanlder}
                />
            </View>
            <View style={styles.buttonsWrapper}>
                {!isRoutePublished ? (
                    <>
                        <BigRedBtn
                            title={t('publishButton')}
                            onpress={handleSubmit(
                                onSubmitHandlerWithPublish,
                                onInvalidSubmitHandlerWithPublish,
                            )}
                            style={styles.onPressBtn}
                        />
                        <BigWhiteBtn
                            title={t('saveButton')}
                            onpress={handleSubmit(onSubmitHandler)}
                            style={[styles.onPressBtn, styles.bottomBtn]}
                        />
                    </>
                ) : (
                    <BigRedBtn
                        title={t('updateButton')}
                        onpress={handleSubmit(onSubmitHandlerWithPublish)}
                        style={styles.onPressBtn}
                    />
                )}
            </View>
        </View>
    );
};

export default EditForm;

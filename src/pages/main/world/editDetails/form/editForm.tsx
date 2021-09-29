import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {SubmitHandler} from 'react-hook-form';

import {I18n} from '../../../../../../I18n/I18n';
import {
    reValidateMapMetadataManually,
    validateData,
} from '../../../../../utils/validation/validation';
import {useAppSelector} from '../../../../../hooks/redux';
import useFormDataWithMapData from '../../../../../hooks/formDataWithMapData';
import {attributes} from './attributes';
import {
    Map,
    publishMapValidationRules,
    PublishMapValidationRulesI,
} from '../../../../../models/map.model';
import {userNameSelector} from '../../../../../storage/selectors';
import {ImageType, MapFormDataResult} from '../../../../../interfaces/form';

import {BigWhiteBtn, BigRedBtn} from '../../../../../sharedComponents/buttons';
import OneLineText from '../../../../../sharedComponents/inputs/oneLineText';
import {MultiSelect} from '../../../../../sharedComponents/inputs';
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
    const trans: any = I18n.t('RoutesDetails.EditScreen');
    const validationMessages: any = I18n.t(
        'validation.fields.mapDetails.formErrors',
    );
    const userName = useAppSelector(userNameSelector) || trans.defaultUser;

    const [images, setImages] = useState<string[]>(imagesData?.images || []);
    const [imagesToAdd, setImagesToAdd] = useState<ImageType[]>([]);
    const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);

    const {control, handleSubmit, setError, options} = useFormDataWithMapData(
        mapData,
    );

    const onSubmitHandlerWithPublish: SubmitHandler<MapFormDataResult> = data => {
        const isValid = reValidateMapMetadataManually(
            data,
            validationMessages,
            setError,
            ['publishWithName'],
        );
        if (!isValid) {
            scrollTop();
            return;
        }
        onSubmit(data, true, imagesToAdd, imagesToRemove);
    };
    const onSubmitHandler: SubmitHandler<MapFormDataResult> = data => {
        onSubmit(data, false, imagesToAdd, imagesToRemove);
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
        return isValid || validationMessages[fieldName];
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
                            label={`${trans.publishAs} ${userName}`}
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
                            placeholder={trans.nameInput}
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
                                optionsTransName={trans.attributes.level.name}
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
                            optionsTransName={trans.attributes.pavement.name}
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
                            placeholder={trans.intro}
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
                    {trans.imagesTitle}
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
                            optionsTransName={trans.attributes.tags.name}
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
                            title={trans.publishButton}
                            onpress={handleSubmit(onSubmitHandlerWithPublish)}
                            style={styles.onPressBtn}
                        />
                        <BigWhiteBtn
                            title={trans.saveButton}
                            onpress={handleSubmit(onSubmitHandler)}
                            style={[styles.onPressBtn, styles.bottomBtn]}
                        />
                    </>
                ) : (
                    <BigRedBtn
                        title={trans.updateButton}
                        onpress={handleSubmit(onSubmitHandlerWithPublish)}
                        style={styles.onPressBtn}
                    />
                )}
            </View>
        </View>
    );
};

export default EditForm;

import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {View, Text} from 'react-native';
import {SubmitHandler} from 'react-hook-form';

import {I18n} from '../../../../../../I18n/I18n';
import {validateData} from '../../../../../utils/validation/validation';
import {useAppSelector} from '../../../../../hooks/redux';
import {attributes, OptionType} from './attributes';
import {Map, publishMapValidationRules} from '../../../../../models/map.model';
import {userNameSelector} from '../../../../../storage/selectors';
import {FormData} from './inputs/types';

import {BigWhiteBtn, BigRedBtn} from '../../../../../sharedComponents/buttons';
import OneLineText from '../../../../../sharedComponents/inputs/oneLineText';
import {MultiSelect} from '../../../../../sharedComponents/inputs';
import Checkbox from './inputs/checkbox';
import ControlledInput from './inputs/controlledInput';
import ImagesInput from './inputs/imagesInput';

import styles from './style';
import useFormDataWithMapData from '../../../../../hooks/mapDataToFormData';

interface IProps {
    mapData: Map | undefined;
    onSubmit: (email: string, password: string) => void;
}

const EditForm: React.FC<IProps> = ({onSubmit, mapData}: IProps) => {
    const navigation = useNavigation();
    const trans: any = I18n.t('RoutesDetails.EditScreen');
    const validationMessages: any = I18n.t(
        'validation.fields.mapDetails.formErrors',
    );
    const userName = useAppSelector(userNameSelector);

    const [images, setImages] = useState<string[]>(
        mapData?.details?.images || [],
    );

    const {control, handleSubmit} = useFormDataWithMapData(mapData);

    const onSubmitHandler: SubmitHandler<FormData> = data => {
        console.log('onSubmitHandler -- action', data);
        console.log(
            '[save and publish action]',
        ); /* todo: go back after dispatch action and status ended */
        // onSubmit(data.email, data.password);
    };

    const onValidateHanlder = (
        val: string | number | boolean | OptionType[],
        fieldName: string,
    ) => {
        const rules = publishMapValidationRules[fieldName];
        const isValid = validateData(rules, val);

        return isValid || validationMessages[fieldName];
    };

    const onAddImageHandler = (imageUri: string) => {
        if (imageUri) {
            setImages(prev => [imageUri, ...prev]);
        }
    };

    const onRemoveImageHandler = (imageUri: string) => {
        if (imageUri) {
            setImages(prev => [...prev].filter(i => i !== imageUri));
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.checkboxContainer}>
                <ControlledInput
                    fieldName="publishWithName"
                    control={control}
                    Input={({value, isValid, onChange}) => (
                        <Checkbox
                            label={`Opublikuj jako ${userName}`}
                            value={!!value}
                            isValid={isValid}
                            onCheck={onChange}
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
                    fieldName="level"
                    control={control}
                    Input={({value, onChange, errMsg}) => {
                        console.log(value);
                        return (
                            <MultiSelect
                                key={attributes.level.name}
                                options={attributes.level.options}
                                optionsTrans={trans.attributes.level}
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
                    fieldName="pavement"
                    control={control}
                    Input={({value, onChange, errMsg}) => (
                        <MultiSelect
                            key={attributes.pavement.name}
                            options={attributes.pavement.options}
                            optionsTrans={trans.attributes.pavement}
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
                    fieldName="intro"
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
                            style={styles.nameInput}
                            isMultiline
                            maxLength={1000}
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
                            placeholder={trans.description}
                            keyboardType="default"
                            onChangeText={(v: string) => onChange(v)}
                            validationOk={isValid}
                            validationWrong={!!errMsg}
                            messageWrong={errMsg || 'Error'}
                            value={value}
                            isMultiline
                            maxLength={5000}
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
                            options={attributes.tags.options}
                            optionsTrans={trans.attributes.tags}
                            predefined={value}
                            errorMessage={errMsg}
                            onSave={onChange}
                        />
                    )}
                    onValidate={onValidateHanlder}
                />
            </View>
            <View style={styles.buttonsWrapper}>
                <BigRedBtn
                    title={trans.publishButton}
                    onpress={handleSubmit(onSubmitHandler)}
                    style={styles.onPressBtn}
                />
                <BigWhiteBtn
                    title={trans.saveButton}
                    onpress={
                        () =>
                            console.log(
                                '[publish action]',
                            ) /* todo: go back after dispatch action and status ended */
                    }
                    style={[styles.onPressBtn, styles.bottomBtn]}
                />
            </View>
        </View>
    );
};

export default EditForm;

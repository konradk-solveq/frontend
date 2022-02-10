import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {SubmitHandler, useForm} from 'react-hook-form';

import {I18n} from '@translations/I18n';
import {validateData} from '@utils/validation/validation';
import {BigRedBtn} from '@sharedComponents/buttons';
import OneLineText from '@sharedComponents/inputs/oneLineText';
import ControlledInput from './inputs/controlledInput';

import styles from './style';
import {LoginFormDataResult} from '@interfaces/form';
import {
    userLoginInfoValidationRules,
    UserLoginInfoValidationRulesI,
} from '@models/userLoginInfo.model';
import {FormData} from '@pages/auth/loginScreen/form/inputs/types';
import {Text} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {LoginNavigationPropT} from '@type/rootStack';

interface IProps {
    onSubmit: (data: LoginFormDataResult) => void;
    scrollTop: () => void;
    isLoading: boolean;
}

const LoginForm: React.FC<IProps> = ({
    onSubmit,
    scrollTop,
    isLoading,
}: IProps) => {
    const trans: any = I18n.t('Login');
    const validationMessages: any = I18n.t(
        'validation.fields.login.formErrors',
    );

    const navigation = useNavigation<LoginNavigationPropT>();

    const handleForgotPasswordPress = () => {
        navigation.navigate('ResetPassword');
    };

    const {control, handleSubmit} = useForm<FormData>();

    const onSubmitHandler: SubmitHandler<LoginFormDataResult> = data => {
        onSubmit(data);
    };

    const onValidateHandler = (
        val: string | number | boolean | string[] | undefined,
        fieldName: string,
    ) => {
        const rules =
            userLoginInfoValidationRules[
                fieldName as keyof UserLoginInfoValidationRulesI
            ];
        const isValid = validateData(rules, val);

        if (!isValid) {
            scrollTop();
        }
        return isValid || validationMessages[fieldName];
    };

    return (
        <View style={styles.container}>
            <View>
                <ControlledInput
                    fieldName="email"
                    control={control}
                    Input={({value, isValid, onChange, errMsg}) => (
                        <OneLineText
                            placeholder={trans.email}
                            keyboardType="default"
                            onChangeText={(v: string) => onChange(v)}
                            validationOk={isValid}
                            validationWrong={!!errMsg}
                            messageWrong={errMsg || 'Error'}
                            value={value}
                            maxLength={100}
                            autoCapitalize={'none'}
                            testID={'InputEmail'}
                        />
                    )}
                    onValidate={onValidateHandler}
                />
            </View>
            <View>
                <ControlledInput
                    fieldName="password"
                    control={control}
                    Input={({value, isValid, onChange, errMsg}) => (
                        <OneLineText
                            placeholder={trans.password}
                            keyboardType="default"
                            onChangeText={(v: string) => onChange(v)}
                            validationOk={isValid}
                            validationWrong={!!errMsg}
                            messageWrong={errMsg || 'Error'}
                            value={value}
                            maxLength={100}
                            secureTextEntry={true}
                            testID={'InputPassword'}
                        />
                    )}
                    onValidate={onValidateHandler}
                />
            </View>
            <View>
                <TouchableOpacity
                    testID={'ForgotPassLink'}
                    onPress={handleForgotPasswordPress}>
                    <Text style={styles.forgotPasswordText}>
                        {trans.forgotPassword}
                    </Text>
                </TouchableOpacity>
            </View>
            <BigRedBtn
                testID={'LoginBtn'}
                title={trans.button}
                onpress={handleSubmit(onSubmitHandler)}
                style={styles.bottomBtn}
                disabled={isLoading}
                withLoader={isLoading}
            />
        </View>
    );
};

export default LoginForm;

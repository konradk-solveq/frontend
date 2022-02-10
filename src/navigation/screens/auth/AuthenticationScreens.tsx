import React from 'react';

import {Stack} from '@navigation/stack';

import LoginScreen from '@pages/auth/loginScreen/LoginScreen';
import RegisterScreen from '@pages/auth/registerScreen/RegisterScreen';
import ResetPasswordScreen from '@pages/auth/resetPasswordScreen/ResetPasswordScreen';

const AuthenticationScreens = () => {
    return (
        <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen
                name="ResetPassword"
                component={ResetPasswordScreen}
            />
        </>
    );
};

export default AuthenticationScreens;

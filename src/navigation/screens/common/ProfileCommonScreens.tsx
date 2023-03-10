import React from 'react';

import {Stack} from '@navigation/stack';

import NameChange from '@pages/main/profile/nameChange/nameChange';
import LanguageChange from '@pages/main/profile/languageChange/languageChange';
import AboutApp from '@pages/main/profile/aboutApp/aboutApp';
import Regulations from '@pages/onboarding/permitsDeclarations/regulations';
import PrivacyPolicy from '@pages/onboarding/permitsDeclarations/privacyPolicy';
import Help from '@pages/main/profile/help/help';
import Contact from '@pages/main/profile/contact/contact';
import Consents from '@pages/main/profile/consents/consents';

const ProfileCommonScreens = () => {
    return (
        <>
            <Stack.Screen name="NameChange" component={NameChange} />
            <Stack.Screen name="LanguageChange" component={LanguageChange} />
            <Stack.Screen name="AboutApp" component={AboutApp} />
            <Stack.Screen name="Regulations" component={Regulations} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="Help" component={Help} />
            <Stack.Screen name="Contact" component={Contact} />
            <Stack.Screen name="Consents" component={Consents} />
        </>
    );
};

export default ProfileCommonScreens;

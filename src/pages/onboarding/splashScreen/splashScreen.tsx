import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {OnboardingStackRoute} from '@navigation/route';
import {AnimatedKrossLogoContainer} from '@containers/Splash';

interface Props {
    navigation: any;
}

const time = __DEV__ ? 100 : 3000;

const SplashScreen = ({navigation}: Props) => {
    useEffect(() => {
        const t = setTimeout(() => {
            navigation.replace(OnboardingStackRoute.NEW_BEGINNING_SCREEN);
        }, time);

        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <StatusBar hidden />
            <AnimatedKrossLogoContainer />
        </>
    );
};

export default SplashScreen;

import React, {useEffect} from 'react';
import {Image, StatusBar, StyleSheet, View} from 'react-native';

import {OnboardingStackRoute} from '@navigation/route';
import {AnimatedKrossLogoContainer} from '@containers/Splash';
import colors from '@theme/colors';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';
import KROOS_LOGO from '@assets/images/logo/kross_logo_horizontal.png';
import {OpacityAnimation} from '@components/animations';

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
            <StatusBar
                backgroundColor={colors.backgroundPrimary}
                barStyle="light-content"
            />
            <AnimatedKrossLogoContainer />
            <OpacityAnimation>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={KROOS_LOGO} />
                </View>
            </OpacityAnimation>
        </>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: getFVerticalPx(48),
    },
    image: {
        width: getFHorizontalPx(282),
        height: getFVerticalPx(44),
    },
});

export default SplashScreen;

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {KrossLogoSvg} from '@components/svg';
import {getFHorizontalPx, getFVerticalPx} from '@helpers/appLayoutDimensions';
import colors from '@theme/colors';

const AnimatedKrossLogoContainer = () => {
    return (
        <View style={styles.container}>
            <View style={styles.krossLogo}>
                <KrossLogoSvg />
            </View>
        </View>
    );
};

export default AnimatedKrossLogoContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.white,
        alignItems: 'center',
    },
    krossLogo: {
        width: getFHorizontalPx(180),
        height: getFVerticalPx(200),
        marginTop: getFVerticalPx(280),
    },
});

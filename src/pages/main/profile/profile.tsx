import React from 'react';
import {StyleSheet, SafeAreaView, View, Text} from 'react-native';
import I18n from 'react-native-i18n';
import TabBackGround from '../../../sharedComponents/navi/tabBackGround';
import BlueButton from './blueButton';

import {
    setAppSize,
    initAppSize,
    setObjSize,
    getCenterLeftPx,
    getCenterTopPx,
    getHorizontal,
    getHorizontalPx,
    getVertical,
    getVerticalPx,
    getWidth,
    getWidthOf,
    getWidthPx,
    getWidthPxOf,
    getHeight,
    getHeightPx,
    getHeightOfPx,
    getRelativeWidth,
    getRelativeHeight,
    getStandard,
    getStandardPx,
    getPerfectPx,
    getPosStaticHeight,
    getOnlyPos,
    getPosAndWid,
    getPosWithMinHeight,
} from '../../../helpers/layoutFoo';

interface Props {
    navigation: any;
    route: any;
}

const Profile: React.FC<Props> = (props: Props) => {
    const trans = I18n.t('MainProfile');

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
        },
        header: {
            marginTop: getVerticalPx(65),
            left: getCenterLeftPx(),
            width: getWidthPx(),
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'center',
            fontSize: getHorizontalPx(18),
            color: '#313131',
        },
        wrap: {
            position: 'absolute',
            width: getWidthPx(),
            left: getCenterLeftPx(),
            marginBottom: getVerticalPx(65),
            marginTop: getVerticalPx(128),
        },
        title: {
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: 18,
            color: '#555555',
            textAlign: 'left',
            position: 'relative',
            marginBottom: getVerticalPx(4.5),
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>{trans.header}</Text>
            <View style={styles.wrap}>
                <Text style={styles.title}>{trans.title}</Text>
                {/* <BlueButton onpress={() => {}} title={trans.app} /> */}
                <BlueButton
                    onpress={() => props.navigation.navigate('Regulations')}
                    title={trans.regulations}
                />
                <BlueButton
                    onpress={() => props.navigation.navigate('PrivacyPolicy')}
                    title={trans.privacyPolicy}
                />
                <BlueButton
                    onpress={() => props.navigation.navigate('Contact')}
                    title={trans.contact}
                />
            </View>

            <TabBackGround />
        </SafeAreaView>
    );
};

export default Profile;

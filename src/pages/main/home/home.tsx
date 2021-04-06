import React from "react";
import { StyleSheet, Dimensions, SafeAreaView, View, Text } from 'react-native';
import TabBackGround from '../../../sharedComponents/navi/tabBackGround';

import KroosLogo from '../../../sharedComponents/svg/krossLogo';

import {
    setAppSize,
    setObjSize,
    getCenterLeftPx,
    getTopPx,
    getWidthPx,
} from '../../../helpers/layoutFoo';

interface Props {
    navigation: any,
    route: any,
};

const Home: React.FC<Props> = (props: Props) => {

    // const trans = I18n.t('Profile').view;

    const ww = Dimensions.get('window').width;
    const wh = Dimensions.get('window').height;
    setAppSize(ww, wh);

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: "#fdf5f5"
        },
        header: {
            position: 'absolute',
            width: getWidthPx(),
            height: getTopPx(20),
            left: getCenterLeftPx(),
            top: getTopPx(65),
            alignItems: 'center',
        },
        text: {
            top: -30,
            fontFamily: "DIN2014Narrow-Regular",
            fontSize: 40,
            color: '#313131',
            textAlign: 'center',
        }
    })

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <KroosLogo></KroosLogo>
            </View>

            <Text style={styles.text}>Home</Text>

            <TabBackGround></TabBackGround>

        </SafeAreaView>
    )
}


export default Home
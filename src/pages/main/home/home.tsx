import React from "react";
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import TabBackGround from '../../../sharedComponents/navi/tabBackGround';

import KroosLogo from '../../../sharedComponents/svg/krossLogo';

import {
    setObjSize,
    getCenterLeftPx,
    getVerticalPx,
    getWidthPx,
} from '../../../helpers/layoutFoo';

interface Props {
    navigation: any,
    route: any,
};

const Home: React.FC<Props> = (props: Props) => {
    setObjSize(334, 50);
    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: "#fff"
        },
        header: {
            position: 'absolute',
            width: getWidthPx(),
            height: getVerticalPx(20),
            left: getCenterLeftPx(),
            top: getVerticalPx(65),
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
import React from "react";
import { StyleSheet, Dimensions, View } from 'react-native';
import Image from 'react-native-remote-svg';

import {
    setAppSize,
    getStandard
} from '../../../helpers/layoutFoo';

const SplashScreen = () => {
    const ww = Dimensions.get('window').width;
    const wh = Dimensions.get('window').height;
    setAppSize(ww, wh);

    let styles = StyleSheet.create({
        container: {
            width: ww,
            height: '100%',
            backgroundColor: 'white'
        },
        krossLogo: getStandard(242, 130, 226),
        krossYouCan: getStandard(118, 52, 767),
        khaki: {
            backgroundColor: 'khaki'
        },
    })

    return (
        <View style={styles.container}>
            <View style={styles.krossLogo}>
                <Image
                    source={require('./krossLogo.svg')}
                    style={{ width: "100%", height: "100%" }}
                />
            </View>

            <View style={styles.krossYouCan}>
                <Image
                    source={require('./krossYouCan.svg')}
                    style={{ width: "100%", height: "100%" }}
                />
            </View>
        </View>
    )
}

export default SplashScreen;
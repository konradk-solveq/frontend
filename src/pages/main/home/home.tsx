

import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, SafeAreaView, View, Text } from 'react-native';
import I18n from 'react-native-i18n';
import { connect } from "react-redux";
import Image from 'react-native-remote-svg';



import StackHeader from '../../../sharedComponents/navi/stackHeader';
import BigWhiteBtn from '../../../sharedComponents/buttons/bigWhiteBtn';
import BigRedBtn from '../../../sharedComponents/buttons/bigRedBtn';


import {
    setAppSize,
    setObjSize,
    getCenterLeft,
    getCenterLeftPx,
    getTopPx,
    getWidth,
    getWidthPx,
    getWidthPxOf,
    getHeightPx,
} from '../../../helpers/layoutFoo';

interface Props {
    navigation: any,
    route: any,
};

const Home: React.FC<Props> = (props: Props) => {

    const trans = I18n.t('Profile').view;

    const [profilType, setProfilType] = useState(0); // dane poszczególnych pól


    const ww = Dimensions.get('window').width;
    const wh = Dimensions.get('window').height;
    setAppSize(ww, wh);

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: "red"
        }
    })

    return (
        <SafeAreaView style={styles.container}>

            <Text>home</Text>



        </SafeAreaView>
    )
}

export default Home
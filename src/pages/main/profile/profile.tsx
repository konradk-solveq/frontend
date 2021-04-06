import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, SafeAreaView, View, Text } from 'react-native';
import I18n from 'react-native-i18n';
import TabBackGround from '../../../sharedComponents/navi/tabBackGround';


import {
    initAppSize,
} from '../../../helpers/layoutFoo';

interface Props {
    navigation: any,
    route: any,
};

const Profile: React.FC<Props> = (props: Props) => {

    // const trans = I18n.t('Profile').view;

    initAppSize();

    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: "#fdf5f5"
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

            <Text style={styles.text}>Profile</Text>

            <TabBackGround></TabBackGround>

        </SafeAreaView>
    )
}

export default Profile
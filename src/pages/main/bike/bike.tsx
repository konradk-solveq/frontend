import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, SafeAreaView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import TabBackGround from '../../../sharedComponents/navi/tabBackGround';
import { getBikesData, setBikesData } from '../../../storage/actions/index';
import { ScrollView } from 'react-native-gesture-handler';

import Warranty from './warranty';

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
    bikesData: any
    getBikesData: Function,
    setBikesData: Function,
};

const Bike: React.FC<Props> = (props: Props) => {

    const bike = props.bikesData[0];
    const trans = I18n.t('MainBike');

    const ww = Dimensions.get('window').width;
    const wh = Dimensions.get('window').height;
    setAppSize(ww, wh);

    setObjSize(334, 50);
    const w = getWidthPx();
    const l = getCenterLeftPx();
    const styles = StyleSheet.create({
        container: {
            // display: 'flex',
            // justifyContent: 'center',
            // alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#fdf5f5'
        },
        scroll: {
            backgroundColor: 'green'

        },
        header: {
            marginTop: getTopPx(65),
            left: l,
            width: w,
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'center',
            fontSize: 18,
            color: '#313131',
        },
        bikeName: {
            marginTop: getTopPx(48),
            left: l,
            width: w,
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: 40,
            color: '#313131',
            textAlign: 'center',
        },
        bikeDetails: {
            marginTop: getTopPx(5),
            left: l,
            width: w,
            backgroundColor: 'khaki',
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'center',
            fontSize: 15,
            color: '#555555',
        },
        warranty: {
            marginTop: getTopPx(76),
        }
    })

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll}>

                <Text style={styles.header}>{trans.header}</Text>

                <Text style={styles.bikeName}>{bike.description.name}</Text>

                <Text style={styles.bikeDetails}>
                    {trans.details[0] + bike.description.producer + trans.details[1] + bike.description.frame}
                </Text>

                <Warranty
                    style={styles.warranty}
                    type={bike.warranty.type}
                    toEnd={bike.warranty.toEnd}
                    description={trans.warranty}
                />

            </ScrollView>

            <TabBackGround></TabBackGround>

        </SafeAreaView>
    )
}

const mapStateToProps = (state: any) => {
    return {
        bikesData: state.bikes.list
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    setBikesData: (name: string) => dispatch(setBikesData(name)),
    getBikesData: async () => dispatch(await getBikesData()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Bike)
import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import I18n from 'react-native-i18n';
import {useAppSelector} from '../../../hooks/redux';

import {UserBike} from '../../../models/userBike.model';
import {getBike} from '../../../helpers/transformUserBikeData';

import {
    setObjSize,
    getCenterLeftPx,
    getVerticalPx,
    getWidthPx,
    getWidthPxOf,
    getHeightPx,
    getHorizontalPx,
} from '../../../helpers/layoutFoo';

import BigWhiteBtn from '../../../sharedComponents/buttons/bigWhiteBtn';
import BigRedBtn from '../../../sharedComponents/buttons/bigRedBtn';
import StackHeader from '../../../sharedComponents/navi/stackHeader/stackHeader';

interface IProps {
    navigation: any;
    route: any;
}

const BikeSummary: React.FC<IProps> = ({navigation, route}: IProps) => {
    const trans: any = I18n.t('BikeSummary');

    const frameNumber = route.params.frameNumber;
    const bikeData = useAppSelector<UserBike | null>(state =>
        getBike(state.bikes.list, frameNumber),
    );

    /* TODO: try to exctract */
    setObjSize(334, 50);
    const w = getWidthPx();
    const l = getCenterLeftPx();
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
        },
        list: {
            width: getWidthPx(),
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'row',
        },
        bottons: {
            position: 'relative',
            width: getWidthPx(),
            height: getHeightPx(),
            left: getCenterLeftPx(),
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: getVerticalPx(29),
        },
        btn: {
            width: getWidthPxOf(157),
        },
        spaceOnEnd: {
            width: '100%',
            height: getVerticalPx(65),
        },
        params: {
            position: 'absolute',
            top: getVerticalPx(65 - 13),
            right: getHorizontalPx(40 - 13),
            width: getHorizontalPx(13 + 20 + 13),
            height: getHorizontalPx(13 + 20 + 13),
        },
        bikeName: {
            marginTop: getVerticalPx(148),
            left: l,
            width: w,
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getHorizontalPx(40),
            color: '#313131',
            textAlign: 'center',
        },
        bikeDetails: {
            marginTop: getVerticalPx(5),
            left: l,
            width: w,
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'center',
            fontSize: getHorizontalPx(15),
            color: '#555555',
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <StackHeader
                onpress={() => navigation.pop()}
                inner={trans.header}
            />

            <Text style={styles.bikeName}>{bikeData?.description.name}</Text>

            <Text style={styles.bikeDetails}>
                {trans.details[0] +
                    bikeData?.description.producer +
                    trans.details[1] +
                    bikeData?.description.serial_number}
            </Text>

            <View style={styles.bottons}>
                <View style={styles.btn}>
                    <BigWhiteBtn
                        title={trans.btnChange}
                        onpress={() => navigation.navigate('AddingByNumber')}
                    />
                </View>

                <View style={styles.btn}>
                    <BigRedBtn
                        title={trans.goForward}
                        onpress={() => navigation.navigate('CyclingProfile')}
                    />
                </View>
            </View>

            <View style={styles.spaceOnEnd} />
        </SafeAreaView>
    );
};

export default BikeSummary;

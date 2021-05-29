import React, {useCallback} from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import I18n from 'react-native-i18n';
import {useAppSelector, useAppDispatch} from '../../../hooks/redux';
import {
    setOnboardingFinished,
    removeBikeByNumber,
} from '../../../storage/actions';

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
import BikeImage from '../../../sharedComponents/images/bikeImage';
import {SizeLabel, ColorLabel} from '../../../sharedComponents/labels';
import Curve from '../../../sharedComponents/svg/curve';
import useCustomBackNavButton from '../../../hooks/useCustomBackNavBtn';

interface IProps {
    navigation: any;
    route: any;
}

const BikeSummary: React.FC<IProps> = ({navigation, route}: IProps) => {
    const trans: any = I18n.t('BikeSummary');
    const dispatch = useAppDispatch();

    const userName =
        useAppSelector<string>(state => state.user.userName) || trans.anonim;
    const onboardingFinished = useAppSelector<boolean>(
        state => state.user.onboardingFinished,
    );
    const frameNumber = route.params.frameNumber;
    const bikeData = useAppSelector<UserBike | null>(state =>
        getBike(state.bikes.list, frameNumber),
    );

    const removeBikeOnCancel = useCallback(() => {
        dispatch(removeBikeByNumber(frameNumber));
    }, [dispatch, frameNumber]);

    useCustomBackNavButton(removeBikeOnCancel);
    /* TODO: try to exctract */
    setObjSize(334, 50);
    const w = getWidthPx();
    const l = getCenterLeftPx();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',
            height: getVerticalPx(896),
        },
        contentContainer: {
            marginTop: getVerticalPx(88),
        },
        bottons: {
            position: 'absolute',
            width: getWidthPx(),
            height: 50,
            left: getCenterLeftPx(),
            flexDirection: 'row',
            justifyContent: 'space-between',
            bottom: getVerticalPx(65),
        },
        btn: {
            width: getWidthPxOf(157),
        },
        userName: {
            left: l,
            width: w,
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: getHorizontalPx(30),
            color: '#313131',
        },
        bikeName: {
            marginTop: getVerticalPx(-20),
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

    const onGoForwrdHandle = () => {
        if (!onboardingFinished) {
            dispatch(setOnboardingFinished(true));
        }
        navigation.reset({
            index: 0,
            routes: [{name: 'MineMenu'}],
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StackHeader
                onpress={() => {
                    removeBikeOnCancel();
                    navigation.pop();
                }}
                inner={trans.header}
            />

            <View style={styles.contentContainer}>
                <Text style={styles.userName}>
                    {`${userName}${trans.title}`}
                </Text>

                {bikeData?.images && bikeData.images.length > 0 ? (
                    <BikeImage imgUrl={bikeData.images[0]} />
                ) : (
                    <BikeImage />
                )}

                <Curve />

                <Text style={styles.bikeName}>
                    {bikeData?.description.name}
                </Text>

                <Text style={styles.bikeDetails}>
                    {trans.details[0] +
                        bikeData?.description.producer +
                        trans.details[1] +
                        bikeData?.description.serial_number}
                </Text>

                {bikeData?.description?.color && (
                    <ColorLabel
                        text={bikeData.description.color}
                        colors={bikeData.description.colorCodes}
                        containerStyle={{marginLeft: getCenterLeftPx()}}
                    />
                )}

                {bikeData?.description?.size && (
                    <SizeLabel
                        text={bikeData.description.size}
                        containerStyle={{marginLeft: getCenterLeftPx()}}
                    />
                )}
            </View>

            <View style={styles.bottons}>
                <View style={styles.btn}>
                    <BigWhiteBtn
                        title={trans.btnChange}
                        onpress={() => {
                            removeBikeOnCancel();
                            navigation.navigate('TurtorialNFC');
                        }}
                    />
                </View>

                <View style={styles.btn}>
                    <BigRedBtn
                        title={trans.goForward}
                        onpress={() => {
                            /* TODO: this change is temporary - business  decision */
                            // navigation.navigate('CyclingProfile')
                            /* start to delete */
                            onGoForwrdHandle();
                            // navigation.replace('MineMenu');
                            /* end to delete */
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default BikeSummary;

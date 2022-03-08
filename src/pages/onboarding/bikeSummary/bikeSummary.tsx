import React, {useCallback, useMemo} from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {useAppSelector, useAppDispatch} from '@hooks/redux';
import {
    setOnboardingFinished,
    removeBikeByNumber,
    setDeepLinkActionForScreen,
} from '@storage/actions';

import {
    bikeByFrameNumberSelector,
    onboardingFinishedSelector,
} from '@storage/selectors';

import {
    setObjSize,
    getCenterLeftPx,
    getVerticalPx,
    getWidthPx,
    getWidthPxOf,
    getHorizontalPx,
    getFontSize,
    mainButtonsHeight,
} from '@helpers/layoutFoo';

import BigWhiteBtn from '@sharedComponents/buttons/bigWhiteBtn';
import BigRedBtn from '@sharedComponents/buttons/bigRedBtn';
import StackHeader from '@sharedComponents/navi/stackHeader/stackHeader';
import BikeImage from '@sharedComponents/images/bikeImage';
import {SizeLabel, ColorLabel} from '@sharedComponents/labels';
import Curve from '@sharedComponents/svg/curve';
import useCustomBackNavButton from '@hooks/useCustomBackNavBtn';
import {OnboardingStackRoute, RegularStackRoute} from '@navigation/route';
import {commonStyle as comStyle} from '@helpers/commonStyle';

interface IProps {
    navigation: any;
    route: any;
}

const BikeSummary: React.FC<IProps> = ({navigation, route}: IProps) => {
    const {t} = useMergedTranslation('BikeSummary');
    const dispatch = useAppDispatch();

    const userName =
        useAppSelector<string>(state => state.user.userName) || t('anonim');
    const onboardingFinished = useAppSelector<boolean>(
        onboardingFinishedSelector,
    );
    const frameNumber = route.params.frameNumber;
    const bikeData = useAppSelector(state =>
        bikeByFrameNumberSelector(state, frameNumber),
    );
    const nfcTutorialRouteName = useMemo(
        () =>
            !onboardingFinished
                ? OnboardingStackRoute.TURTORIAL_NFC_ONBOARDING_SCREEN
                : RegularStackRoute.TURTORIAL_NFC_SCREEN,
        [onboardingFinished],
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
        contentContainer: {
            marginTop: getHorizontalPx(110),
        },
        bottons: {
            position: 'absolute',
            width: getWidthPx(),
            height: mainButtonsHeight(50),
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
            fontSize: getFontSize(30),
            color: '#313131',
        },
        bikeName: {
            marginTop: getVerticalPx(-20),
            left: l,
            width: w,
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getFontSize(40),
            color: '#313131',
            textAlign: 'center',
        },
        bikeDetails: {
            marginTop: getVerticalPx(5),
            left: l,
            width: w,
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'center',
            fontSize: getFontSize(15),
            color: '#555555',
        },
    });

    const onGoForwrdHandle = () => {
        if (!onboardingFinished) {
            dispatch(setOnboardingFinished(true));
            dispatch(setDeepLinkActionForScreen('HomeTab'));
        } else {
            /**
             * Go back to 'BikeScreen'
             */
            navigation.navigate(RegularStackRoute.BIKE_SCREEN);
        }
    };

    return (
        <SafeAreaView style={comStyle.container}>
            <StackHeader
                onpress={() => {
                    removeBikeOnCancel();
                    navigation.pop();
                }}
                inner={t('header')}
            />

            <View style={styles.contentContainer}>
                <Text style={styles.userName}>
                    {t('title', {name: userName})}
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
                    {t('details', {
                        producer: bikeData?.description.producer,
                        serial_number: bikeData?.description.serial_number,
                    })}
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
                        title={t('btnChange')}
                        onpress={() => {
                            removeBikeOnCancel();
                            navigation.navigate(nfcTutorialRouteName);
                        }}
                    />
                </View>

                <View style={styles.btn}>
                    <BigRedBtn
                        title={t('goForward')}
                        onpress={() => {
                            onGoForwrdHandle();
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default BikeSummary;

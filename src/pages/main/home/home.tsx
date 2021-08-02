import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, ScrollView, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import KroosLogo from '@sharedComponents/svg/krossLogo';
import {trackerActiveSelector} from '@storage/selectors/routes';
import {hasRecordedRoutesSelector} from '@storage/selectors/map';
import {showedLocationInfoSelector} from '@storage/selectors/app';
import {
    onRecordTripActionHandler,
    showLocationInfo,
} from '@utils/showAndroidLlocationInfo';
import {hasAnyBikeSelector} from '@storage/selectors/bikes';

import {syncAppSelector} from '@storage/selectors';
import Tile from './tile';

import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {I18n} from '@translations/I18n';
import {nfcIsSupported} from '@helpers/nfc';
import {BothStackRoute, RegularStackRoute} from '@navigation/route';

import TabBackGround from '@sharedComponents/navi/tabBackGround';
import Loader from '@pages/onboarding/bikeAdding/loader/loader';
import NoBikeAddedModal from '@sharedComponents/modals/noBikeAddedModal/noBikeAddedModal';

import styles from './style';

const isIOS = Platform.OS === 'ios';

const Home: React.FC = () => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const trans: any = I18n.t('MainHome');
    const isTrackerActive = useAppSelector(trackerActiveSelector);
    const hasRecordedRoutes = useAppSelector(hasRecordedRoutesSelector);
    const syncStatus = useAppSelector(syncAppSelector);
    const isLocationInfoShowed = useAppSelector(showedLocationInfoSelector);
    const userHasAnyBike = useAppSelector(hasAnyBikeSelector);

    const [showModal, setShowModal] = useState(false);

    /* TODO: move initialization to splashs screen or add loader */
    useEffect(() => {
        if (isTrackerActive) {
            navigation.navigate(RegularStackRoute.COUNTER_SCREEN);
        }
    }, [isTrackerActive, navigation]);

    const [nfc, setNfc] = useState();

    nfcIsSupported().then(r => {
        setNfc(r);
    });

    const onAddActionHandler = () => {
        navigation.navigate({
            name: nfc
                ? BothStackRoute.TURTORIAL_NFC_SCREEN
                : BothStackRoute.ADDING_BY_NUMBER_SCREEN,
            params: {emptyFrame: true},
        });
    };

    const doAction = () => {
        if (!userHasAnyBike) {
            setShowModal(true);
            return;
        }

        Platform.OS === 'ios' || isLocationInfoShowed
            ? onRecordTripActionHandler(navigation, isIOS)
            : showLocationInfo(navigation, dispatch);
    };

    const onContinueHandler = () => {
        setShowModal(false);
        onAddActionHandler();
    };

    const onCancelHandler = () => {
        setShowModal(false);
    };

    if (syncStatus) {
        return <Loader />;
    }

    return (
        <SafeAreaView style={styles.container1}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <KroosLogo />
                </View>

                <View style={styles.container}>
                    <View style={styles.tileWrapper}>
                        {!hasRecordedRoutes ? (
                            <Tile
                                title={trans.thirdTitle}
                                description={trans.thirdText}
                                btnText={trans.thirdBtn}
                                style={styles.tileSpace}
                                onPress={doAction}
                            />
                        ) : (
                            <Tile
                                title={trans.fourthTitle}
                                description={trans.fourthText}
                                btnText={trans.fourthBtn}
                                style={styles.tileSpace}
                                onPress={doAction}
                            />
                        )}
                        <Tile
                            title={trans.secondTitle}
                            description={trans.secondText}
                            btnText={trans.secondBtn}
                            style={styles.tileSpace}
                            onPress={onAddActionHandler}
                        />
                        {/* <Tile
                            title={trans.firstTitle}
                            description={trans.firstText}
                            btnText={trans.firstBtn}
                            style={styles.tileSpace}
                            onPress={onCheckActionHandler}
                        /> */}
                    </View>
                </View>
            </ScrollView>

            <TabBackGround />

            <NoBikeAddedModal
                showModal={showModal}
                onContinue={onContinueHandler}
                onClose={onCancelHandler}
            />
        </SafeAreaView>
    );
};

export default Home;

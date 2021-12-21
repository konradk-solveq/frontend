import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
    SafeAreaView,
    View,
    ScrollView,
    Platform,
    Dimensions,
    StyleSheet,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

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
import {getVerticalPx} from '@src/helpers/layoutFoo';
import {isIOS} from '@utils/platform';
import {getAppLayoutConfig} from '@helpers/appLayoutConfig';
import {commonStyle as comStyle} from '@helpers/commonStyle';

const {width, height} = Dimensions.get('window');

const Home: React.FC = () => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const trans: any = I18n.t('MainHome');
    const mountedRef = useRef(false);

    const isTrackerActive = useAppSelector(trackerActiveSelector);
    const hasRecordedRoutes = useAppSelector(hasRecordedRoutesSelector);
    const syncStatus = useAppSelector(syncAppSelector);
    const isLocationInfoShowed = useAppSelector(showedLocationInfoSelector);
    const userHasAnyBike = useAppSelector(hasAnyBikeSelector);

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        return () => {
            mountedRef.current = false;
        };
    }, []);

    /* TODO: move initialization to splashs screen or add loader */
    const redirectToCoutnerScreen = useCallback(() => {
        if (isTrackerActive && !mountedRef.current) {
            mountedRef.current = true;
            navigation.navigate(RegularStackRoute.COUNTER_SCREEN);
        }
    }, [isTrackerActive, navigation]);

    useFocusEffect(redirectToCoutnerScreen);

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

    const scrollTop = getVerticalPx(100) - 0;
    const styles = StyleSheet.create({
        container: {
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
        },
        header: {
            position: 'absolute',
            width: width,
            height: getVerticalPx(20),
            top:
                getVerticalPx(70) -
                (isIOS ? 0 : getAppLayoutConfig.statusBarH()),
            zIndex: 1,
            alignItems: 'center',
        },
        tileWrapper: {
            top: getVerticalPx(38),
            paddingBottom: getVerticalPx(260),
        },
        tileSpace: {
            marginBottom: 25,
        },
    });

    return (
        <SafeAreaView style={comStyle.container}>
            <View style={comStyle.scroll}>
                <ScrollView showsVerticalScrollIndicator={false}>
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
            </View>

            <View style={styles.header}>
                <KroosLogo />
            </View>

            <TabBackGround />

            {!isTrackerActive && (
                <NoBikeAddedModal
                    showModal={showModal}
                    onContinue={onContinueHandler}
                    onClose={onCancelHandler}
                />
            )}
        </SafeAreaView>
    );
};

export default Home;

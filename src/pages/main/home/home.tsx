import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
    Dimensions,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import useNavigateOnDeepLink from '@navigation/hooks/useNavigateOnDeepLink';
import KroosLogo from '@sharedComponents/svg/krossLogo';
import {trackerActiveSelector} from '@storage/selectors/routes';
import {hasRecordedRoutesSelector} from '@storage/selectors/map';
import {showedLocationInfoSelector} from '@storage/selectors/app';
import {
    onRecordTripActionHandler,
    showLocationInfo,
} from '@utils/showAndroidLlocationInfo';

import {syncAppSelector} from '@storage/selectors';
import Tile from './tile';

import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {nfcIsSupported} from '@helpers/nfc';
import {BothStackRoute, RegularStackRoute} from '@navigation/route';

import TabBackGround from '@sharedComponents/navi/tabBackGround';
import Loader from '@pages/onboarding/bikeAdding/loader/loader';
import NoBikeAddedModal from '@sharedComponents/modals/noBikeAddedModal/noBikeAddedModal';
import {getVerticalPx} from '@src/helpers/layoutFoo';
import {isIOS} from '@utils/platform';
import {getAppLayoutConfig} from '@theme/appLayoutConfig';
import {commonStyle as comStyle} from '@helpers/commonStyle';

const {width} = Dimensions.get('window');

const Home: React.FC = () => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const {t} = useMergedTranslation('MainHome');
    const mountedRef = useRef(false);
    const isTrackerActive = useAppSelector(trackerActiveSelector);
    const hasRecordedRoutes = useAppSelector(hasRecordedRoutesSelector);
    const syncStatus = useAppSelector(syncAppSelector);
    const isLocationInfoShowed = useAppSelector(showedLocationInfoSelector);

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

    useNavigateOnDeepLink(true);

    const onAddActionHandler = () => {
        navigation.navigate({
            name: nfc
                ? BothStackRoute.TURTORIAL_NFC_SCREEN
                : BothStackRoute.ADDING_BY_NUMBER_SCREEN,
            params: {emptyFrame: true},
        });
    };

    const doAction = () => {
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
                                    title={t('thirdTitle')}
                                    description={t('thirdText')}
                                    btnText={t('thirdBtn')}
                                    style={styles.tileSpace}
                                    onPress={doAction}
                                />
                            ) : (
                                <Tile
                                    title={t('fourthTitle')}
                                    description={t('fourthText')}
                                    btnText={t('fourthBtn')}
                                    style={styles.tileSpace}
                                    onPress={doAction}
                                />
                            )}
                            <Tile
                                title={t('secondTitle')}
                                description={t('secondText')}
                                btnText={t('secondBtn')}
                                style={styles.tileSpace}
                                onPress={onAddActionHandler}
                            />
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

import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, View, Alert, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import KroosLogo from '../../../sharedComponents/svg/krossLogo';
import {trackerActiveSelector} from '../../../storage/selectors/routes';

import useAppInit from '../../../hooks/appInit';
import {
    setObjSize,
    getCenterLeftPx,
    getVerticalPx,
    getWidthPx,
} from '../../../helpers/layoutFoo';
import AddBike from './addBike';

import {useAppSelector} from '../../../hooks/redux';
import {I18n} from '../../../../I18n/I18n';
import {nfcIsSupported} from '../../../helpers/nfc';
import {RegularStackRoute} from '../../../navigation/route';

import TabBackGround from '../../../sharedComponents/navi/tabBackGround';
import Loader from '../../onboarding/bikeAdding/loader/loader';

const Home: React.FC = () => {
    const navigation = useNavigation();
    const trans: any = I18n.t('MainHome');
    const isTrackerActive = useAppSelector(trackerActiveSelector);

    const {syncStatus, error, clearAppSyncError} = useAppInit();

    useEffect(() => {
        if (!syncStatus && error.statusCode > 400) {
            Alert.alert('', error.message, [
                {
                    text: 'Ok',
                    onPress: clearAppSyncError,
                },
            ]);
            return;
        }
    }, [syncStatus, error, clearAppSyncError]);

    /* TODO: move initialization to splashs screen or add loader */
    useEffect(() => {
        if (isTrackerActive) {
            navigation.navigate(RegularStackRoute.COUNTER_ROUTE_SCREEN);
        }
    }, [isTrackerActive, navigation]);

    const [nfc, setNfc] = useState();

    nfcIsSupported().then(r => {
        setNfc(r);
    });

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        container1: {
            flex: 1,
            backgroundColor: '#ffffff',
        },
        container: {
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
        },
        header: {
            position: 'absolute',
            width: getWidthPx(),
            height: getVerticalPx(20),
            left: getCenterLeftPx(),
            top: getVerticalPx(65),
            zIndex: 1,
            alignItems: 'center',
        },
        tileWrapper: {
            top: getVerticalPx(138),
            paddingBottom: getVerticalPx(230),
        },
        tileSpace: {
            marginBottom: 25,
        },
    });

    const onAddActionHandler = () => {
        navigation.navigate({
            name: nfc ? 'TurtorialNFC' : 'AddingByNumber',
            params: {emptyFrame: true},
        });
    };

    const onCheckActionHandler = () => {
        navigation.navigate('Bike');
    };

    const onRecordTripActionHandler = () => {
        navigation.navigate(RegularStackRoute.COUNTER_ROUTE_SCREEN);
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
                        <AddBike
                            title={trans.firstTitle}
                            description={trans.firstText}
                            btnText={trans.firstBtn}
                            style={styles.tileSpace}
                            onPress={onCheckActionHandler}
                        />
                        <AddBike
                            title={trans.secondTitle}
                            description={trans.secondText}
                            btnText={trans.secondBtn}
                            style={styles.tileSpace}
                            onPress={onAddActionHandler}
                        />
                        <AddBike
                            title={trans.thirdTitle}
                            description={trans.secondText}
                            btnText={trans.thirdBtn}
                            onPress={onRecordTripActionHandler}
                        />
                    </View>
                </View>
            </ScrollView>

            <TabBackGround />
        </SafeAreaView>
    );
};

export default Home;

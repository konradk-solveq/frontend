import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import TabBackGround from '../../../sharedComponents/navi/tabBackGround';
import {useNavigation} from '@react-navigation/native';

import KroosLogo from '../../../sharedComponents/svg/krossLogo';

import {
    setObjSize,
    getCenterLeftPx,
    getVerticalPx,
    getWidthPx,
} from '../../../helpers/layoutFoo';
import AddBike from './addBike';
import {setBikesListByFrameNumbers} from '../../../storage/actions/bikes';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {I18n} from '../../../../I18n/I18n';
import {nfcIsSupported} from '../../../helpers/nfc';

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const isOnline = useAppSelector<boolean>(state => !state.app.isOffline);
    const trans: any = I18n.t('MainHome');

    const [nfc, setNfc] = useState();

    useEffect(() => {
        if (isOnline) {
            synchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const synchData = async () => {
        try {
            /* TODO: add some sync/info loader */
            await dispatch(setBikesListByFrameNumbers());
        } catch (error) {
            /* TODO: add some UI information */
            console.log('[Sync Error]', error);
        }
    };

    nfcIsSupported().then(r => {
        setNfc(r);
    });

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        container1: {
            flex: 1,
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

    return (
        <SafeAreaView style={styles.container1}>
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
                        onPress={onAddActionHandler}
                    />
                </View>
            </View>

            <TabBackGround />
        </SafeAreaView>
    );
};

export default Home;

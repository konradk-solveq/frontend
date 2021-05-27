import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';


import useAppInit from '../../../hooks/appInit';
import {
    setObjSize,
    getCenterLeftPx,
    getVerticalPx,
    getWidthPx,
} from '../../../helpers/layoutFoo';
import AddBike from './addBike';
import {I18n} from '../../../../I18n/I18n';
import {nfcIsSupported} from '../../../helpers/nfc';

import TabBackGround from '../../../sharedComponents/navi/tabBackGround';
import KroosLogo from '../../../sharedComponents/svg/krossLogo';

const Home: React.FC = () => {
    const navigation = useNavigation();
    const trans: any = I18n.t('MainHome');

    const [nfc, setNfc] = useState();

    const {isOnline} = useAppInit();

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

import React, {useEffect} from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import TabBackGround from '../../../sharedComponents/navi/tabBackGround';

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

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const isOnline = useAppSelector<boolean>(state => !state.app.isOffline);

    useEffect(() => {
        if (isOnline) {
            synchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const synchData = async () => {
        try {
            /* TODO: add some sync/info loader */
            const res = await dispatch(setBikesListByFrameNumbers());
        } catch (error) {
            /* TODO: add some UI information */
            console.log('[Sync Error]', error);
        }
    };

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
    });

    return (
        <SafeAreaView style={styles.container1}>
            <View style={styles.header}>
                <KroosLogo />
            </View>

            <View style={styles.container}>
                <View style={styles.tileWrapper}>
                    <AddBike />
                </View>
            </View>

            <TabBackGround />
        </SafeAreaView>
    );
};

export default Home;

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Linking} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import useNavigateOnDeepLink from '@navigation/hooks/useNavigateOnDeepLink';
import {trackerActiveSelector} from '@storage/selectors/routes';

import {syncAppSelector, userNameSelector} from '@storage/selectors';

import {useAppSelector} from '@hooks/redux';
import {nfcIsSupported} from '@helpers/nfc';

import Loader from '@components/svg/loader/loader';
import GenericScreen from '@pages/template/GenericScreen';
import {HomeContainer} from '@containers/Home';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import colors from '@theme/colors';
import {appConfigSelector} from '@storage/selectors/app';

const Home: React.FC = () => {
    const navigation = useNavigation();
    const mountedRef = useRef(false);
    const isTrackerActive = useAppSelector(trackerActiveSelector);
    const syncStatus = useAppSelector(syncAppSelector);
    const {ads} = useAppSelector(appConfigSelector);
    const [nfc, setNfc] = useState(false);
    const {top} = useSafeAreaInsets();
    useEffect(() => {
        return () => {
            mountedRef.current = false;
        };
    }, []);

    const userName = useAppSelector(userNameSelector);

    /* TODO: move initialization to splashs screen or add loader */
    const redirectToCoutnerScreen = useCallback(() => {
        if (isTrackerActive && !mountedRef.current) {
            mountedRef.current = true;
            navigation.navigate('RecordTab');
        }
    }, [isTrackerActive, navigation]);

    useFocusEffect(redirectToCoutnerScreen);

    useNavigateOnDeepLink(true);

    nfcIsSupported().then(r => {
        setNfc(r);
    });

    const onAddKrossBike = useCallback(() => {
        navigation.navigate(nfc ? 'AddBike' : 'AddBikeByNumber', {
            emptyFrame: true,
        });
    }, [navigation, nfc]);

    const onAddOtherBike = useCallback(() => {
        navigation.navigate('AddOtherBike', {
            frameNumber: '',
        });
    }, [navigation]);

    const handleStoreTilePress = () => {
        ads.url && Linking.openURL(ads.url);
    };

    if (syncStatus) {
        return <Loader />;
    }

    return (
        <GenericScreen transculentStatusBar hideBackArrow>
            <View style={[styles.container, {paddingTop: top}]}>
                <HomeContainer
                    userName={userName}
                    onAddBikePressPrimary={onAddKrossBike}
                    onAddBikePressSecondary={onAddOtherBike}
                    onStoreTilePress={handleStoreTilePress}
                />
            </View>
        </GenericScreen>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.whiteGrey,
    },
});

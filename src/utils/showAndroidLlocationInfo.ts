import {Dispatch} from 'redux';
import BackgroundGeolocation from 'react-native-background-geolocation';

import {RegularStackRoute} from '@navigation/route';
import {showAndroidLocationAlert} from '@sharedComponents/alerts/androidLocationInfoAlert';
import {setLocationInfoShowed} from '@storage/actions/app';
import {
    askFineLocationPermission,
    checkAndroidLocationPermission,
    requestGeolocationPermission,
    setConfigWithLocationPermission,
} from './geolocation';

export const onRecordTripActionHandler = async (
    navigation: any,
    askPermission?: boolean,
) => {
    if (askPermission) {
        await setConfigWithLocationPermission('Always');
        const perm = await requestGeolocationPermission();

        if (perm !== BackgroundGeolocation.AUTHORIZATION_STATUS_ALWAYS) {
            await setConfigWithLocationPermission('WhenInUse');
        }
    }
    navigation.navigate('RecordTab', {});
};

export const showLocationInfo = async (
    navigation: any,
    dispatch: Dispatch<any>,
) => {
    const permissionsType = await checkAndroidLocationPermission();
    if (!permissionsType.coarseLocation && !permissionsType.fineLocation) {
        const res = await askFineLocationPermission();
        if (res !== 'granted') {
            navigation.navigate('RecordTab', {});
            return;
        }
    }
    dispatch(setLocationInfoShowed());

    return await showAndroidLocationAlert(
        () => onRecordTripActionHandler(navigation),
        () => onRecordTripActionHandler(navigation, true),
    );
};

import {Dispatch} from 'redux';

import {RegularStackRoute} from '../navigation/route';
import {showAndroidLocationAlert} from '../sharedComponents/alerts/androidLocationInfoAlert';
import {setLocationInfoShowed} from '../storage/actions/app';
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
        await requestGeolocationPermission();
        await setConfigWithLocationPermission('Always');
    } else {
        await setConfigWithLocationPermission('WhenInUse');
    }
    navigation.navigate(RegularStackRoute.COUNTER_SCREEN);
};

export const showLocationInfo = async (
    navigation: any,
    dispatch: Dispatch<any>,
) => {
    const permissionsType = await checkAndroidLocationPermission();
    if (!permissionsType.coarseLocation && !permissionsType.fineLocation) {
        const res = await askFineLocationPermission();
        if (res !== 'granted') {
            navigation.navigate(RegularStackRoute.COUNTER_SCREEN);
            return;
        }
    }
    dispatch(setLocationInfoShowed());

    return await showAndroidLocationAlert(
        () => onRecordTripActionHandler(navigation),
        () => onRecordTripActionHandler(navigation, true),
    );
};

import {Alert} from 'react-native';
import i18next from '@translations/i18next';

export const showAndroidLocationAlert = async (
    leftActionCallback: () => void,
    rightActionCallback: () => Promise<void>,
) => {
    const trans: any = i18next.t('Geolocation.locationPermission', {
        returnObjects: true,
    });

    Alert.alert(trans.title, trans.message, [
        {
            text: trans.leftButton,
            onPress: () => leftActionCallback(),
        },
        {
            text: trans.rightButton,
            onPress: async () => await rightActionCallback(),
        },
    ]);
};
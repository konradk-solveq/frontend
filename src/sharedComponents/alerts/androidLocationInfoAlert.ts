import {Alert} from 'react-native';
import {I18n} from '../../../I18n/I18n';

export const showAndroidLocationAlert = async (
    leftActionCallback: () => void,
    rightActionCallback: () => void,
) => {
    const trans: any = I18n.t('Geolocation.locationPermission');

    Alert.alert(trans.title, trans.message, [
        {
            text: trans.leftButton,
            onPress: () => leftActionCallback(),
        },
        {
            text: trans.rightButton,
            onPress: () => rightActionCallback(),
        },
    ]);
};
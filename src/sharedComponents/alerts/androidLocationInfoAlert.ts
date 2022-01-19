import {Alert} from 'react-native';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

export const showAndroidLocationAlert = async (
    leftActionCallback: () => void,
    rightActionCallback: () => Promise<void>,
) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {t} = useMergedTranslation('Geolocation');
    const trans: any = t('locationPermission');

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

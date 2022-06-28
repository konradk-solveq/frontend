import {isIOS} from '@utils/platform';
import {Linking} from 'react-native';

export const handleOpenSettings = () => {
    if (isIOS) {
        Linking.openURL('app-settings:');
    } else {
        Linking.openSettings();
    }
};

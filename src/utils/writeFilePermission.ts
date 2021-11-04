import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

export const askFilePermissionsOnAndroid = async () => {
    const granted = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, {
        title: 'Saving location data for debugging',
        message: 'MyKROSS app needs permission.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
    });

    if (granted === RESULTS.GRANTED) {
        return true;
    }

    console.warn('Files permission denied');
    return false;
};

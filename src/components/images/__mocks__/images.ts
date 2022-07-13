import {Image} from 'react-native';

export const images = [
    Image.resolveAssetSource(
        require('@pages/onboarding/tutorial/images/recordRoutes.png'),
    ).uri,
    Image.resolveAssetSource(
        require('@pages/onboarding/tutorial/images/publicRoutes.png'),
    ).uri,
    Image.resolveAssetSource(
        require('@pages/onboarding/tutorial/images/bikes.png'),
    ).uri,
    Image.resolveAssetSource(
        require('@pages/onboarding/tutorial/images/services.png'),
    ).uri,
];

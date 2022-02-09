import {useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

import {clearDeepLinkActionForScreen} from '@storage/actions';
import {
    apiAuthHeaderStateSelector,
    deepLinkingScreenToTakActionSelector,
} from '@storage/selectors';
import {useAppDispatch, useAppSelector} from '@hooks/redux';

import {clearDeepLink, DeepLink} from '@navigation/utils/handleDeepLinkUrl';
import {getScreenNameToNavigate} from '@navigation/utils/navigation';
import {InteractionManager} from 'react-native';

const useNavigateOnDeepLink = (onlyAuth?: boolean) => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const {name} = useRoute();
    const navigateFromScreen = useAppSelector(
        deepLinkingScreenToTakActionSelector,
    );
    /* Checks that the auth header has been set for http */
    const isUserAuth = useAppSelector(apiAuthHeaderStateSelector);

    useEffect(() => {
        /**
         * Without checking that the screen is focused,
         * the navigation does not work (on IOS) when the first
         * 'navigate' action is invoked after navigation stack has changed.
         */
        const unsubscribe = navigation.addListener('focus', () => {
            /**
             * Some endpoints only work when user is authenticated,
             * so not every screen will work.
             */
            if ((onlyAuth && !isUserAuth) || !navigateFromScreen) {
                return;
            }

            if (DeepLink.instance && DeepLink.shareId) {
                /**
                 * Check that the user is on  thescreen from which should be navigated
                 */
                if (navigateFromScreen === name) {
                    /**
                     * Clear share data in redux
                     */
                    dispatch(clearDeepLinkActionForScreen());

                    /**
                     * Check if shareType has been mapped to any screen name.
                     */
                    const navigateToScreen = getScreenNameToNavigate(
                        DeepLink.shareType,
                    );
                    if (navigateToScreen) {
                        // setTimeout(() => {
                        const shareIdToPass = DeepLink.shareId;
                        InteractionManager.runAfterInteractions(() => {
                            navigation.navigate({
                                name: navigateToScreen,
                                params: {shareID: shareIdToPass},
                            });
                        });
                        // }, 0);
                    }

                    /**
                     * Clear share data insingleton
                     */
                    clearDeepLink();
                }
            }
        });

        return unsubscribe;
    }, [navigateFromScreen, name, onlyAuth, isUserAuth, navigation, dispatch]);

    return {
        curentRouteName: name,
        navigateFromScreen,
        isAuthHeaderSet: isUserAuth,
    };
};

export default useNavigateOnDeepLink;

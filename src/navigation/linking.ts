import {
    DEEPLINKING_HOST,
    DEEPLINKING_NAMESPACE,
    DEEPLINKING_PREFIX,
} from '@env';
import {Linking} from 'react-native';

import {DeepLink} from './utils/handleDeepLinkUrl';

/**
 * Deep link must match to this config. As example 'world' is used.
 * In this case url: 'https://${DEEPLINKING_HOST}${DEEPLINKING_PREFIX}/world'
 * will redirect user to WorldTab screen.
 */
const config = {
    screens: {
        TabMenu: {
            screens: {
                WorldTab: 'world',
            },
        },
        RoutesMap: {
            path: 'cyclingMap/:shareID',
        },
    },
};

/**
 * https://reactnavigation.org/docs/5.x/configuring-links
 */
export const linking = {
    prefixes: [
        `https://${DEEPLINKING_HOST}${DEEPLINKING_PREFIX}`,
        `${DEEPLINKING_NAMESPACE}://` /* android */,
        `${DEEPLINKING_NAMESPACE}:/` /* ios */,
    ],
    config,
    async getInitialURL() {
        const url = await Linking.getInitialURL();

        if (url != null) {
            /**
             * Add info about share link to global instance
             */
            if (DeepLink?.instance) {
                DeepLink.setShareIdFromUrl = url;
                DeepLink.setShareTypeFromUrl = url;
            }
            return url;
        }
    },
    subscribe(listener: (arg0: string) => void) {
        const onReceiveURL = async ({url}: {url: string}) => {
            /**
             * Add info about share link to global instance
             */
            if (DeepLink?.instance) {
                DeepLink.setShareIdFromUrl = url;
                DeepLink.setShareTypeFromUrl = url;
            }

            listener(url);
        };

        const subscription = Linking.addEventListener('url', onReceiveURL);

        return () => {
            subscription.remove();
        };
    },
};

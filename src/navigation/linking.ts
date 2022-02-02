import {
    DEEPLINKING_HOST,
    DEEPLINKING_NAMESPACE,
    DEEPLINKING_PREFIX,
} from '@env';
import {Linking} from 'react-native';

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
        RouteDetails: {
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
            return url;
        }
    },
    subscribe(listener: (arg0: string) => void) {
        const onReceiveURL = async ({url}: {url: string}) => {
            listener(url);
        };

        const subscription = Linking.addEventListener('url', onReceiveURL);

        return () => {
            subscription.remove();
        };
    },
};

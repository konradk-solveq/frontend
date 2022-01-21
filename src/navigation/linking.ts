import {
    DEEPLINKING_HOST,
    DEEPLINKING_NAMESPACE,
    DEEPLINKING_PREFIX,
} from '@env';
import {getPathFromState, getStateFromPath} from '@react-navigation/native';

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
};

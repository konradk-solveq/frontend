import * as actionTypes from '@storage/actions/actionTypes';

import {TabStackType} from '@type/tabStack';
import {RootStackType} from '@type/rootStack';

export const setDeepLinkActionForScreen = (
    takeActionOnScreen: keyof RootStackType | keyof TabStackType,
) => ({
    type: actionTypes.SET_DEEP_LINKING_ACTION_FOR_SCREEN,
    takeActionOnScreen: takeActionOnScreen,
});

export const clearDeepLinkActionForScreen = () => ({
    type: actionTypes.CLEAR_DEEP_LINKING_ACTION_FOR_SCREEN,
});

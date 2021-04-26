import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isOffline: false,
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.SET_APP_NETWORK_STATUS:
            return {
                ...state,
                isOffline: action.status,
            };
    }
    return state;
};

export default reducer;

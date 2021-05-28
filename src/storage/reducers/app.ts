import * as actionTypes from '../actions/actionTypes';

export interface AppState {
    isOffline: boolean;
    sync: boolean;
    error: string;
    statusCode: number;
}

const initialState: AppState = {
    isOffline: false,
    sync: false,
    error: '',
    statusCode: 200,
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.SET_APP_NETWORK_STATUS:
            return {
                ...state,
                isOffline: action.status,
            };
        case actionTypes.SET_SYNC_APP_DATA_STATUS:
            return {
                ...state,
                sync: action.status,
            };
        case actionTypes.SET_SYNC_APP_SYNC_ERROR:
            return {
                ...state,
                sync: false,
                error: action.error,
                statusCode: action.statusCode,
            };
        case actionTypes.CLEAR_APP_ERROR:
            return {
                ...state,
                sync: false,
                error: '',
                statusCode: 200,
            };
    }
    return state;
};

export default reducer;

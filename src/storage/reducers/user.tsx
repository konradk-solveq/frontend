import * as actionTypes from '../actions/actionTypes';
import { getStorageUserName } from '../localStorage';

const initialState = {
    userName:  getStorageUserName()
}

const userReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case actionTypes.GET_USER_NAME: {
            return {
                ...state,
                userName: action.userName,
            }
        }
        case actionTypes.SET_USER_NAME: {
            return {
                ...state,
                userName: action.userName,
            }
        }
        case actionTypes.GET_FRAME_NUMBER: {
            return {
                ...state,
                frameNumber: action.frameNumber,
            }
        }
        case actionTypes.SET_FRAME_NUMBER: {
            return {
                ...state,
                frameNumber: action.frameNumber,
            }
        }
    }

    return state;
};



export default userReducer;
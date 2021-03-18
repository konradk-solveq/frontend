import * as actionTypes from '../actions/actionTypes';
import { getStorageUserName } from '../storage';

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
    }

    return state;
};



export default userReducer;
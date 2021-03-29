import { combineReducers } from 'redux';

import userReducer from './reducers/user'


const reducer = combineReducers({
    user: userReducer,
    // errors: errorReducer

 });

export default reducer;
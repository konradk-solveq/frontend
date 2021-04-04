import { combineReducers } from 'redux';

import userReducer from './reducers/user'
import bikesReducer from './reducers/bikes'


const reducer = combineReducers({
    user: userReducer,
    bikes: bikesReducer,
    // errors: errorReducer

 });

export default reducer;
import {combineReducers} from 'redux';

import appReducer from './reducers/app';
import userReducer from './reducers/user';
import bikesReducer from './reducers/bikes';

const reducer = combineReducers({
    app: appReducer,
    user: userReducer,
    bikes: bikesReducer,
});

export default reducer;

import {combineReducers} from 'redux';

import appReducer from './reducers/app';
import userReducer from './reducers/user';
import bikesReducer from './reducers/bikes';
import placesReducer from './reducers/places';

const reducer = combineReducers({
    app: appReducer,
    user: userReducer,
    bikes: bikesReducer,
    places: placesReducer,
});

export default reducer;

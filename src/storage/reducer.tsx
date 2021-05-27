import {combineReducers} from 'redux';

import appReducer from './reducers/app';
import userReducer from './reducers/user';
import bikesReducer from './reducers/bikes';
import placesReducer from './reducers/places';
import mapsReducer from './reducers/maps';
import routesReducer from './reducers/routes';

const reducer = combineReducers({
    app: appReducer,
    user: userReducer,
    bikes: bikesReducer,
    places: placesReducer,
    maps: mapsReducer,
    routes: routesReducer,
});

export default reducer;

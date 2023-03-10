import {combineReducers} from 'redux';

import appReducer from './reducers/app';
import authReducer from './reducers/auth';
import authDataReducer from './reducers/authData';
import deepLinkingReducer from './reducers/deepLinking';
import userReducer from './reducers/user';
import bikesReducer from './reducers/bikes';
import placesReducer from './reducers/places';
import mapsReducer from './reducers/maps';
import routesReducer from './reducers/routes';
import consentsReducer from './reducers/consents';
import uiTranslationReducer from './reducers/uiTranslation';

const reducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    authData: authDataReducer,
    deepLinking: deepLinkingReducer,
    user: userReducer,
    bikes: bikesReducer,
    places: placesReducer,
    maps: mapsReducer,
    routes: routesReducer,
    consents: consentsReducer,
    uiTranslation: uiTranslationReducer,
});

export default reducer;

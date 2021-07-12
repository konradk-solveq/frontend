import {createStore, applyMiddleware, compose} from 'redux';
import ReduxThunk from 'redux-thunk';
import {persistReducer} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reducer from './reducer';

const checkAppHasWrongPersistKey = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('persist:root_mykross');
        if (jsonValue) {
            return false;
        }

        return true;
    } catch (error) {
        return false;
    }
};

const buildStore = async () => {
    let pKey = 'root_mykross';
    const persistKeyIsWrong = await checkAppHasWrongPersistKey();
    if (persistKeyIsWrong) {
        pKey = 'root';
    }

    const persistConfig = {
        key: pKey,
        storage: AsyncStorage,
        stateReconciler: autoMergeLevel2,
        timeout: 2000,
    };

    const persistedReducer = persistReducer<any, any>(persistConfig, reducer);

    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        persistedReducer,
        composeEnhancers(applyMiddleware(ReduxThunk)),
    );

    return store;
};

const store = buildStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;

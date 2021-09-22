import {createStore, applyMiddleware, compose} from 'redux';
import ReduxThunk from 'redux-thunk';
import {persistReducer} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reducer from './reducer';
import {PersistConfig} from 'redux-persist/es/types';
import {migration} from './migration/migrateRootToRootMykross';
// import {FLIPPER_REDUX_DEBUGGER} from '@env';

const buildStore = () => {
    const persistConfig: PersistConfig<any, any> = {
        key: 'root_mykross',
        storage: AsyncStorage,
        stateReconciler: autoMergeLevel2,
        version: 2,
        timeout: 0,
        migrate: async state => {
            const newState = await migration(state);
            if (newState) {
                return Promise.resolve(newState);
            }
            return Promise.resolve(state);
        },
        debug: __DEV__,
    };

    const persistedReducer = persistReducer<any, any>(persistConfig, reducer);

    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    // const middlewares = [ReduxThunk];

    /**
     * Temporary reomved - "react-native-flipper" on IOS error occures during the build
     */
    // if (__DEV__ && FLIPPER_REDUX_DEBUGGER && !process.env.JEST_WORKER_ID) {
    //     const createDebugger = require('redux-flipper').default;
    //     middlewares.push(createDebugger());
    // }

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

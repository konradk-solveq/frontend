import configureStore, {MockStoreEnhanced} from 'redux-mock-store';
import ReduxThunk from 'redux-thunk';

import {
    startRecordingRoute,
    stopCurrentRoute,
    syncCurrentRouteData,
} from '../routes';
import instance from '../../../api/api';

import {initState} from './utils/state';
import {endDate, endedRoute, startedRoute} from './utils/routeData';
import {
    startRecordingExpectedActions,
    stopRecordingExpectedActions,
    synchRecordingExpectedActions,
    synchRecordingWhenOfflineExpectedActions,
} from './utils/expectedAxtions';

const middlewares = [ReduxThunk];
const mockStore = configureStore(middlewares);

describe('[Recording Route actions]', () => {
    let store: MockStoreEnhanced<unknown, {}>;
    let actionsLog: any[];

    it('[startRecordingRoute] - should start new route', async () => {
        store = mockStore(initState);
        const getSpySuccess = jest
            .spyOn(instance, 'post')
            .mockImplementation(() => {
                return new Promise((resolve, reject) => {
                    return resolve({
                        data: {id: 'remote-route-test-id'},
                    });
                });
            });
        actionsLog = store.getActions();

        return store
            .dispatch<any>(startRecordingRoute(startedRoute))
            .then(() => {
                /**
                 * Check http request has been made.
                 */
                expect(getSpySuccess).toHaveBeenCalled();

                /**
                 * Check if all expected actions have been called.
                 */
                /* loading - start */
                expect(actionsLog[0]).toEqual(startRecordingExpectedActions[0]);
                /* clear errors */
                expect(actionsLog[1]).toEqual(startRecordingExpectedActions[1]);
                /* set route data */
                expect(actionsLog[2]).toEqual(startRecordingExpectedActions[2]);
                /* loading - end */
                expect(actionsLog[3]).toEqual(startRecordingExpectedActions[3]);
            });
    });

    it('[stopCurrentRoute] - should stop new route', async () => {
        store = mockStore({
            ...initState,
            routes: {
                ...initState.routes,
                currentRoute: startedRoute /* set started state */,
            },
        });
        actionsLog = store.getActions();

        return store
            .dispatch<any>(stopCurrentRoute(false, endDate))
            .then(() => {
                /**
                 * Check if all expected actions have been called.
                 */
                /* loading - start */
                expect(actionsLog[0]).toEqual(stopRecordingExpectedActions[0]);
                /* clear errors */
                expect(actionsLog[1]).toEqual(stopRecordingExpectedActions[1]);
                /* set route data */
                expect(actionsLog[2]).toEqual(stopRecordingExpectedActions[2]);
                /* loading - end */
                expect(actionsLog[3]).toEqual(stopRecordingExpectedActions[3]);
            });
    });

    describe('[syncCurrentRouteData] - should synch route data', () => {
        it('when is online', async () => {
            store = mockStore({
                ...initState,
                routes: {
                    ...initState.routes,
                    currentRoute: endedRoute /* set started state */,
                },
            });
            /**
             * Mock create route api call
             */
            const getSpySuccess = jest
                .spyOn(instance, 'patch')
                .mockImplementation(() => {
                    return new Promise((resolve, reject) => {
                        return resolve({
                            data: {id: 'remote-route-test-id'},
                        });
                    });
                });
            actionsLog = store.getActions();

            return store.dispatch<any>(syncCurrentRouteData()).then(() => {
                expect(getSpySuccess).toBeCalledTimes(1);

                /**
                 * Check if all expected actions have been called.
                 */
                /* loading - start */
                expect(actionsLog[0]).toEqual(synchRecordingExpectedActions[0]);
                /* set private map id */
                expect(actionsLog[1]).toEqual(synchRecordingExpectedActions[1]);
                /* clear current route location data */
                expect(actionsLog[2]).toEqual(synchRecordingExpectedActions[2]);
                /* clear current route data */
                expect(actionsLog[3]).toEqual(synchRecordingExpectedActions[3]);
                /* reset average speed data */
                expect(actionsLog[4]).toEqual(synchRecordingExpectedActions[4]);
                /* clear errors */
                expect(actionsLog[5]).toEqual(synchRecordingExpectedActions[5]);
                /* loading - end */
                expect(actionsLog[6]).toEqual(synchRecordingExpectedActions[6]);
            });
        });

        it('when is offline', async () => {
            store = mockStore({
                ...initState,
                app: {
                    ...initState.app,
                    isOffline: true,
                },
                routes: {
                    ...initState.routes,
                    currentRoute: {
                        ...endedRoute,
                        remoteRouteId: undefined,
                    } /* set started state */,
                },
            });
            actionsLog = store.getActions();

            return store.dispatch<any>(syncCurrentRouteData()).then(() => {
                /**
                 * Check if all expected actions have been called.
                 */
                /* loading - start */
                expect(actionsLog[0]).toEqual(
                    synchRecordingWhenOfflineExpectedActions[0],
                );

                /**
                 * add routes to synch - START
                 */
                /* loading - start [internal] */
                expect(actionsLog[1]).toEqual(
                    synchRecordingWhenOfflineExpectedActions[1],
                );
                /* set route id to synch after online */
                expect(actionsLog[2]).toEqual(
                    synchRecordingWhenOfflineExpectedActions[2],
                );
                /* set route data to synch after online */
                expect(actionsLog[3]).toEqual(
                    synchRecordingWhenOfflineExpectedActions[3],
                );
                /* reset average speed data */
                expect(actionsLog[4]).toEqual(
                    synchRecordingWhenOfflineExpectedActions[4],
                );
                /* set connection error */
                expect(actionsLog[5]).toEqual(
                    synchRecordingWhenOfflineExpectedActions[5],
                );
                /* loading - sop [internal] */
                expect(actionsLog[6]).toEqual(
                    synchRecordingWhenOfflineExpectedActions[6],
                );
                /**
                 * add routes to synch - STOP
                 */

                /** clear current route data */
                expect(actionsLog[7]).toEqual(
                    synchRecordingWhenOfflineExpectedActions[7],
                );
                /** clear current route */
                expect(actionsLog[8]).toEqual(
                    synchRecordingWhenOfflineExpectedActions[8],
                );
                /* set synch error */
                expect(actionsLog[9]).toEqual(
                    synchRecordingWhenOfflineExpectedActions[9],
                );
                /* loading - stop */
                expect(actionsLog[10]).toEqual(
                    synchRecordingWhenOfflineExpectedActions[10],
                );
            });
        });
    });

    afterEach(() => {
        actionsLog = [];
    });
});

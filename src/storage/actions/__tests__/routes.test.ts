import configureStore, {MockStoreEnhanced} from 'redux-mock-store';
import ReduxThunk from 'redux-thunk';

import {
    startRecordingRoute,
    stopCurrentRoute,
    syncCurrentRouteData,
} from '@storage/actions/routes';
import instance from '@api/api';
import i18next from '@translations/i18next';

import {initState} from './utils/state';
import {endedRoute, startedRoute} from './utils/routeData';
import {
    compareResultsWhenOfflineFirstCase,
    compareResultsWhenOfflineSecondCase,
    compareResultsWhenOfflineThirdCase,
    compareResultsWhenOfflineFourthCase,
    compareResultsWhenOnlineFirstCase,
    compareResultsWhenOnlineSecondCase,
    compareResultsWhenOnlineFourthCase,
    compareResultsWhenOnlineEigthCase,
    compareResultsWhenStartRecordingFirstCase,
    compareResultsWhenStartRecordingSecondCase,
    compareResultsWhenOnlineNineCase,
    compareResultsWhenStopRecordingFirstCase,
} from './utils/compareRouteDispatchResults';
import {routesDataToAPIRequest} from '@utils/apiDataTransform/prepareRequest';

import routesDataToUpdateMock from './mocks/routesDataToUpdate';

const middlewares = [ReduxThunk];
const mockStore = configureStore(middlewares);

const DATA_ACTION_ROUTE_DATA_UPDATE_ROUTE_ERROR = i18next.t(
    'dataAction.routeData.updateRouteError',
);

jest.mock('uuid', () => ({
    v4: () => 'current-route-test-id',
}));

describe('[Recording Route actions]', () => {
    let store: MockStoreEnhanced<unknown, {}>;
    let actionsLog: any[];

    describe('[startRecordingRoute]', () => {
        beforeEach(() => {
            const mockedDate = new Date('2021-07-28T07:08:41.000Z');
            //@ts-ignore
            jest.spyOn(global, 'Date').mockImplementation(() => mockedDate);
        });

        it('should start new route', async () => {
            store = mockStore(initState);
            const getSpySuccess = jest
                .spyOn(instance, 'post')
                .mockImplementation(() => {
                    return new Promise(resolve => {
                        return resolve({
                            data: {id: 'remote-route-test-id'},
                        });
                    });
                });
            actionsLog = store.getActions();

            return store
                .dispatch<any>(startRecordingRoute('route-id'))
                .then(() => {
                    /**
                     * Check http request has been made.
                     */
                    expect(getSpySuccess).toHaveBeenCalled();

                    /**
                     * Check if all expected actions have been called.
                     */
                    compareResultsWhenStartRecordingFirstCase(actionsLog);
                });
        });

        it('should not override current route', async () => {
            store = mockStore({
                ...initState,
                routes: {
                    ...initState.routes,
                    currentRoute: {
                        ...startedRoute,
                        remoteRouteId: 'different-remote-route-id',
                    },
                },
            });
            const getSpySuccess = jest
                .spyOn(instance, 'post')
                .mockImplementation(() => {
                    return new Promise(resolve => {
                        return resolve({
                            data: {id: 'remote-route-test-id'},
                        });
                    });
                });
            actionsLog = store.getActions();

            return store.dispatch<any>(startRecordingRoute()).then(() => {
                /**
                 * Check http request has been made.
                 */
                expect(getSpySuccess).not.toHaveBeenCalled();

                /**
                 * Check if all expected actions have been called.
                 */
                compareResultsWhenStartRecordingSecondCase(actionsLog);
            });
        });

        afterEach(() => {
            jest.clearAllMocks();
            jest.restoreAllMocks();
        });
    });

    describe('[stopCurrentRoute]', () => {
        beforeEach(() => {
            const mockedDate = new Date('2021-07-28T20:33:54.000Z');
            //@ts-ignore
            jest.spyOn(global, 'Date').mockImplementation(() => mockedDate);
        });

        it(' - should stop new route', async () => {
            store = mockStore({
                ...initState,
                routes: {
                    ...initState.routes,
                    currentRoute: startedRoute /* set started state */,
                },
            });

            actionsLog = store.getActions();

            return store.dispatch<any>(stopCurrentRoute()).then(() => {
                /**
                 * Check if all expected actions have been called.
                 */
                compareResultsWhenStopRecordingFirstCase(actionsLog);
            });
        });

        afterEach(() => {
            jest.clearAllMocks();
            jest.restoreAllMocks();
        });
    });

    describe('[syncCurrentRouteData]', () => {
        describe('when is offline', () => {
            it('should success when remote route Id exists and trying to store data to synch later', async () => {
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
                /**
                 * Mock API call
                 */
                /* synch data */
                const patchSynchDataSuccessSpy = jest
                    .spyOn(instance, 'patch')
                    .mockImplementation(() =>
                        Promise.resolve({
                            data: {id: 'remote-route-test-id'},
                        }),
                    );
                actionsLog = store.getActions();
                return store.dispatch<any>(syncCurrentRouteData()).then(() => {
                    expect(patchSynchDataSuccessSpy).not.toBeCalled();
                    /**
                     * Check if all expected actions have been called.
                     */
                    compareResultsWhenOfflineFirstCase(actionsLog);
                });
            });
            it('should fail with route data with no distance when trying to synch route data with API', async () => {
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
                            id: 'current-route-test-id-with-no-distance',
                        } /* set started state */,
                    },
                });
                /**
                 * Mock create route api call
                 */
                /* synch data */
                const patchSynchDataSuccessSpy = jest
                    .spyOn(instance, 'patch')
                    .mockImplementation(() =>
                        Promise.resolve({
                            data: {id: 'remote-route-test-id'},
                        }),
                    );
                actionsLog = store.getActions();
                return store.dispatch<any>(syncCurrentRouteData()).then(() => {
                    expect(patchSynchDataSuccessSpy).not.toBeCalled();
                    /**
                     * Check if all expected actions have been called.
                     */
                    compareResultsWhenOfflineSecondCase(actionsLog);
                });
            });

            it('should fail with with no route data when trying to synch with API and fail trying to delete existing  remote route id', async () => {
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
                            id: 'current-route-test-id-with-no-data-to-synch',
                        } /* set started state */,
                    },
                });
                /**
                 * Mock create route api call
                 */
                /* delete remoute route id */
                const deletePrivateMapIdFailureSpy = jest
                    .spyOn(instance, 'delete')
                    .mockImplementation(() =>
                        Promise.resolve({
                            data: {
                                error: 'Route id not exists',
                                statusCode: 404,
                            },
                            status: 404,
                            error: 'Route id not exists',
                        }),
                    );
                actionsLog = store.getActions();
                return store.dispatch<any>(syncCurrentRouteData()).then(() => {
                    expect(deletePrivateMapIdFailureSpy).not.toBeCalled();
                    /**
                     * Check if all expected actions have been called.
                     */
                    compareResultsWhenOfflineThirdCase(actionsLog);
                });
            });

            it('should fail with with no route data when trying to synch with API and should fail when trying to remove none-existing remote route ID', async () => {
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
                            id: 'current-route-test-id-with-no-data-to-synch',
                            remouteRouteId: undefined,
                        } /* set started state */,
                    },
                });
                /**
                 * Mock create route api call
                 */
                /* delete remoute route id */
                const deletePrivateMapIdFailureSpy = jest
                    .spyOn(instance, 'delete')
                    .mockImplementation(() =>
                        Promise.resolve({
                            data: {
                                error: 'Route id not exists',
                                statusCode: 404,
                            },
                            status: 404,
                            error: 'Route id not exists',
                        }),
                    );
                actionsLog = store.getActions();
                return store.dispatch<any>(syncCurrentRouteData()).then(() => {
                    expect(deletePrivateMapIdFailureSpy).not.toBeCalled();
                    /**
                     * Check if all expected actions have been called.
                     */
                    compareResultsWhenOfflineFourthCase(actionsLog);
                });
            });

            afterEach(() => {
                jest.clearAllMocks();
            });
        });

        describe('when is online', () => {
            it('should success synch route data with API when remote route Id exists', async () => {
                store = mockStore({
                    ...initState,
                    app: {
                        ...initState.app,
                        location: {
                            latitude: 50.691728031513534,
                            longitude: 17.79613619421019,
                        },
                    },
                    routes: {
                        ...initState.routes,
                        currentRoute: endedRoute,
                        routes: [
                            {id: endedRoute.id, route: routesDataToUpdateMock},
                        ],
                    } /* set started state */,
                });
                /**
                 * Mock create route api call
                 */
                /* synch data */
                const patchSynchDataSuccessSpy = jest
                    .spyOn(instance, 'patch')
                    .mockImplementation(() =>
                        Promise.resolve({
                            data: {id: 'remote-route-test-id'},
                        }),
                    );
                const getPrivateMapsDataSuccessSpy = jest
                    .spyOn(instance, 'get')
                    .mockImplementation(() =>
                        Promise.resolve({
                            data: {
                                elements: [],
                                links: {},
                                total: 0,
                            },
                            status: 200,
                            error: '',
                        }),
                    );
                const dataToCompare = routesDataToAPIRequest(
                    routesDataToUpdateMock,
                );

                actionsLog = store.getActions();
                return store.dispatch<any>(syncCurrentRouteData()).then(() => {
                    expect(patchSynchDataSuccessSpy).toBeCalledTimes(1);
                    expect(patchSynchDataSuccessSpy).toBeCalledWith(
                        '/routes/route/remote-route-test-id/path',
                        dataToCompare,
                        {
                            cancelToken: {
                                promise: {_U: 0, _V: 0, _W: null, _X: null},
                            },
                        },
                    );
                    expect(getPrivateMapsDataSuccessSpy).toBeCalledTimes(1);
                    /**
                     * Check if all expected actions have been called.
                     */
                    compareResultsWhenOnlineFirstCase(actionsLog);
                });
            });

            it('should succes when create new remote route ID and should success on sending route data to API', async () => {
                store = mockStore({
                    ...initState,
                    app: {
                        ...initState.app,
                        location: {
                            latitude: 50.691728031513534,
                            longitude: 17.79613619421019,
                        },
                    },
                    routes: {
                        ...initState.routes,
                        currentRoute: {
                            ...endedRoute,
                            remoteRouteId: undefined,
                        },
                        routes: [
                            {id: endedRoute.id, route: routesDataToUpdateMock},
                        ],
                    } /* set started state */,
                });
                /**
                 * Mock create route api call
                 */
                /* create remout route data id */
                const createRemoteRouteIdSuccessSpy = jest
                    .spyOn(instance, 'post')
                    .mockImplementation(() =>
                        Promise.resolve({
                            data: {
                                id: 'remote-route-test-id',
                            },
                            status: 200,
                            error: '',
                        }),
                    );
                /* synch data */
                const patchSynchRouteDataSuccessSpy = jest
                    .spyOn(instance, 'patch')
                    .mockImplementation(() =>
                        Promise.resolve({
                            data: {
                                id: 'remote-route-test-id',
                            },
                            status: 200,
                            error: '',
                        }),
                    );
                const getPrivateMapsDataSuccessSpy = jest
                    .spyOn(instance, 'get')
                    .mockImplementation(() =>
                        Promise.resolve({
                            data: {
                                elements: [],
                                links: {},
                                total: 0,
                            },
                            status: 200,
                            error: '',
                        }),
                    );
                const dataToCompare = routesDataToAPIRequest(
                    routesDataToUpdateMock,
                );

                actionsLog = store.getActions();
                return store.dispatch<any>(syncCurrentRouteData()).then(() => {
                    expect(createRemoteRouteIdSuccessSpy).toBeCalled();
                    expect(patchSynchRouteDataSuccessSpy).toBeCalledTimes(1);
                    expect(patchSynchRouteDataSuccessSpy).toBeCalledWith(
                        '/routes/route/remote-route-test-id/path',
                        dataToCompare,
                        {
                            cancelToken: {
                                promise: {_U: 0, _V: 0, _W: null, _X: null},
                            },
                        },
                    );
                    expect(getPrivateMapsDataSuccessSpy).toBeCalledTimes(1);
                    /**
                     * Check if all expected actions have been called.
                     */
                    compareResultsWhenOnlineSecondCase(actionsLog);
                });
            });

            it('should fail when sending route data to API', async () => {
                store = mockStore({
                    ...initState,
                    routes: {
                        ...initState.routes,
                        currentRoute: endedRoute,
                        routes: [
                            {id: endedRoute.id, route: routesDataToUpdateMock},
                        ],
                    } /* set started state */,
                });
                /**
                 * Mock create route api call
                 */
                /* synch data */
                const patchSynchRouteDataSuccessSpy = jest
                    .spyOn(instance, 'patch')
                    .mockImplementation(() =>
                        Promise.resolve({
                            data: {
                                statusCode: 400,
                                error: DATA_ACTION_ROUTE_DATA_UPDATE_ROUTE_ERROR,
                            },
                            status: 400,
                            error: DATA_ACTION_ROUTE_DATA_UPDATE_ROUTE_ERROR,
                        }),
                    );
                const dataToCompare = routesDataToAPIRequest(
                    routesDataToUpdateMock,
                );

                actionsLog = store.getActions();
                return store.dispatch<any>(syncCurrentRouteData()).then(() => {
                    expect(patchSynchRouteDataSuccessSpy).toBeCalledTimes(1);
                    expect(patchSynchRouteDataSuccessSpy).toBeCalledWith(
                        '/routes/route/remote-route-test-id/path',
                        dataToCompare,
                        {
                            cancelToken: {
                                promise: {_U: 0, _V: 0, _W: null, _X: null},
                            },
                        },
                    );
                    /**
                     * Check if all expected actions have been called.
                     */
                    compareResultsWhenOnlineFourthCase(actionsLog);
                });
            });

            it('should fail with no route data when trying to synch with API and should fail when trying to remove none-existing remote route ID', async () => {
                store = mockStore({
                    ...initState,
                    routes: {
                        ...initState.routes,
                        currentRoute: {
                            ...endedRoute,
                            id: 'current-route-test-id-with-no-data-to-synch',
                            remoteRouteId: undefined,
                        } /* set started state */,
                    },
                });
                /**
                 * Mock create route api call
                 */
                /* delete remoute route id */
                const deletePrivateMapIdFailureSpy = jest
                    .spyOn(instance, 'delete')
                    .mockImplementation(() =>
                        Promise.resolve({
                            data: {
                                error: 'Route id not exists',
                                statusCode: 404,
                            },
                            status: 404,
                            error: 'Route id not exists',
                        }),
                    );
                actionsLog = store.getActions();
                return store.dispatch<any>(syncCurrentRouteData()).then(() => {
                    expect(deletePrivateMapIdFailureSpy).not.toBeCalled();
                    /**
                     * Check if all expected actions have been called.
                     */
                    compareResultsWhenOnlineEigthCase(actionsLog);
                });
            });

            it('should fail synch route data with API when route Id and remoteRouteId is empty', async () => {
                store = mockStore({
                    ...initState,
                    app: {
                        ...initState.app,
                        location: {
                            latitude: 50.691728031513534,
                            longitude: 17.79613619421019,
                        },
                    },
                    routes: {
                        ...initState.routes,
                        routes: [{id: '', route: routesDataToUpdateMock}],
                        currentRoute: {
                            ...endedRoute,
                            id: '',
                        } /* set started state */,
                    },
                });
                /**
                 * Mock create route api call
                 */
                /* synch data */
                const patchSynchDataFailSpy = jest
                    .spyOn(instance, 'patch')
                    .mockImplementation(() =>
                        Promise.resolve({
                            data: {
                                error: 'Route cannot be empty',
                                statusCode: 404,
                            },
                            status: 404,
                            error: 'Route id not exists',
                        }),
                    );

                actionsLog = store.getActions();
                return store.dispatch<any>(syncCurrentRouteData()).then(() => {
                    expect(patchSynchDataFailSpy).toBeCalled();
                    /**
                     * Check if all expected actions have been called.
                     */
                    compareResultsWhenOnlineNineCase(actionsLog);
                });
            });

            afterEach(() => {
                jest.clearAllMocks();
            });
        });
    });

    afterEach(() => {
        actionsLog = [];
    });
});

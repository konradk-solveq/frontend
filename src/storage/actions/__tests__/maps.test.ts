import configureStore, {MockStoreEnhanced} from 'redux-mock-store';
import ReduxThunk from 'redux-thunk';

import {FeaturedMapType, MapType} from '@models/map.model';
import instance from '@api/api';
import frdMock from '@api/mocks/featuredRoutesDataInit';
import frdNextMock from '@api/mocks/featuredRoutesDataNext';
import mapData from '@api/mocks/mapData';
import {apiCallMock} from '@utils/testUtils/apiCalls';

import deepCopy from '@helpers/deepCopy';

import {initState} from './utils/state';
import {
    compareResultsWhenOnlineFirstCase,
    compareResultsWhenOnlineSecondCase,
    publicMapsResultCases,
} from './utils/compareMapsDispatchResults';

import {addPlannedMap, fetchFeaturedMapsList, removePlannedMap} from '../maps';

const featuredRoutesDataMock: FeaturedMapType[] = deepCopy(frdMock);
const featuredRoutesDataNextMock: FeaturedMapType[] = deepCopy(frdNextMock);
const md = deepCopy(mapData);
const mapDataMock: MapType[] = md.elements;
const favouritesDataMock = {...md, elements: md.elements[0]};

const middlewares = [ReduxThunk];
const mockStore = configureStore(middlewares);

describe('[Maps actions]', () => {
    let store: MockStoreEnhanced<unknown, {}>;
    let actionsLog: any[];

    describe('[fetchFeaturedMapsList]', () => {
        describe('when is online', () => {
            it('should success fetching new featured maps data from API - refresh', async () => {
                store = mockStore({
                    ...initState,
                    app: {
                        ...initState.app,
                        location: {
                            latitude: 50.691728031513534,
                            longitude: 17.79613619421019,
                        },
                    },
                });
                /**
                 * Mock fetching routes api call
                 */
                /* synch data */
                const getFeaturedMapsDataSuccessSpy = jest
                    .spyOn(instance, 'get')
                    .mockImplementation(() =>
                        Promise.resolve({
                            data: featuredRoutesDataMock,
                            status: 200,
                            error: '',
                        }),
                    );

                actionsLog = store.getActions();
                return store.dispatch<any>(fetchFeaturedMapsList()).then(() => {
                    expect(getFeaturedMapsDataSuccessSpy).toBeCalledTimes(1);
                    /**
                     * Check if all expected actions have been called.
                     */
                    compareResultsWhenOnlineFirstCase(actionsLog);
                });
            });

            it('should success fetching additional (paged) featured maps data from API - pagination', async () => {
                store = mockStore({
                    ...initState,
                    app: {
                        ...initState.app,
                        location: {
                            latitude: 50.691728031513534,
                            longitude: 17.79613619421019,
                        },
                    },
                });
                /**
                 * Mock fetching routes api call
                 */
                /* synch data */
                const getFeaturedMapsDataSuccessSpy = jest
                    .spyOn(instance, 'get')
                    .mockImplementation(() =>
                        Promise.resolve({
                            data: featuredRoutesDataNextMock,
                            status: 200,
                            error: '',
                        }),
                    );

                actionsLog = store.getActions();
                return store.dispatch<any>(fetchFeaturedMapsList()).then(() => {
                    expect(getFeaturedMapsDataSuccessSpy).toBeCalledTimes(1);
                    /**
                     * Check if all expected actions have been called.
                     */
                    compareResultsWhenOnlineSecondCase(actionsLog);
                });
            });

            afterEach(() => {
                jest.clearAllMocks();
            });
        });
    });

    describe('[addPlannedMap]', () => {
        it('should change "isUserFavourite" to "true" when /PUT success to API', async () => {
            const idToUpdate = mapDataMock[0].id;
            store = mockStore({
                ...initState,
                app: {
                    ...initState.app,
                    location: {
                        latitude: 50.691728031513534,
                        longitude: 17.79613619421019,
                    },
                },
                maps: {
                    ...initState.maps,
                    maps: mapDataMock,
                },
            });
            /**
             * Mock update favourite route routes api call
             */
            const addPlannedMapsListServiceMock = await apiCallMock(
                {
                    data: null,
                    status: 200,
                },
                'put',
            );

            /**
             * Mock fetching updated favourites list
             */
            const fetchUpdatedListMock = await apiCallMock(
                {
                    data: favouritesDataMock,
                    status: 200,
                },
                'get',
            );

            actionsLog = store.getActions();
            return store.dispatch<any>(addPlannedMap(idToUpdate)).then(() => {
                expect(addPlannedMapsListServiceMock).toBeCalledTimes(1);
                expect(fetchUpdatedListMock).toBeCalledTimes(1);
                /**
                 * Check if all expected actions have been called.
                 */

                publicMapsResultCases.compareResultsWhenOnlineFirstCase(
                    actionsLog,
                );
            });
        });

        it('should not change "isUserFavourite" to "true" when /PUT fail to API', async () => {
            const idToUpdate = mapDataMock[0].id;
            store = mockStore({
                ...initState,
                app: {
                    ...initState.app,
                    location: {
                        latitude: 50.691728031513534,
                        longitude: 17.79613619421019,
                    },
                },
                maps: {
                    ...initState.maps,
                    maps: mapDataMock,
                },
            });
            /**
             * Mock update favourite route routes api call
             */
            const addPlannedMapsListServiceMock = await apiCallMock(
                {
                    data: null,
                    status: 404,
                },
                'put',
            );

            actionsLog = store.getActions();
            return store.dispatch<any>(addPlannedMap(idToUpdate)).then(() => {
                expect(addPlannedMapsListServiceMock).toBeCalledTimes(1);
                /**
                 * Check if all expected actions have been called.
                 */

                publicMapsResultCases.compareResultsWhenOnlineFirstFailCase(
                    actionsLog,
                );
            });
        });

        it('should change "isUserFavourite" to "false" when /DELETE success to API', async () => {
            const idToUpdate = mapDataMock[0].id;
            store = mockStore({
                ...initState,
                app: {
                    ...initState.app,
                    location: {
                        latitude: 50.691728031513534,
                        longitude: 17.79613619421019,
                    },
                },
                maps: {
                    ...initState.maps,
                    maps: mapDataMock,
                },
            });
            /**
             * Mock remove favourite route routes api call
             */
            const removePlannedMapsListServiceMock = await apiCallMock(
                {
                    data: null,
                    status: 200,
                },
                'delete',
            );

            /**
             * Mock fetching updated favourites list
             */
            const fetchUpdatedListMock = await apiCallMock(
                {
                    data: favouritesDataMock,
                    status: 200,
                },
                'get',
            );

            actionsLog = store.getActions();
            return store
                .dispatch<any>(removePlannedMap(idToUpdate))
                .then(() => {
                    expect(removePlannedMapsListServiceMock).toBeCalledTimes(1);
                    expect(fetchUpdatedListMock).toBeCalledTimes(1);
                    /**
                     * Check if all expected actions have been called.
                     */

                    publicMapsResultCases.compareResultsWhenOnlineSecondCase(
                        actionsLog,
                    );
                });
        });

        it('should change not "isUserFavourite" to "false" when /DELETE fail to API', async () => {
            const idToUpdate = mapDataMock[0].id;
            store = mockStore({
                ...initState,
                app: {
                    ...initState.app,
                    location: {
                        latitude: 50.691728031513534,
                        longitude: 17.79613619421019,
                    },
                },
                maps: {
                    ...initState.maps,
                    maps: mapDataMock,
                },
            });
            /**
             * Mock remove favourite route routes api call
             */
            const removePlannedMapsListServiceMock = await apiCallMock(
                {
                    data: null,
                    status: 404,
                },
                'delete',
            );

            actionsLog = store.getActions();
            return store
                .dispatch<any>(removePlannedMap(idToUpdate))
                .then(() => {
                    expect(removePlannedMapsListServiceMock).toBeCalledTimes(1);
                    /**
                     * Check if all expected actions have been called.
                     */

                    publicMapsResultCases.compareResultsWhenOnlineFailSecondCase(
                        actionsLog,
                    );
                });
        });

        afterEach(() => {
            jest.clearAllMocks();
            jest.restoreAllMocks();
        });
    });

    afterEach(() => {
        actionsLog = [];
    });
});

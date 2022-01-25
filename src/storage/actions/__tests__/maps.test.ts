import configureStore, {MockStoreEnhanced} from 'redux-mock-store';
import ReduxThunk from 'redux-thunk';

import {FeaturedMapType} from '@models/map.model';
import instance from '@api/api';
import frdMock from '@api/mocks/featuredRoutesDataInit';
import frdNextMock from '@api/mocks/featuredRoutesDataNext';

import deepCopy from '@helpers/deepCopy';

import {initState} from './utils/state';
import {
    compareResultsWhenOnlineFirstCase,
    compareResultsWhenOnlineSecondCase,
} from './utils/compareMapsDispatchResults';

import {fetchFeaturedMapsList} from '../maps';

const featuredRoutesDataMock: FeaturedMapType[] = deepCopy(frdMock);
const featuredRoutesDataNextMock: FeaturedMapType[] = deepCopy(frdNextMock);

const middlewares = [ReduxThunk];
const mockStore = configureStore(middlewares);

jest.mock('../../../../I18n/i18next', () => ({
    t: (str: string) => {
        return `${str}`;
    },
}));

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

    afterEach(() => {
        actionsLog = [];
    });
});

import configureStore, {MockStoreEnhanced} from 'redux-mock-store';
import ReduxThunk from 'redux-thunk';

import instance from '@api/api';

import deepCopy from '@helpers/deepCopy';
import {initState} from './utils/state';
import {
    compareResultsWhenOnlineFirstCase,
    compareResultsWhenOnlineSecondCase,
    compareResultsWhenOnlineThirdCase,
    compareResultsWhenOnlineFourthCase,
    compareResultsWhenOnlineFifthCase,
} from './utils/compareBikesDispatchResults';

import {setBikesListByFrameNumber, setBikesListByFrameNumbers} from '../index';

import bikeDataMock from '@api/mocks/bikes/lookupBIke';
import apiBikeData from '@api/mocks/bikes/bikesToUpdate';
import {UserBikeI} from '@models/userBike.model';

import dataMock from '@storage/reducers/utils/mocks/bikes/bikesListData';

const bikeOne: UserBikeI = deepCopy(bikeDataMock.bikeOneComplete);
const bikeOneIncomplite: UserBikeI = deepCopy(bikeDataMock.bikeOneIncomplite);

const middlewares = [ReduxThunk];
const mockStore = configureStore(middlewares);


const bikeNumber = '1003196015';
const bikeNumberTwo = '1234567890';

describe('[Bikes actions]', () => {
    let store: MockStoreEnhanced<unknown, {}>;
    let actionsLog: any[];

    describe('[setBikesListByFrameNumber]', () => {
        it('should success adding new bike by serial_number', async () => {
            store = mockStore({...initState});
            /**
             * Mock fetching bike api call
             */
            /* synch data */
            const getFeaturedMapsDataSuccessSpy = jest
                .spyOn(instance, 'get')
                .mockImplementation(() =>
                    Promise.resolve({
                        data: bikeOne,
                        status: 200,
                        error: '',
                    }),
                );

            actionsLog = store.getActions();
            return store
                .dispatch<any>(setBikesListByFrameNumber(bikeNumber))
                .then(() => {
                    expect(getFeaturedMapsDataSuccessSpy).toBeCalledTimes(1);
                    /**
                     * Check if all expected actions have been called.
                     */
                    compareResultsWhenOnlineFirstCase(actionsLog);
                });
        });

        it('should success adding new bike by serial_number with incomplete data', async () => {
            store = mockStore({...initState});
            /**
             * Mock fetching bike api call
             */
            /* synch data */
            const getFeaturedMapsDataSuccessSpy = jest
                .spyOn(instance, 'get')
                .mockImplementation(() =>
                    Promise.resolve({
                        data: bikeOneIncomplite,
                        status: 200,
                        error: '',
                    }),
                );

            actionsLog = store.getActions();
            return store
                .dispatch<any>(setBikesListByFrameNumber(bikeNumberTwo))
                .then(() => {
                    expect(getFeaturedMapsDataSuccessSpy).toBeCalledTimes(1);
                    /**
                     * Check if all expected actions have been called.
                     */
                    compareResultsWhenOnlineSecondCase(actionsLog);
                });
        });

        it('should fail updating when adding new bike by serial_number and no data returned', async () => {
            store = mockStore({...initState});
            /**
             * Mock fetching bike api call
             */
            /* synch data */
            const getFeaturedMapsDataSuccessSpy = jest
                .spyOn(instance, 'get')
                .mockImplementation(() =>
                    Promise.resolve({
                        data: null,
                        status: 200,
                        error: '',
                    }),
                );

            actionsLog = store.getActions();
            return store
                .dispatch<any>(setBikesListByFrameNumber(bikeNumberTwo))
                .then(() => {
                    expect(getFeaturedMapsDataSuccessSpy).toBeCalledTimes(1);
                    /**
                     * Check if all expected actions have been called.
                     */
                    compareResultsWhenOnlineThirdCase(actionsLog);
                });
        });

        afterEach(() => {
            jest.clearAllMocks();
        });
    });

    describe('[setBikesListByFrameNumbers]', () => {
        it('should success update bikes list', async () => {
            store = mockStore({
                ...initState,
                bikes: {
                    list: dataMock,
                },
            });
            /**
             * Mock fetching bike api call
             */
            /* synch data */
            const getFeaturedMapsDataSuccessSpy = jest
                .spyOn(instance, 'get')
                .mockImplementation(() =>
                    Promise.resolve({
                        data: apiBikeData,
                        status: 200,
                        error: '',
                    }),
                );

            actionsLog = store.getActions();
            return store
                .dispatch<any>(setBikesListByFrameNumbers())
                .then(() => {
                    expect(getFeaturedMapsDataSuccessSpy).toBeCalledTimes(1);
                    /**
                     * Check if all expected actions have been called.
                     */
                    compareResultsWhenOnlineFourthCase(actionsLog);
                });
        });

        it('should fail update bikes list when no data returned from API', async () => {
            store = mockStore({
                ...initState,
                bikes: {
                    list: dataMock,
                },
            });
            /**
             * Mock fetching bike api call
             */
            /* synch data */
            const getFeaturedMapsDataSuccessSpy = jest
                .spyOn(instance, 'get')
                .mockImplementation(() =>
                    Promise.resolve({
                        data: null,
                        status: 200,
                        error: '',
                    }),
                );

            actionsLog = store.getActions();
            return store
                .dispatch<any>(setBikesListByFrameNumbers())
                .then(() => {
                    expect(getFeaturedMapsDataSuccessSpy).toBeCalledTimes(1);
                    /**
                     * Check if all expected actions have been called.
                     */
                    compareResultsWhenOnlineFifthCase(actionsLog);
                });
        });

        afterEach(() => {
            jest.clearAllMocks();
        });
    });

    afterEach(() => {
        actionsLog = [];
    });
});

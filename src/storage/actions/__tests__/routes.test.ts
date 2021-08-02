import configureStore, {MockStoreEnhanced} from 'redux-mock-store';
import ReduxThunk from 'redux-thunk';

import {startRecordingRoute, stopCurrentRoute} from '../routes';
import * as actionTypes from '../actionTypes';
import instance from '../../../api/api';

import {initState} from './utils/state';
import {endDate, startedRoute, stoppedRoute} from './utils/routeData';
import {
    startRecordingExpectedActions,
    stopRecordingExpectedActions,
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

    afterEach(() => {
        actionsLog = [];
    });
});

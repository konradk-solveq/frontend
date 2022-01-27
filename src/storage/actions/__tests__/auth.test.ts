import configureStore, {MockStoreEnhanced} from 'redux-mock-store';
import ReduxThunk from 'redux-thunk';

import i18next from '@translations/i18next';

import {initState} from './utils/state';
import {
    compareResultsWhenOfflineFirstCase,
    compareResultsWhenOnlineFirstCase,
    compareResultsWhenOnlineSecondCase,
    compareResultsWhenOnlineThirdCase,
    compareResultsWhenOnlineFourthCase,
    compareRegistrationResultsFirstCase,
    compareRegistrationResultsSecondCase,
} from './utils/compareAuthDispatchResults';
import {postApiCallMock} from '@utils/testUtils/apiCalls';

import {logOut, register} from '@storage/actions';

const middleware = [ReduxThunk];
const mockStore = configureStore(middleware);

const INTERNET_CONNECTION_ERROR_MESSAGE = i18next.t(
    'dataAction.noInternetConnection',
);
jest.mock('uuid', () => ({
    v4: () => 'current-route-test-id',
}));

describe('[AuthenticationRoute actions]', () => {
    let store: MockStoreEnhanced<unknown, {}>;
    let actionsLog: any[];

    describe('[logOut]', () => {
        beforeEach(async () => {
            store = mockStore({
                ...initState,
                app: {
                    ...initState.app,
                    isOffline: true,
                },
                auth: {
                    userAuthState: 'authenticated',
                },
            });

            await postApiCallMock();
        });

        describe('when is offline', () => {
            it('should fail trying logout user', async () => {
                /**
                 * Mock log out api call
                 */
                const apiCall = await postApiCallMock({
                    data: null,
                    status: 500,
                    error: INTERNET_CONNECTION_ERROR_MESSAGE,
                });
                actionsLog = store.getActions();
                return store.dispatch<any>(logOut()).then(() => {
                    expect(apiCall).not.toBeCalled();
                    /**
                     * Check if all expected actions have been called.
                     */
                    compareResultsWhenOfflineFirstCase(actionsLog);
                });
            });

            afterEach(() => {
                jest.clearAllMocks();
            });
        });

        describe('when is online', () => {
            beforeEach(async () => {
                store = mockStore({
                    ...initState,
                    auth: {
                        userAuthState: 'authenticated',
                    },
                });

                await postApiCallMock();
            });

            it('should set error when fail trying API call on logging out user', async () => {
                /**
                 * Mock log out api call
                 */
                const apiCall = await postApiCallMock({
                    data: null,
                    status: 500,
                    error: INTERNET_CONNECTION_ERROR_MESSAGE,
                });
                actionsLog = store.getActions();
                return store.dispatch<any>(logOut()).then(() => {
                    expect(apiCall).toBeCalled();
                    /**
                     * Check if all expected actions have been called.
                     */
                    compareResultsWhenOnlineFirstCase(actionsLog);
                });
            });

            it('should success when logging out user', async () => {
                actionsLog = store.getActions();
                return store.dispatch<any>(logOut()).then(() => {
                    /**
                     * Check if all expected actions have been called.
                     */
                    compareResultsWhenOnlineSecondCase(actionsLog);
                });
            });

            it('should fail when user is already logged out', async () => {
                store = mockStore({
                    ...initState,
                    auth: {
                        userAuthState: 'loggedout',
                    },
                });

                const apiCall = await postApiCallMock();
                actionsLog = store.getActions();
                return store.dispatch<any>(logOut()).then(() => {
                    expect(apiCall).not.toBeCalled();
                    /**
                     * Check if all expected actions have been called.
                     */
                    compareResultsWhenOnlineThirdCase(actionsLog);
                });
            });

            it('should set error when fail on bad response when logging out user', async () => {
                /**
                 * Mock log out api call
                 */
                const apiCall = await postApiCallMock({
                    data: null,
                    status: 400,
                });
                actionsLog = store.getActions();
                return store.dispatch<any>(logOut()).then(() => {
                    expect(apiCall).toBeCalled();
                    /**
                     * Check if all expected actions have been called.
                     */
                    compareResultsWhenOnlineFourthCase(actionsLog);
                });
            });

            afterEach(() => {
                jest.clearAllMocks();
            });
        });
    });

    describe('Registration', () => {
        it('should not re-register user when is authenticated but "userAuthState" is equal to "uknown"', async () => {
            store = mockStore({
                ...initState,
                auth: {
                    isAuth: true,
                    userAuthState: 'uknown',
                },
                authData: {
                    userId: 'test-user-id',
                },
            });
            actionsLog = store.getActions();
            return store.dispatch<any>(register()).then(() => {
                /**
                 * Check if all expected actions have been called.
                 */
                compareRegistrationResultsFirstCase(actionsLog);
            });
        });

        it('should re-register user when is authenticated but "userId" not exists', async () => {
            store = mockStore({
                ...initState,
                auth: {
                    isAuth: true,
                    userAuthState: 'uknown',
                },
                authData: {
                    userId: '',
                },
            });

            /**
             * Mock log out api call.
             */
            await postApiCallMock(
                {
                    data: {
                        userId: 'test-user-id',
                        deviceToken: 'test-device-token',
                        recoveryCodes: ['1', '2', '3'],
                    },
                    status: 200,
                },
                'post',
            );
            actionsLog = store.getActions();
            return store.dispatch<any>(register()).then(() => {
                /**
                 * Check if all expected actions have been called.
                 */
                compareRegistrationResultsSecondCase(actionsLog);
            });
        });
    });

    afterEach(() => {
        actionsLog = [];
    });
});

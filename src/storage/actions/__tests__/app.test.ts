import {getApiCallMock} from '@utils/testUtils/apiCalls';
import i18next from '@translations/i18next';
import {initState} from '@storage/actions/__tests__/utils/state';
import configureStore, {MockStoreEnhanced} from 'redux-mock-store';
import ReduxThunk from 'redux-thunk';
import {fetchAppLegalDocuments} from '@storage/actions/app';
import {
    compareResultsWhenOfflineFirstCase,
    compareResultsWhenOnlineFirstCase,
    compareResultsWhenOnlineSecondCase,
    compareResultsWhenOnlineThirdCase,
} from '@storage/actions/__tests__/utils/compareAppDispatchResults';
import {legalDocuments} from '@components/documents/__mocks__/legalDocuments';

const INTERNET_CONNECTION_ERROR_MESSAGE = i18next.t(
    'dataAction.noInternetConnection',
);
const API_ERROR_MESSAGE = i18next.t('dataAction.apiError');

const middleware = [ReduxThunk];
const mockStore = configureStore(middleware);

describe('[AuthenticationRoute actions]', () => {
    let store: MockStoreEnhanced<unknown, {}>;
    let actionsLog: any[];
    describe('[fetchAppLegalDocuments]', () => {
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

            await getApiCallMock();
        });
        describe('when is offline', () => {
            it('should fail trying to fetch the legal documents', async () => {
                /**
                 * Mock fetching documents call
                 */
                const apiCall = await getApiCallMock({
                    data: {error: INTERNET_CONNECTION_ERROR_MESSAGE},
                    status: 500,
                });
                actionsLog = store.getActions();
                return store
                    .dispatch<any>(fetchAppLegalDocuments())
                    .then(() => {
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
                    app: {
                        ...initState.app,
                    },
                    auth: {
                        userAuthState: 'authenticated',
                    },
                });
            });
            it('should set an error if api returns an error', async () => {
                /**
                 * Mock fetching documents error call
                 */
                const apiCall = await getApiCallMock({
                    data: {error: API_ERROR_MESSAGE},
                    status: 500,
                });
                actionsLog = store.getActions();
                return store
                    .dispatch<any>(fetchAppLegalDocuments())
                    .then(() => {
                        expect(apiCall).toBeCalled();
                        /**
                         * Check if all expected actions have been called.
                         */
                        compareResultsWhenOnlineFirstCase(actionsLog);
                    });
            });
            it('should set legal documents data returned from the api', async () => {
                /**
                 * Mock fetching documents success call
                 */
                const apiCall = await getApiCallMock({
                    data: legalDocuments,
                    status: 200,
                });
                actionsLog = store.getActions();
                return store
                    .dispatch<any>(fetchAppLegalDocuments())
                    .then(() => {
                        expect(apiCall).toBeCalled();
                        /**
                         * Check if all expected actions have been called.
                         */
                        compareResultsWhenOnlineSecondCase(actionsLog);
                    });
            });
            it('should set an error if api returns no data', async () => {
                /**
                 * Mock fetching documents success call
                 */
                const apiCall = await getApiCallMock({
                    data: null,
                    status: 200,
                });
                actionsLog = store.getActions();
                return store
                    .dispatch<any>(fetchAppLegalDocuments())
                    .then(() => {
                        expect(apiCall).toBeCalled();
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
    });
});

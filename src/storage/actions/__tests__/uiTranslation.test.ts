import configureStore, {MockStoreEnhanced} from 'redux-mock-store';
import ReduxThunk from 'redux-thunk';

import {fetchUiTranslation} from '@storage/actions';
import {getApiCallMock} from '@utils/testUtils/apiCalls';
import {MAJOR_LANGUAGE} from '@helpers/global';
import {
    appTranslationsConfig,
    emptyAppTranslationsConfig,
} from './mocks/appConfig';
import {
    compareResultsControlSumsAreTheSame,
    compareResultsWhenMIssingControlSum,
} from './utils/compareUiTranslationDispatchResilts';

const middlewares = [ReduxThunk];
const mockStore = configureStore(middlewares);

const initStore = {
    app: {
        config: {
            ...emptyAppTranslationsConfig,
            lang: MAJOR_LANGUAGE,
        },
    },
    user: {
        language: '',
    },
    uiTranslation: {
        translations: {},
        languagesList: [],
        controlSum: undefined,
    },
};

describe('[UiTranslation actions]', () => {
    let store: MockStoreEnhanced<unknown, {}>;
    let actionsLog: any[];

    describe('[Api call success]', () => {
        beforeEach(() => {
            store = mockStore(initStore);
        });

        it('When there is no controlSum should success adding translation', async () => {
            /**
             * Mock fetching translation
             */
            const getUiTranslation = await getApiCallMock({
                data: {
                    code: 'code',
                    version: 'version',
                    translation: {},
                    controlSum: 'controlSum',
                },
                status: 200,
            });

            actionsLog = store.getActions();
            return store.dispatch<any>(fetchUiTranslation()).then(() => {
                expect(getUiTranslation).toBeCalledTimes(1);

                /**
                 * Check if all expected actions have been called.
                 */
                compareResultsWhenMIssingControlSum(actionsLog);
            });
        });

        it('When controlSum from "appConfig" is different from translation\'s controlSum it should UPDATE translation', async () => {
            store = mockStore({
                ...initStore,
                app: {
                    config: {
                        ...appTranslationsConfig,
                        lang: MAJOR_LANGUAGE,
                    },
                },
            });
            /**
             * Mock fetching translation
             */
            const getUiTranslation = await getApiCallMock({
                data: {
                    code: 'code',
                    version: 'version',
                    translation: {},
                    controlSum: 'controlSum',
                },
                status: 200,
            });

            actionsLog = store.getActions();
            return store.dispatch<any>(fetchUiTranslation()).then(() => {
                expect(getUiTranslation).toBeCalledTimes(1);

                /**
                 * Check if all expected actions have been called.
                 */
                compareResultsWhenMIssingControlSum(actionsLog);
            });
        });

        it('When controlSum from "appConfig" is the same with translation\'s controlSum it should NOT UPDATE translation', async () => {
            store = mockStore({
                ...initStore,
                app: {
                    config: {
                        ...appTranslationsConfig,
                        lang: MAJOR_LANGUAGE,
                    },
                },
                uiTranslation: {
                    ...initStore.uiTranslation,
                    controlSum: appTranslationsConfig.uiTranslations.controlSums.find(
                        l => l.code === MAJOR_LANGUAGE,
                    )?.controlSum,
                },
            });
            /**
             * Mock fetching translation
             */
            const getUiTranslation = await getApiCallMock({
                data: {
                    code: 'code',
                    version: 'version',
                    translation: {},
                    controlSum: 'controlSum',
                },
                status: 200,
            });

            actionsLog = store.getActions();
            return store.dispatch<any>(fetchUiTranslation()).then(() => {
                expect(getUiTranslation).toBeCalledTimes(0);

                /**
                 * Check if all expected actions have been called.
                 */
                compareResultsControlSumsAreTheSame(actionsLog);
            });
        });

        afterEach(() => {
            actionsLog = [];
            jest.restoreAllMocks();
            jest.clearAllMocks();
        });
    });

    afterAll(() => {
        actionsLog = [];
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});

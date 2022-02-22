import {fetchUiTranslation} from '..';
import configureStore, {MockStoreEnhanced} from 'redux-mock-store';
import ReduxThunk from 'redux-thunk';

import {getApiCallMock} from '@src/utils/testUtils/apiCalls';

const middlewares = [ReduxThunk];
const mockStore = configureStore(middlewares);

describe('[UiTranslation actions]', () => {
    let store: MockStoreEnhanced<unknown, {}>;
    let actionsLog: any[];

    beforeAll(() => {});

    it('should success adding translation', async () => {
        store = mockStore({
            uiTranslation: {
                translations: {},
                languagesList: [],
                controlSum: undefined,
            },
        });
        /**
         * Mock fetching translation
         */
        /* synch data */

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

        return store.dispatch<any>(fetchUiTranslation(true)).then(() => {
            expect(getUiTranslation).toBeCalledTimes(1);
        });
    });

    afterAll(() => {
        actionsLog = [];
        jest.resetModules();
    });
});

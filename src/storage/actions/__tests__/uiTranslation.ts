import {fetchUiTranslation} from '..';
import configureStore, {MockStoreEnhanced} from 'redux-mock-store';
import ReduxThunk from 'redux-thunk';

import instance from '@api/api';

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
        const getUiTranslation = jest
            .spyOn(instance, 'get')
            .mockImplementation(() =>
                Promise.resolve({
                    data: {
                        code: 'code',
                        version: 'version',
                        translation: {},
                        controlSum: 'controlSum',
                    },
                    status: 200,
                    error: '',
                }),
            );

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

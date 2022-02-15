import {renderHook, cleanup} from '@testing-library/react-hooks';
import ReduxThunk from 'redux-thunk';
import configureStore, {MockStoreEnhanced} from 'redux-mock-store';

import {hookWrapper} from '@jestUtils/render';
import asyncEvent from '@jestUtils/asyncEvent';
import {AppState} from '@storage/reducers/app';
import {postApiCallMock} from '@utils/testUtils/apiCalls';

import {useSharedMapData} from '../useSharedMapData';
import {
    mockedResponseFailure,
    mockedResponseSuccess,
    mockedResponseSuccessWithNoData,
} from './__mocks__/getSharedCyclingMap';

interface InitStateI {
    app: Pick<AppState, 'config'>;
}
const initState: InitStateI = {
    app: {
        config: {
            name: '',
            lang: '',
            langs: {name: '', displayName: ''},
            difficulties: [],
            surfaces: [],
            tags: [],
            reactions: [],
        },
    },
};

const TEST_CURRENT_SCREEN = 'TestScreen';
const SHARE_TEST_ID = 'share-test-id';

const middlewares = [ReduxThunk];
const mockStore = configureStore(middlewares);

const mockedNavigate = jest.fn();
const mockedGoBack = jest.fn();
jest.mock('@react-navigation/native', () => ({
    useRoute: () => ({
        name: TEST_CURRENT_SCREEN,
        params: {mapID: 'test-mapId'},
    }),
    useNavigation: () => ({
        navigate: mockedNavigate,
        canGoBack: jest.fn().mockReturnValue(true),
        goBack: mockedGoBack,
    }),
}));

describe('[useSharedMapData - hooks]', () => {
    let store: MockStoreEnhanced<unknown, {}>;

    it('Should not fetch data when "shareId" not passed', async () => {
        store = mockStore(initState);
        const {result, waitForNextUpdate} = hookRenderer(store);

        await waitForNextUpdate();

        expect(result.current.mapData).toBeNull();
        expect(result.current.error).toBeFalsy();
    });

    it('Should return error when data is not fetched', async () => {
        await postApiCallMock(mockedResponseFailure, 'get');
        store = mockStore(initState);
        const {result, waitForNextUpdate} = hookRenderer(store, SHARE_TEST_ID);

        await asyncEvent(async () => {
            await waitForNextUpdate();
        });

        expect(result.current.mapData).toBeNull();
        expect(result.current.error).toBeTruthy();
    });

    it('Should return error when data is empty', async () => {
        await postApiCallMock(mockedResponseSuccessWithNoData, 'get');
        store = mockStore(initState);
        const {result, waitForNextUpdate} = hookRenderer(store, SHARE_TEST_ID);

        await asyncEvent(async () => {
            await waitForNextUpdate();
        });

        expect(result.current.mapData).toBeNull();
        expect(result.current.error).toBeTruthy();
    });

    it('Should return data when data is fetched', async () => {
        await postApiCallMock(mockedResponseSuccess, 'get');
        store = mockStore(initState);
        const {result, waitForNextUpdate} = hookRenderer(store, SHARE_TEST_ID);

        await asyncEvent(async () => {
            await waitForNextUpdate();
        });

        expect(result.current.mapData).toMatchSnapshot();
        expect(result.current.error).toBeFalsy();
        expect(result.current.isLoading).toBeFalsy();
    });

    afterEach(() => {
        cleanup();
    });
});

const hookRenderer = (
    store: MockStoreEnhanced<unknown, {}>,
    shareId?: string,
) => {
    return renderHook(() => useSharedMapData(shareId), {
        wrapper: ({children}) =>
            hookWrapper({
                children: children,
                initState: store,
            }),
    });
};

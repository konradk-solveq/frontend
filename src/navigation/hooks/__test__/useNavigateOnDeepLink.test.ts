import {renderHook, cleanup} from '@testing-library/react-hooks';
import ReduxThunk from 'redux-thunk';
import configureStore, {MockStoreEnhanced} from 'redux-mock-store';

import {hookWrapper} from '@jestUtils/render';
import asyncEvent from '@jestUtils/asyncEvent';
import {DeepLinkingState} from '@storage/reducers/deepLinking';
import {UserStateI} from '@storage/reducers/user';
import {AppState} from '@storage/reducers/app';
import {clearDeepLink, DeepLink} from '@navigation/utils/handleDeepLinkUrl';

import useNavigateOnDeepLink from '../useNavigateOnDeepLink';

interface InitStateI {
    app: Pick<AppState, 'apiAuthHeaderState'>;
    user: Pick<UserStateI, 'onboardingFinished'>;
    deepLinking: Pick<DeepLinkingState, 'takeActionOnScreen'>;
}
const initState: InitStateI = {
    app: {
        apiAuthHeaderState: false,
    },
    user: {
        onboardingFinished: true,
    },
    deepLinking: {
        takeActionOnScreen: undefined,
    },
};

const TEST_CURRENT_SCREEN = 'TestScreen';
const TEST_START_SCREEN = 'TestScreen';
const TEST_START_OTHER_SCREEN = 'TestStartScreen';

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
    useIsFocused: () => true,
}));

describe('[useNavigateOnDeepLink - navigation/hooks]', () => {
    let store: MockStoreEnhanced<unknown, {}>;

    beforeEach(() => {
        DeepLink.shareId = 'test-share-id';
        DeepLink.shareType = 'cyclingMap';
    });

    it('Should not navigate to details screen when authorization header is not set with "onlyAuth" set to "true"', async () => {
        store = mockStore(initState);
        const {result, waitForNextUpdate} = hookRenderer(store, true);

        await waitForNextUpdate();

        expect(result.current.isAuthHeaderSet).toBeFalsy();

        expect(mockedNavigate).not.toBeCalled();
    });

    it('Should not navigate to details screen when "takeActionOnScreen" is "undefined"', async () => {
        store = mockStore(initState);
        const {result} = hookRenderer(store);

        expect(result.current.navigateFromScreen).toBeUndefined();

        expect(mockedNavigate).not.toBeCalled();
    });

    it('Should not navigate to details screen when "shareId" is "undefined"', async () => {
        DeepLink.shareId = undefined;
        store = mockStore(initState);
        const {result} = hookRenderer(store);

        expect(result.current.navigateFromScreen).toBeUndefined();

        expect(mockedNavigate).not.toBeCalled();
    });

    it('Should not navigate to details screen when "shareType" is "undefined"', async () => {
        DeepLink.shareType = undefined;
        store = mockStore(initState);
        const {result} = hookRenderer(store);

        expect(result.current.navigateFromScreen).toBeUndefined();

        expect(mockedNavigate).not.toBeCalled();
    });

    it('Should not navigate to details screen when "takeActionOnScreen" is different than current route name', async () => {
        store = mockStore({
            ...initState,
            deepLinking: {takeActionOnScreen: TEST_START_OTHER_SCREEN},
        });
        const {result} = hookRenderer(store);

        expect(result.current.navigateFromScreen).toEqual(
            TEST_START_OTHER_SCREEN,
        );
        expect(result.current.navigateFromScreen).not.toEqual(
            result.current.curentRouteName,
        );

        expect(mockedNavigate).not.toBeCalled();
    });

    it('Should navigate to details screen "onlyAuth" set to "false"', async () => {
        store = mockStore({
            ...initState,
            deepLinking: {takeActionOnScreen: TEST_START_SCREEN},
        });
        const {result, waitForNextUpdate} = hookRenderer(store);

        await asyncEvent(async () => {
            await waitForNextUpdate();
        });

        expect(result.current.navigateFromScreen).toEqual(TEST_START_SCREEN);
        expect(result.current.navigateFromScreen).toEqual(
            result.current.curentRouteName,
        );

        expect(mockedNavigate).toBeCalled();

        expect(DeepLink.shareId).toBeUndefined();
        expect(DeepLink.shareType).toBeUndefined();
    });

    it('Should navigate to details screen "onlyAuth" set to "true", "takeActionOnScreen" is the same as current route screen and authorization header is set to "true"', async () => {
        store = mockStore({
            ...initState,
            app: {apiAuthHeaderState: true},
            deepLinking: {takeActionOnScreen: TEST_START_SCREEN},
        });
        const {result, waitForNextUpdate} = hookRenderer(store);

        await asyncEvent(async () => {
            await waitForNextUpdate();
        });

        expect(result.current.navigateFromScreen).toEqual(TEST_START_SCREEN);
        expect(result.current.navigateFromScreen).toEqual(
            result.current.curentRouteName,
        );

        expect(mockedNavigate).toBeCalled();

        expect(DeepLink.shareId).toBeUndefined();
        expect(DeepLink.shareType).toBeUndefined();
    });

    afterEach(() => {
        clearDeepLink();
        cleanup();
    });
});

const hookRenderer = (
    store: MockStoreEnhanced<unknown, {}>,
    hookParam?: boolean,
) => {
    return renderHook(() => useNavigateOnDeepLink(hookParam), {
        wrapper: ({children}) =>
            hookWrapper({
                children: children,
                initState: store,
            }),
    });
};

import 'react-native';
import React from 'react';
import renderComponent from '@jestUtils/render';
import asyncEvent from '@jestUtils/asyncEvent';
import {initAppSize} from '@helpers/layoutFoo';

import CounterThankYouPage from '@pages/main/recording/counterThankYouPage/counterThankYouPage';
import {postApiCallMock} from '@utils/testUtils/apiCalls';
import {mockedRouteData} from '@pages/main/recording/counterThankYouPage/__test__/mocks/mockedRouteData';

const TEST_TIME = 1800000; // 30 min
const TEST_PAUSE = 300000; // 5 min
const TEST_DISTANCE = '10,00';
const TEST_NAME = 'Test';

const mockedNavigate = jest.fn();
const mockedCanGoBack = jest.fn();
const mockedAddListener = jest.fn();
const mockedRemoveListener = jest.fn();

const navigationProp = {
    canGoBack: mockedCanGoBack,
    navigate: mockedNavigate,
    addListener: mockedAddListener,
    removeListener: mockedRemoveListener,
};
const navigation = () => navigationProp;
const useNavigation = () => ({
    canGoBack: mockedCanGoBack,
    navigate: mockedNavigate,
    addListener: mockedAddListener,
    removeListener: mockedRemoveListener,
});

const useRoute = () => ({
    params: {
        pause: TEST_PAUSE,
        distance: TEST_DISTANCE,
        time: TEST_TIME,
    },
});

const useFocusEffect = () => {};

jest.mock('@react-navigation/core', () => {
    const actualNav = jest.requireActual('@react-navigation/core');
    return {
        ...actualNav,
        navigation: navigation,
        useNavigation: useNavigation,
        useRoute: useRoute,
        useFocusEffect: useFocusEffect,
    };
});

const initStore = {
    routes: {
        loading: false,
        currentRoute: {
            id: 1,
            isActive: false,
        },
        routesToSync: [],
        routes: [
            {
                route: mockedRouteData,
                id: 1,
            },
        ],
        error: '',
        statusCode: 200,
    },
    user: {
        userName: TEST_NAME,
    },
    auth: {
        userAuthState: 'authenticated',
        onboardingFinished: true,
        userName: '',
    },
    app: {
        showedLocationInfo: false,
        internetConnectionInfo: {goodConnectionQuality: true},
    },
};

describe('CounterThankYouPage Screen', () => {
    beforeAll(() => {
        initAppSize();
    });

    beforeEach(async () => {
        await postApiCallMock({data: {id: 1}, status: 200});
        await postApiCallMock(
            {
                data: mockedRouteData,
                status: 200,
            },
            'patch',
        );
    });

    describe('Rendering', () => {
        it('Should match snapshot', async () => {
            const component = await asyncEvent(
                renderComponent(<CounterThankYouPage />, undefined, initStore),
            );

            expect(component).toMatchSnapshot();
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });
    });
});

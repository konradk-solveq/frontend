import 'react-native';
import React from 'react';
import renderComponent from '@jestUtils/render';
import asyncEvent from '@jestUtils/asyncEvent';
import {initAppSize} from '@helpers/layoutFoo';
import CounterThankYouPage from '@pages/main/recording/counterThankYouPage/counterThankYouPage';

const TEST_TIME = 1800000; // 30 min
const TEST_PAUSE = 300000; // 5 min
const TEST_DISTANCE = '10,00';
const TEST_NAME = 'Test';
const TEST_PARSED_TIME = '0:25';
const TEST_PARSED_PAUSE = '0:05';

jest.mock('react', () => {
    const originReact = jest.requireActual('react');
    const mUseRef = jest.fn();
    return {
        ...originReact,
        useRef: mUseRef,
    };
});

jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        canGoBack: jest.fn().mockReturnValue(true),
    }),
    useRoute: () => ({
        params: {
            time: TEST_TIME,
            pause: TEST_PAUSE,
            distance: TEST_DISTANCE,
        },
    }),
}));

const mockedGetName = jest.fn();

const initStore = {
    routes: {
        loading: false,
        currentRoute: {
            pauseTime: TEST_PAUSE,
        },
        error: '',
        statusCode: 200,
    },
    user: {
        userName: TEST_NAME,
    },
};

describe('Thank You Counter Screen', () => {
    const mockedNavigation = {
        navigate: jest.fn(),
    };

    beforeAll(() => {
        initAppSize();
    });

    describe('Rendering', () => {
        it('should match snapshot', async () => {
            const component = await asyncEvent(
                renderComponent(
                    <CounterThankYouPage
                        navigation={mockedNavigation}
                        getName={mockedGetName}
                        name={TEST_NAME}
                    />,
                    undefined,
                    initStore,
                ),
            );

            expect(component).toMatchSnapshot();
        });
        afterEach(() => {
            jest.restoreAllMocks();
        });
    });
});

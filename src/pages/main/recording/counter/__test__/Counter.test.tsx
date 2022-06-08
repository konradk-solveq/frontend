import 'react-native';
import React from 'react';
import renderComponent from '@jestUtils/render';
import asyncEvent from '@jestUtils/asyncEvent';
import {act} from 'react-test-renderer';
import {fireEvent} from '@testing-library/react-native';

import mapData from '@api/mocks/mapData';
import configData from '@api/mocks/configData';
import {postApiCallMock} from '@utils/testUtils/apiCalls';
import {mockedRouteData} from '@pages/main/recording/counterThankYouPage/__test__/mocks/mockedRouteData';

import Counter from '@pages/main/recording/counter/counter';
import Animated, {
    FadeIn,
    Layout,
    FadeOut,
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';

const mockedNavigate = jest.fn();
const mockedCanGoBack = jest.fn();

jest.mock('@react-navigation/core', () => {
    const actualNav = jest.requireActual('@react-navigation/core');
    return {
        ...actualNav,
        useFocusEffect: jest.fn(),
    };
});

const initStore = {
    routes: {
        loading: false,
        currentRoute: {
            id: 1,
            isActive: false,
            startedAt: undefined,
            endedAt: undefined,
            pauseTime: 0,
            routeId: undefined,
            remoteRouteId: undefined,
            recordingState: 'not-started',
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
        userName: 'user_name',
    },
    auth: {
        userAuthState: 'authenticated',
        onboardingFinished: true,
        userName: '',
    },
    app: {
        showedLocationInfo: false,
        internetConnectionInfo: {goodConnectionQuality: true},
        config: configData,
    },
    maps: {
        maps: [mapData.elements[0]],
        totalMaps: 1,
        totalPrivateMaps: null,
        plannedMaps: [],
    },
};

const TEST_ID = 'counter-container';
const ACTION_BUTTONS_TEST_ID = `${TEST_ID}-action-buttons`;
const START_BUTTON_TEST_ID = `${ACTION_BUTTONS_TEST_ID}-start-button`;
const PAUSE_RESUME_BUTTON_TEST_ID = `${ACTION_BUTTONS_TEST_ID}-pause-resume-button`;
const STOP_BUTTON_TEST_ID = `${ACTION_BUTTONS_TEST_ID}-stop-button`;

const ROUTE_ID = 'WVGmKkMZohmHJ1ayL-54559fhzdFj3Ig';

describe('<CounterContainer /> - containers/Recordging', () => {
    beforeEach(async () => {
        await postApiCallMock({data: {id: 1}, status: 200});
    });

    beforeEach(() => {
        jest.spyOn(global.Date, 'now').mockReturnValue(1654582433000);
    });

    describe('Rendering', () => {
        it('Should render only start button when recording is not active', async () => {
            const {container, getByTestId, queryByTestId} = await asyncEvent(
                renderComponent(<TestComponent />, undefined, initStore),
            );

            const startButton = getByTestId(START_BUTTON_TEST_ID);
            expect(startButton).not.toBeNull();

            const pauseResumeButton = queryByTestId(
                PAUSE_RESUME_BUTTON_TEST_ID,
            );
            expect(pauseResumeButton).toBeNull();

            const stopButton = queryByTestId(STOP_BUTTON_TEST_ID);
            expect(stopButton).toBeNull();

            expect(
                container.props.store.getState().routes.currentRoute
                    .recordingState,
            ).toBe('not-started');
            expect(
                container.props.store.getState().routes.currentRoute.isActive,
            ).toBeFalsy();
        });

        it('Should render pause/resume button when pressed start button', async () => {
            const {container, getByTestId, queryByTestId} = await asyncEvent(
                renderComponent(<TestComponent />, undefined, initStore),
            );

            const startButton = getByTestId(START_BUTTON_TEST_ID);
            await act(async () => await fireEvent.press(startButton));

            const pauseResumeButton = queryByTestId(
                PAUSE_RESUME_BUTTON_TEST_ID,
            );
            expect(pauseResumeButton).toBeTruthy();

            expect(
                container.props.store.getState().routes.currentRoute
                    .recordingState,
            ).toBe('recording');
            expect(
                container.props.store.getState().routes.currentRoute.isActive,
            ).toBeTruthy();
        });

        it('Should render pause/resume button when recording is started', async () => {
            const {container, queryByTestId} = await asyncEvent(
                renderComponent(<TestComponent />, undefined, {
                    ...initStore,
                    routes: {
                        ...initStore.routes,
                        currentRoute: {
                            ...initStore.routes.currentRoute,
                            startedAt: new Date(),
                            isActive: true,
                            recordingState: 'recording',
                            rotueId: ROUTE_ID,
                        },
                    },
                }),
            );

            const pauseResumeButton = queryByTestId(
                PAUSE_RESUME_BUTTON_TEST_ID,
            );
            expect(pauseResumeButton).toBeTruthy();

            expect(
                container.props.store.getState().routes.currentRoute
                    .recordingState,
            ).toBe('recording');
            expect(
                container.props.store.getState().routes.currentRoute.isActive,
            ).toBeTruthy();
        });

        it('Should count pauseTime when recording is started and user presssed pause button', async () => {
            const {container, queryByTestId} = await asyncEvent(
                renderComponent(<TestComponent />, undefined, {
                    ...initStore,
                    routes: {
                        ...initStore.routes,
                        currentRoute: {
                            ...initStore.routes.currentRoute,
                            startedAt: Date.now(),
                            isActive: true,
                            recordingState: 'recording',
                            routeId: ROUTE_ID,
                        },
                    },
                }),
            );

            const pauseResumeButton = queryByTestId(
                PAUSE_RESUME_BUTTON_TEST_ID,
            );

            /**
             * Returns value of pauseTime in milliseconds
             */
            jest.spyOn(global.Date, 'now').mockReturnValueOnce(1654583222000);
            /**
             * PauseRecording
             */
            await act(async () => await fireEvent.press(pauseResumeButton));

            /**
             * Returns value of pauseTime in milliseconds
             */
            jest.spyOn(global.Date, 'now').mockReturnValueOnce(1654583888000);
            /**
             * Re-run recording
             */
            await act(async () => await fireEvent.press(pauseResumeButton));

            expect(
                container.props.store.getState().routes.currentRoute.pauseTime,
            ).toBeGreaterThan(0);
        }, 5000);

        afterEach(() => {
            jest.restoreAllMocks();
            jest.clearAllMocks();
        });
    });
});

const mockedNav = jest.requireActual('@react-navigation/native');
const TestComponent: React.FC = () => (
    <Counter
        navigation={{
            ...mockedNav,
            useNavigation: () => ({
                canGoBack: mockedCanGoBack,
                navigate: mockedNavigate,
            }),
            setOptions: jest.fn(),
            useFocusEffect: jest.fn(),
        }}
        route={() => ({
            name: 'RecordTab',
        })}
    />
);

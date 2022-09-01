import {renderHook, cleanup} from '@testing-library/react-hooks';
import {AppState} from 'react-native';
import Permissions from 'react-native-permissions';
import ReduxThunk from 'redux-thunk';
import configureStore, {MockStoreEnhanced} from 'redux-mock-store';
import BackgroundGeolocation from 'react-native-background-geolocation';

import {hookWrapper} from '@jestUtils/render';
import asyncEvent from '@jestUtils/asyncEvent';
import useLocationProvider from '../useLocationProvider';
import {ProviderChangeEventI} from '@src/type/location';

const initState = {
    app: {
        showedLocationInfo: false,
    },
    auth: {
        userAuthState: 'authenticated',
    },
    user: {
        onboardingFinished: true,
    },
    authData: {userId: 'test-user'},
};
const mockedLocation = {
    activity: {
        confidence: 100,
        activity: 'on_bicycle',
    },
    battery: {is_charging: true, level: 1},
    coords: {
        accuracy: 100,
        altitude: -1,
        altitude_accuracy: -1,
        heading: 330.55,
        heading_accuracy: -1,
        latitude: 50.691728031513534,
        longitude: 17.79613619421019,
        speed: 2.78,
        speed_accuracy: -1,
    },
    extras: {route_id: ''},
    is_moving: false,
    mock: true,
    odometer: 3406.699951171875,
    timestamp: '2021-07-27T12:06:38.741Z',
    uuid: '1d14d48d-a92c-45fb-981b-b300c7ef7a4c',
};
const middlewares = [ReduxThunk];
const mockStore = configureStore(middlewares);

describe('[useLocationProvider]', () => {
    beforeAll(() => {
        AppState.currentState = 'active';
    });

    describe('Permission not granted', () => {
        beforeAll(() => {
            /**
             * Mock the permission check - success
             */
            mockGetProviderState({
                enabled: true,
                accuracyAuthorization: 0,
                gps: true,
                network: true,
                status: 1,
            });
        });

        it('Should not initialize listener when location permission is not granted', async () => {
            const {result, waitForNextUpdate} = renderHook(
                () => useLocationProvider(),
                {
                    wrapper: hookWrapper,
                },
            );

            await asyncEvent(async () => {
                await waitForNextUpdate();
            });

            expect(result.current.initialized).toBeFalsy();
        }, 5000);

        it('Should return "gpsAvailable" equal to "false"', async () => {
            const {result, waitForNextUpdate} = renderHook(
                () => useLocationProvider(),
                {
                    wrapper: hookWrapper,
                },
            );

            await asyncEvent(async () => {
                await waitForNextUpdate();
            });

            expect(result.current.gpsAvailable).toBeFalsy();
        }, 5000);

        afterEach(() => {
            jest.restoreAllMocks();
            jest.clearAllMocks();
            cleanup();
        });
    });

    describe('Permission granted', () => {
        let store: MockStoreEnhanced<unknown, {}>;

        beforeEach(() => {
            jest.spyOn(Permissions, 'check').mockReturnValue(
                Promise.resolve(Permissions.RESULTS.GRANTED),
            );
            store = mockStore(initState);
        });

        it('Should set "locationEnabled" equal to "true" when location service is enabled', async () => {
            mockGetProviderState({
                enabled: true,
                accuracyAuthorization: 0,
                gps: false,
                network: true,
                status: 3,
            });

            const {result, waitForNextUpdate} = renderHook(
                () => useLocationProvider(),
                {
                    wrapper: ({children}) =>
                        hookWrapper({
                            children: children,
                            initState: store,
                        }),
                },
            );

            await asyncEvent(async () => {
                await waitForNextUpdate();
            });

            expect(result.current.locationEnabled).toBeTruthy();
        }, 5000);

        it('Should set "highDesiredAccuracy" equal to "false" when location service is enabled and GPS provider is unavailable and when location accuracy is low', async () => {
            /**
             * Mock location response with low accuracy
             */
            jest.spyOn(
                BackgroundGeolocation,
                'getCurrentPosition',
            ).mockImplementation(() => Promise.resolve(mockedLocation));

            mockGetProviderState({
                enabled: true,
                accuracyAuthorization: 0,
                gps: false,
                network: true,
                status: 3,
            });

            const {result, waitForNextUpdate} = renderHook(
                () => useLocationProvider(),
                {
                    wrapper: ({children}) =>
                        hookWrapper({
                            children: children,
                            initState: store,
                        }),
                },
            );

            await asyncEvent(async () => {
                await waitForNextUpdate();
            });

            expect(result.current.highDesiredAccuracy).toBeFalsy();
        }, 5000);

        it('Should set "gpsAvailable" equal to "true" when location service is enabled and GPS provider is available', async () => {
            mockGetProviderState({
                enabled: true,
                accuracyAuthorization: 0,
                gps: true,
                network: false,
                status: 3,
            });

            const {result, waitForNextUpdate} = renderHook(
                () => useLocationProvider(),
                {
                    wrapper: ({children}) =>
                        hookWrapper({
                            children: children,
                            initState: store,
                        }),
                },
            );

            await asyncEvent(async () => {
                await waitForNextUpdate();
            });

            expect(result.current.gpsAvailable).toBeTruthy();
        }, 5000);

        afterEach(() => {
            jest.restoreAllMocks();
            jest.clearAllMocks();
            cleanup();
        });
    });

    afterEach(() => {
        cleanup();
    });

    afterAll(() => {
        AppState.currentState = 'inactive';
        jest.resetAllMocks();
    });
});

const mockGetProviderState = (response: ProviderChangeEventI) => {
    jest.spyOn(BackgroundGeolocation, 'getProviderState').mockReturnValue(
        Promise.resolve(
            response || {
                enabled: true,
                accuracyAuthorization: 0,
                gps: true,
                network: true,
                status: 1,
            },
        ),
    );
};

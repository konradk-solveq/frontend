import {act} from 'react-test-renderer';
import configureStore, {MockStoreEnhanced} from 'redux-mock-store';
import {renderHook, cleanup} from '@testing-library/react-hooks';
import ReduxThunk from 'redux-thunk';
import Permissions from 'react-native-permissions';

import useProviderStaticLocation from '@hooks/staticLocationProvider/useProviderStaticLocation';
import {startedRoute} from '@storage/actions/__tests__/utils/routeData';
import {hookWrapper} from '@jestUtils/render';
import asyncEvent from '@jestUtils/asyncEvent';
import {trackerDataResult} from '../utils/trackerDataResult';

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
    routes: {
        currentRoute: startedRoute,
    },
};

const middlewares = [ReduxThunk];
const mockStore = configureStore(middlewares);

describe('[useProviderStaticLocation]', () => {
    let store: MockStoreEnhanced<unknown, {}>;

    it('Should set location on mount for geofence listener [ALWAYS] when recording is not active', async () => {
        jest.spyOn(Permissions, 'check').mockReturnValue(
            Promise.resolve(Permissions.RESULTS.GRANTED),
        );

        store = mockStore({
            ...initState,
            routes: {
                currentRoute: {
                    ...startedRoute,
                    isActive: false,
                    recordingState: 'non-started',
                },
            },
        });
        const {result, waitForNextUpdate} = renderHook(
            () => useProviderStaticLocation(),
            {
                wrapper: ({children}) =>
                    hookWrapper({
                        children: children,
                        initState: store,
                    }),
            },
        );

        await waitForNextUpdate();
        /**
         * Force update cause jest not see changes in useRef value
         */
        await act(async () => result.current.isTrackingActivatedHandler(false));

        const locationToCompare = {
            latitude: trackerDataResult.coords.lat,
            longitude: trackerDataResult.coords.lon,
        };

        /**
         * Check if location is set on init.
         */
        expect(result.current?.location).toEqual(locationToCompare);
    }, 5000);

    it('Should set location on mount using timeout [WHEN_IN_USE]', async () => {
        jest.spyOn(Permissions, 'check').mockReturnValue(
            Promise.resolve(Permissions.RESULTS.LIMITED),
        );

        store = mockStore(initState);
        const {result, waitForNextUpdate} = renderHook(
            () => useProviderStaticLocation(),
            {
                wrapper: ({children}) =>
                    hookWrapper({
                        children: children,
                        initState: store,
                    }),
            },
        );

        await act(async () => {
            /**
             * Stop after timeout (1500) to prevent interval loop.
             */
            setTimeout(() => {
                jest.clearAllTimers();
            }, 1500);
            jest.runAllTimers();
        });
        await asyncEvent(async () => {
            await waitForNextUpdate();
        });

        const locationToCompare = {
            latitude: trackerDataResult.coords.lat,
            longitude: trackerDataResult.coords.lon,
        };

        expect(result.current?.location).toEqual(locationToCompare);
    }, 5000);

    it('Should set tracking state on handler [ALWAYS]', async () => {
        jest.spyOn(Permissions, 'check').mockReturnValue(
            Promise.resolve(Permissions.RESULTS.GRANTED),
        );

        store = mockStore(initState);
        const {result, waitForNextUpdate} = renderHook(
            () => useProviderStaticLocation(),
            {
                wrapper: ({children}) =>
                    hookWrapper({
                        children: children,
                        initState: store,
                    }),
            },
        );

        await waitForNextUpdate();

        /**
         * Enable tracking
         */
        await act(async () => result.current.isTrackingActivatedHandler(true));
        expect(result.current?.isTrackingActivated).toBeTruthy();

        /**
         * Disable tracking
         */
        await act(async () => result.current.isTrackingActivatedHandler(false));
        expect(result.current?.isTrackingActivated).toBeFalsy();
    }, 5000);

    afterEach(() => {
        cleanup();
    });
});

import {renderHook, cleanup} from '@testing-library/react-hooks';

import {
    hookWrapperCounterDataProvider,
    HookWrapperProps,
} from '@jestUtils/render';
import asyncEvent from '@jestUtils/asyncEvent';
import {useGetAverageSpeed} from '@containers/Recording/hooks';

const START_DATE = '2022-06-07T06:00:00.000Z';
const DEFAULT_SPEED = '0.0';
const TRACKER_DATA = {
    distance: '3,41',
    speed: '10.0',
    averageSpeed: '6.0',
    odometer: 3406.699951171875,
    coords: {
        lat: 50.691728031513534,
        lon: 17.79613619421019,
    },
    timestamp: 1654582433,
};

describe('[useGetAverageSpeed] - containers/Recording/hooks', () => {
    describe('Permission not granted', () => {
        beforeEach(() => {
            jest.spyOn(global.Date, 'now').mockReturnValue(1654582433000);
        });

        it('Should return average speed when given "startTime" and recodring has been "started"', async () => {
            const {result, waitForNextUpdate} = renderHook(
                () => useGetAverageSpeed(new Date(START_DATE), true),
                {
                    wrapper: hookWrapperCounterDataProviderWithData,
                },
            );

            await asyncEvent(async () => {
                await waitForNextUpdate();
            });

            expect(result.current).toMatchSnapshot();
        }, 5000);

        it('Should return default speed when given "startTime" is undefined and recodring has been "started"', async () => {
            const {result, waitForNextUpdate} = renderHook(
                () => useGetAverageSpeed(undefined, true),
                {
                    wrapper: hookWrapperCounterDataProviderWithData,
                },
            );

            await asyncEvent(async () => {
                await waitForNextUpdate();
            });

            expect(result.current).toEqual(DEFAULT_SPEED);
        }, 5000);

        it('Should return default speed when given "startTime" and recodring has not been "started"', async () => {
            const {result, waitForNextUpdate} = renderHook(
                () => useGetAverageSpeed(new Date(START_DATE)),
                {
                    wrapper: hookWrapperCounterDataProviderWithData,
                },
            );

            await asyncEvent(async () => {
                await waitForNextUpdate();
            });

            expect(result.current).toEqual(DEFAULT_SPEED);
        }, 5000);

        afterEach(() => {
            jest.restoreAllMocks();
            jest.clearAllMocks();
            cleanup();
        });
    });
});

const hookWrapperCounterDataProviderWithData = ({
    children,
    initState,
}: HookWrapperProps) =>
    hookWrapperCounterDataProvider(
        {children, initState},
        {trackerData: TRACKER_DATA, pauseTime: 0},
    );

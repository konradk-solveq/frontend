import {renderHook, cleanup} from '@testing-library/react-hooks';
import asyncEvent from '@jestUtils/asyncEvent';

import {useRecordingTimer} from '@containers/Recording/hooks';

const RECORDING_START_DATE = '2022-06-07T05:47:00.000Z';
const DEFAULT_TIME = '00:00';

describe('[useRecordingTimer] - containers/Recording/hooks', () => {
    describe('Permission not granted', () => {
        beforeEach(() => {
            jest.spyOn(global.Date, 'now').mockReturnValue(1654581600000); // 2022-06-07T06:00:00.000Z
        });

        it('Should return time when given "startTime" and recodring has been "started"', async () => {
            const {result, waitForNextUpdate} = renderHook(() =>
                useRecordingTimer(new Date(RECORDING_START_DATE), true),
            );

            await asyncEvent(async () => {
                await waitForNextUpdate();
            });

            expect(result.current).toEqual('00:13');
        }, 5000);

        it('Should return default time when given "startTime" and recodring has not been "started"', async () => {
            const {result, waitForNextUpdate} = renderHook(() =>
                useRecordingTimer(new Date(RECORDING_START_DATE)),
            );

            await asyncEvent(async () => {
                await waitForNextUpdate();
            });

            expect(result.current).toEqual(DEFAULT_TIME);
        }, 5000);

        it('Should return default time when and recodring has been "started" but missing "startTime"', async () => {
            const {result, waitForNextUpdate} = renderHook(() =>
                useRecordingTimer(undefined, true),
            );

            await asyncEvent(async () => {
                await waitForNextUpdate();
            });

            expect(result.current).toEqual(DEFAULT_TIME);
        }, 5000);

        afterEach(() => {
            jest.restoreAllMocks();
            jest.clearAllMocks();
            cleanup();
        });
    });
});

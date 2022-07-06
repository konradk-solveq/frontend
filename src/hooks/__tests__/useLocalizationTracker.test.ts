import {renderHook, cleanup} from '@testing-library/react-hooks';
import {act} from 'react-test-renderer';

import useLocalizationTracker from '../useLocalizationTracker';
import {hookWrapper} from '../../../jest/utils/render';
import asyncEvent from '../../../jest/utils/asyncEvent';
import {trackerDataResult} from './utils/trackerDataResult';

describe('[useLocalizationTracker]', () => {
    it('Should start route recording', async () => {
        const {result, waitForNextUpdate} = renderHook(
            () => useLocalizationTracker(true),
            {wrapper: hookWrapper},
        );
        await act(async () => await waitForNextUpdate());

        await act(async () => await result.current.startTracker());

        expect(result.current.isActive).toBe(true);
    }, 5000);

    describe('When recording has been started', () => {
        it('Should set tracker data when started', async () => {
            const {result} = renderHook(() => useLocalizationTracker(true), {
                wrapper: hookWrapper,
            });

            await act(async () => await result.current.startTracker());

            const trackerData = result.current?.trackerData;
            expect(trackerData).toStrictEqual(trackerDataResult);
        }, 5000);

        it('Should resume route recording', async () => {
            const {result} = renderHook(() => useLocalizationTracker(true), {
                wrapper: hookWrapper,
            });
            await act(async () => await result.current.startTracker());

            await asyncEvent(result.current.pauseTracker());
            expect(result.current.isActive).toBe(false);

            await asyncEvent(result.current.resumeTracker());
            expect(result.current.isActive).toBe(true);
        }, 5000);

        it('Should stop route recording', async () => {
            const {result} = renderHook(() => useLocalizationTracker(true), {
                wrapper: hookWrapper,
            });
            await act(async () => await result.current.startTracker());

            await act(async () => await result.current.stopTracker());
            expect(result.current.isActive).toBe(false);
        }, 5000);

        it('Should pause route recording', async () => {
            const {result} = renderHook(() => useLocalizationTracker(true), {
                wrapper: hookWrapper,
            });
            await act(async () => await result.current.startTracker());

            await asyncEvent(result.current.pauseTracker());
            expect(result.current.isActive).toBe(false);
        }, 5000);

        afterEach(() => {
            cleanup();
        });
    });

    afterEach(() => {
        cleanup();
    });

    afterAll(() => {
        jest.resetAllMocks();
    });
});

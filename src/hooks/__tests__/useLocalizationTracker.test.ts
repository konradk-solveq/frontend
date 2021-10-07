import {renderHook, cleanup} from '@testing-library/react-hooks';

import useLocalizationTracker from '../useLocalizationTracker';
import {hookWrapper} from '../../../jest/utils/render';
import asyncEvent from '../../../jest/utils/asyncEvent';
import {trackerDataResult} from './utils/trackerDataResult';
import {renderHookType} from './utils/renderedHook';
import {act} from 'react-test-renderer';

let renderedHook: renderHookType;

describe('[useLocalizationTracker]', () => {
    it('Should start route recording', async () => {
        const {result, waitForNextUpdate} = renderHook(
            () => useLocalizationTracker(true, true),
            {wrapper: hookWrapper},
        );

        await act(async () => await waitForNextUpdate());

        await act(async () => await result.current.startTracker());

        expect(result.current.isActive).toBe(true);
    }, 5000);

    describe('When recording has been started', () => {
        beforeEach(async () => {
            const {result, waitForNextUpdate} = (async () => {
                renderedHook = renderHook(
                    () => useLocalizationTracker(true, true),
                    {wrapper: hookWrapper},
                );
    
                if (!result && !waitForNextUpdate) {
                    return;
                }
    
                await act(async () => await waitForNextUpdate());
    
                await asyncEvent(result.current.startTracker());
            });
        });

        it('Should stop route recording', async () => {
            if (!renderedHook?.result && !renderedHook?.waitForNextUpdate) {
                return;
            }

            await asyncEvent(renderedHook.result.current.stopTracker());

            expect(renderedHook.result.current.isActive).toBe(false);
        }, 5000);

        it('Should pause route recording', async () => {
            if (!renderedHook?.result && !renderedHook?.waitForNextUpdate) {
                return;
            }

            await asyncEvent(renderedHook.result.current.pauseTracker());

            expect(renderedHook.result.current.isActive).toBe(false);
        }, 5000);

        it('Should resume route recording', async () => {
            if (!renderedHook?.result && !renderedHook?.waitForNextUpdate) {
                return;
            }

            await asyncEvent(renderedHook.result.current.pauseTracker());

            await asyncEvent(renderedHook.result.current.resumeTracker());

            expect(renderedHook.result.current.isActive).toBe(true);
        }, 5000);

        it('Should set tracker data', async () => {
            if (!renderedHook?.result && !renderedHook?.waitForNextUpdate) {
                return;
            }

            const trackerData = renderedHook.result.current?.trackerData;
            expect(trackerData).toStrictEqual(trackerDataResult);
        }, 5000);

        afterEach(() => {
            renderedHook = null;
        });
    });

    afterEach(() => {
        cleanup();
    });
});

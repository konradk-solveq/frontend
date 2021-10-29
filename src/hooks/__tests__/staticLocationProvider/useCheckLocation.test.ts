import {renderHook, cleanup} from '@testing-library/react-hooks';
import Permissions from 'react-native-permissions';
import {act} from 'react-test-renderer';

import useCheckLocationType from '@hooks/staticLocationProvider/useCheckLocationType';
import {hookWrapper} from '@jestUtils/render';
import asyncEvent from '@jestUtils/asyncEvent';

describe('[useCheckLocation]', () => {
    it('Should check location permission type and set [WHEN_IN_USE]', async () => {
        jest.spyOn(Permissions, 'check').mockReturnValue(
            Promise.resolve(Permissions.RESULTS.LIMITED),
        );
        const {result, waitForNextUpdate} = renderHook(
            () => useCheckLocationType(false, true),
            {
                wrapper: hookWrapper,
            },
        );

        await waitForNextUpdate();

        expect(result.current.locationType).toBe('WHEN_IN_USE');
    }, 5000);

    it('Should check location permission type and set [ALWAYS]', async () => {
        jest.spyOn(Permissions, 'check').mockReturnValue(
            Promise.resolve(Permissions.RESULTS.GRANTED),
        );
        const {result, waitForNextUpdate} = renderHook(
            () => useCheckLocationType(undefined, true),
            {
                wrapper: hookWrapper,
            },
        );

        await act(async () => {
            jest.runAllTimers();
        });

        await asyncEvent(async () => {
            await waitForNextUpdate();
        });

        expect(result.current.locationType).toBe('ALWAYS');
    }, 15000);

    afterEach(() => {
        cleanup();
    });
});

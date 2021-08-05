import {renderHook, cleanup} from '@testing-library/react-hooks';
import Permissions from 'react-native-permissions';

import useCheckLocationType from '@hooks/staticLocationProvider/useCheckLocationType';
import {hookWrapper} from '@jestUtils/render';

describe('[useCheckLocation]', () => {
    it('Should check location permission type and set [WHEN_IN_USE]', async () => {
        jest.spyOn(Permissions, 'check').mockReturnValue(
            Promise.resolve(Permissions.RESULTS.LIMITED),
        );
        const {result, waitForNextUpdate} = renderHook(
            () => useCheckLocationType(false),
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
            () => useCheckLocationType(),
            {
                wrapper: hookWrapper,
            },
        );

        await waitForNextUpdate();

        expect(result.current.locationType).toBe('ALWAYS');
    }, 5000);

    afterEach(() => {
        cleanup();
    });
});

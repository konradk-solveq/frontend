import {renderHook, cleanup} from '@testing-library/react-hooks';
import {act} from 'react-test-renderer';

import {hookWrapper} from '@jestUtils/render';
import {NativeSyntheticEvent, NativeScrollEvent} from 'react-native';
import {useHideOnScrollDirection} from '@hooks/useHideOnScrollDirection';
import asyncEvent from '@jestUtils/asyncEvent';

/**
 * @ts-ignores are used to simplify the mocked objects, since we're using only one property from the whole object
 */

const mockLowerOffset: NativeSyntheticEvent<NativeScrollEvent> = {
    // @ts-ignore
    nativeEvent: {
        contentOffset: {y: 10, x: 0},
    },
};
const mockHigherOffset: NativeSyntheticEvent<NativeScrollEvent> = {
    // @ts-ignore
    nativeEvent: {
        contentOffset: {y: 20, x: 0},
    },
};

describe('[useHideOnScrollDirection]', () => {
    it('Should initially set shouldHide as false', async () => {
        const {result, waitForNextUpdate} = renderHook(
            () => useHideOnScrollDirection(),
            {
                wrapper: hookWrapper,
            },
        );
        await waitForNextUpdate();
        expect(result.current.shouldHide).toBe(false);
    });
    it('Should initially set shouldHide as true if an appropriate argument was passed', async () => {
        const {result} = renderHook(() => useHideOnScrollDirection(true), {
            wrapper: hookWrapper,
        });
        expect(result.current.shouldHide).toBe(true);
    });
    it('Should set shouldHide as true after handling an event with positive scroll offset difference', async () => {
        const {result, waitForNextUpdate} = renderHook(
            () => useHideOnScrollDirection(),
            {
                wrapper: hookWrapper,
            },
        );
        act(() => result.current.onScroll(mockLowerOffset));
        act(() => result.current.onScroll(mockHigherOffset));
        await asyncEvent(async () => {
            await waitForNextUpdate();
        });
        expect(result.current.shouldHide).toBe(true);
    });
    it('Should keep shouldHide as true after handling an event with positive scroll offset difference', async () => {
        const {result, waitForNextUpdate} = renderHook(
            () => useHideOnScrollDirection(true),
            {
                wrapper: hookWrapper,
            },
        );
        act(() => result.current.onScroll(mockLowerOffset));
        act(() => result.current.onScroll(mockHigherOffset));
        await asyncEvent(async () => {
            await waitForNextUpdate();
        });
        expect(result.current.shouldHide).toBe(true);
    });
    it('Should set shouldHide as false after handling an event with negative scroll offset difference', async () => {
        const {result, waitForNextUpdate} = renderHook(
            () => useHideOnScrollDirection(true),
            {
                wrapper: hookWrapper,
            },
        );
        await act(async () => result.current.onScroll(mockHigherOffset));
        await act(async () => result.current.onScroll(mockLowerOffset));
        await asyncEvent(async () => {
            await waitForNextUpdate();
        });
        expect(result.current.shouldHide).toBe(false);
    });
    it('Should keep shouldHide as false after handling an event with negative scroll offset difference', async () => {
        const {result, waitForNextUpdate} = renderHook(
            () => useHideOnScrollDirection(),
            {
                wrapper: hookWrapper,
            },
        );
        await act(async () => result.current.onScroll(mockHigherOffset));
        await act(async () => result.current.onScroll(mockLowerOffset));
        await asyncEvent(async () => {
            await waitForNextUpdate();
        });
        expect(result.current.shouldHide).toBe(false);
    });
    it('Should keep shouldHide as true after handling an event with neutral scroll offset difference', async () => {
        const {result, waitForNextUpdate} = renderHook(
            () => useHideOnScrollDirection(true),
            {
                wrapper: hookWrapper,
            },
        );
        act(() => result.current.onScroll(mockLowerOffset));
        act(() => result.current.onScroll(mockHigherOffset));
        await asyncEvent(async () => {
            await waitForNextUpdate();
        });
        expect(result.current.shouldHide).toBe(true);
        await act(async () => result.current.onScroll(mockHigherOffset));
        await asyncEvent(async () => {
            await waitForNextUpdate();
        });
        expect(result.current.shouldHide).toBe(true);
    });
    it('Should keep shouldHide as false after handling an event with neutral scroll offset difference', async () => {
        const {result, waitForNextUpdate} = renderHook(
            () => useHideOnScrollDirection(),
            {
                wrapper: hookWrapper,
            },
        );
        await act(async () => result.current.onScroll(mockHigherOffset));
        await act(async () => result.current.onScroll(mockLowerOffset));
        await asyncEvent(async () => {
            await waitForNextUpdate();
        });
        expect(result.current.shouldHide).toBe(false);
        await act(async () => result.current.onScroll(mockLowerOffset));
        await asyncEvent(async () => {
            await waitForNextUpdate();
        });
        expect(result.current.shouldHide).toBe(false);
    });

    afterEach(() => {
        cleanup();
    });
});

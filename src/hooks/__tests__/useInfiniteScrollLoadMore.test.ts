import {renderHook, cleanup} from '@testing-library/react-hooks';
import {act} from 'react-test-renderer';

import {hookWrapper} from '@jestUtils/render';
import useInfiniteScrollLoadMore from '../useInfiniteScrollLoadMore';

describe('[useInfiniteScrollLoadMore]', () => {
    it('Should set canLoadMore as true', async () => {
        const {result, waitForNextUpdate} = renderHook(
            () => useInfiniteScrollLoadMore(10),
            {wrapper: hookWrapper},
        );

        await act(async () => await waitForNextUpdate());

        expect(result.current.canLoadMore).toBe(true);
    }, 1000);

    it.each([undefined, 0])(
        "Shouldn't set canLoadMore as true length is equal to %s",
        async (length?: number) => {
            const {result} = renderHook(
                () => useInfiniteScrollLoadMore(length),
                {wrapper: hookWrapper},
            );

            expect(result.current.canLoadMore).toBe(false);
        },
        1000,
    );

    it('Should trigger action when canLoadMore is true', async () => {
        const {result} = renderHook(() => useInfiniteScrollLoadMore(10), {
            wrapper: hookWrapper,
        });

        const onLoadMoreFn = jest.fn();

        expect(result.current.canLoadMore).toBe(true);

        await act(async () => result.current.onLoadMoreHandler(onLoadMoreFn));

        expect(result.current.canLoadMore).toBe(false);
        expect(onLoadMoreFn).toBeCalledTimes(1);
    }, 1000);

    it("Shouldn't trigger action when canLoadMore is false", async () => {
        const {result} = renderHook(() => useInfiniteScrollLoadMore(0), {
            wrapper: hookWrapper,
        });

        const onLoadMoreFn = jest.fn();

        expect(result.current.canLoadMore).toBe(false);

        await act(async () => result.current.onLoadMoreHandler(onLoadMoreFn));

        expect(result.current.canLoadMore).toBe(false);
        expect(onLoadMoreFn).toBeCalledTimes(0);
    }, 1000);

    afterEach(() => {
        cleanup();
    });
});

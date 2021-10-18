import {useEffect, useRef, useState, useCallback} from 'react';

const useInfiniteScrollLoadMore = (dataLength?: number) => {
    const previousLengthRef = useRef(0);

    const [canLoadMore, setCanLoadMore] = useState(false);

    const onLoadMoreHandler = useCallback(
        (onLoadMoreACtion: () => void) => {
            if (canLoadMore) {
                setCanLoadMore(false);
                onLoadMoreACtion();
            }
        },
        [canLoadMore],
    );

    useEffect(() => {
        if (dataLength && previousLengthRef.current !== dataLength) {
            previousLengthRef.current = dataLength;

            setCanLoadMore(true);
        }
        return () => {
            previousLengthRef.current = 0;
        };
    }, [dataLength]);

    return {canLoadMore, setCanLoadMore, onLoadMoreHandler};
};

export default useInfiniteScrollLoadMore;

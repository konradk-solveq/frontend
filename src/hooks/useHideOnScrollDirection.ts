import {useCallback, useRef, useState} from 'react';
import {NativeSyntheticEvent, NativeScrollEvent} from 'react-native';

export const useHideOnScrollDirection = (initialState = false) => {
    const offsetRef = useRef(0);

    const [shouldHide, setState] = useState(initialState);

    const onScroll = useCallback(
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            const currentOffset = event.nativeEvent.contentOffset.y;
            if (currentOffset === offsetRef.current) {
                return;
            }
            if (currentOffset > 0) {
                const newShouldHide = currentOffset > offsetRef.current;
                setState(newShouldHide);
            } else {
                setState(false);
            }

            offsetRef.current = currentOffset;
        },
        [setState],
    );

    return {shouldHide, onScroll};
};

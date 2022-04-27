import {useCallback} from 'react';
import {useMergedState} from '@hooks/useMergedState';
import {NativeSyntheticEvent, NativeScrollEvent} from 'react-native';

export const useHideOnScrollDirection = (initialState = false) => {
    const [{offset, shouldHide}, setState] = useMergedState({
        offset: 0,
        shouldHide: initialState,
    });
    const onScroll = useCallback(
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            const currentOffset = event.nativeEvent.contentOffset.y;
            if (currentOffset === offset) {
                return;
            }
            if (currentOffset > 0) {
                const newShouldHide = currentOffset > offset;
                setState({offset: currentOffset, shouldHide: newShouldHide});
            } else {
                setState({offset: currentOffset, shouldHide: false});
            }
        },
        [offset, setState],
    );
    return {shouldHide, onScroll};
};

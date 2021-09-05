import {useCallback, useRef} from 'react';
import {useFocusEffect} from '@react-navigation/core';
import {BackHandler} from 'react-native';

const useCustomBackNavButton = (
    callback?: () => void,
    abortActionDefault?: boolean,
) => {
    const mountedRef = useRef(true);

    useFocusEffect(
        useCallback(() => {
            if (!mountedRef.current) {
                return;
            }

            const onBackPress = () => {
                if (callback) {
                    callback();
                    return abortActionDefault || false;
                }

                return false;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => {
                mountedRef.current = false;
                BackHandler.removeEventListener(
                    'hardwareBackPress',
                    onBackPress,
                );
            };
        }, [callback, abortActionDefault]),
    );
};

export default useCustomBackNavButton;

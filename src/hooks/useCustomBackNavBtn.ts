import {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/core';
import {BackHandler} from 'react-native';

const useCustomBackNavButton = (
    callback?: () => void,
    abortActionDefault?: boolean,
) => {
    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                if (callback) {
                    callback();
                    return abortActionDefault || false;
                }

                return false;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => {
                BackHandler.removeEventListener(
                    'hardwareBackPress',
                    onBackPress,
                );
            };
        }, [callback, abortActionDefault]),
    );
};

export default useCustomBackNavButton;

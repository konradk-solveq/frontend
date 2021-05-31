import {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/core';
import {BackHandler} from 'react-native';

const useCustomBackNavButton = (callback: () => void) => {
    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                if (callback) {
                    callback();
                    return false;
                }

                return false;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () =>
                BackHandler.removeEventListener(
                    'hardwareBackPress',
                    onBackPress,
                );
        }, [callback]),
    );
};

export default useCustomBackNavButton;

import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const useCustomSwipeBackNav = (
    callback?: () => void,
    abortActionDefault?: boolean,
) => {
    const navigation = useNavigation();

    useEffect(() => {
        const eventListener = navigation.addListener('beforeRemove', e => {
            if (abortActionDefault) {
                e.preventDefault();
            }

            if (callback && abortActionDefault) {
                callback();
            }
        });

        return () => {
            eventListener();
        };
    }, [abortActionDefault, callback, navigation]);
};

export default useCustomSwipeBackNav;

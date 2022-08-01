import {useRef, useState, useEffect} from 'react';
import {AppState, AppStateStatus} from 'react-native';

const MATRCH_STATE = /inactive|background|uknown/;

const useAppState = () => {
    const appState = useRef<AppStateStatus>(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(
        appState.current,
    ); /* TODO: refactor state name */
    const [appPrevStateVisible, setAppPrevStateVisible] = useState(
        appState.current,
    ); /* TODO: refactor state name */
    const [appIsActive, setAppIsActive] = useState(true);

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
        if (appState.current.match(MATRCH_STATE) && nextAppState === 'active') {
            setAppIsActive(true);
        } else {
            setAppIsActive(false);
        }
        const previousState = appState.current;
        setAppPrevStateVisible(previousState);
        appState.current = nextAppState;
        setAppStateVisible(appState.current);
    };

    useEffect(() => {
        const subcription = AppState.addEventListener(
            'change',
            handleAppStateChange,
        );

        return () => {
            subcription.remove();
        };
    }, []);

    return {appStateVisible, appPrevStateVisible, appIsActive};
};

export default useAppState;

import {useRef, useState, useEffect} from 'react';
import {AppState, AppStateStatus} from 'react-native';

const useAppState = () => {
    const appState = useRef<AppStateStatus>(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    const [appPrevStateVisible, setAppPrevStateVisible] = useState(
        appState.current,
    );
    const [appIsActive, setAppIsActive] = useState(true);

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
        if (
            appState.current.match(/inactive|background/) &&
            nextAppState === 'active'
        ) {
            setAppIsActive(true);
        } else {
            setAppIsActive(false);
        }
        setAppPrevStateVisible(appState.current);
        appState.current = nextAppState;
        setAppStateVisible(appState.current);
    };

    useEffect(() => {
        AppState.addEventListener('change', handleAppStateChange);

        return () => {
            AppState.removeEventListener('change', handleAppStateChange);
        };
    }, []);

    return {appStateVisible, appPrevStateVisible, appIsActive};
};

export default useAppState;

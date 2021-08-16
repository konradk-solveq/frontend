import {useCallback, useEffect, useState} from 'react';
import {StatusBar} from 'react-native';

import {getStatusBarHeight} from '../utils/detectIOSDevice';

const useStatusBarHeight = (): number => {
    const [statusBarHeight, setStatusbarHeight] = useState<number>(
        StatusBar.currentHeight || 0,
    );

    const getStatusBarHeightAsync = useCallback(async () => {
        try {
            const h = await getStatusBarHeight(false);
            setStatusbarHeight(h || 0);
        } catch (error) {
            setStatusbarHeight(0);
        }
    }, []);

    useEffect(() => {
        getStatusBarHeightAsync();
    }, [getStatusBarHeightAsync]);

    return statusBarHeight;
};

export default useStatusBarHeight;

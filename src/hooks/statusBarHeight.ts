import {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';

import {getStatusBarHeight} from '../utils/detectIOSDevice';

const useStatusBarHeight = (): number => {
    const [statusBarHeight, setStatusbarHeight] = useState<number>(
        StatusBar.currentHeight || 0,
    );
    useEffect(() => {
        getStatusBarHeight;
        getStatusBarHeight(false).then(h => {
            setStatusbarHeight(h || 0);
        });
    }, []);

    return statusBarHeight;
};

export default useStatusBarHeight;

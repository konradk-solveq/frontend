import {getStatusBarHeight} from '../utils/detectIOSDevice';
import {getHorizontalPx} from './layoutFoo';

interface ConfigI {
    statusBarH: number | undefined;
    headerH: number | undefined;
}

let config: ConfigI | undefined;

export const initConfig = async () => {
    const statusBarH = await getStatusBarHeight(false);

    if (!config) {
        config = {
            statusBarH,
            headerH: getHorizontalPx(100) - statusBarH,
        };
    }
};

export const getAppLayoutConfig = {
    statusBarH: () => (config?.statusBarH ? config.statusBarH : 0),
    headerH: () => (config?.headerH ? config.headerH : getHorizontalPx(100)),
};

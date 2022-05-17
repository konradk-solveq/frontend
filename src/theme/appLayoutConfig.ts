import {getStatusBarHeight} from '@utils/detectIOSDevice';
import {navBarHeight} from '@theme/commonStyle';

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
            headerH: navBarHeight - statusBarH,
        };
    }
};

export const getAppLayoutConfig = {
    statusBarH: () => (config?.statusBarH ? config.statusBarH : 0),
    headerH: () => (config?.headerH ? config.headerH : navBarHeight),
};

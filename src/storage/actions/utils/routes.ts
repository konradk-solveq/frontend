import {
    startBackgroundGeolocation,
    stopBackgroundGeolocation,
    stopWatchPostionChangeListener,
} from '@utils/geolocation';
import {Alert} from 'react-native';

export const startRecording = async (routeId: string, keep?: boolean) => {
    let state = await startBackgroundGeolocation(routeId, keep);

    /**
     * Plugin not always starts on first try
     */
    if (!state?.enabled) {
        state = await startBackgroundGeolocation(routeId, keep);
    }

    return state?.enabled ? true : false;
};

export const stopRecording = async () => {
    stopWatchPostionChangeListener();
    const state = await stopBackgroundGeolocation();
    return state?.enabled ? true : false;
};

export const getNextRouteNumber = (
    totalNumbers: number | null,
    modifier = 0,
) => {
    const nextNumber = totalNumbers ? totalNumbers + 1 : 1;
    return modifier === 0 ? nextNumber : nextNumber + modifier;
};

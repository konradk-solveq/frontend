import {
    startBackgroundGeolocation,
    stopBackgroundGeolocation,
    stopWatchPostionChangeListener,
} from '@utils/geolocation';

export const startRecording = async (routeId: string, keep?: boolean) => {
    const state = await startBackgroundGeolocation(routeId, keep);
    return state?.enabled ? true : false;
};

export const stopRecording = async () => {
    stopWatchPostionChangeListener();
    const state = await stopBackgroundGeolocation();
    return state?.enabled ? true : false;
};

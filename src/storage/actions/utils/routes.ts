import {
    changePaceBackgroundGeolocation,
    startBackgroundGeolocation,
    stopBackgroundGeolocation,
    stopWatchPostionChangeListener,
} from '@utils/geolocation';

export const startRecording = async (
    routeId: string,
    keep?: boolean,
    debugModeActive?: boolean,
) => {
    let state = await startBackgroundGeolocation(
        routeId,
        keep,
        debugModeActive,
    );

    /**
     * Plugin not always starts on first try
     */
    if (!state?.enabled) {
        state = await startBackgroundGeolocation(
            routeId,
            keep,
            debugModeActive,
        );
    }

    await changePaceBackgroundGeolocation(true);

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

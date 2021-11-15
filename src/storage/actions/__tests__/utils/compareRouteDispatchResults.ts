import {
    startRecordingExpectedActions,
    startRecordingWhenKeepExpectedActions,
    synchRecordingExpectedActions,
    synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActions,
    synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActionsB,
    synchRecordingWhenOfflineAndHasNoDataToSynchExpectedActions,
    synchRecordingWhenOfflineExpectedActions,
    synchRecordingWhenOnlineAndHasNoDataToSynchExpectedActions,
    synchRecordingWhenOnlineWithSuccessOnCreateRemoteRouteIdExpectedActions,
} from './expectedAxtions';

export const compareResultsWhenStartRecordingFirstCase = (
    actionsLog: any[],
) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(startRecordingExpectedActions[0]);
    /* clear errors */
    expect(actionsLog[1]).toEqual(startRecordingExpectedActions[1]);
    /* set route data */
    expect(actionsLog[2]).toEqual(startRecordingExpectedActions[2]);
    /* loading - end */
    expect(actionsLog[3]).toEqual(startRecordingExpectedActions[3]);
};

export const compareResultsWhenStartRecordingSecondCase = (
    actionsLog: any[],
) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(startRecordingWhenKeepExpectedActions[0]);
    /* clear errors */
    expect(actionsLog[1]).toEqual(startRecordingWhenKeepExpectedActions[1]);
    /* set route data */
    expect(actionsLog[2]).toEqual(startRecordingWhenKeepExpectedActions[2]);
    /* loading - end */
    expect(actionsLog[3]).toEqual(startRecordingWhenKeepExpectedActions[3]);
};

export const compareResultsWhenOfflineFirstCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(synchRecordingWhenOfflineExpectedActions[0]);
    /* clear errors */
    expect(actionsLog[1]).toEqual(synchRecordingWhenOfflineExpectedActions[1]);
    /** clear current route data */
    expect(actionsLog[2]).toEqual(synchRecordingWhenOfflineExpectedActions[2]);
    /** clear current route */
    expect(actionsLog[3]).toEqual(synchRecordingWhenOfflineExpectedActions[3]);
    /* set synch error */
    expect(actionsLog[4]).toEqual(synchRecordingWhenOfflineExpectedActions[4]);
    /* loading - stop */
    expect(actionsLog[5]).toEqual(synchRecordingWhenOfflineExpectedActions[5]);
};

export const compareResultsWhenOfflineSecondCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(
        synchRecordingWhenOfflineAndHasNoDataToSynchExpectedActions[0],
    );
    /* clear current route data */
    expect(actionsLog[1]).toEqual(
        synchRecordingWhenOfflineAndHasNoDataToSynchExpectedActions[1],
    );
    /* clear current route */
    expect(actionsLog[2]).toEqual(
        synchRecordingWhenOfflineAndHasNoDataToSynchExpectedActions[2],
    );
    /* set connection error */
    expect(actionsLog[3]).toEqual(
        synchRecordingWhenOfflineAndHasNoDataToSynchExpectedActions[3],
    );
    /* loading - stop */
    expect(actionsLog[4]).toEqual(
        synchRecordingWhenOfflineAndHasNoDataToSynchExpectedActions[4],
    );
};

export const compareResultsWhenOfflineThirdCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(
        synchRecordingWhenOfflineAndHasNoDataToSynchExpectedActions[0],
    );
    /* clear current route data */
    expect(actionsLog[1]).toEqual(
        synchRecordingWhenOfflineAndHasNoDataToSynchExpectedActions[1],
    );
    /* clear current route */
    expect(actionsLog[2]).toEqual(
        synchRecordingWhenOfflineAndHasNoDataToSynchExpectedActions[2],
    );
    /* set connection error */
    expect(actionsLog[3]).toEqual(
        synchRecordingWhenOfflineAndHasNoDataToSynchExpectedActions[3],
    );
    /* loading - stop */
    expect(actionsLog[4]).toEqual(
        synchRecordingWhenOfflineAndHasNoDataToSynchExpectedActions[4],
    );
};

export const compareResultsWhenOfflineFourthCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(
        synchRecordingWhenOfflineAndHasNoDataToSynchExpectedActions[0],
    );
    /* clear error */
    expect(actionsLog[1]).toEqual(
        synchRecordingWhenOfflineAndHasNoDataToSynchExpectedActions[1],
    );
    /* clear current route data */
    expect(actionsLog[2]).toEqual(
        synchRecordingWhenOfflineAndHasNoDataToSynchExpectedActions[2],
    );
    /* clear current route */
    expect(actionsLog[3]).toEqual(
        synchRecordingWhenOfflineAndHasNoDataToSynchExpectedActions[3],
    );
    /* set connection error */
    expect(actionsLog[4]).toEqual(
        synchRecordingWhenOfflineAndHasNoDataToSynchExpectedActions[4],
    );
    /* loading - stop */
    expect(actionsLog[5]).toEqual(
        synchRecordingWhenOfflineAndHasNoDataToSynchExpectedActions[5],
    );
};

export const compareResultsWhenOnlineFirstCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(synchRecordingExpectedActions[0]);
    /* clear errors */
    expect(actionsLog[1]).toEqual(synchRecordingExpectedActions[1]);
    /* set left routes ids to synch */
    expect(actionsLog[2]).toEqual(synchRecordingExpectedActions[2]);
    /* set left routes data to synch */
    expect(actionsLog[3]).toEqual(synchRecordingExpectedActions[3]);
    /* set private map id */
    expect(actionsLog[4]).toEqual(synchRecordingExpectedActions[4]);
    /* clear current route location data */
    expect(actionsLog[5]).toEqual(synchRecordingExpectedActions[5]);
    /* clear current route */
    expect(actionsLog[6]).toEqual(synchRecordingExpectedActions[6]);
    /* reset avergae speed */
    expect(actionsLog[7]).toEqual(synchRecordingExpectedActions[7]);
    /* clear errors */
    expect(actionsLog[8]).toEqual(synchRecordingExpectedActions[8]);
    /* loading - stop */
    expect(actionsLog[9]).toEqual(synchRecordingExpectedActions[9]);

    /* loading maps - start */
    expect(actionsLog[10]).toEqual(synchRecordingExpectedActions[10]);
    /* set private maps data */
    expect(actionsLog[11]).toEqual(synchRecordingExpectedActions[11]);
    /* clear maps error */
    expect(actionsLog[12]).toEqual(synchRecordingExpectedActions[12]);
    /* loading maps - stop */
    expect(actionsLog[13]).toEqual(synchRecordingExpectedActions[13]);
};

export const compareResultsWhenOnlineSecondCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(
        synchRecordingWhenOnlineWithSuccessOnCreateRemoteRouteIdExpectedActions[0],
    );
    /* clear errors */
    expect(actionsLog[1]).toEqual(
        synchRecordingWhenOnlineWithSuccessOnCreateRemoteRouteIdExpectedActions[1],
    );
    /* set left routes ids to synch */
    expect(actionsLog[2]).toEqual(
        synchRecordingWhenOnlineWithSuccessOnCreateRemoteRouteIdExpectedActions[2],
    );
    /* set left routes data to synch */
    expect(actionsLog[3]).toEqual(
        synchRecordingWhenOnlineWithSuccessOnCreateRemoteRouteIdExpectedActions[3],
    );
    /* set private map id */
    expect(actionsLog[4]).toEqual(
        synchRecordingWhenOnlineWithSuccessOnCreateRemoteRouteIdExpectedActions[4],
    );
    /* clear current route location data */
    expect(actionsLog[5]).toEqual(
        synchRecordingWhenOnlineWithSuccessOnCreateRemoteRouteIdExpectedActions[5],
    );
    /* clear current route */
    expect(actionsLog[6]).toEqual(
        synchRecordingWhenOnlineWithSuccessOnCreateRemoteRouteIdExpectedActions[6],
    );
    /* reset average speed data */
    expect(actionsLog[7]).toEqual(
        synchRecordingWhenOnlineWithSuccessOnCreateRemoteRouteIdExpectedActions[7],
    );
    /* loading - stop */
    expect(actionsLog[8]).toEqual(
        synchRecordingWhenOnlineWithSuccessOnCreateRemoteRouteIdExpectedActions[8],
    );
    /* set maps loading - start */
    expect(actionsLog[9]).toEqual(
        synchRecordingWhenOnlineWithSuccessOnCreateRemoteRouteIdExpectedActions[9],
    );
    /** set route to synch */
    expect(actionsLog[10]).toEqual(
        synchRecordingWhenOnlineWithSuccessOnCreateRemoteRouteIdExpectedActions[10],
    );
    /* set private maps data */
    expect(actionsLog[11]).toEqual(
        synchRecordingWhenOnlineWithSuccessOnCreateRemoteRouteIdExpectedActions[11],
    );
    /* clear maps error */
    expect(actionsLog[12]).toEqual(
        synchRecordingWhenOnlineWithSuccessOnCreateRemoteRouteIdExpectedActions[12],
    );
    /* loading maps - stop */
    expect(actionsLog[13]).toEqual(
        synchRecordingWhenOnlineWithSuccessOnCreateRemoteRouteIdExpectedActions[13],
    );
};

export const compareResultsWhenOnlineThirdCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(
        synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActions[0],
    );
    /** clear errors */
    expect(actionsLog[1]).toEqual(
        synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActions[1],
    );
    /** clear current route data */
    expect(actionsLog[2]).toEqual(
        synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActions[2],
    );
    /** clear current route */
    expect(actionsLog[3]).toEqual(
        synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActions[3],
    );
    /* set synch error */
    expect(actionsLog[4]).toEqual(
        synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActions[4],
    );
    /* loading - stop */
    expect(actionsLog[5]).toEqual(
        synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActions[5],
    );
};

export const compareResultsWhenOnlineFourthCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(
        synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActionsB[0],
    );
    /** clear erors */
    expect(actionsLog[1]).toEqual(
        synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActionsB[1],
    );
    /** clear current route data */
    expect(actionsLog[2]).toEqual(
        synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActionsB[2],
    );
    /** clear current route */
    expect(actionsLog[3]).toEqual(
        synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActionsB[3],
    );
    /* clear average speed */
    expect(actionsLog[4]).toEqual(
        synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActionsB[4],
    );
    /* set synch error */
    expect(actionsLog[5]).toEqual(
        synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActionsB[5],
    );
};

export const compareResultsWhenOnlineFifthCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(
        synchRecordingWhenOnlineAndHasNoDataToSynchExpectedActions[0],
    );
    /**
     * add routes to synch - START
     */
    /* loading - start [internal] */
    expect(actionsLog[1]).toEqual(
        synchRecordingWhenOnlineAndHasNoDataToSynchExpectedActions[1],
    );
    /* set route id to synch after online */
    expect(actionsLog[2]).toEqual(
        synchRecordingWhenOnlineAndHasNoDataToSynchExpectedActions[2],
    );
    /* set route data to synch after online */
    expect(actionsLog[3]).toEqual(
        synchRecordingWhenOnlineAndHasNoDataToSynchExpectedActions[3],
    );
    /* reset average speed data */
    expect(actionsLog[4]).toEqual(
        synchRecordingWhenOnlineAndHasNoDataToSynchExpectedActions[4],
    );
};

export const compareResultsWhenOnlineSixthCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(
        synchRecordingWhenOnlineAndHasNoDataToSynchExpectedActions[0],
    );
    /**
     * add routes to synch - START
     */
    /* loading - start [internal] */
    expect(actionsLog[1]).toEqual(
        synchRecordingWhenOnlineAndHasNoDataToSynchExpectedActions[1],
    );
    /* set route id to synch after online */
    expect(actionsLog[2]).toEqual(
        synchRecordingWhenOnlineAndHasNoDataToSynchExpectedActions[2],
    );
    /* set route data to synch after online */
    expect(actionsLog[3]).toEqual(
        synchRecordingWhenOnlineAndHasNoDataToSynchExpectedActions[3],
    );
    /* reset average speed data */
    expect(actionsLog[4]).toEqual(
        synchRecordingWhenOnlineAndHasNoDataToSynchExpectedActions[4],
    );
};

export const compareResultsWhenOnlineSeventhCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(
        synchRecordingWhenOnlineAndHasNoDataToSynchExpectedActions[0],
    );
    /**
     * add routes to synch - START
     */
    /* loading - start [internal] */
    expect(actionsLog[1]).toEqual(
        synchRecordingWhenOnlineAndHasNoDataToSynchExpectedActions[1],
    );
    /* set route id to synch after online */
    expect(actionsLog[2]).toEqual(
        synchRecordingWhenOnlineAndHasNoDataToSynchExpectedActions[2],
    );
    /* set route data to synch after online */
    expect(actionsLog[3]).toEqual(
        synchRecordingWhenOnlineAndHasNoDataToSynchExpectedActions[3],
    );
    /* reset average speed data */
    expect(actionsLog[4]).toEqual(
        synchRecordingWhenOnlineAndHasNoDataToSynchExpectedActions[4],
    );
};

export const compareResultsWhenOnlineEigthCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(
        synchRecordingWhenOnlineAndHasNoDataToSynchExpectedActions[0],
    );
    /**
     * add routes to synch - START
     */
    /* loading - start [internal] */
    expect(actionsLog[1]).toEqual(
        synchRecordingWhenOnlineAndHasNoDataToSynchExpectedActions[1],
    );
    /* set route id to synch after online */
    expect(actionsLog[2]).toEqual(
        synchRecordingWhenOnlineAndHasNoDataToSynchExpectedActions[2],
    );
    /* set route data to synch after online */
    expect(actionsLog[3]).toEqual(
        synchRecordingWhenOnlineAndHasNoDataToSynchExpectedActions[3],
    );
    /* reset average speed data */
    expect(actionsLog[4]).toEqual(
        synchRecordingWhenOnlineAndHasNoDataToSynchExpectedActions[4],
    );
};

export const compareResultsWhenOnlineNineCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(
        synchRecordingWhenOnlineAndHasNoDataToSynchExpectedActions[0],
    );
    /* clear errors */
    expect(actionsLog[1]).toEqual(
        synchRecordingWhenOnlineAndHasNoDataToSynchExpectedActions[1],
    );
    /* clear current route data */
    expect(actionsLog[2]).toEqual(
        synchRecordingWhenOnlineAndHasNoDataToSynchExpectedActions[2],
    );
    /* clear current route */
    expect(actionsLog[3]).toEqual(
        synchRecordingWhenOnlineAndHasNoDataToSynchExpectedActions[3],
    );
    /* set connection error */
    expect(actionsLog[4]).toEqual(
        synchRecordingWhenOnlineAndHasNoDataToSynchExpectedActions[4],
    );
    /* loading - stop */
    expect(actionsLog[5]).toEqual(
        synchRecordingWhenOnlineAndHasNoDataToSynchExpectedActions[5],
    );
};

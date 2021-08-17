import {
    synchRecordingExpectedActions,
    synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActions,
    synchRecordingWhenOfflineAndHasNoDataToSynchExpectedActions,
    synchRecordingWhenOfflineExpectedActions,
    synchRecordingWhenOnlineAndHasNoDataToSynchExpectedActions,
    synchRecordingWhenOnlineWithSuccessOnCreateRemoteRouteIdExpectedActions,
} from './expectedAxtions';

export const compareResultsWhenOfflineFirstCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(synchRecordingWhenOfflineExpectedActions[0]);
    /**
     * add routes to synch - START
     */
    /* loading - start [internal] */
    expect(actionsLog[1]).toEqual(synchRecordingWhenOfflineExpectedActions[1]);
    /* set route id to synch after online */
    expect(actionsLog[2]).toEqual(synchRecordingWhenOfflineExpectedActions[2]);
    /* set route data to synch after online */
    expect(actionsLog[3]).toEqual(synchRecordingWhenOfflineExpectedActions[3]);
    /* reset average speed data */
    expect(actionsLog[4]).toEqual(synchRecordingWhenOfflineExpectedActions[4]);
    /* set connection error */
    expect(actionsLog[5]).toEqual(synchRecordingWhenOfflineExpectedActions[5]);
    /* loading - sop [internal] */
    expect(actionsLog[6]).toEqual(synchRecordingWhenOfflineExpectedActions[6]);
    /**
     * add routes to synch - STOP
     */
    /** clear current route data */
    expect(actionsLog[7]).toEqual(synchRecordingWhenOfflineExpectedActions[7]);
    /** clear current route */
    expect(actionsLog[8]).toEqual(synchRecordingWhenOfflineExpectedActions[8]);
    /* set synch error */
    expect(actionsLog[9]).toEqual(synchRecordingWhenOfflineExpectedActions[9]);
    /* loading - stop */
    expect(actionsLog[10]).toEqual(
        synchRecordingWhenOfflineExpectedActions[10],
    );
};

export const compareResultsWhenOfflineSecondCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(
        synchRecordingWhenOfflineAndHasNoDataToSynchExpectedActions[0],
    );
    /**
     * add routes to synch - START
     */
    /* loading - start [internal] */
    expect(actionsLog[1]).toEqual(
        synchRecordingWhenOfflineAndHasNoDataToSynchExpectedActions[1],
    );
    /* set route id to synch after online */
    expect(actionsLog[2]).toEqual(
        synchRecordingWhenOfflineAndHasNoDataToSynchExpectedActions[2],
    );
    /* set route data to synch after online */
    expect(actionsLog[3]).toEqual(
        synchRecordingWhenOfflineAndHasNoDataToSynchExpectedActions[3],
    );
    /* reset average speed data */
    expect(actionsLog[4]).toEqual(
        synchRecordingWhenOfflineAndHasNoDataToSynchExpectedActions[4],
    );
};

export const compareResultsWhenOfflineThirdCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(
        synchRecordingWhenOfflineAndHasNoDataToSynchExpectedActions[0],
    );
    /**
     * add routes to synch - START
     */
    /* loading - start [internal] */
    expect(actionsLog[1]).toEqual(
        synchRecordingWhenOfflineAndHasNoDataToSynchExpectedActions[1],
    );
    /* set route id to synch after online */
    expect(actionsLog[2]).toEqual(
        synchRecordingWhenOfflineAndHasNoDataToSynchExpectedActions[2],
    );
    /* set route data to synch after online */
    expect(actionsLog[3]).toEqual(
        synchRecordingWhenOfflineAndHasNoDataToSynchExpectedActions[3],
    );
    /* reset average speed data */
    expect(actionsLog[4]).toEqual(
        synchRecordingWhenOfflineAndHasNoDataToSynchExpectedActions[4],
    );
};

export const compareResultsWhenOfflineFourthCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(
        synchRecordingWhenOfflineAndHasNoDataToSynchExpectedActions[0],
    );
    /**
     * add routes to synch - START
     */
    /* loading - start [internal] */
    expect(actionsLog[1]).toEqual(
        synchRecordingWhenOfflineAndHasNoDataToSynchExpectedActions[1],
    );
    /* set route id to synch after online */
    expect(actionsLog[2]).toEqual(
        synchRecordingWhenOfflineAndHasNoDataToSynchExpectedActions[2],
    );
    /* set route data to synch after online */
    expect(actionsLog[3]).toEqual(
        synchRecordingWhenOfflineAndHasNoDataToSynchExpectedActions[3],
    );
    /* reset average speed data */
    expect(actionsLog[4]).toEqual(
        synchRecordingWhenOfflineAndHasNoDataToSynchExpectedActions[4],
    );
};

export const compareResultsWhenOnlineFirstCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(synchRecordingExpectedActions[0]);
    /* set private map id */
    expect(actionsLog[1]).toEqual(synchRecordingExpectedActions[1]);
    /* clear current route location data */
    expect(actionsLog[2]).toEqual(synchRecordingExpectedActions[2]);
    /* clear current route data */
    expect(actionsLog[3]).toEqual(synchRecordingExpectedActions[3]);
    /* reset average speed data */
    expect(actionsLog[4]).toEqual(synchRecordingExpectedActions[4]);
    /* clear errors */
    expect(actionsLog[5]).toEqual(synchRecordingExpectedActions[5]);
    /* loading - end */
    expect(actionsLog[6]).toEqual(synchRecordingExpectedActions[6]);
};

export const compareResultsWhenOnlineSecondCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(
        synchRecordingWhenOnlineWithSuccessOnCreateRemoteRouteIdExpectedActions[0],
    );
    /**
     * add routes to synch - START
     */
    /* loading - start [internal] */
    expect(actionsLog[1]).toEqual(
        synchRecordingWhenOnlineWithSuccessOnCreateRemoteRouteIdExpectedActions[1],
    );
    /* set route id to synch after online */
    expect(actionsLog[2]).toEqual(
        synchRecordingWhenOnlineWithSuccessOnCreateRemoteRouteIdExpectedActions[2],
    );
    /* set route data to synch after online */
    expect(actionsLog[3]).toEqual(
        synchRecordingWhenOnlineWithSuccessOnCreateRemoteRouteIdExpectedActions[3],
    );
    /* reset average speed data */
    expect(actionsLog[4]).toEqual(
        synchRecordingWhenOnlineWithSuccessOnCreateRemoteRouteIdExpectedActions[4],
    );
    /* set connection error */
    expect(actionsLog[5]).toEqual(
        synchRecordingWhenOnlineWithSuccessOnCreateRemoteRouteIdExpectedActions[5],
    );
    /* loading - sop [internal] */
    expect(actionsLog[6]).toEqual(
        synchRecordingWhenOnlineWithSuccessOnCreateRemoteRouteIdExpectedActions[6],
    );
    /**
     * add routes to synch - STOP
     */
    /** clear current route data */
    expect(actionsLog[7]).toEqual(
        synchRecordingWhenOnlineWithSuccessOnCreateRemoteRouteIdExpectedActions[7],
    );
};

export const compareResultsWhenOnlineThirdCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(
        synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActions[0],
    );
    /**
     * add routes to synch - START
     */
    /* loading - start [internal] */
    expect(actionsLog[1]).toEqual(
        synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActions[1],
    );
    /* set route id to synch after online */
    expect(actionsLog[2]).toEqual(
        synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActions[2],
    );
    /* set route data to synch after online */
    expect(actionsLog[3]).toEqual(
        synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActions[3],
    );
    /* reset average speed data */
    expect(actionsLog[4]).toEqual(
        synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActions[4],
    );
    /* set connection error */
    expect(actionsLog[5]).toEqual(
        synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActions[5],
    );
    /* loading - sop [internal] */
    expect(actionsLog[6]).toEqual(
        synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActions[6],
    );
    /**
     * add routes to synch - STOP
     */
    /** clear current route data */
    expect(actionsLog[7]).toEqual(
        synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActions[7],
    );
    /** clear current route */
    expect(actionsLog[8]).toEqual(
        synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActions[8],
    );
    /* set synch error */
    expect(actionsLog[9]).toEqual(
        synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActions[9],
    );
    /* loading - stop */
    expect(actionsLog[10]).toEqual(
        synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActions[10],
    );
};

export const compareResultsWhenOnlineFourthCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(
        synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActions[0],
    );
    /**
     * add routes to synch - START
     */
    /* loading - start [internal] */
    expect(actionsLog[1]).toEqual(
        synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActions[1],
    );
    /* set route id to synch after online */
    expect(actionsLog[2]).toEqual(
        synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActions[2],
    );
    /* set route data to synch after online */
    expect(actionsLog[3]).toEqual(
        synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActions[3],
    );
    /* reset average speed data */
    expect(actionsLog[4]).toEqual(
        synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActions[4],
    );
    /* set connection error */
    expect(actionsLog[5]).toEqual(
        synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActions[5],
    );
    /* loading - sop [internal] */
    expect(actionsLog[6]).toEqual(
        synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActions[6],
    );
    /**
     * add routes to synch - STOP
     */
    /** clear current route data */
    expect(actionsLog[7]).toEqual(
        synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActions[7],
    );
    /** clear current route */
    expect(actionsLog[8]).toEqual(
        synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActions[8],
    );
    /* set synch error */
    expect(actionsLog[9]).toEqual(
        synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActions[9],
    );
    /* loading - stop */
    expect(actionsLog[10]).toEqual(
        synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActions[10],
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

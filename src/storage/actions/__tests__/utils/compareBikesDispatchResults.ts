import {
    synchRecordingWhenOnlineExpectedActions,
    synchRecordingWhenOnlineAndReturnIncompliteDataExpectedActions,
    synchRecordingWhenOnlineAndReturnsNoDataExpectedActions,
    synchBikesListWhenOnlineExpectedActions,
    synchBikesListWhenOnlineAndNoDataFromAPIExpectedActions,
} from './expectedActionsBikes';

export const compareResultsWhenOnlineFirstCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(synchRecordingWhenOnlineExpectedActions[0]);

    /* setting frame number */
    expect(actionsLog[1]).toEqual(synchRecordingWhenOnlineExpectedActions[1]);

    /* setting new data, loading - stop */
    expect(actionsLog[2]).toEqual(synchRecordingWhenOnlineExpectedActions[2]);
};

export const compareResultsWhenOnlineSecondCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(
        synchRecordingWhenOnlineAndReturnIncompliteDataExpectedActions[0],
    );

    /* setting frame number */
    expect(actionsLog[1]).toEqual(
        synchRecordingWhenOnlineAndReturnIncompliteDataExpectedActions[1],
    );

    /* setting new data, loading - stop */
    expect(actionsLog[2]).toEqual(
        synchRecordingWhenOnlineAndReturnIncompliteDataExpectedActions[2],
    );
};

export const compareResultsWhenOnlineThirdCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(
        synchRecordingWhenOnlineAndReturnsNoDataExpectedActions[0],
    );

    /* setting frame number */
    expect(actionsLog[1]).toEqual(
        synchRecordingWhenOnlineAndReturnsNoDataExpectedActions[1],
    );

    /* setting error */
    expect(actionsLog[2]).toEqual(
        synchRecordingWhenOnlineAndReturnsNoDataExpectedActions[2],
    );
};

export const compareResultsWhenOnlineFourthCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(synchBikesListWhenOnlineExpectedActions[0]);

    /* setting new data */
    expect(actionsLog[1]).toEqual(synchBikesListWhenOnlineExpectedActions[1]);

    /* setting error - bikes wich has not been updated */
    expect(actionsLog[2]).toEqual(synchBikesListWhenOnlineExpectedActions[2]);

    /* loading - end */
    expect(actionsLog[3]).toEqual(synchBikesListWhenOnlineExpectedActions[3]);
};

export const compareResultsWhenOnlineFifthCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(
        synchBikesListWhenOnlineAndNoDataFromAPIExpectedActions[0],
    );

    /* setting error */
    expect(actionsLog[1]).toEqual(
        synchBikesListWhenOnlineAndNoDataFromAPIExpectedActions[1],
    );
};

import {
    synchRecordingWhenOnlineExpectedActions,
    synchRecordingWhenOnlinePaginationExpectedActions,
} from './expectedActionsMaps';

export const compareResultsWhenOnlineFirstCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(synchRecordingWhenOnlineExpectedActions[0]);

    /* setting new data */
    expect(actionsLog[1]).toEqual(synchRecordingWhenOnlineExpectedActions[1]);
    /* clear error */
    expect(actionsLog[2]).toEqual(synchRecordingWhenOnlineExpectedActions[2]);

    /* loading - end */
    expect(actionsLog[3]).toEqual(synchRecordingWhenOnlineExpectedActions[3]);
};

export const compareResultsWhenOnlineSecondCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(
        synchRecordingWhenOnlinePaginationExpectedActions[0],
    );

    /* setting new data */
    expect(actionsLog[1]).toEqual(
        synchRecordingWhenOnlinePaginationExpectedActions[1],
    );
    /* clear error */
    expect(actionsLog[2]).toEqual(
        synchRecordingWhenOnlinePaginationExpectedActions[2],
    );

    /* loading - end */
    expect(actionsLog[3]).toEqual(
        synchRecordingWhenOnlinePaginationExpectedActions[3],
    );
};

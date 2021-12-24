import {
    authenticateUserWhenOfflineAndExpectedActions,
    authenticateUserWhenOnlineAndExpectedActions,
    authenticateUserWhenOnlineSecondCaseExpectedActions,
    authenticateUserWhenOnlineThirdCaseExpectedActions,
} from './expectedActionsAuth';

export const compareResultsWhenOfflineFirstCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(
        authenticateUserWhenOfflineAndExpectedActions[0],
    );
    /* set authentication error */
    expect(actionsLog[1]).toEqual(
        authenticateUserWhenOfflineAndExpectedActions[1],
    );
    /* loading - stop */
    expect(actionsLog[2]).toEqual(
        authenticateUserWhenOfflineAndExpectedActions[2],
    );
};

export const compareResultsWhenOnlineFirstCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(
        authenticateUserWhenOnlineAndExpectedActions[0],
    );
    /* set authentication error and stop loading */
    expect(actionsLog[1]).toEqual(
        authenticateUserWhenOnlineAndExpectedActions[1],
    );
};

export const compareResultsWhenOnlineSecondCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(
        authenticateUserWhenOnlineSecondCaseExpectedActions[0],
    );
    /* set authentication error and stop loading */
    expect(actionsLog[1]).toEqual(
        authenticateUserWhenOnlineSecondCaseExpectedActions[1],
    );
};

export const compareResultsWhenOnlineThirdCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(
        authenticateUserWhenOnlineThirdCaseExpectedActions[0],
    );
    /* loading - stop */
    expect(actionsLog[1]).toEqual(
        authenticateUserWhenOnlineThirdCaseExpectedActions[1],
    );
};

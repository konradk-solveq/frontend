import {
    authenticateUserWhenOfflineAndExpectedActions,
    authenticateUserWhenOnlineAndExpectedActions,
    authenticateUserWhenOnlineSecondCaseExpectedActions,
    authenticateUserWhenOnlineThirdCaseExpectedActions,
    authenticateUserWhenOnlineFourthCaseExpectedActions,
    userRegistrationFirstCaseExpectedActions,
    userRegistrationSecondCaseExpectedActions,
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
export const compareResultsWhenOnlineFourthCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(
        authenticateUserWhenOnlineFourthCaseExpectedActions[0],
    );
    /* set authentication error and stop loading */
    expect(actionsLog[1]).toEqual(
        authenticateUserWhenOnlineFourthCaseExpectedActions[1],
    );
};

export const compareRegistrationResultsFirstCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(userRegistrationFirstCaseExpectedActions[0]);
    /* set authentication error and stop loading */
    expect(actionsLog[1]).toEqual(userRegistrationFirstCaseExpectedActions[1]);
    /* set authentication state to 'mobile' */
    expect(actionsLog[2]).toEqual(userRegistrationFirstCaseExpectedActions[2]);
    /* loading - false */
    expect(actionsLog[3]).toEqual(userRegistrationFirstCaseExpectedActions[3]);
};

export const compareRegistrationResultsSecondCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(userRegistrationSecondCaseExpectedActions[0]);
    /* set authentication error and stop loading */
    expect(actionsLog[1]).toEqual(userRegistrationSecondCaseExpectedActions[1]);
    /* set authentication data */
    expect(actionsLog[2]).toEqual(userRegistrationSecondCaseExpectedActions[2]);
    /* set authentication state to 'mobile' */
    expect(actionsLog[3]).toEqual(userRegistrationSecondCaseExpectedActions[3]);
    /* loading - false */
    expect(actionsLog[4]).toEqual(userRegistrationSecondCaseExpectedActions[4]);
};

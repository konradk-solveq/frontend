import {
    getLegalDocumentsWhenOfflineExpectedActions,
    getLegalDocumentsWhenOnlineAndErrorExpectedActions,
    getLegalDocumentsWhenOnlineAndSuccessExpectedActions,
    getLegalDocumentsWhenOnlineAndNoDataExpectedActions,
} from '@storage/actions/__tests__/utils/expectedActionsApp';

export const compareResultsWhenOfflineFirstCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(
        getLegalDocumentsWhenOfflineExpectedActions[0],
    );
    /* set app sync error */
    expect(actionsLog[1]).toEqual(
        getLegalDocumentsWhenOfflineExpectedActions[1],
    );
    /* loading - stop */
    expect(actionsLog[2]).toEqual(
        getLegalDocumentsWhenOfflineExpectedActions[2],
    );
};

export const compareResultsWhenOnlineFirstCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(
        getLegalDocumentsWhenOnlineAndErrorExpectedActions[0],
    );
    /* set app sync error */
    expect(actionsLog[1]).toEqual(
        getLegalDocumentsWhenOnlineAndErrorExpectedActions[1],
    );
    /* loading - stop */
    expect(actionsLog[2]).toEqual(
        getLegalDocumentsWhenOnlineAndErrorExpectedActions[2],
    );
};
export const compareResultsWhenOnlineSecondCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(
        getLegalDocumentsWhenOnlineAndSuccessExpectedActions[0],
    );
    /* set app sync error */
    expect(actionsLog[1]).toEqual(
        getLegalDocumentsWhenOnlineAndSuccessExpectedActions[1],
    );
    /* loading - stop */
    expect(actionsLog[2]).toEqual(
        getLegalDocumentsWhenOnlineAndSuccessExpectedActions[2],
    );
};

export const compareResultsWhenOnlineThirdCase = (actionsLog: any[]) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(
        getLegalDocumentsWhenOnlineAndNoDataExpectedActions[0],
    );
    /* set app sync error */
    expect(actionsLog[1]).toEqual(
        getLegalDocumentsWhenOnlineAndNoDataExpectedActions[1],
    );
    /* loading - stop */
    expect(actionsLog[2]).toEqual(
        getLegalDocumentsWhenOnlineAndNoDataExpectedActions[2],
    );
};

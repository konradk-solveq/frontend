import {
    missingControlSumActions,
    theSameControlSumsActions,
} from './expectedActionsUiTranslation';

type ActionLogT = {[key: string]: any};

export const compareResultsWhenMIssingControlSum = (
    actionsLog: ActionLogT[],
) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(missingControlSumActions[0]);
    /* set control sum */
    expect(actionsLog[1]).toEqual(missingControlSumActions[1]);
    /* loading - stop */
    expect(actionsLog[2]).toEqual(missingControlSumActions[2]);
};

export const compareResultsControlSumsAreTheSame = (
    actionsLog: ActionLogT[],
) => {
    /* loading - start */
    expect(actionsLog[0]).toEqual(theSameControlSumsActions[0]);
    /* loading - stop */
    expect(actionsLog[1]).toEqual(theSameControlSumsActions[1]);
};

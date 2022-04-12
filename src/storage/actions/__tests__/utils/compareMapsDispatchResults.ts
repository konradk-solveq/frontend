import {
    PUBLIC_MAP_EXPECTED_ACTIONS,
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

export const publicMapsResultCases = {
    compareResultsWhenOnlineFirstCase: (actionsLog: any[]) => {
        /* loading - start */
        expect(actionsLog[0]).toEqual(
            PUBLIC_MAP_EXPECTED_ACTIONS
                .addToFavouritesSuccessExpectedActions[0],
        );

        /* set as favourite */
        expect(actionsLog[1]).toEqual(
            PUBLIC_MAP_EXPECTED_ACTIONS
                .addToFavouritesSuccessExpectedActions[1],
        );

        /* fetch and set updated favourites maps list - start */
        expect(actionsLog[2]).toEqual(
            PUBLIC_MAP_EXPECTED_ACTIONS
                .addToFavouritesSuccessExpectedActions[2],
        );

        /* clear error for favourites maps status */
        expect(actionsLog[3]).toEqual(
            PUBLIC_MAP_EXPECTED_ACTIONS
                .addToFavouritesSuccessExpectedActions[3],
        );
        /* fetch and set updated favourites maps list - end */

        /* clear errors */
        expect(actionsLog[4]).toEqual(
            PUBLIC_MAP_EXPECTED_ACTIONS
                .addToFavouritesSuccessExpectedActions[4],
        );

        /* loading - end */
        expect(actionsLog[5]).toEqual(
            PUBLIC_MAP_EXPECTED_ACTIONS
                .addToFavouritesSuccessExpectedActions[5],
        );
    },
    compareResultsWhenOnlineFirstFailCase: (actionsLog: any[]) => {
        /* loading - start */
        expect(actionsLog[0]).toEqual(
            PUBLIC_MAP_EXPECTED_ACTIONS.addToFavouritesFailExpectedActions[0],
        );

        /* set error */
        expect(actionsLog[1]).toEqual(
            PUBLIC_MAP_EXPECTED_ACTIONS.addToFavouritesFailExpectedActions[1],
        );
    },
    compareResultsWhenOnlineSecondCase: (actionsLog: any[]) => {
        /* loading - start */
        expect(actionsLog[0]).toEqual(
            PUBLIC_MAP_EXPECTED_ACTIONS
                .removeFromFavouritesSuccessExpectedActions[0],
        );

        /* set as non-favourite */
        expect(actionsLog[1]).toEqual(
            PUBLIC_MAP_EXPECTED_ACTIONS
                .removeFromFavouritesSuccessExpectedActions[1],
        );

        /* remove from favourites */
        expect(actionsLog[2]).toEqual(
            PUBLIC_MAP_EXPECTED_ACTIONS
                .removeFromFavouritesSuccessExpectedActions[2],
        );

        /* fetch and set updated favourites maps list - start */
        expect(actionsLog[3]).toEqual(
            PUBLIC_MAP_EXPECTED_ACTIONS
                .removeFromFavouritesSuccessExpectedActions[3],
        );

        /* clear error for favourites maps status */
        expect(actionsLog[4]).toEqual(
            PUBLIC_MAP_EXPECTED_ACTIONS
                .removeFromFavouritesSuccessExpectedActions[4],
        );
        /* fetch and set updated favourites maps list - end */

        /* clear errors */
        expect(actionsLog[5]).toEqual(
            PUBLIC_MAP_EXPECTED_ACTIONS
                .removeFromFavouritesSuccessExpectedActions[5],
        );

        /* loading - end */
        expect(actionsLog[6]).toEqual(
            PUBLIC_MAP_EXPECTED_ACTIONS
                .removeFromFavouritesSuccessExpectedActions[6],
        );
    },
    compareResultsWhenOnlineFailSecondCase: (actionsLog: any[]) => {
        /* loading - start */
        expect(actionsLog[0]).toEqual(
            PUBLIC_MAP_EXPECTED_ACTIONS
                .removeFromFavouritesFailExpectedActions[0],
        );

        /* set error */
        expect(actionsLog[1]).toEqual(
            PUBLIC_MAP_EXPECTED_ACTIONS
                .removeFromFavouritesFailExpectedActions[1],
        );
    },
};

import {
    storeMockups,
    initialStatesRegulations,
    initialStatesPolicies,
} from './mocks/app';

import * as actionTypes from '@storage/actions/actionTypes';
import appReducer from '../app';

describe('Test adding regulations to appReducer', () => {
    it('older and newer regulations on state and later regulations on store', () => {
        const res = appReducer(storeMockups[0], {
            type: actionTypes.SET_APP_REGULATION,
            regulation: initialStatesRegulations[0],
        });

        const expecting = initialStatesRegulations[0].regulation1;
        expecting.paragraph = expecting?.paragraph.concat(
            initialStatesRegulations[0].regulation2?.paragraph,
        );

        expect(res.regulation).toEqual(expecting);
    });

    it('newer and older regulations on state and later regulations on store', () => {
        const res = appReducer(storeMockups[0], {
            type: actionTypes.SET_APP_REGULATION,
            regulation: initialStatesRegulations[1],
        });

        const expecting = initialStatesRegulations[1].regulation1;
        expecting.paragraph = expecting?.paragraph.concat(
            initialStatesRegulations[0].regulation2?.paragraph,
        );

        expect(res.regulation).toEqual(expecting);
    });

    it('regulations and null on state and later regulations on store', () => {
        const res = appReducer(storeMockups[0], {
            type: actionTypes.SET_APP_REGULATION,
            regulation: initialStatesRegulations[3],
        });

        expect(res.regulation).toEqual(initialStatesRegulations[3].regulation1);
    });

    it('null and null on state and later regulation on store', () => {
        const res = appReducer(storeMockups[0], {
            type: actionTypes.SET_APP_REGULATION,
            regulation: initialStatesRegulations[4],
        });

        expect(res.regulation).toEqual(initialStatesRegulations[4].regulation1);
    });

    it('older and newer regulations on state and earlier regulations on store', () => {
        const res = appReducer(storeMockups[1], {
            type: actionTypes.SET_APP_REGULATION,
            regulation: initialStatesRegulations[0],
        });

        expect(res.regulation).toEqual(initialStatesRegulations[1].regulation2);
    });

    it('regulations and null on state and earlier regulations on store', () => {
        const res = appReducer(storeMockups[1], {
            type: actionTypes.SET_APP_REGULATION,
            regulation: initialStatesRegulations[2],
        });

        expect(res.regulation).toEqual(initialStatesRegulations[2].regulation1);
    });
});

describe('Test adding polices to appReducer', () => {
    it('older and newer polices on state and later polices on store', () => {
        const res = appReducer(storeMockups[0], {
            type: actionTypes.SET_APP_POLICY,
            policy: initialStatesPolicies[0],
        });

        const expecting = initialStatesPolicies[0].policy1;
        expecting.paragraph = expecting?.paragraph.concat(
            initialStatesPolicies[0].policy2?.paragraph,
        );

        expect(res.policy).toEqual(expecting);
    });

    it('newer and older polices on state and later polices on store', () => {
        const res = appReducer(storeMockups[0], {
            type: actionTypes.SET_APP_POLICY,
            policy: initialStatesPolicies[1],
        });

        const expecting = initialStatesPolicies[1].policy1;
        expecting.paragraph = expecting?.paragraph.concat(
            initialStatesPolicies[0].policy2?.paragraph,
        );

        expect(res.policy).toEqual(expecting);
    });

    it('polices and null on state and later polices on store', () => {
        const res = appReducer(storeMockups[0], {
            type: actionTypes.SET_APP_POLICY,
            policy: initialStatesPolicies[3],
        });

        expect(res.policy).toEqual(initialStatesPolicies[3].policy1);
    });

    it('null and null on state and later policy on store', () => {
        const res = appReducer(storeMockups[0], {
            type: actionTypes.SET_APP_POLICY,
            policy: initialStatesPolicies[4],
        });

        expect(res.policy).toEqual(initialStatesPolicies[4].policy1);
    });

    it('older and newer polices on state and earlier polices on store', () => {
        const res = appReducer(storeMockups[1], {
            type: actionTypes.SET_APP_POLICY,
            policy: initialStatesPolicies[0],
        });

        expect(res.policy).toEqual(initialStatesPolicies[1].policy2);
    });

    it('polices and null on state and earlier polices on store', () => {
        const res = appReducer(storeMockups[1], {
            type: actionTypes.SET_APP_POLICY,
            policy: initialStatesPolicies[2],
        });

        expect(res.policy).toEqual(initialStatesPolicies[2].policy1);
    });
});

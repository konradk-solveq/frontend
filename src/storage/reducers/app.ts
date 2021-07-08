import AsyncStorage from '@react-native-async-storage/async-storage';
import persistReducer from 'redux-persist/es/persistReducer';
import * as actionTypes from '../actions/actionTypes';

import {AppConfigI} from '../../models/config.model';
import {
    FaqType,
    RegulationType,
    TermsAndConditionsType,
} from '../../models/regulations.model';
import {InternetConnectionInfoType} from '../../interfaces/internetConnection';

export interface AppState {
    isOffline: boolean;
    internetConnectionInfo: InternetConnectionInfoType;
    sync: boolean;
    error: string;
    statusCode: number;
    config: AppConfigI;
    terms: TermsAndConditionsType[];
    currentTerms: TermsAndConditionsType;
    faq: {faq: FaqType[]} | {};
    showedRegulations: number | null;
    regulation: RegulationType | {};
    policy: RegulationType | {};
    showedLocationInfo: boolean;
}

const initialState: AppState = {
    isOffline: false,
    internetConnectionInfo: {
        goodConnectionQuality: true,
    },
    sync: false,
    error: '',
    statusCode: 200,
    config: {
        name: '',
        lang: '',
        langs: {name: '', displayName: ''},
        difficulties: [],
        surfaces: [],
        tags: [],
    },
    terms: [],
    currentTerms: {
        version: undefined,
        showDate: undefined,
        publishDate: undefined,
        text: '',
        title: '',
    },
    faq: {},
    showedRegulations: null,
    regulation: {},
    policy: {},
};

const appReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.SET_APP_NETWORK_STATUS:
            return {
                ...state,
                isOffline: action.isOffline,
                internetConnectionInfo: {
                    connectionType: action.connectionType,
                    cellularGeneration: action.cellularGeneration,
                    goodConnectionQuality: action.goodConnectionQuality,
                },
            };
        case actionTypes.SET_APP_CONFIG:
            return {
                ...state,
                config: action.config,
            };
        case actionTypes.SET_APP_TERMS:
            return {
                ...state,
                terms: action.terms,
            };
        case actionTypes.SET_APP_CURRENT_TERMS:
            return {
                ...state,
                currentTerms: action.currentTerms,
            };
        case actionTypes.SET_APP_SHOWED_TERMS_VERSION:
            return {
                ...state,
                showedRegulations: action.showedRegulations,
            };
        case actionTypes.SET_APP_REGULATION: {
            const getVersion = v => {
                let splited = v.split('.');
                let num = '';
                for (let s of splited) {
                    if (s.length == 2) {
                        num += '0' + s;
                    }
                    if (s.length == 1) {
                        num += '00' + s;
                    }
                }
                return Number(num);
            };

            const term1version = getVersion(
                action.regulation?.regulation1?.version,
            );
            const term2version = getVersion(
                action.regulation?.regulation2?.version,
            );

            const oldRegulations =
                term1version < term2version
                    ? action.regulation.regulation1
                    : action.regulation.regulation2;
            const newRegulations =
                term1version > term2version
                    ? action.regulation.regulation1
                    : action.regulation.regulation2;

            let result;

            let lastTerm = state.terms[state.terms.length - 1];
            if (Date.parse(lastTerm?.publishDate) > Date.now()) {
                result = oldRegulations;
                result.paragraph = result?.paragraph?.concat(
                    newRegulations?.paragraph,
                );
            } else {
                result = newRegulations;
            }

            return {
                ...state,
                regulation: result,
            };
        }

        case actionTypes.SET_APP_POLICY: {
            const getVersion = v => {
                let splited = v.split('.');
                let num = '';
                for (let s of splited) {
                    if (s.length == 2) {
                        num += '0' + s;
                    }
                    if (s.length == 1) {
                        num += '00' + s;
                    }
                }
                return Number(num);
            };

            const term1version = getVersion(action.policy?.policy1?.version);
            const term2version = getVersion(action.policy?.policy2?.version);

            const oldPolicy =
                term1version < term2version
                    ? action.policy.policy1
                    : action.policy.policy2;
            const newPolicy =
                term1version > term2version
                    ? action.policy.policy1
                    : action.policy.policy2;

            let result;
            let lastTerm = state.terms[state.terms.length - 1];
            if (Date.parse(lastTerm?.publishDate) > Date.now()) {
                result = oldPolicy;
                result.paragraph = result?.paragraph?.concat(
                    newPolicy?.paragraph,
                );
            } else {
                result = newPolicy;
            }

            return {
                ...state,
                policy: result,
            };
        }
        case actionTypes.SET_APP_FAQ:
            return {
                ...state,
                faq: action.faq,
            };
        case actionTypes.SET_SYNC_APP_DATA_STATUS:
            return {
                ...state,
                sync: action.status,
            };
        case actionTypes.SET_SYNC_APP_SYNC_ERROR:
            return {
                ...state,
                sync: false,
                error: action.error,
                statusCode: action.statusCode,
            };
        case actionTypes.SET_LOCATION_INFO_SHOWED:
            return {
                ...state,
                showedLocationInfo: true,
            };
        case actionTypes.CLEAR_APP_ERROR:
            return {
                ...state,
                sync: false,
                error: '',
                statusCode: 200,
            };
    }
    return state;
};

const persistConfig = {
    key: 'app',
    storage: AsyncStorage,
    whitelist: [
        'config',
        'terms',
        'regulation',
        'policy',
        'currentTerms',
        'showedRegulations',
        'faq',
        'showedLocationInfo',
    ],
    timeout: 20000,
};

export default persistReducer(persistConfig, appReducer);

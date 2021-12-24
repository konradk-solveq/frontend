import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

import * as actionTypes from '@storage/actions/actionTypes';
import {AppConfigI} from '@models/config.model';
import {InternetConnectionInfoType} from '@interfaces/internetConnection';
import {BasicCoordsType} from '@type/coords';
import {
    FaqType,
    RegulationType,
    TermsAndConditionsType,
} from '@models/regulations.model';

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
    showedNewAppVersion: string;
    regulation: RegulationType | {};
    policy: RegulationType | {};
    showedLocationInfo: boolean;
    location: BasicCoordsType | undefined;
    routeDebugMode: boolean;
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
        reactions: [],
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
    showedNewAppVersion: '1.0.0',
    regulation: {},
    policy: {},
    showedLocationInfo: false,
    location: undefined,
    routeDebugMode: false,
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
        case actionTypes.SET_APP_SHOWED_NEW_APP_VERSION:
            return {
                ...state,
                showedNewAppVersion: action.showedNewAppVersion,
            };
        case actionTypes.SET_APP_REGULATION: {
            const getVersion = (v: string) => {
                let splited = v.split('.');
                let num = '';
                for (let s of splited) {
                    if (s.length === 2) {
                        num += '0' + s;
                    }
                    if (s.length === 1) {
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
            const getVersion = (v: string) => {
                let splited = v.split('.');
                let num = '';
                for (let s of splited) {
                    if (s.length === 2) {
                        num += '0' + s;
                    }
                    if (s.length === 1) {
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
        case actionTypes.SET_GLOBAL_LOCATION:
            return {
                ...state,
                location: action.coords,
            };
        case actionTypes.SET_ROUTE_DEBUG_MODE:
            return {
                ...state,
                routeDebugMode: action.routeDebugMode,
            };
        case actionTypes.CLEAR_APP_ERROR:
            return {
                ...state,
                sync: false,
                error: '',
                statusCode: 200,
            };
        case actionTypes.LOGOUT_USER: {
            return {...initialState};
        }
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
        'location',
        'routeDebugMode',
        'showedNewAppVersion',
    ],
    timeout: 20000,
};

export default persistReducer(persistConfig, appReducer);

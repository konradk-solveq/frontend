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
import {MAJOR_LANGUAGE} from '@helpers/global';

const getVersion = (v: string) => {
    if (typeof v !== 'string') {
        return 0;
    }
    let splitted = v.split('.');
    let num = '';
    for (let s of splitted) {
        if (s.length === 2) {
            num += '0' + s;
        }
        if (s.length === 1) {
            num += '00' + s;
        }
    }
    return Number(num);
};

const getNewerVersion = (oldVersion: any, newVersion: any, term: any) => {
    let result;

    if (Date.parse(term?.publishDate) > Date.now() && oldVersion) {
        result = oldVersion;
        result.paragraph = result?.paragraph?.concat(newVersion?.paragraph);
    } else {
        result = newVersion;
    }

    return result;
};

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
    initMapsDataSynched: boolean;
    apiAuthHeaderState: boolean;
    focusedOnRecordingScreen: boolean;
    heavyTaskProcessing: boolean;
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
        lang: MAJOR_LANGUAGE,
        langs: [],
        tags: [],
        surfaces: [],
        difficulties: [],
        reactions: [],
        uiTranslations: {controlSums: [], codes: []},
        ads: {url: ''},
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
    initMapsDataSynched: false,
    apiAuthHeaderState: false,
    focusedOnRecordingScreen: false,
    heavyTaskProcessing: false,
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
            const config = action.config;
            return {
                ...state,
                config: config,
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
            const lastTerm = state.terms[state.terms.length - 1];

            const newerVersion = getNewerVersion(
                oldRegulations,
                newRegulations,
                lastTerm,
            );

            return {
                ...state,
                regulation: newerVersion,
            };
        }

        case actionTypes.SET_APP_POLICY: {
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
            const lastTerm = state.terms[state.terms.length - 1];

            const newerVersion = getNewerVersion(
                oldPolicy,
                newPolicy,
                lastTerm,
            );

            return {
                ...state,
                policy: newerVersion,
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
        case actionTypes.SET_INIT_MAPS_DATA_SYNCHED:
            return {
                ...state,
                initMapsDataSynched: action.initMapsDataSynched,
            };
        case actionTypes.SET_API_AUTH_HEADER:
            return {
                ...state,
                apiAuthHeaderState: action.apiAuthHeaderState,
            };
        case actionTypes.SET_FOCUESD_ON_RECORDING_SCREEN:
            return {
                ...state,
                focusedOnRecordingScreen: action.focusedOnRecordingScreenState,
            };
        case actionTypes.SET_HEAVY_TASK_IS_PROCESSING:
            return {
                ...state,
                heavyTaskProcessing: action.heavyTaskProcessingState,
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

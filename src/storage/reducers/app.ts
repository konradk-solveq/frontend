import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

import * as actionTypes from '@storage/actions/actionTypes';
import {AppConfigI} from '@models/config.model';
import {InternetConnectionInfoType} from '@interfaces/internetConnection';
import {BasicCoordsType} from '@type/coords';
import {
    FaqType,
    LegalDocumentType,
    NotificationType,
    AppVersionType,
} from '@models/regulations.model';
import {MAJOR_LANGUAGE} from '@helpers/global';

export interface AppState {
    isOffline: boolean;
    internetConnectionInfo: InternetConnectionInfoType;
    sync: boolean;
    error: string;
    statusCode: number;
    config: AppConfigI;
    faq: {faq: FaqType[]} | {};
    showedRegulations: number | null;
    showedNewAppVersion: string;
    regulation: LegalDocumentType;
    policy: LegalDocumentType;
    notifications: NotificationType[];
    notificationDate: Date | undefined;
    showedLocationInfo: boolean;
    location: BasicCoordsType | undefined;
    routeDebugMode: boolean;
    initMapsDataSynched: boolean;
    apiAuthHeaderState: boolean;
    appVersion: AppVersionType | {};
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
        version: '',
    },
    faq: {},
    showedRegulations: null,
    showedNewAppVersion: '1.0.0',
    regulation: {
        current: {
            content: undefined,
            actions: [],
        },
    },
    policy: {
        current: {
            content: undefined,
            actions: [],
        },
    },
    notifications: [],
    notificationDate: undefined,
    showedLocationInfo: false,
    location: undefined,
    routeDebugMode: false,
    initMapsDataSynched: false,
    apiAuthHeaderState: false,
    appVersion: {},
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
        case actionTypes.SET_APP_REGULATION:
            return {
                ...state,
                regulation: action.regulation,
            };
        case actionTypes.SET_APP_POLICY:
            return {
                ...state,
                policy: action.policy,
            };
        case actionTypes.SET_APP_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.notifications,
            };
        case actionTypes.SET_APP_NOTIFICATION_DATE:
            return {
                ...state,
                notificationDate: action.notificationDate,
            };
        case actionTypes.SET_APP_VERSION: {
            return {
                ...state,
                appVersion: action.appVersion,
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
        'notificationDate',
        'currentTerms',
        'showedRegulations',
        'faq',
        'showedLocationInfo',
        'location',
        'routeDebugMode',
        'showedNewAppVersion',
        'appVersion',
    ],
    timeout: 20000,
};

export default persistReducer(persistConfig, appReducer);

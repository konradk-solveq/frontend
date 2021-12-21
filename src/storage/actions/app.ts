import {
    NetInfoCellularGeneration,
    NetInfoStateType,
} from '@react-native-community/netinfo';

import * as actionTypes from './actionTypes';
import {
    fetchGenericBikeData,
    setBikesListByFrameNumbers,
    fetchMapsList,
    syncRouteDataFromQueue,
    fetchPrivateMapsList,
} from './index';
import {fetchFeaturedMapsList, fetchPlannedMapsList} from './maps';
import {AppThunk} from '@storage/thunk';
import {AppState} from '@storage/reducers/app';
import {CurrentRouteI, RoutesState} from '@storage/reducers/routes';
import {AppConfigI} from '@models/config.model';
import {BasicCoordsType} from '@type/coords';
import {
    FaqType,
    RegulationType,
    TermsAndConditionsType,
} from '@models/regulations.model';
import {setUserAgentHeader} from '@api/index';
import {
    getAppConfigService,
    getFaqService,
    getAppTermsAndConditionsService,
    getNewRegulationsService,
} from '@services/index';
import {I18n} from '@translations/I18n';
import {convertToApiError} from '@utils/apiDataTransform/communicationError';
import {loggErrorWithScope} from '@sentryLogger/sentryLogger';

import {ApiPathI, LocationDataI} from '@interfaces/geolocation';
import {RouteActionT, RouteAdditionalInfoT} from '@type/debugRoute';
import {DebugRouteInstance} from '@debugging/debugRoute';

export const setAppStatus = (
    isOffline: boolean,
    connectionType: NetInfoStateType,
    cellularGeneration: NetInfoCellularGeneration,
    goodConnectionQuality: boolean,
) => ({
    type: actionTypes.SET_APP_NETWORK_STATUS,
    isOffline: isOffline,
    connectionType: connectionType,
    cellularGeneration: cellularGeneration,
    goodConnectionQuality: goodConnectionQuality,
});

export const setAppConfig = (config: AppConfigI) => ({
    type: actionTypes.SET_APP_CONFIG,
    config: config,
});

export const setAppTerms = (terms: TermsAndConditionsType[]) => ({
    type: actionTypes.SET_APP_TERMS,
    terms: terms,
});

export const setAppShowedRegulationsNumber = (showedRegulations: number) => ({
    type: actionTypes.SET_APP_SHOWED_TERMS_VERSION,
    showedRegulations: showedRegulations,
});

export const setNewAppVersion = (showedNewAppVersion: string) => ({
    type: actionTypes.SET_APP_SHOWED_NEW_APP_VERSION,
    showedNewAppVersion: showedNewAppVersion,
});

export const setAppCurrentTerms = (currentTerms: TermsAndConditionsType) => ({
    type: actionTypes.SET_APP_CURRENT_TERMS,
    currentTerms: currentTerms,
});

export const setAppRegulation = (regulation: {
    regulation1: RegulationType | null;
    regulation2: RegulationType | null;
}) => {
    return {
        type: actionTypes.SET_APP_REGULATION,
        regulation: regulation,
    };
};

export const setAppPolicy = (policy: {
    policy1: RegulationType | null;
    policy2: RegulationType | null;
}) => ({
    type: actionTypes.SET_APP_POLICY,
    policy: policy,
});

export const setAppFaq = (faq: FaqType[]) => ({
    type: actionTypes.SET_APP_FAQ,
    faq: faq,
});

export const setSyncStatus = (status: boolean) => ({
    type: actionTypes.SET_SYNC_APP_DATA_STATUS,
    status: status,
});

export const setSyncError = (error: string, statusCode: number) => ({
    type: actionTypes.SET_SYNC_APP_SYNC_ERROR,
    error: error,
    statusCode: statusCode,
});

export const setLocationInfoShowed = () => ({
    type: actionTypes.SET_LOCATION_INFO_SHOWED,
});

export const setGlobalLocation = (coords: BasicCoordsType) => ({
    type: actionTypes.SET_GLOBAL_LOCATION,
    coords: coords,
});

export const setRouteDebugMode = (routeDebugMode: boolean) => ({
    type: actionTypes.SET_ROUTE_DEBUG_MODE,
    routeDebugMode: routeDebugMode,
});

export const clearAppError = () => ({
    type: actionTypes.CLEAR_APP_ERROR,
});

export const fetchAppConfig = (
    noLoader?: boolean,
): AppThunk<Promise<void>> => async dispatch => {
    if (!noLoader) {
        dispatch(setSyncStatus(true));
    }
    try {
        const response = await getAppConfigService();

        if (response.error || response.status >= 400 || !response.data) {
            dispatch(setSyncError(response.error, response.status));
            return;
        }

        dispatch(setAppConfig(response.data));
        dispatch(clearAppError());
        if (!noLoader) {
            dispatch(setSyncStatus(false));
        }
    } catch (error) {
        console.log(`[fetchAppConfig] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'fetchAppConfig');

        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setSyncError(errorMessage, 500));
    }
};

export const fetchAppFaq = (
    noLoader?: boolean,
): AppThunk<Promise<void>> => async dispatch => {
    if (!noLoader) {
        dispatch(setSyncStatus(true));
    }
    try {
        const response = await getFaqService();
        if (response.error || response.status >= 400 || !response.data) {
            dispatch(setSyncError(response.error, response.status));
            return;
        }

        const links = [
            {
                url:
                    'https://play.google.com/store/apps/details?id=pl.kross.mykross',
                hyper: 'Aplikacja myKROSS - Android',
            },
            {
                url: 'https://apps.apple.com/pl/app/mykross/id1561981216',
                hyper: 'Aplikacja myKROSS - iOS',
            },
        ];

        response.data.faq.forEach(element => {
            links.forEach(
                link =>
                    (element.answer = element.answer.replace(
                        link.hyper,
                        link.url,
                    )),
            );

            element.question = element.question.replace(
                'https://kross.eu/',
                'kross.eu',
            );
        });

        dispatch(setAppFaq(response.data));
        if (!noLoader) {
            dispatch(setSyncStatus(false));
        }
    } catch (error) {
        console.log(`[fetchAppFaq] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'fetchAppFaq');

        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setSyncError(errorMessage, 500));
    }
};

export const appSyncData = (): AppThunk<Promise<void>> => async (
    dispatch,
    getState,
) => {
    dispatch(setSyncStatus(true));
    try {
        const {
            isOffline,
            internetConnectionInfo,
            showedRegulations,
        }: AppState = getState().app;

        if (isOffline || !internetConnectionInfo?.goodConnectionQuality) {
            dispatch(
                setSyncError(I18n.t('dataAction.noInternetConnection'), 500),
            );
            dispatch(setSyncStatus(false));
            return;
        }
        const {sessionData} = getState().auth;
        const {onboardingFinished} = getState().user;
        setUserAgentHeader();

        await dispatch(fetchAppRegulations(true));
        await dispatch(fetchAppConfig(true));

        const {currentRoute}: RoutesState = getState().routes;

        /* Omit synch map data if recording is active */
        const isRecordingActive = currentRoute?.isActive;

        if (onboardingFinished && !isRecordingActive) {
            await dispatch(fetchMapsList());
            dispatch(fetchFeaturedMapsList());
        }

        if (sessionData?.access_token && !isRecordingActive) {
            dispatch(fetchPrivateMapsList());
            dispatch(fetchPlannedMapsList());
        }

        if (onboardingFinished && !isRecordingActive) {
            dispatch(fetchGenericBikeData());
            dispatch(setBikesListByFrameNumbers());
        }

        if (sessionData?.access_token && !isRecordingActive) {
            dispatch(syncRouteDataFromQueue());
        }

        await dispatch(fetchAppFaq(true));

        dispatch(setSyncStatus(false));
    } catch (error) {
        console.log(`[appSyncData] - ${error}`);
        const err = convertToApiError(error);
        const errorMessage = I18n.t('dataAction.apiError');

        loggErrorWithScope(err, 'appSyncData');

        dispatch(setSyncError(errorMessage, 500));
    }
};

export const fetchAppRegulations = (
    noLoader?: boolean,
): AppThunk<Promise<void>> => async (dispatch, getState) => {
    if (!noLoader) {
        dispatch(setSyncStatus(true));
    }
    try {
        const {
            terms,
            currentTerms,
            isOffline,
            internetConnectionInfo,
        } = getState().app;

        if (isOffline || !internetConnectionInfo?.goodConnectionQuality) {
            dispatch(
                setSyncError(I18n.t('dataAction.noInternetConnection'), 500),
            );
            dispatch(setSyncStatus(false));
            return;
        }

        const response = await getAppTermsAndConditionsService();

        if (response.error || response.status >= 400 || !response.data) {
            dispatch(setSyncError(response.error, response.status));
            return;
        }
        dispatch(setAppTerms(response.data));

        const newTerms = response.data;
        let currVersion =
            currentTerms.version || terms?.[terms?.length - 2]?.version;

        /* TODO: temp solution  */
        if (!currVersion) {
            currVersion = newTerms?.[newTerms?.length - 2]?.version;
        }

        const newestVersion =
            newTerms?.[newTerms?.length - 1]?.version ||
            terms?.[terms?.length - 1]?.version;

        if (currVersion && newestVersion) {
            const newRegulations = await getNewRegulationsService(
                currVersion,
                newestVersion,
            );
            if (
                newRegulations.error?.trim() ||
                newRegulations.status >= 400 ||
                !newRegulations.data?.regulation?.regulation1 ||
                !newRegulations.data?.policy?.policy1
            ) {
                dispatch(
                    setSyncError(newRegulations.error, newRegulations.status),
                );
                return;
            }

            dispatch(setAppRegulation(newRegulations.data.regulation));
            dispatch(setAppPolicy(newRegulations.data.policy));
        }

        dispatch(clearAppError());
        if (!noLoader) {
            dispatch(setSyncStatus(false));
        }
    } catch (error) {
        console.log(`[fetchAppRegulations] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'fetchAppRegulations');

        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setSyncError(errorMessage, 500));
    }
};

/**
 * Puts route data into json file
 *
 * @param {string} routeId
 * @param {Object<RouteActionT>} actionType
 * @param {Object<CurrentRouteI>} routeData
 * @param {Object<RouteAdditionalInfoT>} routeAdditionalInfo
 * @param {Array<LocationDataI>} routeLocationData
 * @param {Array<ApiPathI>} dataSendToServer
 *
 * @returns {void}
 */
export const appendRouteDebuggInfoToFIle = (
    routeId: string,
    actionType: RouteActionT,
    routeData?: CurrentRouteI,
    routeAdditionalInfo?: RouteAdditionalInfoT,
    routeLocationData?: LocationDataI[],
    dataSendToServer?: ApiPathI[],
): AppThunk<Promise<void>> => async (_, getState) => {
    try {
        const {
            isOffline,
            internetConnectionInfo,
            routeDebugMode,
        }: AppState = getState().app;
        const {currentRoute}: RoutesState = getState().routes;

        if (!routeDebugMode) {
            return;
        }

        /**
         * Pause and resume does not pass info about current route
         */
        const rd = routeData || currentRoute;
        const routeDebugger = await DebugRouteInstance.debugRouteInstance(
            actionType,
            routeId,
            rd.startedAt,
        );

        if (routeDebugger) {
            routeDebugger.connectionState = {
                isOffline: isOffline,
                internetConnectionInfo: internetConnectionInfo,
            };

            await routeDebugger.writeRouteDataIntoDebugFile(
                actionType,
                rd,
                routeAdditionalInfo || {},
                routeLocationData,
                dataSendToServer,
            );
        }

        DebugRouteInstance.clearRouteDebugInstance(actionType);
    } catch (error) {
        console.log(`[appendRouteDebuggInfoToFIle] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'appendRouteDebuggInfoToFIle');
    }
};

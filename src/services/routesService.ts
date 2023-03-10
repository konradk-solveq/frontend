import {createRoute, removePrivateMapData, sendRouteData} from '@api/index';
import {
    LocationDataI,
    PathApiRequestBodyI,
    RecordTimeI,
} from '@interfaces/geolocation';

import {
    getRouteDefaultName,
    routesDataToAPIRequest,
} from '@utils/apiDataTransform/prepareRequest';
import {convertToApiError} from '@utils/apiDataTransform/communicationError';
import i18next from '@translations/i18next';
import {loggErrorWithScope} from '@sentryLogger/sentryLogger';

export type CreatedRouteType = {
    id: string;
};
export interface RoutesResponse {
    data: CreatedRouteType | null;
    status: number;
    error: string;
    rawError?: string;
    shortRoute?: boolean;
    sentData?: PathApiRequestBodyI;
}

export const createNewRouteService = async (
    routeNumber?: number | null,
): Promise<RoutesResponse> => {
    try {
        const defaultName = getRouteDefaultName(routeNumber);
        const response = await createRoute(defaultName);

        if (
            !response?.data?.id ||
            response.status >= 400 ||
            response.data?.statusCode >= 400
        ) {
            let errorMessage = 'error';
            if (response.data?.message || response.data?.error) {
                errorMessage = response.data.message || response.data.error;
                if (
                    response?.data?.statusCode !== 400 &&
                    response?.data?.statusCode !== 404
                ) {
                    errorMessage = i18next.t(
                        'dataAction.routeData.createRouteError',
                    );
                }
            }
            return {
                data: null,
                status: response?.data?.statusCode || response.status,
                error: errorMessage,
            };
        }

        return {
            data: {id: response.data.id},
            status: response.data?.statusCode || response.status,
            error: '',
        };
    } catch (error) {
        console.error(`[createNewRouteService] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'createNewRouteService');

        return {
            data: null,
            status: 500,
            error: i18next.t('dataAction.dataSyncError'),
        };
    }
};

export const removeCeratedRouteIDService = async (
    routeId: string,
): Promise<RoutesResponse> => {
    try {
        const response = await removePrivateMapData(routeId);

        if (
            !response?.data?.id ||
            response.status >= 400 ||
            response.data?.statusCode >= 400
        ) {
            let errorMessage = 'error';
            if (response.data?.message || response.data?.error) {
                errorMessage = response.data.message || response.data.error;
            }

            return {
                data: {id: routeId},
                status: response.data?.statusCode || response.status,
                error: errorMessage,
            };
        }

        return {
            data: {id: routeId},
            status: response.data?.statusCode || response?.status,
            error: '',
        };
    } catch (error) {
        console.error(`[removeCeratedRouteIDService] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'removeCeratedRouteIDService');

        return {
            data: null,
            status: 500,
            error: i18next.t('dataAction.dataSyncError'),
        };
    }
};

export const syncRouteData = async (
    path: LocationDataI[],
    recordTimes: RecordTimeI[],
    remoteRouteId?: string,
    routeNumber?: number | null,
): Promise<RoutesResponse> => {
    try {
        let response;
        if (!remoteRouteId) {
            const defaultName = getRouteDefaultName(routeNumber);
            response = await createRoute(defaultName);

            if (
                !response?.data?.id ||
                response.status >= 400 ||
                response.data?.statusCode >= 400
            ) {
                let errorMessage = 'error';
                if (response.data?.message || response.data?.error) {
                    errorMessage = response.data.message || response.data.error;
                    if (
                        response?.data?.statusCode !== 400 &&
                        response?.data?.statusCode !== 404
                    ) {
                        errorMessage = i18next.t(
                            'dataAction.routeData.createRouteError',
                        );
                    }
                }
                return {
                    data: null,
                    status: response?.data?.statusCode || response.status,
                    error: errorMessage,
                    rawError: response.data?.error,
                };
            }
        }

        const routeId = remoteRouteId || response?.data?.id;

        const pathToSend = routesDataToAPIRequest(path, recordTimes);
        const responseFromUpdate = await sendRouteData(routeId, pathToSend);

        if (
            responseFromUpdate.status >= 400 ||
            responseFromUpdate.data?.statusCode >= 400
        ) {
            let errorMessage = 'error';
            if (
                responseFromUpdate.data?.message ||
                responseFromUpdate.data?.error
            ) {
                errorMessage =
                    responseFromUpdate.data.message ||
                    responseFromUpdate.data.error;
            }

            if (
                !routeId &&
                response &&
                (response?.data?.statusCode === 404 ||
                    response?.data?.statusCode === 400 ||
                    responseFromUpdate.data?.statusCode >= 400)
            ) {
                errorMessage = i18next.t(
                    'dataAction.routeData.updateRouteError',
                );
                await removePrivateMapData(routeId);
                return {
                    data: null,
                    status: 406,
                    error: errorMessage,
                    rawError: response.data?.error,
                    sentData: pathToSend,
                };
            }

            return {
                data: null,
                status: responseFromUpdate.data?.statusCode || response?.status,
                error: errorMessage,
                rawError: responseFromUpdate.data?.error,
                sentData: pathToSend,
            };
        }

        return {
            data: {id: routeId},
            status: responseFromUpdate.data?.statusCode || response?.status,
            error: '',
            sentData: pathToSend,
        };
    } catch (error) {
        console.error(`[syncRouteDataService] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'syncRouteDataService');

        return {
            data: null,
            status: 500,
            error: i18next.t('dataAction.dataSyncError'),
            rawError: err.message,
        };
    }
};

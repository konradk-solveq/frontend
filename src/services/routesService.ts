import {createRoute, removePrivateMapData, sendRouteData} from '@api/index';
import {LocationDataI} from '@interfaces/geolocation';
import {MIN_ROUTE_LENGTH} from '@helpers/global';
import {
    getRouteDefaultName,
    routesDataToAPIRequest,
} from '@utils/apiDataTransform/prepareRequest';
import {convertToApiError} from '@utils/apiDataTransform/communicationError';
import logger from '@utils/crashlytics';
import {I18n} from '@translations/I18n';

export type CreatedRouteType = {
    id: string;
};
export interface RoutesResponse {
    data: CreatedRouteType | null;
    status: number;
    error: string;
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
                    errorMessage = I18n.t(
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
        console.log(`[createNewRouteService] - ${error}`);
        logger.log(`[createNewRouteService] - ${error}`);
        const err = convertToApiError(error);
        logger.recordError(err);

        return {
            data: null,
            status: 500,
            error: I18n.t('dataAction.dataSyncError'),
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
        console.log(`[removeCeratedRouteIDService] - ${error}`);
        logger.log(`[removeCeratedRouteIDService] - ${error}`);
        const err = convertToApiError(error);
        logger.recordError(err);

        return {
            data: null,
            status: 500,
            error: I18n.t('dataAction.dataSyncError'),
        };
    }
};

export const syncRouteData = async (
    path: LocationDataI[],
    remoteRouteId?: string,
    routeNumber?: number | null,
): Promise<RoutesResponse> => {
    try {
        if (!path?.find(p => p?.odometer >= MIN_ROUTE_LENGTH)) {
            if (remoteRouteId) {
                await removeCeratedRouteIDService(remoteRouteId);
            }
            return {
                data: null,
                status: 400,
                error: I18n.t('dataAction.routeData.routeLengthError', {
                    value: MIN_ROUTE_LENGTH,
                }),
            };
        }

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
                        errorMessage = I18n.t(
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
        }

        const routeId = remoteRouteId || response?.data?.id;

        const responseFromUpdate = await sendRouteData(
            routeId,
            routesDataToAPIRequest(path),
        );

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
                errorMessage = I18n.t('dataAction.routeData.updateRouteError');
                await removePrivateMapData(routeId);
                return {
                    data: null,
                    status: 406,
                    error: errorMessage,
                };
            }

            return {
                data: null,
                status: responseFromUpdate.data?.statusCode || response?.status,
                error: errorMessage,
            };
        }

        return {
            data: {id: routeId},
            status: responseFromUpdate.data?.statusCode || response?.status,
            error: '',
        };
    } catch (error) {
        console.log(`[syncRouteDataService] - ${error}`);
        logger.log(`[syncRouteDataService] - ${error}`);
        const err = convertToApiError(error);
        logger.recordError(err);

        return {
            data: null,
            status: 500,
            error: I18n.t('dataAction.dataSyncError'),
        };
    }
};

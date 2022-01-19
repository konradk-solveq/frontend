import {createRoute, removePrivateMapData, sendRouteData} from '@api/index';
import {ApiPathI, LocationDataI} from '@interfaces/geolocation';
import {MIN_ROUTE_LENGTH} from '@helpers/global';
import {
    getRouteDefaultName,
    routesDataToAPIRequest,
} from '@utils/apiDataTransform/prepareRequest';
import {convertToApiError} from '@utils/apiDataTransform/communicationError';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
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
    sentData?: ApiPathI[];
}

export const createNewRouteService = async (
    routeNumber?: number | null,
): Promise<RoutesResponse> => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {t} = useMergedTranslation('dataAction');
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
                    errorMessage = t('routeData.createRouteError');
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
            error: t('dataSyncError'),
        };
    }
};

export const removeCeratedRouteIDService = async (
    routeId: string,
): Promise<RoutesResponse> => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {t} = useMergedTranslation('dataAction');

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
            error: t('dataSyncError'),
        };
    }
};

export const syncRouteData = async (
    path: LocationDataI[],
    remoteRouteId?: string,
    routeNumber?: number | null,
): Promise<RoutesResponse> => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {t} = useMergedTranslation('dataAction');
    try {
        if (
            !path?.length ||
            !path?.find(p => p?.odometer >= MIN_ROUTE_LENGTH)
        ) {
            if (remoteRouteId) {
                await removeCeratedRouteIDService(remoteRouteId);
            }
            return {
                data: null,
                status: 400,
                error: t('routeData.routeLengthError', {
                    value: MIN_ROUTE_LENGTH,
                }),
                shortRoute: true,
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
                        errorMessage = t('routeData.createRouteError');
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

        const pathToSend = routesDataToAPIRequest(path);
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
                errorMessage = t('routeData.updateRouteError');
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
            error: t('dataSyncError'),
            rawError: err.message,
        };
    }
};

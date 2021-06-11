import {createRoute, removePrivateMapData, sendRouteData} from '../api';
import {MIN_ROUTE_LENGTH} from '../helpers/global';
import {LocationDataI} from '../interfaces/geolocation';

import {
    getRouteDefaultName,
    routesDataToAPIRequest,
} from '../utils/apiDataTransform/prepareRequest';

export type CreatedRouteType = {
    id: string;
};
export interface RoutesResponse {
    data: CreatedRouteType | null;
    status: number;
    error: string;
}

export const createNewRouteService = async (): Promise<RoutesResponse> => {
    const defaultName = getRouteDefaultName();
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
                errorMessage =
                    'Route could not be created. Please try again later.';
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
};

export const removeCeratedRouteIDService = async (
    routeId: string,
): Promise<RoutesResponse> => {
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
            status: response.status,
            error: errorMessage,
        };
    }

    return {
        data: {id: routeId},
        status: response.data?.statusCode || response?.status,
        error: '',
    };
};

export const syncRouteData = async (
    path: LocationDataI[],
    remoteRouteId?: string,
): Promise<RoutesResponse> => {
    if (!path?.find(p => p?.odometer >= MIN_ROUTE_LENGTH)) {
        if (remoteRouteId) {
            await removeCeratedRouteIDService(remoteRouteId);
        }
        return {
            data: null,
            status: 400,
            error: `Route path could not be save. It's too short. It should take at least ${MIN_ROUTE_LENGTH} meters.`,
        };
    }

    let response;
    if (!remoteRouteId) {
        const defaultName = getRouteDefaultName();
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
                    errorMessage =
                        'Route could not be created. Please try again later.';
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
            response &&
            (response?.data?.statusCode === 404 ||
                response?.data?.statusCode === 400 ||
                responseFromUpdate.data?.statusCode >= 400)
        ) {
            errorMessage =
                'Route could not be updated. Please try again later.';
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
};

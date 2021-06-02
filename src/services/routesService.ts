import {createRoute, removePrivateMapData, sendRouteData} from '../api';
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

export const syncRouteData = async (
    path: LocationDataI[],
): Promise<RoutesResponse> => {
    if (path?.[path?.length - 1].odometer < 200) {
        return {
            data: null,
            status: 400,
            error:
                "Route path could not be save. It's too short. It should take at least 200 meters",
        };
    }

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
            if (response.status !== 400 && response.status !== 404) {
                errorMessage =
                    'Route could not be created. Please try again later.';
            }
        }
        return {data: null, status: response.status, error: errorMessage};
    }

    const responseFromUpdate = await sendRouteData(
        response.data.id,
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
            response.data?.statusCode === 404 ||
            response.data?.statusCode === 400
        ) {
            errorMessage =
                'Route could not be updated. Please try again later.';
            await removePrivateMapData(response.data.id);
        }

        return {
            data: null,
            status: responseFromUpdate.data?.statusCode || response.status,
            error: errorMessage,
        };
    }

    return {
        data: {id: response.data.id},
        status: responseFromUpdate.data?.statusCode || response.status,
        error: '',
    };
};

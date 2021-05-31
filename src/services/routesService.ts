import {createRoute, sendRouteData} from '../api';
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
    const defaultName = getRouteDefaultName();
    const response = await createRoute(defaultName);

    if (!response?.data?.id || response.status > 400) {
        let errorMessage = 'error';
        if (response.data?.message || response.data?.error) {
            errorMessage = response.data.message || response.data.error;
        }
        return {data: null, status: response.status, error: errorMessage};
    }

    const responseFromUpdate = await sendRouteData(
        response.data.id,
        routesDataToAPIRequest(path),
    );

    return {
        data: {id: responseFromUpdate.data.id},
        status: response.status,
        error: '',
    };
};

import {shareRoute} from '@api/share';
import {I18n} from '@translations/I18n';
import {SharedContentT} from '@type/share';
import {loggErrorWithScope} from '@sentryLogger/sentryLogger';
import {convertToApiError} from '@utils/apiDataTransform/communicationError';

export type CreatedRouteType = {
    id: string;
};
export interface ShareResponseI {
    data: SharedContentT | null;
    status: number;
    error: string;
    rawError?: string;
}

const mockResponse = async (
    response: ShareResponseI,
    timeout?: number,
): Promise<ShareResponseI> => {
    return new Promise(res => {
        setTimeout(() => res(response), timeout || 2000);
    });
};

export const shareRouteService = async (
    routeId: string,
): Promise<ShareResponseI> => {
    try {
        const response = await shareRoute(routeId);
        response.status = 200;
        const mockedResponse = await mockResponse({
            data: {
                url: 'https://kross.eu/aplikacja-mobilna',
                content: {
                    imgUrl:
                        'https://public.pre.mykross.kross.pl/cycling-map/pTlxfkJxIu1Lu2EqrRoqZEVYdHKfLZEo/map_share_1024.png',
                },
            },
            status: 200,
            error: '',
        });
        response.data = mockedResponse.data;

        if (
            !response?.data?.url ||
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
                        'dataAction.shareData.createShareUrlError',
                    );
                }
            }
            return {
                data: null,
                status: response?.data?.statusCode || response.status,
                error: errorMessage,
                rawError: response?.data?.error,
            };
        }

        return {
            data: response.data,
            status: response.data?.statusCode || response.status,
            error: '',
        };
    } catch (error) {
        console.error(`[shareRouteService] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'shareRouteService');

        return {
            data: null,
            status: 500,
            error: I18n.t('dataAction.apiError'),
        };
    }
};

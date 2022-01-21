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

export const shareRouteService = async (
    routeId: string,
): Promise<ShareResponseI> => {
    try {
        const response = await shareRoute(routeId);

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

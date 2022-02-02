import {checkSharedImageExists, shareRoute} from '@api/index';
import i18next from '@translations/i18next';

import {SharedContentT} from '@type/share';
import {loggErrorWithScope} from '@sentryLogger/sentryLogger';
import {convertToApiError} from '@utils/apiDataTransform/communicationError';
import {getSharedCyclingMap} from '@api/share';

import {Map} from '@models/map.model';
import {isIOS} from '@utils/platform';
import {getRouteByUrl} from '@api/routes';

export type CreatedRouteType = {
    id: string;
};

export interface SharedMapResponseI {
    data: Map | null;
    status: number;
    error: string;
    rawError?: string;
}

export interface ShareResponseI {
    data: SharedContentT | null;
    status: number;
    error: string;
    rawError?: string;
}

export interface SharedImageExistsResponseI {
    data: 'EXISTS' | 'NOT-EXISTS';
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
                    errorMessage = i18next.t(
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
            error: i18next.t('dataAction.apiError'),
        };
    }
};

export const getSharedCyclingMapService = async (
    shareId: string,
): Promise<SharedMapResponseI> => {
    try {
        const response = await getSharedCyclingMap(shareId);
        if (
            !response?.data ||
            response.status >= 400 ||
            response.data?.statusCode >= 400
        ) {
            /**
             Temporary workaround for:
             https://github.com/axios/axios/issues/3943
             */

            if (response.status === 403 && isIOS) {
                return await getSharedRouteByRedirectURLService(
                    response.request?.responseURL,
                );
            }

            let errorMessage = 'error';
            if (response.data?.message || response.data?.error) {
                errorMessage = response.data.message || response.data.error;
                if (
                    response?.data?.statusCode !== 400 &&
                    response?.data?.statusCode !== 404
                ) {
                    errorMessage = i18next.t(
                        'dataAction.shareData.getSharedCyclingMapDataError',
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
        console.error(`[getSharedCyclingMapDataService] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'getSharedCyclingMapDataService');

        return {
            data: null,
            status: 500,
            error: i18next.t('dataAction.apiError'),
        };
    }
};

export const checkSharedImageExistsService = async (
    url: string,
): Promise<SharedImageExistsResponseI> => {
    try {
        const response = await checkSharedImageExists(url);

        if (response.status >= 400 || response.data?.statusCode >= 400) {
            let errorMessage = 'error';
            if (response.data?.message || response.data?.error) {
                errorMessage = response.data.message || response.data.error;
                if (
                    response?.data?.statusCode !== 400 &&
                    response?.data?.statusCode !== 404
                ) {
                    errorMessage = i18next.t(
                        'dataAction.shareData.sharedImageNotExistsError',
                    );
                }
            }
            return {
                data: 'NOT-EXISTS',
                status: response?.data?.statusCode || response.status,
                error: errorMessage,
                rawError: response?.data?.error,
            };
        }

        return {
            data: 'EXISTS',
            status: response.data?.statusCode || response.status,
            error: '',
        };
    } catch (error: any) {
        /**
         * S3 (where we keep images) returns 403
         * if image is not availavle yet
         */
        console.error(`[checkSharedImageExistsService] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'checkSharedImageExistsService');

        return {
            data: 'NOT-EXISTS',
            status: 500,
            error: i18next.t('dataAction.apiError'),
        };
    }
};

export const getSharedRouteByRedirectURLService = async (url: string) => {
    try {
        const response = await getRouteByUrl(url);
        if (response.status >= 400 || response.data?.statusCode >= 400) {
            let errorMessage = 'error';
            if (response.data?.message || response.data?.error) {
                errorMessage = response.data.message || response.data.error;
                if (
                    response?.data?.statusCode !== 400 &&
                    response?.data?.statusCode !== 404
                ) {
                    errorMessage = i18next.t(
                        'dataAction.shareData.getSharedCyclingMapDataError',
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
        console.error(`[checkIsProperValue] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'checkIsProperValue');

        return {
            data: null,
            status: 500,
            error: i18next.t('dataAction.apiError'),
        };
    }
};

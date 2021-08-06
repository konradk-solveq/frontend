import {modifyReaction, removeReaction} from '@api/index';

import {loggError} from '@utils/crashlytics';

export const modifyReactionService = async (
    routeId: string,
    reaction: string,
) => {
    try {
        const response = await modifyReaction(routeId, reaction);

        if (!response?.data || response.status > 400) {
            let errorMessage = 'error';
            if (response.data?.message || response.data?.error) {
                errorMessage = response.data.message || response.data.error;
            }
            return {data: null, status: response.status, error: errorMessage};
        }

        return {
            data: response.data,
            status: response.status,
            error: '',
        };
    } catch (error) {
        loggError(error, 'modifyReactionService -- reactions');
        return {
            data: null,
            status: 500,
            error: 'Internal error',
        };
    }
};

export const removeReactionService = async (routeId: string) => {
    try {
        const response = await removeReaction(routeId);

        if (!response?.data || response.status > 400) {
            let errorMessage = 'error';
            if (response.data?.message || response.data?.error) {
                errorMessage = response.data.message || response.data.error;
            }
            return {data: null, status: response.status, error: errorMessage};
        }

        return {
            data: response.data,
            status: response.status,
            error: '',
        };
    } catch (error) {
        loggError(error, 'removeReactionService -- reactions');
        return {
            data: null,
            status: 500,
            error: 'Internal error',
        };
    }
};

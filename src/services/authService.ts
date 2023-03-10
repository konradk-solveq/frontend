import {
    currentSession,
    logInMobile,
    logIn,
    logOut,
    refreshSession,
    registerDevice,
} from '@api/index';
import {SessionDataType} from '../interfaces/api';

import {isTokenExpiredInFuture} from '../utils/apiDataTransform/tokenExpiration';

type DeviceIdI = {
    userId: string;
    deviceToken: string;
};

interface RegisterResponseI extends DeviceIdI {
    recoveryCodes: string[];
}

export const registerMobileDevice = async () => {
    const response = await registerDevice();

    if (!response?.data || response.status >= 400) {
        let errorMessage = 'error';
        if (response.data?.message || response.data?.error) {
            errorMessage = response.data.message || response.data.error;
        }
        return {data: null, status: response.status, error: errorMessage};
    }

    return {
        data: <RegisterResponseI>response.data,
        status: response.status,
        error: '',
    };
};

export const logInService = async (email: string, password: string) => {
    const response = await logIn(email, password);

    if (!response?.data || response.status >= 400) {
        let errorMessage = 'error';
        if (response.data?.message || response.data?.error) {
            errorMessage = response.data.message || response.data.error;
        }
        return {data: null, status: response.status, error: errorMessage};
    }

    return {
        data: <SessionDataType>response.data,
        status: response.status,
        error: '',
    };
};

export const logInMobileService = async (
    userId: string,
    deviceToken: string,
) => {
    const response = await logInMobile(userId, deviceToken);

    if (!response?.data || response.status >= 400) {
        let errorMessage = 'error';
        if (response.data?.message || response.data?.error) {
            errorMessage = response.data.message || response.data.error;
        }
        return {data: null, status: response.status, error: errorMessage};
    }

    return {
        data: <SessionDataType>response.data,
        status: response.status,
        error: '',
    };
};

export const getCurrentSessionService = async (token: string) => {
    const response = await currentSession(token);

    if (!response?.data || response.status >= 400) {
        let errorMessage = 'error';
        if (response.data?.message || response.data?.error) {
            errorMessage = response.data.message || response.data.error;
        }
        return {data: null, status: response.status, error: errorMessage};
    }

    return {
        data: <DeviceIdI>response.data,
        status: response.status,
        error: '',
    };
};

export const getRefreshSessionService = async (
    token: string,
    refreshToken: string,
) => {
    const response = await refreshSession(token, refreshToken);

    if (!response?.data || response.status >= 400) {
        let errorMessage = 'error';
        if (response.data?.message || response.data?.error) {
            errorMessage = response.data.message || response.data.error;
        }
        return {data: null, status: response.status, error: errorMessage};
    }

    return {
        data: <SessionDataType>response.data,
        status: response.status,
        error: '',
    };
};

export const checkSessionAndRecreateIfNeededService = async (
    userId: string,
    deviceToken: string,
    token: string,
    expirationDate: Date | undefined,
    refreshToken: string,
    abortAutoRefresh?: boolean,
) => {
    const currentSessionResponse = await getCurrentSessionService(token);

    /* No active session. Try to re-login */
    if (
        !currentSessionResponse?.data ||
        currentSessionResponse.status >= 400 ||
        !expirationDate
    ) {
        const loginResponse = await logInMobileService(userId, deviceToken);
        return loginResponse;
    }

    const shouldRefreshToken = isTokenExpiredInFuture(expirationDate);
    if (shouldRefreshToken) {
        const refreshTokenResponse = await getRefreshSessionService(
            token,
            refreshToken,
        );

        /* Error on response. Try to re-login */
        if (
            (!refreshTokenResponse?.data ||
                refreshTokenResponse.status >= 400) &&
            !abortAutoRefresh
        ) {
            const loginResponse = await logInMobileService(userId, deviceToken);
            return loginResponse;
        }

        return refreshTokenResponse;
    }

    return {
        data: {
            access_token: token,
            refresh_token: refreshToken,
            expiration_date: expirationDate,
            expires_in: 0,
            user: {
                id: userId,
                email: deviceToken,
            },
        },
        status: 304 /* No changes. Session is active */,
        error: '',
    };
};

export const logOutService = async () => {
    const response = await logOut();

    if (response.status >= 400) {
        let errorMessage = 'error';
        if (response.data?.message || response.data?.error) {
            errorMessage = response.data.message || response.data.error;
        }
        return {data: null, status: response.status, error: errorMessage};
    }

    return {
        data: null,
        status: response.status,
        error: '',
    };
};

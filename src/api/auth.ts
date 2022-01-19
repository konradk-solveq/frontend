import instance, {source} from './api';

/* Initial registration process (as device). API returns all data */
export const registerDevice = async () => {
    return await instance.post(
        '/session/mobile/register',
        {},
        {
            cancelToken: source.token,
        },
    );
};

export const logInMobile = async (userId: string, deviceToken: string) => {
    return await instance.post(
        '/session/mobile/login',
        {
            userId: userId,
            deviceToken: deviceToken,
        },
        {
            cancelToken: source.token,
        },
    );
};

export const logIn = async (email: string, password: string) => {
    return await instance.post(
        '/session/login',
        {
            email: email,
            password: password,
        },
        {
            cancelToken: source.token,
        },
    );
};

export const currentSession = async (token: string) => {
    return await instance.get('/session/current', {
        headers: {Authorization: `Bearer ${token}`},
        cancelToken: source.token,
    });
};

export const refreshSession = async (token: string, refreshToken: string) => {
    return await instance.post(
        '/session/refresh',
        {
            refresh_token: refreshToken,
        },
        {
            headers: {Authorization: `Bearer ${token}`},
            cancelToken: source.token,
        },
    );
};

export const logOut = async () => {
    return await instance.post(
        '/session/logout',
        {},
        {
            cancelToken: source.token,
        },
    );
};

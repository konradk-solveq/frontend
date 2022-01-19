import instance, {source} from './api';

export const shareRoute = async (routeId: string) => {
    return await instance.post(
        '/share/route',
        {
            routeId: routeId,
        },
        {
            cancelToken: source.token,
        },
    );
};

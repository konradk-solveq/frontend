import instance, {source} from './api';

export const shareRoute = async (routeId: string) => {
    return await instance.post(`/share/cyclingMap/${routeId}`, undefined, {
        cancelToken: source.token,
    });
};

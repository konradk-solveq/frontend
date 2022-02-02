import instance, {axiosGet, source} from './api';

export const shareRoute = async (routeId: string) => {
    return await instance.post(`/share/cyclingMap/${routeId}`, undefined, {
        cancelToken: source.token,
    });
};

export const checkSharedImageExists = async (url: string) => {
    return await axiosGet(url);
};

export const getSharedCyclingMap = async (shareId: string) => {
    return await axiosGet(`/share/cyclingMap/${shareId}`);
};

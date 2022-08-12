import instance, {axiosGet, AxiosRequestConfigI} from '@api/api';
import {prepareConfigReuqstWithController} from '@api/utils/config';

export const shareRoute = async (
    routeId: string,
    controller?: AbortController,
) => {
    const requestConfig: AxiosRequestConfigI = {
        ...prepareConfigReuqstWithController(controller),
    };
    return await instance.post(
        `/share/cyclingMap/${routeId}`,
        undefined,
        requestConfig,
    );
};

export const checkSharedImageExists = async (
    url: string,
    controller?: AbortController,
) => {
    return await axiosGet(url, undefined, controller);
};

export const getSharedCyclingMap = async (
    shareId: string,
    controller?: AbortController,
) => {
    return await axiosGet(
        `/share/cyclingMap/${shareId}`,
        undefined,
        controller,
    );
};

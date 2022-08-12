import instance, {axiosPut, AxiosRequestConfigI} from '@api/api';
import {prepareConfigReuqstWithController} from '@api/utils/config';

export const modifyReaction = async (
    mapId: string,
    reaction: string,
    controller?: AbortController,
) => {
    const requestConfig: AxiosRequestConfigI = {
        ...prepareConfigReuqstWithController(controller),
    };
    return await axiosPut(
        `/routes/route/${mapId}/reaction/${reaction}`,
        {},
        requestConfig,
    );
};

export const removeReaction = async (
    mapId: string,
    controller?: AbortController,
) => {
    const requestConfig: AxiosRequestConfigI = {
        ...prepareConfigReuqstWithController(controller),
    };
    return await instance.delete(
        `/routes/route/${mapId}/reaction`,
        requestConfig,
    );
};

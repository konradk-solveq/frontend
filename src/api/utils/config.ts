import {AxiosRequestConfigI} from '@api/api';

export const prepareConfigReuqstWithController = (
    controller?: AbortController,
): AxiosRequestConfigI => {
    let config = {};
    if (controller) {
        config = {signal: controller.signal};
    }

    return config;
};

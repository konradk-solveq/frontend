import instance, {AxiosRequestConfigI} from '@api/api';
import {BBox} from '@models/places.model';
import {tranformParamsToBBoxRequest} from '@utils/apiDataTransform/prepareRequest';
import {prepareConfigReuqstWithController} from '@api/utils/config';

export const getPlaces = async (data: BBox, controller?: AbortController) => {
    const bboxParams = tranformParamsToBBoxRequest(data.bbox);
    const query = `${bboxParams}&width=${data.width}`;
    const requestConfig: AxiosRequestConfigI = {
        ...prepareConfigReuqstWithController(controller),
    };

    return await instance.get(`/dealers?${query}`, requestConfig);
};

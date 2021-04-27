import instance from './api';
import {BBox} from '../models/places.model';
import {tranformParamsToBBoxRequest} from '../utils/apiDataTransform/prepareRequest';

export const getPlaces = async (data: BBox) => {
    const bboxParams = tranformParamsToBBoxRequest(data.bbox);
    const query = `${bboxParams}&width=${data.width}`;

    return await instance.get(`/dealers?${query}`, {
        validateStatus: () => true,
    });
};

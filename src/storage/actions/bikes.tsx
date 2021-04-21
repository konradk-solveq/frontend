import {I18n} from '../../../I18n/I18n';
import * as actionTypes from './actionTypes';
import {AppThunk} from '../thunk';
import {UserBike} from '../../models/userBike.model';
import {Parameters, BikeDescription, Complaint} from '../../models/bike.model';
import {Bike} from '../../models/bike.model';
import {getBikeByFrameNr} from '../../services';
import {setFrameNumber} from './index';

interface actionAsyncResponse {
    success: boolean;
    errorMessage: string;
    data: any;
}

export const setBikesData = (data: Bike) => {
    return {
        type: actionTypes.SET_BIKES_DATA,
        bikeData: data,
    };
};

const setLoadingState = (state: boolean) => ({
    type: actionTypes.LOADING_BIKE_DATA_STATUS,
    state: state,
});

export const setError = (error: string) => ({
    type: actionTypes.SET_BIKES_ERROR,
    error: error,
});

export const removeBikeByNumber = (frameNr: string) => ({
    type: actionTypes.REMOVE_BIKE_BY_NUMBER,
    frameNr: frameNr,
});

export const setBikesListByFrameNumber = (
    num: string,
): AppThunk<Promise<actionAsyncResponse>> => async dispatch => {
    dispatch(setLoadingState(true));
    try {
        const response = await getBikeByFrameNr(num);

        dispatch(setFrameNumber(num));

        if (response.error || !response.data?.description) {
            dispatch(setError(response.error));

            return Promise.reject({
                success: false,
                errorMessage: response.error,
                notFound: true,
                data: null,
            });
        } else {
            /**
             * TODO: fix class-transformer => external data has no standarization,
             * maybe it should stay in loose comparison
             * */
            // const newData = plainToClass(UserBike, response.data);

            const desc = response.data.description;
            const {name, id, sku, producer, serial_number} = desc;

            const description = new BikeDescription(
                name,
                id,
                sku,
                producer,
                serial_number,
            );
            if (desc?.color) {
                description.color = desc.color;
            }
            if (desc?.bought) {
                description.bought = desc.bought;
            }
            if (desc?.bought) {
                description.bought = desc.bought;
            }
            if (desc?.colorCodes) {
                description.colorCodes = desc.colorCodes;
            }
            if (desc?.purpose) {
                description.purpose = desc.purpose;
            }
            if (desc?.size) {
                description.size = desc.size;
            }

            const newData = new UserBike(description);
            if (response.data?.images) {
                newData.images = response.data.images;
            }
            if (response.data?.warranty) {
                newData.warranty = response.data.warranty;
            }
            if (response.data?.params && Array.isArray(response.data.params)) {
                newData.params = response.data.params.map((el: Parameters) => {
                    return new Parameters(el.name, el.customizable, el?.list);
                });
            }

            if (
                response.data?.complaintsRepairs &&
                Array.isArray(response.data.complaintsRepairs)
            ) {
                newData.complaintsRepairs = response.data.complaintsRepairs.map(
                    (el: Complaint) => {
                        return new Complaint(
                            el.id,
                            el.name,
                            el.date,
                            el.description,
                            el.state,
                        );
                    },
                );
            }

            dispatch(setBikesData(newData));

            return Promise.resolve({
                success: true,
                errorMessage: '',
                data: newData,
            });
        }
    } catch (error) {
        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setError(errorMessage));

        return Promise.reject({
            success: false,
            errorMessage: errorMessage,
            data: null,
        });
    }
};

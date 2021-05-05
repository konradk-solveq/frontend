import {I18n} from '../../../I18n/I18n';
import * as actionTypes from './actionTypes';
import {AppThunk} from '../thunk';
import {UserBike} from '../../models/userBike.model';
import {Bike} from '../../models/bike.model';
import {
    getBikeByFrameNr,
    getGenericDataforBike,
    getBikesListByFrameNrs,
} from '../../services';
import {setFrameNumber} from './index';
import {transformToUserBikeType} from '../../utils/transformData';

interface actionAsyncResponse {
    success: boolean;
    errorMessage: string;
    data: any;
}

export const setBikeData = (data: Bike) => {
    return {
        type: actionTypes.SET_BIKE_DATA,
        bikeData: data,
    };
};

export const setGenericBikeData = (data: Bike) => {
    return {
        type: actionTypes.SET_GENERIC_BIKE_DATA,
        bikeData: data,
    };
};

export const setBikesData = (data: Bike[], numbers: string[]) => {
    return {
        type: actionTypes.SET_BIKES_DATA,
        bikeData: data,
        numbersToUpdate: numbers,
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
             * TODO: fix class-transformer
             * */
            const newData = transformToUserBikeType(response.data);

            dispatch(setBikeData(newData));

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

export const fetchGenericBikeData = (): AppThunk<
    Promise<actionAsyncResponse>
> => async dispatch => {
    dispatch(setLoadingState(true));
    try {
        const response = await getGenericDataforBike();

        if (response?.error || !response?.data) {
            dispatch(setError(response.error));

            return Promise.reject({
                success: false,
                errorMessage: response.error,
                notFound: true,
                data: null,
            });
        } else {
            /**
             * TODO: fix class-transformer
             * */
            const newData = transformToUserBikeType(response.data);

            dispatch(setGenericBikeData(newData));

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

export const setBikesListByFrameNumbers = (): AppThunk<
    Promise<actionAsyncResponse>
> => async (dispatch, getState) => {
    dispatch(setLoadingState(true));
    try {
        const {list} = getState().bikes;
        const numbers: string[] = [];

        if (list?.length < 1) {
            dispatch(setLoadingState(false));
            return Promise.resolve({
                success: true,
                errorMessage: '',
                data: null,
            });
        }

        list.forEach((el: UserBike) => {
            numbers.push(el.description.serial_number);
        });
        const response = await getBikesListByFrameNrs(numbers);

        if (response.error || !response.data) {
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
            const notFound: string[] = [];
            const bikesData = response.data;
            const dataToUpdate: UserBike[] = [];
            if (numbers?.length < 1) {
                return Promise.resolve({
                    success: true,
                    errorMessage: '',
                    data: null,
                });
            }

            numbers.forEach(nr => {
                if (!bikesData[nr]) {
                    notFound.push(nr);
                    return;
                }

                const newData = transformToUserBikeType(bikesData[nr]);

                dataToUpdate.push(newData);
            });

            let errorMessage = '';
            if (notFound.length > 0) {
                const prefix = I18n.t('dataAction.dataSyncError');
                errorMessage = `${prefix}: ${notFound.join(', ')}`;
            }

            const numbersToUpdate: string[] = numbers.filter(
                el => !notFound.includes(el),
            );

            if (numbersToUpdate.length > 0 && dataToUpdate?.length > 0) {
                dispatch(setBikesData(dataToUpdate, numbersToUpdate));
            }

            if (errorMessage) {
                dispatch(setError(errorMessage));
            }
            return Promise.resolve({
                success: !errorMessage,
                errorMessage: errorMessage,
                data: dataToUpdate, //TODO: serialize data before store in redux
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

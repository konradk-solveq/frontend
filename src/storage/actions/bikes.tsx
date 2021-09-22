import {I18n} from '../../../I18n/I18n';
import * as actionTypes from './actionTypes';
import {AppThunk} from '../thunk';
import {UserBikeI} from '../../models/userBike.model';
import {Bike} from '../../models/bike.model';
import {
    getBikeByFrameNr,
    getGenericDataforBike,
    getBikesListByFrameNrs,
} from '../../services';
import {setFrameNumber} from './index';
import logger from '../../utils/crashlytics';
import {convertToApiError} from '../../utils/apiDataTransform/communicationError';
import {loggErrorWithScope} from '@sentryLogger/sentryLogger';
import {BikesState} from '@storage/reducers/bikes';
import {getNumbersToUpdate} from './utils/bikes';

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

export const setGenericBikeData = (data: UserBikeI) => {
    return {
        type: actionTypes.SET_GENERIC_BIKE_DATA,
        genericBikeData: data,
    };
};

export const setBikesData = (data: UserBikeI[], numbers: string[]) => {
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
): AppThunk<Promise<void | actionAsyncResponse>> => async dispatch => {
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
        }

        const newData: UserBikeI = response.data;

        dispatch(setBikeData(newData));
    } catch (error) {
        console.log(`[setBikesListByFrameNumber] - ${error}`);
        logger.log(`[setBikesListByFrameNumber] - ${error}`);
        const err = convertToApiError(error);
        logger.recordError(err);

        loggErrorWithScope(err, 'setBikesListByFrameNumber');

        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setError(errorMessage));
    }
};

export const fetchGenericBikeData = (): AppThunk<
    Promise<void>
> => async dispatch => {
    dispatch(setLoadingState(true));
    try {
        const response = await getGenericDataforBike();

        if (response?.error || !response?.data) {
            dispatch(setError(response.error));
            return;
        }
        const newData: UserBikeI = response.data;

        dispatch(setGenericBikeData(newData));
    } catch (error) {
        console.error(`[fetchGenericBikeData] - ${error}`);
        logger.log(`[fetchGenericBikeData] - ${error}`);
        const err = convertToApiError(error);
        logger.recordError(err);

        loggErrorWithScope(err, 'fetchGenericBikeData');

        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setError(errorMessage));
    }
};

export const setBikesListByFrameNumbers = (): AppThunk<Promise<void>> => async (
    dispatch,
    getState,
) => {
    dispatch(setLoadingState(true));
    try {
        const {list}: BikesState = getState().bikes;

        if (list?.length < 1) {
            dispatch(setLoadingState(false));
            return;
        }

        const numbers = getNumbersToUpdate(list);
        if (!numbers?.length) {
            dispatch(setLoadingState(false));
            return;
        }

        const response = await getBikesListByFrameNrs(numbers);

        if (response.error || !response?.data) {
            dispatch(setError(response.error));
            return;
        } else {
            /* TODO: move to reducer logic - start */
            /**
             * Numbers which not exists in Kross DB
             */
            const notFound: string[] = [];
            const bikesData: {[key: string]: UserBikeI} = response.data;
            const dataToUpdate: UserBikeI[] = [];

            if (numbers?.length < 1) {
                dispatch(setError(''));
                return;
            }

            numbers.forEach(nr => {
                const el = bikesData?.[nr];
                if (!el) {
                    notFound.push(nr);
                    return;
                }

                const newData = el;

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
            /* TODO: move to reducer logic - end */

            if (numbersToUpdate.length > 0 && dataToUpdate?.length > 0) {
                dispatch(setBikesData(dataToUpdate, numbersToUpdate));
            }

            if (errorMessage) {
                dispatch(setError(errorMessage));
            }
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        console.error(`[setBikesListByFrameNumbers] - ${error}`);
        logger.log(`[setBikesListByFrameNumbers] - ${error}`);
        const err = convertToApiError(error);
        logger.recordError(err);

        loggErrorWithScope(err, 'setBikesListByFrameNumbers');

        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setError(errorMessage));
    }
};

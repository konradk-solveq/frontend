import i18next from '@translations/i18next';
import * as actionTypes from './actionTypes';
import {AppThunk} from '../thunk';
import {GenericBikeI, UserBikeI} from '@models/userBike.model';
import {Bike} from '@models/bike.model';
import {BikesConfig} from '@type/bike';
import {
    getBikeByFrameNr,
    getGenericDataforBike,
    getBikesListByFrameNrs,
    getBikesConfigService,
} from '@services/index';
import {setFrameNumber} from './index';
import {convertToApiError} from '@utils/apiDataTransform/communicationError';
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

export const setGenericBikeData = (data: GenericBikeI) => {
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

export const setBikesConfig = (config: BikesConfig) => {
    return {
        type: actionTypes.SET_BIKES_CONFIG,
        bikesConfig: config,
    };
};

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
            /* TODO: reove promise and refactor addingByNumber.tsx */
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
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'setBikesListByFrameNumber');

        const errorMessage = i18next.t('dataAction.apiError');
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
        const newData: GenericBikeI = response.data;

        dispatch(setGenericBikeData(newData));
    } catch (error) {
        console.error(`[fetchGenericBikeData] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'fetchGenericBikeData');

        const errorMessage = i18next.t('dataAction.apiError');
        dispatch(setError(errorMessage));
    }
};

export const fetchBikesConfig = (): AppThunk<
    Promise<void>
> => async dispatch => {
    dispatch(setLoadingState(true));
    try {
        const response = await getBikesConfigService();

        if (response?.error || !response?.data) {
            dispatch(setError(response.error));
            return;
        }

        dispatch(setBikesConfig(response.data));
    } catch (error) {
        console.error(`[fetchBikesConfig] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'fetchBikesConfig');

        const errorMessage = i18next.t('dataAction.apiError');
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
                const prefix = i18next.t('dataAction.dataSyncError');
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
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'setBikesListByFrameNumbers');

        const errorMessage = i18next.t('dataAction.apiError');
        dispatch(setError(errorMessage));
    }
};

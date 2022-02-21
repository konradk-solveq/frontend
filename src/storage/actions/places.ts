import i18next from '@translations/i18next';
import * as actionTypes from './actionTypes';
import {AppThunk} from '../thunk';
import {getPlacesList} from '@services';
import {BBox, Place} from '@models/places.model';

interface actionAsyncResponse {
    success: boolean;
    errorMessage: string;
    data: any;
}

export const setPlacesData = (places: Place[]) => {
    return {
        type: actionTypes.SET_PLACES_DATA,
        places: places,
    };
};

const setLoadingState = (state: boolean) => ({
    type: actionTypes.LOADING_PLACES_DATA,
    state: state,
});

export const setError = (error: string) => ({
    type: actionTypes.SET_PLACES_ERROR,
    error: error,
});

export const fetchPlacesData = (
    bbox: BBox,
): AppThunk<Promise<actionAsyncResponse>> => async dispatch => {
    dispatch(setLoadingState(true));
    try {
        const response = await getPlacesList(bbox);

        if (response.error || !response.data) {
            dispatch(setError(response.error));

            return Promise.reject({
                success: false,
                errorMessage: response.error,
                notFound: true,
                data: null,
            });
        } else {
            dispatch(setPlacesData(response.data));

            return Promise.resolve({
                success: true,
                errorMessage: '',
                data: response.data,
            });
        }
    } catch (error) {
        const errorMessage = i18next.t('dataAction.apiError');
        dispatch(setError(errorMessage));

        return Promise.reject({
            success: false,
            errorMessage: errorMessage,
            data: null,
        });
    }
};

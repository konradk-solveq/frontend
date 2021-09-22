import * as actionTypes from '@storage/actions/actionTypes';

import bikesMock from '@api/mocks/bikes/lookupBIke';
import updatedData from '../mocks/bikesListToUpdate';
import { I18n } from '@translations/I18n';

const bikeNumber = '1003196015';
const bikeNumberTwo = '1234567890';
const customBikeNumber = '1456790';

const numbersToUpdate = [bikeNumber, bikeNumberTwo];

const prefix = I18n.t('dataAction.dataSyncError');
const errorMessage = `${prefix}: ${customBikeNumber}`;

export const synchRecordingWhenOnlineExpectedActions = [
    {
        type: actionTypes.LOADING_BIKE_DATA_STATUS,
        state: true,
    },
    {
        type: actionTypes.SET_FRAME_NUMBER,
        frameNumber: bikeNumber,
    },
    {
        type: actionTypes.SET_BIKE_DATA,
        bikeData: bikesMock.bikeOneComplete,
    },
];

export const synchRecordingWhenOnlineAndReturnIncompliteDataExpectedActions = [
    {
        type: actionTypes.LOADING_BIKE_DATA_STATUS,
        state: true,
    },
    {
        type: actionTypes.SET_FRAME_NUMBER,
        frameNumber: bikeNumberTwo,
    },
    {
        type: actionTypes.SET_BIKE_DATA,
        bikeData: bikesMock.bikeOneIncomplite,
    },
];

export const synchRecordingWhenOnlineAndReturnsNoDataExpectedActions = [
    {
        type: actionTypes.LOADING_BIKE_DATA_STATUS,
        state: true,
    },
    {
        type: actionTypes.SET_FRAME_NUMBER,
        frameNumber: bikeNumberTwo,
    },
    {
        type: actionTypes.SET_BIKES_ERROR,
        error: 'error',
    },
];

export const synchBikesListWhenOnlineExpectedActions = [
    {
        type: actionTypes.LOADING_BIKE_DATA_STATUS,
        state: true,
    },
    {
        type: actionTypes.SET_BIKES_DATA,
        bikeData: updatedData,
        numbersToUpdate: numbersToUpdate,
    },
    {
        type: actionTypes.SET_BIKES_ERROR,
        error: errorMessage,
    },
    {
        type: actionTypes.LOADING_BIKE_DATA_STATUS,
        state: false,
    },
];

export const synchBikesListWhenOnlineAndNoDataFromAPIExpectedActions = [
    {
        type: actionTypes.LOADING_BIKE_DATA_STATUS,
        state: true,
    },
    {
        type: actionTypes.SET_BIKES_ERROR,
        error: 'error',
    },
];

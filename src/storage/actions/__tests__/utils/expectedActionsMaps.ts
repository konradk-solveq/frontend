import * as actionTypes from '@storage/actions/actionTypes';

import featuredMapsMock from '@api/mocks/featuredRoutesDataInit'
import featuredMapsNextMock from '@api/mocks/featuredRoutesDataNext'

export const synchRecordingWhenOnlineExpectedActions = [
    {
        type: actionTypes.SET_MAPS_LOADING_STATE,
        state: true,
    },
    {
        type: actionTypes.SET_FEATURED_MAPS_DATA,
        featuredMaps: featuredMapsMock,
        refresh: true,
    },
    {
        type: actionTypes.CLEAR_MAPS_ERROR,
    },
    {
        type: actionTypes.SET_MAPS_LOADING_STATE,
        state: false,
    },
];

export const synchRecordingWhenOnlinePaginationExpectedActions = [
    {
        type: actionTypes.SET_MAPS_LOADING_STATE,
        state: true,
    },
    {
        type: actionTypes.SET_FEATURED_MAPS_DATA,
        featuredMaps: featuredMapsNextMock,
        refresh: true,
    },
    {
        type: actionTypes.CLEAR_MAPS_ERROR,
    },
    {
        type: actionTypes.SET_MAPS_LOADING_STATE,
        state: false,
    },
];
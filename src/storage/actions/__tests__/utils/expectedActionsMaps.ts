import * as actionTypes from '@storage/actions/actionTypes';

import featuredMapsMock from '@api/mocks/featuredRoutesDataInit';
import featuredMapsNextMock from '@api/mocks/featuredRoutesDataNext';
import mapData from '@api/mocks/mapData';

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

export const PUBLIC_MAP_EXPECTED_ACTIONS = {
    addToFavouritesSuccessExpectedActions: [
        {
            type: actionTypes.SET_MAPS_LOADING_STATE,
            state: true,
        },
        {
            type: actionTypes.SET_MAP_IS_FAVOURITED_STATE,
            mapIdToModify: mapData.elements[0].id,
            isFavourite: true,
        },
        {
            type: actionTypes.SET_PLANNED_MAPS_DATA,
            plannedMaps: mapData.elements[0],
            paginationCoursor: mapData.links,
            refresh: true,
        },
        {
            type: actionTypes.CLEAR_MAPS_ERROR,
        },
        {
            type: actionTypes.CLEAR_MAPS_ERROR,
        },
        {
            type: actionTypes.SET_MAPS_LOADING_STATE,
            state: false,
        },
    ],
    addToFavouritesFailExpectedActions: [
        {
            type: actionTypes.SET_MAPS_LOADING_STATE,
            state: true,
        },
        {
            type: actionTypes.SET_MAPS_ERROR,
            statusCode: 404,
            error: 'error',
        },
    ],
    removeFromFavouritesSuccessExpectedActions: [
        {
            type: actionTypes.SET_MAPS_LOADING_STATE,
            state: true,
        },
        {
            type: actionTypes.SET_MAP_IS_FAVOURITED_STATE,
            mapIdToModify: mapData.elements[0].id,
            isFavourite: false,
        },
        {
            type: actionTypes.REMOVE_MAP_FROM_FAVOURITES,
            mapID: mapData.elements[0].id,
        },
        {
            type: actionTypes.SET_PLANNED_MAPS_DATA,
            plannedMaps: mapData.elements[0],
            paginationCoursor: mapData.links,
            refresh: true,
        },
        {
            type: actionTypes.CLEAR_MAPS_ERROR,
        },
        {
            type: actionTypes.CLEAR_MAPS_ERROR,
        },
        {
            type: actionTypes.SET_MAPS_LOADING_STATE,
            state: false,
        },
    ],
    removeFromFavouritesFailExpectedActions: [
        {
            type: actionTypes.SET_MAPS_LOADING_STATE,
            state: true,
        },
        {
            type: actionTypes.SET_MAPS_ERROR,
            statusCode: 404,
            error: 'error',
        },
    ],
};

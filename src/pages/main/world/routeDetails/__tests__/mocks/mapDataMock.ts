import {CoordsType, Map} from '@models/map.model';
import {RouteDetailsRouteT} from '@type/rootStack';
import {RegularStackRoute} from '@navigation/route';

export const MOCK_MAP_ID = 'test_map_id';
export const MOCK_MAP_NAME = 'test_map_name';
export const MOCK_MAP_PATH: CoordsType[] = [
    [50.01, 22.01],
    [50.01, 22.02],
    [50.02, 22.02],
    [50.03, 22.02],
];
export const MOCK_MAP_DATE = new Date('2022-01-27T20:02:54.000Z');
export const MOCK_MAP_CREATED_AT = MOCK_MAP_DATE.toDateString();

export const MOCK_MAP_DATA = new Map(
    MOCK_MAP_ID,
    MOCK_MAP_NAME,
    MOCK_MAP_PATH,
    MOCK_MAP_DATE,
    MOCK_MAP_CREATED_AT,
);

export const MOCK_MAP_RESPONSE = {
    data: MOCK_MAP_DATA,
    status: 200,
};

export const sharedFeaturedMapDataRoute: RouteDetailsRouteT = {
    key: 'RouteDetails',
    name: 'RouteDetails',
    params: {
        shareID: MOCK_MAP_DATA.id,
    },
};

export const featuredMapDataRoute: RouteDetailsRouteT = {
    key: 'RouteDetails',
    name: 'RouteDetails',
    params: {
        featured: true,
        mapID: MOCK_MAP_DATA.id,
    },
};
export const privateMapDataRoute: RouteDetailsRouteT = {
    key: 'RouteDetails',
    name: 'RouteDetails',
    params: {
        private: true,
        mapID: MOCK_MAP_DATA.id,
    },
};

export const favouriteMapDataRoute: RouteDetailsRouteT = {
    key: 'RouteDetails',
    name: 'RouteDetails',
    params: {
        favourite: true,
        mapID: MOCK_MAP_DATA.id,
    },
};

export const featuredMapDataInitialState = {
    maps: {
        featuredMaps: [{routes: {elements: [MOCK_MAP_DATA]}}],
        plannedMaps: [],
        privateMaps: [],
        maps: [],
    },
};

export const publishedMapDataInitialState = {
    maps: {
        featuredMaps: [
            {routes: {elements: [{...MOCK_MAP_DATA, isPublic: true}]}},
        ],
        plannedMaps: [],
        privateMaps: [],
        maps: [],
    },
};

export const sharedMapDataInitialState = {
    maps: {
        featuredMaps: [{routes: {elements: []}}],
        plannedMaps: [],
        privateMaps: [],
        maps: [],
    },
};

export const privateMapDataInitialState = {
    user: {onboardingFinished: true, userName: 'test-user'},
    authData: {userId: 'test-user'},
    maps: {
        featuredMaps: [{routes: {elements: []}}],
        plannedMaps: [],
        privateMaps: [{...MOCK_MAP_DATA, ownerId: 'test-user'}],
        maps: [],
    },
};

export const plannedMapDataInitialState = {
    maps: {
        featuredMaps: [{routes: {elements: []}}],
        plannedMaps: [MOCK_MAP_DATA],
        privateMaps: [],
        maps: [],
    },
};

export const EDIT_BUTTON_NAVIGATION_ARGS = {
    name: RegularStackRoute.EDIT_DETAILS_SCREEN,
    params: {mapID: MOCK_MAP_ID, private: true},
};

export const SHARE_BUTTON_NAVIGATION_ARGS = {
    name: RegularStackRoute.SHARE_ROUTE_SCREEN,
    params: {mapID: MOCK_MAP_ID, mapType: 'featured'},
};

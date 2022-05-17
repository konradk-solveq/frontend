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

const RAW_DATA_OBJECT = {
    id: MOCK_MAP_ID,
    name: MOCK_MAP_NAME,
    author: '',
    description: 'T 22',
    images: [
        {
            variants: {
                share: [
                    {
                        url:
                            'https://public.pre.mykross.kross.pl/cycling-map/PP9DunEXFvL_3y3NFcO5QqzXMZUFbSO2/YibXc-YThBHZhZMHkxut_share_167.jpg',
                        width: 167,
                        height: 87,
                    },
                ],
                square: [
                    {
                        url:
                            'https://public.pre.mykross.kross.pl/cycling-map/PP9DunEXFvL_3y3NFcO5QqzXMZUFbSO2/YibXc-YThBHZhZMHkxut_square_167.jpg',
                        width: 167,
                        height: 167,
                    },
                ],
                vertical: [
                    {
                        url:
                            'https://public.pre.mykross.kross.pl/cycling-map/PP9DunEXFvL_3y3NFcO5QqzXMZUFbSO2/YibXc-YThBHZhZMHkxut_vertical_167.jpg',
                        width: 167,
                        height: 209,
                    },
                ],
                horizontal: [
                    {
                        url:
                            'https://public.pre.mykross.kross.pl/cycling-map/PP9DunEXFvL_3y3NFcO5QqzXMZUFbSO2/YibXc-YThBHZhZMHkxut_horizontal_167.jpg',
                        width: 167,
                        height: 134,
                    },
                ],
            },
            id: 'YibXc-YThBHZhZMHkxut',
            type: 'photo',
        },
    ],
    path: MOCK_MAP_PATH,
    difficulty: ['moderate'],
    surface: ['asphalt', 'bike_path'],
    recommended: false,
    time: 19,
    distance: 309,
    tags: ['weekend', 'family', 'mountain', 'professional'],
    ownerId: null,
    isPublic: true,
    createdAt: '2021-06-17T08:06:25.741Z',
    publishedAt: '2021-06-17T09:16:58.000Z',
    downloads: null,
    reactions: {
        like: 0,
        love: 0,
        wow: 0,
    },
    isFeatured: false,
    thumbnails: [
        {
            width: 256,
            height: 120,
            url:
                'https://public.pre.mykross.kross.pl/cycling-map/PP9DunEXFvL_3y3NFcO5QqzXMZUFbSO2/map-public_256.png',
        },
        {
            width: 512,
            height: 240,
            url:
                'https://public.pre.mykross.kross.pl/cycling-map/PP9DunEXFvL_3y3NFcO5QqzXMZUFbSO2/map-public_512.png',
        },
        {
            width: 1024,
            height: 480,
            url:
                'https://public.pre.mykross.kross.pl/cycling-map/PP9DunEXFvL_3y3NFcO5QqzXMZUFbSO2/map-public_1024.png',
        },
    ],
};

export const MOCK_MAP_RESPONSE = {
    data: RAW_DATA_OBJECT,
    status: 200,
};

export const sharedFeaturedMapDataRoute: RouteDetailsRouteT = {
    key: 'RouteDetails',
    name: 'RouteDetails',
    params: {
        mapID: '',
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
        featuredMaps: [{routes: {elements: [RAW_DATA_OBJECT]}}],
        plannedMaps: [],
        privateMaps: [],
        maps: [],
    },
};

export const publishedMapDataInitialState = {
    maps: {
        featuredMaps: [
            {routes: {elements: [{...RAW_DATA_OBJECT, isPublic: true}]}},
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
        privateMaps: [{...RAW_DATA_OBJECT, ownerId: 'test-user'}],
        maps: [],
    },
};

export const plannedMapDataInitialState = {
    maps: {
        featuredMaps: [{routes: {elements: []}}],
        plannedMaps: [RAW_DATA_OBJECT],
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

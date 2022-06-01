import {action} from '@storybook/addon-actions';
import {transformToMapsType} from '@utils/transformData';

export const imagesData = {
    images: [],
    mapImg: '',
};

export const alertData = {
    onPress: action('on-alert-press'),
    onCancel: action('on-cancel-press'),
    pressText: 'OK',
    cancelText: 'Cancel',
};

export const options = {
    difficulties: [
        {enumValue: 'easy', i18nValue: 'łatwa'},
        {enumValue: 'moderate', i18nValue: 'średnia'},
        {enumValue: 'hard', i18nValue: 'trudna'},
    ],
    reactions: [
        {enumValue: 'like', i18nValue: '👍'},
        {enumValue: 'love', i18nValue: '❤️'},
        {enumValue: 'wow', i18nValue: '😮'},
    ],
    surfaces: [
        {enumValue: 'asphalt', i18nValue: 'asfaltowa'},
        {enumValue: 'paved', i18nValue: 'utwardzona'},
        {enumValue: 'unpaved', i18nValue: 'nieutwardzona'},
        {enumValue: 'bike_path', i18nValue: 'ścieżka rowerowa'},
    ],
    tags: [
        {enumValue: 'scenic', i18nValue: 'widokowa'},
        {enumValue: 'weekend', i18nValue: 'weekendowa'},
        {enumValue: 'low-traffic', i18nValue: 'mały ruch'},
        {enumValue: 'high-traffic', i18nValue: 'duży ruch'},
        {enumValue: 'delicious-food', i18nValue: 'dobre jedzenie'},
        {enumValue: 'interesting-attractions', i18nValue: 'ciekawe atrakcje'},
        {enumValue: 'family', i18nValue: 'rodzinna'},
        {enumValue: 'trekking', i18nValue: 'trekkingowa'},
        {enumValue: 'forest', i18nValue: 'leśna'},
        {enumValue: 'city', i18nValue: 'miejska'},
        {enumValue: 'mountain', i18nValue: 'górska'},
        {enumValue: 'tourist', i18nValue: 'turystyczna'},
        {enumValue: 'relic', i18nValue: 'zabytki'},
        {enumValue: 'historic-trail', i18nValue: 'szlak historyczny'},
        {enumValue: 'overnight-stay', i18nValue: 'nocleg'},
        {enumValue: 'bike-park', i18nValue: 'parking dla rowerów'},
        {enumValue: 'professional', i18nValue: 'profesjonalna'},
        {enumValue: 'recreational', i18nValue: 'rekreacyjna'},
        {enumValue: 'singletrack', i18nValue: 'singletrack'},
        {enumValue: 'nature-monuments', i18nValue: 'pomniki przyrody'},
    ],
};

export const mapData = transformToMapsType(
    {
        id: 'OVadi4CnVgq9Pop1dFHN9p4n9rJSH33j',
        name: 'Trasa 1 z dnia 27/05/2022',
        path: [
            [37.3377006, -122.0322133],
            [37.3377003, -122.0323748],
            [37.3376866, -122.0327566],
            [37.3376786, -122.0329094],
            [37.3376629, -122.0330555],
            [37.3376417, -122.0335842],
            [37.3376239, -122.0338099],
            [37.3376163, -122.0339514],
        ],
        createdAt: '2022-05-27T14:40:42.000Z',
        distance: 154,
        nearestPoint: {lng: -122.03308234, lat: 37.3376584},
        distanceToRoute: 147.5144000216679,
        tags: [],
        pictures: {
            images: [],
            thumbnails: [
                {
                    width: 256,
                    height: 120,
                    url:
                        'https://public.pre.mykross.kross.pl/cycling-map/OVadi4CnVgq9Pop1dFHN9p4n9rJSH33j/map-own_256.png',
                },
                {
                    width: 512,
                    height: 240,
                    url:
                        'https://public.pre.mykross.kross.pl/cycling-map/OVadi4CnVgq9Pop1dFHN9p4n9rJSH33j/map-own_512.png',
                },
                {
                    width: 1024,
                    height: 480,
                    url:
                        'https://public.pre.mykross.kross.pl/cycling-map/OVadi4CnVgq9Pop1dFHN9p4n9rJSH33j/map-own_1024.png',
                },
            ],
        },
        difficulty: [],
        ownerId: 'DIew1DL3BszpfxIjBv0A4lIT',
        surface: [],
        time: 22,
        downloads: 0,
        reaction: null,
        reactions: {like: 0, love: 0, wow: 0},
        optionsEnums: {
            difficultyOptions: [
                {enumValue: 'easy', i18nValue: 'łatwa'},
                {enumValue: 'moderate', i18nValue: 'średnia'},
                {enumValue: 'hard', i18nValue: 'trudna'},
            ],
            surfacesOptions: [
                {enumValue: 'asphalt', i18nValue: 'asfaltowa'},
                {enumValue: 'paved', i18nValue: 'utwardzona'},
                {enumValue: 'unpaved', i18nValue: 'nieutwardzona'},
                {enumValue: 'bike_path', i18nValue: 'ścieżka rowerowa'},
            ],
            tagsOptions: [
                {enumValue: 'scenic', i18nValue: 'widokowa'},
                {enumValue: 'weekend', i18nValue: 'weekendowa'},
                {enumValue: 'low-traffic', i18nValue: 'mały ruch'},
                {enumValue: 'high-traffic', i18nValue: 'duży ruch'},
                {enumValue: 'delicious-food', i18nValue: 'dobre jedzenie'},
                {
                    enumValue: 'interesting-attractions',
                    i18nValue: 'ciekawe atrakcje',
                },
                {enumValue: 'family', i18nValue: 'rodzinna'},
                {enumValue: 'trekking', i18nValue: 'trekkingowa'},
                {enumValue: 'forest', i18nValue: 'leśna'},
                {enumValue: 'city', i18nValue: 'miejska'},
                {enumValue: 'mountain', i18nValue: 'górska'},
                {enumValue: 'tourist', i18nValue: 'turystyczna'},
                {enumValue: 'relic', i18nValue: 'zabytki'},
                {enumValue: 'historic-trail', i18nValue: 'szlak historyczny'},
                {enumValue: 'overnight-stay', i18nValue: 'nocleg'},
                {enumValue: 'bike-park', i18nValue: 'parking dla rowerów'},
                {enumValue: 'professional', i18nValue: 'profesjonalna'},
                {enumValue: 'recreational', i18nValue: 'rekreacyjna'},
                {enumValue: 'singletrack', i18nValue: 'singletrack'},
                {enumValue: 'nature-monuments', i18nValue: 'pomniki przyrody'},
            ],
            reactions: [
                {enumValue: 'like', i18nValue: '👍'},
                {enumValue: 'love', i18nValue: '❤️'},
                {enumValue: 'wow', i18nValue: '😮'},
            ],
        },
    },
    undefined,
);

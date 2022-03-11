export const filters = {
    difficulties: {
        name: 'difficulties',
        options: [
            {enumValue: 'easy', i18nValue: 'łatwa'},
            {enumValue: 'moderate', i18nValue: 'umiarkowana'},
            {enumValue: 'hard', i18nValue: 'trudna'},
        ],
        radioType: true,
    },
    surfaces: {
        name: 'surfaces',
        options: [
            {enumValue: 'gravel', i18nValue: 'szutrowa'},
            {enumValue: 'asphalt', i18nValue: 'asfaltowa'},
            {enumValue: 'paved', i18nValue: 'utwardzona'},
            {enumValue: 'unpaved', i18nValue: 'nieutwardzona'},
            {enumValue: 'bike_path', i18nValue: 'ścieżka rowerowa'},
        ],
        radioType: false,
    },
    tags: {
        name: 'tags',
        options: [
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
        radioType: false,
    },
    reactions: {
        name: 'reactions',
        options: [
            {enumValue: 'like', i18nValue: '👍'},
            {enumValue: 'love', i18nValue: '❤️'},
            {enumValue: 'wow', i18nValue: '😮'},
        ],
        radioType: false,
    },
};

export const pickedFilters = {
    difficulties: ['moderate'],
    surfaces: ['asphalt'],
    tags: ['low-traffic'],
};

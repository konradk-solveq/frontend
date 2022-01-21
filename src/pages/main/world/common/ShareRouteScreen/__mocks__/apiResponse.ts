export const apiResponseWithSuccess = {
    data: {
        url: 'https://kross.eu/aplikacja-mobilna',
        content: {
            imgUrl:
                'cycling-map/pTlxfkJxIu1Lu2EqrRoqZEVYdHKfLZEo/map_share_1024.png',
        },
    },
    status: 200,
};

export const apiResponseWithFailure = {
    data: {
        data: null,
        status: 404,
        error: 'Test error',
    },
    status: 404,
};

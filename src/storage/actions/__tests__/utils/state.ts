export const initState = {
    routes: {
        currentRoute: {
            id: '',
            isActive: false,
            startedAt: undefined,
            endedAt: undefined,
            recordTimes: [],
            pauseTime: 0,
            routeId: undefined,
            remoteRouteId: undefined,
        },
        currentRouteData: [],
    },
    maps: {
        totalPrivateMaps: null,
        totalFeaturedMaps: [],
        mapToAddId: '',
        loading: false,
        privateMaps: [],
        featuredMaps: [],
        paginationCoursorFeatured: [],
        paginationCoursorPrivate: {},
        statusCode: 200,
        refresh: false,
        error: '',
    },
    app: {
        isOffline: false,
        internetConnectionInfo: {
            goodConnectionQuality: true,
        },
        location: undefined,
    },
    bikes: {
        list: [],
        genericBike: {},
        error: '',
        loading: false,
    },
    auth: {
        userAuthState: 'uknown',
    },
};

export const initState = {
    routes: {
        currentRoute: {
            id: '',
            isActive: false,
            startedAt: undefined,
            endedAt: undefined,
            pauseTime: 0,
            routeId: undefined,
            remoteRouteId: undefined,
        },
        currentRouteData: [],
    },
    maps: {
        totalPrivateMaps: null,
        mapToAddId: '',
        loading: false,
        privateMaps: [],
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
};

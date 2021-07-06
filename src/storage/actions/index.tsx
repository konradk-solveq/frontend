export {
    setUserName,
    setFrameNumber,
    setProfileSettings,
    setOnboardingFinished,
} from './user';

export {
    setBikeData,
    setBikesData,
    setBikesListByFrameNumber,
    setBikesListByFrameNumbers,
    removeBikeByNumber,
    fetchGenericBikeData,
} from './bikes';

export {
    appSyncData,
    clearAppError,
    setAppStatus,
    setSyncError,
    setSyncStatus,
    fetchAppRegulations,
    setAppRegulation,
    setAppCurrentTerms,
    setAppPolicy,
    setAppShowedRegulationsNumber,
    setAppTerms,
} from './app';

export {fetchPlacesData} from './places';

export {
    fetchMapsList,
    setMapsData,
    addMapData,
    addMapToFavourite,
    removeMapFromFavourite,
    fetchPrivateMapsList,
    setPrivateMapId,
} from './maps';

export {
    addRoutesToSynchQueue,
    clearCurrentRouteData,
    clearRoutesToSynch,
    persistCurrentRouteData,
    setCurrentRoute,
    setCurrentRouteData,
    setRouteToSynch,
    setRoutesData,
    stopCurrentRoute,
    syncCurrentRouteData,
    syncRouteDataFromQueue,
} from './routes';

export {
    checkSession,
    clearAuthError,
    clearAuthorizationStateState,
    logIn,
    register,
    setAuthData,
    setAuthError,
    setAuthorizationState,
    setAuthSyncState,
    setAuthSessionData,
} from './auth';

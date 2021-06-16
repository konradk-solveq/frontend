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
    removeBikeByNumber,
    fetchGenericBikeData,
} from './bikes';

export {
    clearAppError,
    fetchAppRegulations,
    setAppRegulation,
    setAppStatus,
    setSyncError,
    setSyncStatus,
    setAppCurrentTerms,
    setAppPolicy,
    setAppShowedRegulationsNumber,
    setAppTerms,
} from './app';

export {fetchPlacesData} from './places';

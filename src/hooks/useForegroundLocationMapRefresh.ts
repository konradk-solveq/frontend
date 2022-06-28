import {useEffect, useRef} from 'react';
import {ForegroundRefetchRefType} from '@type/maps';
import useAppState from '@hooks/useAppState';
import {useAppSelector, useAppDispatch} from '@hooks/redux';
import {globalLocationSelector} from '@storage/selectors/app';

const useForegroundLocationMapRefresh = (
    setShowListLoader: (state: boolean) => void,
    refetchMaps: () => Promise<void>,
) => {
    const fetchMapsAfterForegroundRef = useRef<ForegroundRefetchRefType>({
        fetchedMapsAfterForeground: true,
    });
    const {appIsActive} = useAppState();
    const location = useAppSelector(globalLocationSelector);
    const dispatch = useAppDispatch();
    /**
     * Refetch maps if location changed while app was in the background
     */
    useEffect(() => {
        if (!fetchMapsAfterForegroundRef.current.location) {
            fetchMapsAfterForegroundRef.current.location = location;
        }
        if (
            appIsActive &&
            !fetchMapsAfterForegroundRef.current.fetchedMapsAfterForeground
        ) {
            if (
                location?.latitude !==
                    fetchMapsAfterForegroundRef.current.location?.latitude ||
                location?.longitude !==
                    fetchMapsAfterForegroundRef.current.location?.longitude
            ) {
                setShowListLoader(true);
                dispatch(refetchMaps).then(() => setShowListLoader(false));
                fetchMapsAfterForegroundRef.current = {
                    fetchedMapsAfterForeground: true,
                    location: location,
                };
            }
        }
        if (
            !appIsActive &&
            fetchMapsAfterForegroundRef.current.fetchedMapsAfterForeground
        ) {
            fetchMapsAfterForegroundRef.current.fetchedMapsAfterForeground = false;
        }
    }, [appIsActive, dispatch, location, refetchMaps, setShowListLoader]);
};

export default useForegroundLocationMapRefresh;

import {useEffect, useState} from 'react';
import {Map} from '@models/map.model';
import {getSharedCyclingMapService} from '@services/shareService';
import {useMergedState} from '@hooks/useMergedState';

type MapStateT = {
    mapData: Map | null;
    error: boolean;
};

export const useSharedMapData = (shareID?: string) => {
    const [{mapData, error}, setMapState] = useMergedState<MapStateT>({
        mapData: null,
        error: false,
    });
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (shareID) {
            const fetchSharedMapDataAsync = async () => {
                const response = await getSharedCyclingMapService(shareID);
                if (response.data) {
                    setMapState({mapData: response.data, error: false});
                } else {
                    setMapState({error: true});
                }
                setIsLoading(false);
            };
            fetchSharedMapDataAsync();
        }
    }, [setMapState, shareID]);

    if (!shareID) {
        return {
            error: true,
        };
    }

    return {mapData, isLoading, error};
};

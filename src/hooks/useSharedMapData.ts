import {useEffect, useState} from 'react';

import {Map} from '@models/map.model';
import {getSharedCyclingMapService} from '@services/shareService';
import {useMergedState} from '@hooks/useMergedState';
import {mapToClass} from '@utils/transformData';
import {appConfigSelector} from '@storage/selectors/app';

import {useAppSelector} from './redux';

type MapStateT = {
    mapData: Map | null;
    error: boolean;
};

export const useSharedMapData = (shareID?: string) => {
    const appConfig = useAppSelector(appConfigSelector);

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
                    const md = mapToClass(response.data, appConfig);
                    setMapState({mapData: md, error: false});
                } else {
                    setMapState({error: true});
                }
                setIsLoading(false);
            };
            fetchSharedMapDataAsync();
        }
    }, [setMapState, shareID, appConfig]);

    if (!shareID) {
        return {
            error: false,
            mapData: null,
        };
    }

    return {mapData, isLoading, error};
};

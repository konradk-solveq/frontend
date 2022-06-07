import {useEffect, useState} from 'react';

import {Map, CoordsType} from '@models/map.model';
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
                    md.nearestPoint = getMiddlePoint(md.path);

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

/**
 * Returns middle point of the path
 */
const getMiddlePoint = (mapDataPath?: CoordsType[]) => {
    if (!mapDataPath?.length) {
        return;
    }

    try {
        const index = Math.ceil(mapDataPath.length / 2);
        const point = mapDataPath?.[index];

        if (point?.length) {
            return {
                lat: point[0],
                lng: point[1],
            };
        }
    } catch (error) {
        console.error('[getNearestPoint]: ', error);
    }
};

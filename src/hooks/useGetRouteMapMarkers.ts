import {useEffect, useMemo, useState} from 'react';

import {MapMarkerType} from '@models/map.model';
import {BBox} from '@models/places.model';
import {getMarkersListService} from '@services/index';
import {BasicCoordsType} from '@type/coords';

const useGetRouteMapMarkers = () => {
    // eslint-disable-next-line no-undef
    const controller = useMemo(() => new AbortController(), []);
    const [routeMarkres, setRouteMarkers] = useState<MapMarkerType[]>([]);
    const [error, setError] = useState<string>('');

    const fetchRoutesMarkers = async (
        bbox: BBox,
        locaiton: BasicCoordsType,
    ) => {
        try {
            const response = await getMarkersListService(
                bbox,
                locaiton,
                controller,
            );

            if (response?.error || !response?.data) {
                console.log(response?.error);
                return;
            }

            setRouteMarkers(response.data);
        } catch (e) {
            console.error(e);
            if (typeof e === 'string') {
                setError(e);
                return;
            }
        }
    };

    /**
     * Abort fetching markers data on unmount
     */
    useEffect(() => {
        return () => {
            controller?.abort();
        };
    }, [controller]);

    return {fetchRoutesMarkers, routeMarkres, error};
};

export default useGetRouteMapMarkers;

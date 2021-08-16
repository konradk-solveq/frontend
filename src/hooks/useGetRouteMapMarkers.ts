import {useState} from 'react';

import {MapMarkerType} from '@models/map.model';
import {BBox} from '@models/places.model';
import {getMarkersListService} from '@services/index';
import {BasicCoordsType} from '@type/coords';

const useGetRouteMapMarkers = () => {
    const [routeMarkres, setRouteMarkers] = useState<MapMarkerType[]>([]);
    const [error, setError] = useState<string>('');

    const fetchRoutesMarkers = async (
        bbox: BBox,
        locaiton: BasicCoordsType,
    ) => {
        try {
            const response = await getMarkersListService(bbox, locaiton);

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

    return {fetchRoutesMarkers, routeMarkres, error};
};

export default useGetRouteMapMarkers;

import {useState} from 'react';

import {MapMarkerType} from '../models/map.model';
import {BBox} from '../models/places.model';
import {getMarkersList} from '../services';

const useGetRouteMapMarkers = () => {
    const [routeMarkres, setRouteMarkers] = useState<MapMarkerType[]>([]);
    const [error, setError] = useState<string>('');

    const fetchRoutesMarkers = async (bbox: BBox) => {
        try {
            const response = await getMarkersList(bbox);

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

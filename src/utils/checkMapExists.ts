import {MapType} from '../models/map.model';
import {RouteMapType} from '../models/places.model';

const mapExists = (mapId: string, maps: MapType[]) => {
    if (!maps?.length) {
        return false;
    }
    return maps.find(m => m.id === mapId);
};

export const checkMapExists = (
    mapId: string,
    maps: MapType[],
    privateMaps: MapType[],
    plannedMaps: MapType[],
    mapType?: RouteMapType,
) => {
    if (!mapType) {
        return mapExists(mapId, maps);
    }

    if (mapType === RouteMapType.MY_ROUTES) {
        return mapExists(mapId, privateMaps);
    }

    if (mapType === RouteMapType.PLANNING) {
        return mapExists(mapId, plannedMaps);
    }

    return false;
};

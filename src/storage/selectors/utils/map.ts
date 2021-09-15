import {FeaturedMapType, MapType} from '@models/map.model';

export const getMapFromFeaturedSections = (
    mapData: FeaturedMapType[],
    mapID: string,
) => {
    let mapToReturn: MapType | undefined;
    for (let fm of mapData) {
        const el = fm?.routes?.elements?.find(m => m.id === mapID);
        if (el) {
            mapToReturn = el;
            break;
        }
    }

    return mapToReturn;
};

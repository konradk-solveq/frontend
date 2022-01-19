import {Map} from '@models/map.model';

export const getMapIsPublishedByMapId = (mapsData: Map[], mapId: string) =>
    mapsData?.find(e => {
        if (e.id === mapId) {
            return e.isPublic;
        }
    })?.isPublic || false;

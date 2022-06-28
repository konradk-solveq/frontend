import {BasicCoordsType} from '@type/coords';

export type NestedTotalMapsType = {id: string; value: number | null};

export type ForegroundRefetchRefType = {
    fetchedMapsAfterForeground: boolean;
    location?: BasicCoordsType;
};

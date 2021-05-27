import {SelectI} from '../../../../../../models/map.model';

export type OptionType = {
    difficulty: SelectI | undefined;
    surface: SelectI | undefined;
    tags: SelectI | undefined;
};

export interface FCPropsI {
    onChange: (...event: any[]) => void;
    value: any;
    isValid: boolean;
    errMsg: string | undefined;
}

export type FormData = {
    id: string;
    name: string;
    publishWithName: boolean;
    short?: string;
    long?: string;
    difficulty?: SelectI;
    surface?: SelectI;
    tags?: SelectI;
};

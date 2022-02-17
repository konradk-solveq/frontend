import {SelectOptionType} from './map.model';

export type SelectEnumOptionsT = {
    difficulties: SelectOptionType[];
    reactions: SelectOptionType[];
    surfaces: SelectOptionType[];
    tags: SelectOptionType[];
};

export type ControlSumsT = {
    code: string;
    controlSum: string;
};

type UiTranslationType = {
    controlSums: ControlSumsT[];
    codes: string[];
};

export type LangsT = {
    name: string;
    displayName: string;
};

export class AppConfig implements SelectEnumOptionsT {
    constructor(
        public name: string,
        public lang: string,
        public langs: LangsT[],
        public tags: SelectOptionType[],
        public surfaces: SelectOptionType[],
        public difficulties: SelectOptionType[],
        public reactions: SelectOptionType[],
        public uiTranslations: UiTranslationType,
    ) {
        this.name = name;
        this.lang = lang;
        this.langs = langs;
        this.tags = tags;
        this.surfaces = surfaces;
        this.difficulties = difficulties;
        this.reactions = reactions;
        this.uiTranslations = uiTranslations;
    }
}

export interface AppConfigI extends AppConfig {}

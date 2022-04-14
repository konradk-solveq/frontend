import {SelectOptionType} from './map.model';

export type SelectEnumOptionsType = {
    difficulties: SelectOptionType[];
    reactions: SelectOptionType[];
    surfaces: SelectOptionType[];
    tags: SelectOptionType[];
};

export type ControlSumsType = {
    code: string;
    controlSum: string;
};

type UiTranslationType = {
    controlSums: ControlSumsType[];
    codes: string[];
};

export type LangsType = {
    name: string;
    displayName: string;
};

export type AdsType = {
    url: string;
};

export class AppConfig implements SelectEnumOptionsType {
    constructor(
        public name: string,
        public lang: string,
        public langs: LangsType[],
        public tags: SelectOptionType[],
        public surfaces: SelectOptionType[],
        public difficulties: SelectOptionType[],
        public reactions: SelectOptionType[],
        public uiTranslations: UiTranslationType,
        public ads: AdsType,
    ) {
        this.name = name;
        this.lang = lang;
        this.langs = langs;
        this.tags = tags;
        this.surfaces = surfaces;
        this.difficulties = difficulties;
        this.reactions = reactions;
        this.uiTranslations = uiTranslations;
        this.ads = ads;
    }
}

export interface AppConfigI extends AppConfig {}

import {SelectOptionType, UiTranslationType} from './map.model';

export type SelectEnumOptionsT = {
    difficulties: SelectOptionType[];
    reactions: SelectOptionType[];
    surfaces: SelectOptionType[];
    tags: SelectOptionType[];
};

export class AppConfig implements SelectEnumOptionsT {
    constructor(
        public name: string,
        public lang: string,
        public langs: {
            name: string;
            displayName: string;
        },
        public tags: SelectOptionType[],
        public surfaces: SelectOptionType[],
        public difficulties: SelectOptionType[],
        public reactions: SelectOptionType[],
        public uiTranslation: UiTranslationType,
    ) {
        this.name = name;
        this.lang = lang;
        this.langs = langs;
        this.tags = tags;
        this.surfaces = surfaces;
        this.difficulties = difficulties;
        this.reactions = reactions;
        this.uiTranslation = uiTranslation;
    }
}

export interface AppConfigI extends AppConfig {}

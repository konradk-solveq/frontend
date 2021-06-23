import {SelectOptionType} from './map.model';

export class AppConfig {
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
    ) {
        this.name = name;
        this.lang = lang;
        this.langs = langs;
        this.tags = tags;
        this.surfaces = surfaces;
        this.difficulties = difficulties;
    }
}

export interface AppConfigI extends AppConfig {}

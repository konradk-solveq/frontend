export type languageT = {
    code: string;
    name: string;
    icon: string;
};

export type languagesListT = languageT[];

export type translationsResponseT = {
    code: string;
    version: string;
    translation: {};
    controlSum: string;
};

export type translationsT = {
    [key: string]: {
        translation: {};
        version: string;
        controlSum: string;
    };
};

export type controlSumT = {
    controlSum: string;
};

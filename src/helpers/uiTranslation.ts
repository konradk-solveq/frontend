import {
    translationsResponseT,
    translationsT,
} from '@models/uiTranslation.models';

export const convertTranslations = (
    code: string,
    data: translationsResponseT,
    oldTranslations: translationsT,
) => {
    const newTranslations: any = {};
    if (code) {
        newTranslations[code] = {
            translation: data?.translation,
            version: data?.version,
            controlSum: data?.controlSum,
        };
    }

    for (const key in newTranslations) {
        oldTranslations[key] = newTranslations[key];
    }

    return oldTranslations;
};

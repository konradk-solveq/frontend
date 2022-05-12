import {
    translationsResponseT,
    translationsT,
} from '@models/uiTranslation.models';

export const convertTranslations = (
    code: string,
    data: translationsResponseT,
    oldTranslations: translationsT,
) => {
    const newTranslations: translationsT = {};
    if (code) {
        newTranslations[code] = {
            translation: data?.translation,
            version: data?.version,
            controlSum: data?.controlSum,
        };

        return newTranslations;
    }

    return oldTranslations;
};

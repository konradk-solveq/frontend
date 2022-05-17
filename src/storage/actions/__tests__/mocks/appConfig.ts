import {AppConfigI} from '@models/config.model';

export const appTranslationsConfig: Pick<AppConfigI, 'uiTranslations'> = {
    uiTranslations: {
        controlSums: [
            {
                code: 'pl',
                controlSum: 'e2ceceb4ee2f2df31c63344d892e688b',
            },
            {
                code: 'en',
                controlSum: 'old-control-sum',
            },
            {
                code: 'cs',
                controlSum: '1daede2bedd0c43823d6b7e0f94778c6',
            },
            {
                code: 'sk',
                controlSum: 'b67fe9ff510032df26f82d702adda527',
            },
            {
                code: 'ro',
                controlSum: '8fde1641780d3ecc47df49159dd84e79',
            },
        ],
        codes: ['pl', 'en', 'cs', 'sk', 'ro'],
    },
};

export const emptyAppTranslationsConfig: Pick<AppConfigI, 'uiTranslations'> = {
    uiTranslations: {
        controlSums: [],
        codes: [],
    },
};

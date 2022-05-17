import {AppConfigI} from '@models/config.model';
import {apiCallMock} from '@src/utils/testUtils/apiCalls';
import {
    checkIfControlSumChanged,
    checkIfNewTranslationExists,
    checkIfTranslationExists,
} from '@storage/actions/utils/app';

const appConfig: Pick<AppConfigI, 'uiTranslations'> = {
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

const LANGUAGE_EXISTS = appConfig.uiTranslations.codes[1];
const LANGUAGE_NOT_EXISTS = 'ch';
const CONTROL_SUM_FOR_EN_LANGUAGE =
    appConfig.uiTranslations.controlSums[1].controlSum;
const NEW_CONTROL_SUM_FOR_EN_LANGUAGE = 'new-control-sum';

const API_RESPONSE_WITH_SAME_CONTROL_SUM = {
    data: {controlSum: CONTROL_SUM_FOR_EN_LANGUAGE},
    status: 200,
};

const API_RESPONSE_WITH_NEW_SUM_CONTROL = {
    data: {controlSum: 'new-control-sum-from-api'},
    status: 200,
};

const WRONG_API_RESPONSE = {
    data: null,
    status: 404,
};

describe('[app -- storage/actions/utils]', () => {
    describe('[checkIfTranslationExists()]', () => {
        it('Should return "true" when translation exists', () => {
            const translationExists = checkIfTranslationExists(
                appConfig,
                LANGUAGE_EXISTS,
            );

            expect(translationExists).toBeTruthy();
        });

        it('Should return "false" when translation not exists', () => {
            const translationExists = checkIfTranslationExists(
                appConfig,
                LANGUAGE_NOT_EXISTS,
            );

            expect(translationExists).toBeFalsy();
        });
    });

    describe('[checkIfControlSumChanged()]', () => {
        it.each`
            language               | newControlSum                      | expected
            ${LANGUAGE_EXISTS}     | ${NEW_CONTROL_SUM_FOR_EN_LANGUAGE} | ${true}
            ${LANGUAGE_EXISTS}     | ${CONTROL_SUM_FOR_EN_LANGUAGE}     | ${false}
            ${LANGUAGE_EXISTS}     | ${undefined}                       | ${true}
            ${LANGUAGE_NOT_EXISTS} | ${NEW_CONTROL_SUM_FOR_EN_LANGUAGE} | ${true}
            ${LANGUAGE_NOT_EXISTS} | ${NEW_CONTROL_SUM_FOR_EN_LANGUAGE} | ${true}
            ${LANGUAGE_NOT_EXISTS} | ${undefined}                       | ${true}
        `(
            'When language: "$language" and controlSum: "$newControlSum" should return info that control sum shouldChange: "$expected"',
            async ({language, expected, newControlSum}) => {
                const controlSumChanged = checkIfControlSumChanged(
                    appConfig.uiTranslations.controlSums,
                    language,
                    newControlSum,
                );

                expect(controlSumChanged).toEqual(expected);
            },
        );
    });

    describe('[checkIfNewTranslationExists()]', () => {
        it('When controlSum from API is the same and currentSum exists should return state: "no-update" ', async () => {
            await apiCallMock(API_RESPONSE_WITH_SAME_CONTROL_SUM, 'get');

            const translationExists = await checkIfNewTranslationExists(
                appConfig,
                LANGUAGE_EXISTS,
            );
            const status = translationExists.status;

            expect(status).toEqual('no-update');
        });

        it('When controlSum from API is the same and currentSum doesn\'t exists should return state: "missing" ', async () => {
            await apiCallMock(API_RESPONSE_WITH_SAME_CONTROL_SUM, 'get');

            const translationExists = await checkIfNewTranslationExists(
                appConfig,
                LANGUAGE_NOT_EXISTS,
            );
            const status = translationExists.status;

            expect(status).toEqual('missing');
        });

        it('When controlSum from API is different and currentSum exists should return state: "update" ', async () => {
            await apiCallMock(API_RESPONSE_WITH_NEW_SUM_CONTROL, 'get');

            const translationExists = await checkIfNewTranslationExists(
                appConfig,
                LANGUAGE_EXISTS,
            );
            const status = translationExists.status;

            expect(status).toEqual('update');
        });

        it('When controlSum from API is different and currentSum doesn\'t exists should return state: "missing" ', async () => {
            await apiCallMock(API_RESPONSE_WITH_NEW_SUM_CONTROL, 'get');

            const translationExists = await checkIfNewTranslationExists(
                appConfig,
                LANGUAGE_NOT_EXISTS,
            );
            const status = translationExists.status;

            expect(status).toEqual('missing');
        });

        it('When API returns error and currentSum exists should return state: "error" ', async () => {
            /**
             * Supress console.error
             */
            jest.spyOn(console, 'error').mockImplementation();

            await apiCallMock(WRONG_API_RESPONSE, 'get');

            const translationExists = await checkIfNewTranslationExists(
                appConfig,
                LANGUAGE_EXISTS,
            );
            const status = translationExists.status;

            expect(status).toEqual('error');
        });

        it('When API returns error and currentSum doesn\'t exists should return state: "missing" ', async () => {
            /**
             * Supress console.error
             */
            jest.spyOn(console, 'error').mockImplementation();

            await apiCallMock(WRONG_API_RESPONSE, 'get');

            const translationExists = await checkIfNewTranslationExists(
                appConfig,
                LANGUAGE_NOT_EXISTS,
            );
            const status = translationExists.status;

            expect(status).toEqual('missing');
        });

        afterAll(() => {
            jest.restoreAllMocks();
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});

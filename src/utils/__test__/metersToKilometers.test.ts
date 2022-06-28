import {
    putSeparatorIntoNum,
    transformMetersToKilometersString,
} from '@utils/metersToKilometers';

import * as mockedData from './mocks/metersToKilometers';

describe('Return meters number converted to kilometes -- utils', () => {
    describe('[putSeparatorIntoNum] - add separator between every nth number', () => {
        it.each([
            [
                mockedData.number1,
                mockedData.separatorsData,
                mockedData.countersData,
                mockedData.number1Results,
            ],
            [
                mockedData.number2,
                mockedData.separatorsData,
                mockedData.countersData,
                mockedData.number2Results,
            ],
            [
                mockedData.number3,
                mockedData.separatorsData,
                mockedData.countersData,
                mockedData.number3Results,
            ],
            [
                mockedData.number4,
                mockedData.separatorsData,
                mockedData.countersData,
                mockedData.number4Results,
            ],
            [
                mockedData.number5,
                mockedData.separatorsData,
                mockedData.countersData,
                mockedData.number5Results,
            ],
            [
                mockedData.number6,
                mockedData.separatorsData,
                mockedData.countersData,
                mockedData.number6Results,
            ],
            [
                mockedData.number7,
                mockedData.separatorsData,
                mockedData.countersData,
                mockedData.number7Results,
            ],
        ])(
            'Number %s should be converted to one of numberResults',
            async (
                value: number,
                separators: string[],
                counters: number[],
                results: string[],
            ) => {
                counters.forEach(c => {
                    separators.forEach(s => {
                        const tNumber = putSeparatorIntoNum(value, s, c, true);

                        expect(results).toContain(tNumber);
                    });
                });
            },
        );
    });

    describe('[transformMetersToKilometersString] - convert meters to kilometers string in given format', () => {
        it.each([
            [mockedData.meters1, mockedData.meters1Result],
            [mockedData.meters2, mockedData.meters2Result],
            [mockedData.meters3, mockedData.meters3Result],
            [mockedData.meters4, mockedData.meters4Result],
            [mockedData.meters5, mockedData.meters5Result],
        ])(
            'Meters %s should be converted to value in kilometers',
            async (value: number, result: string) => {
                const tNumber = transformMetersToKilometersString(value);

                expect(tNumber).toEqual(result);
            },
        );

        it('Return "-" character when no value', () => {
            //@ts-ignore
            const tNumber = transformMetersToKilometersString(null);

            expect(tNumber).toEqual('-');
        });

        it('Return "-" character when no value is undefined', () => {
            //@ts-ignore
            const tNumber = transformMetersToKilometersString(undefined);

            expect(tNumber).toEqual('-');
        });

        it('Return empty string when allowed and no value', () => {
            //@ts-ignore
            const tNumber = transformMetersToKilometersString(null, 0, true);

            expect(tNumber).toEqual('');
        });

        it('Should return string with passed "separator"', () => {
            const tNumber = transformMetersToKilometersString(
                mockedData.meters1,
                undefined,
                undefined,
                '--',
            );

            expect(tNumber).toContain('--');
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});

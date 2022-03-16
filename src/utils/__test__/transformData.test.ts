import {getRouteLengthFuelEquivalent} from '@utils/transformData';

describe('transformData -- utils', () => {
    describe('[getRouteLengthFuelEquivalent]', () => {
        it('Should return the proper value', async () => {
            expect(getRouteLengthFuelEquivalent(5, '1,00')).toBe('0,1');
            expect(getRouteLengthFuelEquivalent(5, '100,00')).toBe('5');
            expect(getRouteLengthFuelEquivalent(5, '25,00')).toBe('1,3');
            expect(getRouteLengthFuelEquivalent(23, '1,00')).toBe('0,2');
            expect(getRouteLengthFuelEquivalent(23, '100,00')).toBe('23');
            expect(getRouteLengthFuelEquivalent(23, '25,00')).toBe('5,8');
            expect(getRouteLengthFuelEquivalent(23, undefined)).toBe('0');
            expect(getRouteLengthFuelEquivalent(23, '-5,00')).toBe('0');
        });
    });
});

import {
    getFilterDistance,
    getRouteLengthFuelEquivalent,
} from '@utils/transformData';

describe('transformData -- utils', () => {
    describe('[getFilterDistance]', () => {
        it('should return 0 for a passed value "0"', () => {
            expect(getFilterDistance('0')).toEqual(0);
        });
        it('should return a correct value for a number with . decimal point', () => {
            expect(getFilterDistance('2.718')).toEqual(2718);
        });
        it('should return a correct value for a number with , decimal point', () => {
            expect(getFilterDistance('2,718')).toEqual(2718);
        });
        it('should return undefined for an invalid passed value', () => {
            expect(getFilterDistance('TEST')).toEqual(undefined);
        });
    });
    describe('[getRouteLengthFuelEquivalent]', () => {
        it('Should return the proper value', async () => {
            expect(getRouteLengthFuelEquivalent(5, '1,00')).toBe('0,1');
            expect(getRouteLengthFuelEquivalent(5, '100,00')).toBe('5');
            expect(getRouteLengthFuelEquivalent(5, '25,00')).toBe('1,3');
            expect(getRouteLengthFuelEquivalent(23, '1,00')).toBe('0,2');
            expect(getRouteLengthFuelEquivalent(23, '100,00')).toBe('23');
            expect(getRouteLengthFuelEquivalent(23, '25,00')).toBe('5,8');
            expect(getRouteLengthFuelEquivalent(23, undefined)).toBe('0');
            expect(getRouteLengthFuelEquivalent(23, null)).toBe('0');
            expect(getRouteLengthFuelEquivalent(23, '-5,00')).toBe('0');
            expect(getRouteLengthFuelEquivalent(23, 'test')).toBe('0');
            expect(getRouteLengthFuelEquivalent('test', '100,00')).toBe('0');
            expect(getRouteLengthFuelEquivalent(undefined, '100,00')).toBe('0');
            expect(getRouteLengthFuelEquivalent(null, '100,00')).toBe('0');
        });
    });
});

import {
    getFilterDistance,
    getRouteLengthFuelEquivalent,
    getRouteLengthCarbonEquivalent,
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

    describe('[getRouteLengthCarbonEquivalent]', () => {
        it('Should return the proper value', async () => {
            expect(getRouteLengthCarbonEquivalent(8, 2350, '5')).toBe('940');
            expect(getRouteLengthCarbonEquivalent(8, 2350, '100')).toBe('18800');
            expect(getRouteLengthCarbonEquivalent(8, 2350, '1,5')).toBe('235');
            expect(getRouteLengthCarbonEquivalent(8, 1250, '166,88')).toBe('16750');
            expect(getRouteLengthCarbonEquivalent(8, 1250, '-100')).toBe('0');
            expect(getRouteLengthCarbonEquivalent(12, 2350, '222,2')).toBe('62745');
            expect(getRouteLengthCarbonEquivalent(12, 1250, '0,5')).toBe('125');
            expect(getRouteLengthCarbonEquivalent(12, 2350, null)).toBe('0');
            expect(getRouteLengthCarbonEquivalent(12, null, undefined)).toBe('0');
            expect(getRouteLengthCarbonEquivalent(undefined, 1500, '10,5')).toBe('0');
        });
    });
});

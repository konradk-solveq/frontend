import {getFilterDistance} from '../transformData';

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
});

import {
    getWarrantyStatusInfo,
    getWarrantyStatusInfoText,
    getWarrantyTypeText,
    shouldShowWarrantyStatusInfo,
} from '@pages/main/bike/utils/warranty';

describe('warranty - pages/main/bikeutils', () => {
    describe('getWarrantyStatusInfo()', () => {
        it('should return warranty status info', () => {
            const result = getWarrantyStatusInfo(true);

            expect(result).toMatchSnapshot();
        });

        it('should return contact info', () => {
            const result = getWarrantyStatusInfo(false);

            expect(result).toMatchSnapshot();
        });

        afterEach(() => {
            jest.restoreAllMocks();
            jest.clearAllMocks();
        });
    });

    describe('shouldShowWarrantyStatusInfo()', () => {
        it('should return true when warranty type is "extended"', () => {
            const result = shouldShowWarrantyStatusInfo('extended');

            expect(result).toBe(true);
        });

        it('should return true when warranty type is "extended" and "daysToEnd" is smaller than "0"', () => {
            const result = shouldShowWarrantyStatusInfo('extended');

            expect(result).toBe(true);
        });

        it('should return true when warranty type is "no-info"', () => {
            const result = shouldShowWarrantyStatusInfo('no-info');

            expect(result).toBe(true);
        });

        it('should return true when warranty type is "no-info" and "daysToEnd" is smaller than "0"', () => {
            const result = shouldShowWarrantyStatusInfo('no-info');

            expect(result).toBe(true);
        });

        it('should return true when warranty daysToEnd is bigger than "0"', () => {
            const result = shouldShowWarrantyStatusInfo('basic', 2);

            expect(result).toBe(true);
        });

        it('should return false when warranty daysToEnd is lower than "0"', () => {
            const result = shouldShowWarrantyStatusInfo('basic', -2);

            expect(result).toBe(false);
        });

        it('should return false when warranty daysToEnd is equal to "0"', () => {
            const result = shouldShowWarrantyStatusInfo('basic', 0);

            expect(result).toBe(false);
        });

        afterEach(() => {
            jest.restoreAllMocks();
            jest.clearAllMocks();
        });
    });

    describe('getWarrantyTypeText()', () => {
        it('should return "no info" warranty type text when "caontainsInfo" is equal to "false"', () => {
            const result = getWarrantyTypeText(true, 'warranty info', false);

            expect(result).toMatchSnapshot();
        });

        it('should return warranty type text when "caontainsInfo" is equal to "true"', () => {
            const result = getWarrantyTypeText(true, 'warranty info', true);

            expect(result).toMatchSnapshot();
        });

        it('should return "expired" warranty type text when "caontainsInfo" is equal to "true" and "withInfo" is equal to "false"', () => {
            const result = getWarrantyTypeText(false, 'warranty info', true);

            expect(result).toMatchSnapshot();
        });

        afterEach(() => {
            jest.restoreAllMocks();
            jest.clearAllMocks();
        });
    });

    describe('getWarrantyStatusInfoText()', () => {
        it('should return contact info text when "type" is euqal to "no-info"', () => {
            const result = getWarrantyStatusInfoText('no-info');

            expect(result).toMatchSnapshot();
        });

        it('should return "lietime" status info text when "type" is euqal to "extended"', () => {
            const result = getWarrantyStatusInfoText('extended');

            expect(result).toMatchSnapshot();
        });

        it('should return "daysToEnd" status info text when "type" is euqal to "basic"', () => {
            const result = getWarrantyStatusInfoText('basic', 2);

            expect(result).toMatchSnapshot();
        });

        afterEach(() => {
            jest.restoreAllMocks();
            jest.clearAllMocks();
        });
    });
});

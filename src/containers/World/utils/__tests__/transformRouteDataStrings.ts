import {getDifficultyString} from '@containers/World/utils/transformRouteDataStrings';

import appConfig from '@api/mocks/configData';
import {firstLetterToUpperCase} from '@utils/strings';

const difficulties = [
    appConfig.difficulties[0].enumValue,
    appConfig.difficulties[1].enumValue,
];
const defaultPlaceholder = '-';

describe('getDifficultyString() - containers/World/utils/transformRouteDataStrings', () => {
    it('Should return default placeholder ("-") for an empty data', () => {
        const result = getDifficultyString();
        expect(result).toEqual(defaultPlaceholder);
    });

    it('Should return placeholder ("-empty-") for an empty data', () => {
        const result = getDifficultyString(undefined, undefined, '-empty-');
        expect(result).toEqual('-empty-');
    });

    it('Should return difficulties as string', () => {
        const result = getDifficultyString(difficulties);
        expect(result).toEqual(firstLetterToUpperCase(difficulties[0]));
    });

    it('Should return difficulties as string with suffix', () => {
        const result = getDifficultyString(difficulties, 'Other');
        expect(result).toEqual(
            `${firstLetterToUpperCase(difficulties[0])} - Other`,
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});

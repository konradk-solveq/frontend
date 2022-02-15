import {getScreenNameToNavigate} from '../navigation';

describe('[navigation -- navigation/utils', () => {
    it('Should return undefined when shareType not exists', () => {
        const result = getScreenNameToNavigate();

        expect(result).toBeUndefined();
    });

    it('Should return undefined when shareType is "uknown"', () => {
        const result = getScreenNameToNavigate('uknown');

        expect(result).toBeUndefined();
    });

    it('Should return screen name when shareType match', () => {
        const result = getScreenNameToNavigate('cyclingMap');

        expect(result).not.toBeUndefined();
    });
});

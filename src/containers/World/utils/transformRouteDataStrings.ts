import {firstLetterToUpperCase} from '@utils/strings';

/**
 * Returns first element from difficulties array.
 * When suffix is defined it is added when array
 * has more than 1 element
 *
 * @param difficulties
 * @param suffix
 * @param placeholder
 * @returns {String} ${DifficultyLevel}{?suffix}
 */
export const getDifficultyString = (
    difficulties?: string[],
    suffix = '',
    placeholder = '-',
) => {
    if (!difficulties?.length) {
        return placeholder;
    }

    const stringSuffix =
        difficulties?.length > 1 && suffix ? ` - ${suffix}` : '';
    const firstEl = firstLetterToUpperCase(difficulties[0]);

    return `${firstEl}${stringSuffix}`;
};

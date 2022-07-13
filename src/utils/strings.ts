export const firstLetterToUpperCase = (str: string) => {
    if (!str) {
        return '';
    }

    return str.replace(/^./, str[0].toUpperCase());
};

/**
 * TypeScript doesn't recognize that after filtering all the falsy values
 * we're left with strings only, so we can use a type assertion,
 * or define the separate filtering function
 */
export const isTruthyString = (
    val: string | undefined | null,
): val is string => {
    return !!val;
};

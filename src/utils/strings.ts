export const firstLetterToUpperCase = (str: string) => {
    if (!str) {
        return '';
    }

    return str.replace(/^./, str[0].toUpperCase());
};

export const getKilometersFromMeteres = (meters: number) => {
    return meters / 1000;
};

export const putSeparatorIntoNum = (
    number: number | string,
    separator: string,
    counter: number,
    convertToString?: boolean,
) => {
    try {
        if (number.toString().length < counter) {
            return convertToString ? number.toString() : number;
        }
        const regex = `\\B(?=(\\d{${counter}})+(?!\\d))`;

        const reg = new RegExp(regex, 'g');
        const result = number.toString().replace(reg, separator);

        return convertToString ? result?.toString() : result;
    } catch (error) {
        return convertToString ? number.toString() : number;
    }
};

export const transformMetersToKilometersString = (
    meters: number | undefined,
    fixedNumber?: number,
    emptyFalse?: boolean,
): string => {
    if (meters === undefined || meters === null || isNaN(meters)) {
        if (emptyFalse) {
            return '';
        }
        return '-';
    }

    const km = getKilometersFromMeteres(meters).toFixed(fixedNumber || 2);
    const kmDot = km.lastIndexOf('.');
    const kmSuffix = km.substr(kmDot, km.length).replace('.', ',');
    const kmPrefix = km.substr(0, kmDot);

    const transformedKm = putSeparatorIntoNum(kmPrefix, ' ', 3, true);
    const kilometers = `${transformedKm}${kmSuffix}`;

    return kilometers;
};

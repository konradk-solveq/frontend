export const getKilometersFromMeteres = (meters: number) => {
    return meters / 1000;
};

export const putSeparatorIntoNum = (
    number: number | string,
    separator: string,
    counter: number,
) => {
    if (number.toString().length < counter) {
        return number;
    }
    const reg = new RegExp(`.{${counter}}`, 'g');
    return number.toString().match(reg)?.join(separator);
};

export const transformMetersToKilometersString = (
    meters: number | undefined,
    fixedNumber?: number,
): string => {
    if (!meters) {
        return '-';
    }

    const km = getKilometersFromMeteres(meters).toFixed(fixedNumber || 2);
    const kmDot = km.lastIndexOf('.');
    const kmSuffix = km.substr(kmDot, km.length).replace('.', ',');
    const kmPrefix = km.substr(0, kmDot);

    const transformedKm = putSeparatorIntoNum(kmPrefix, ' ', 3);
    const kilometers = `${transformedKm}${kmSuffix}`;

    return kilometers;
};

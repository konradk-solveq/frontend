export const getKilometersFromMeteres = (meters: number) => {
    return meters / 1000;
};

export const putSeparatorIntoNum = (
    number: number | string,
    separator: string,
    counter: number,
) => {
    try {
        if (number.toString().length < counter) {
            return number;
        }
        const regex = `\\B(?=(\\d{${counter}})+(?!\\d))`;
    
        const reg = new RegExp(regex, 'g');
        const regs = number.toString().replace(reg, separator);
    
        return regs;
        
    } catch (error) {
        return number?.toString()
    }
};

export const transformMetersToKilometersString = (
    meters: number | undefined,
    fixedNumber?: number,
    emptyFalse?: boolean,
): string => {
    if (!meters) {
        if (emptyFalse) {
            return '';
        }
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

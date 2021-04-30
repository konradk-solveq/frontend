import {countDaysToEnd} from './warranty';

export const getCountedDaysText = (
    date: Date,
    prefix: string,
    sufix: string,
    defaultStr: string,
) => {
    const countedDays = countDaysToEnd(date);
    if (countedDays < 0) {
        return defaultStr;
    }
    return `${prefix} ${countedDays} ${sufix}`;
};

export const getDateString = (date: Date, separator?: string) => {
    const sep = separator || '.';
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const dm = month < 10 ? `0${month}` : month;
    const day = date.getDate();
    const dd = day < 10 ? `0${day}` : day;

    return `${dd}${sep}${dm}${sep}${year}`;
};

export const getTimeString = (date: Date) => {
    return date.toLocaleTimeString();
};

export const convertToDateWithTime = (date: string | undefined) => {
    if (!date) {
        return '';
    }
    const dat = new Date(date);
    const d = getDateString(dat);
    const t = getTimeString(dat);

    return `${d}, ${t}`;
};

export const compareDates = (date1: Date, date2: Date | undefined) => {
    if (!date2) {
        return true;
    }

    const d1 = getDateString(new Date(date1));
    const d2 = getDateString(new Date(date2));
    if (d1 !== d2) {
        return true;
    }

    return false;
};

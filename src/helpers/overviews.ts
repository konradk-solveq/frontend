export const getDate = (d: string) => {
    return new Date(d);
};

export const getDay = (d: string) => {
    const date = getDate(d);
    const day = date.getDate();
    const month = date.getMonth() + 1;

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    return '' + formattedDay + '.' + formattedMonth;
};

export const getYear = (d: string) => {
    let date = getDate(d);
    return '' + date.getFullYear();
};

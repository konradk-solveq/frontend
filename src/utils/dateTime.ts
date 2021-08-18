export const twoDigits = (num: Number) => (num < 10 ? '0' + num : '' + num);
import {I18n} from '../../I18n/I18n';

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

export const convertToCounterFormat = (time: number) => {
    const date = new Date(time);
    const hours = date.getHours() - 1;
    const dzHours = twoDigits(hours);
    const minutes = date.getMinutes();
    const dzMinutes = twoDigits(minutes);
    const seconds = date.getSeconds();
    const dzSeconds = twoDigits(seconds);

    const hoursWithMinutes = `${dzHours}:${dzMinutes}`;

    return {
        hoursWithMinutes,
        dzSeconds,
    };
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

export const translateDateToTodayAndYesterdayString = (date: Date) => {
    const trans: any = I18n.t('MainWorld.MyRoutes');
    const now = new Date();

    if (date.getDate() === now.getDate()) {
        return trans.todayDate;
    }

    if (date.getDate() === now.getDate() - 1) {
        return trans.yestardayDate;
    }

    return getDateString(date);
};

export const transformTimestampToDate = (tmestamp: number) => {
    if (!tmestamp || !isNaN(tmestamp)) {
        return tmestamp;
    }

    try {
        return new Date(tmestamp);
    } catch (error) {
        return tmestamp;
    }
};

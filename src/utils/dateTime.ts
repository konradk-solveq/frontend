import {CounterTimeT} from '@type/dateTime';
import i18next from '@translations/i18next';

export const twoDigits = (num: Number) => (num < 10 ? '0' + num : '' + num);

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
    return date.toLocaleTimeString([], {
        hourCycle: 'h23',
    });
};

export const convertToDateWithTime = (date: string | Date | undefined) => {
    if (!date) {
        return '';
    }
    const dat = new Date(date);
    const d = getDateString(dat);
    const t = getTimeString(dat);

    return `${d}, ${t}`;
};

/**
 * Converts seconds to display as counter values
 *
 * @param {number} time
 * @param {Date} startTime
 *
 * @returns {CounterTimeT}
 */
export const convertToCounterFormat = (
    time: number,
    pauseTime: number,
    startTime?: Date,
): CounterTimeT => {
    const result = {
        hoursWithMinutes: '00:00',
        dzSeconds: '00',
    };

    if (time < 0 || typeof time !== 'number' || Number.isNaN(time)) {
        return result;
    }

    try {
        /**
         * Current time
         */
        const timeInMilliSeconds = new Date(time - pauseTime).valueOf();

        /**
         * Start time of current recording
         */
        const sTimeInMilliSeconds = startTime
            ? new Date(startTime)?.valueOf()
            : null;

        if (sTimeInMilliSeconds && sTimeInMilliSeconds > timeInMilliSeconds) {
            return result;
        }

        const timeToConvert = sTimeInMilliSeconds
            ? timeInMilliSeconds - sTimeInMilliSeconds
            : 0;

        const date = new Date(timeToConvert);
        const seconds = date.getSeconds();
        result.dzSeconds = twoDigits(seconds % 60);
        const minutes = date.getMinutes();
        const dzMinutes = twoDigits(minutes);
        /**
         * Number of hours from the begining
         */
        const hours =
            timeToConvert > 0 ? Math.floor(timeToConvert / 1000 / 3600) : 0;
        const dzHours = twoDigits(hours);

        result.hoursWithMinutes = `${dzHours}:${dzMinutes}`;

        return result;
    } catch (error) {
        return result;
    }
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
    const trans: any = i18next.t('MainWorld.MyRoutes', {
        returnObjects: true,
    });
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
        return;
    }

    try {
        return new Date(tmestamp);
    } catch (error) {
        return;
    }
};

export const isInPast = (date: Date | string) => {
    return new Date(date).getTime() < Date.now();
};

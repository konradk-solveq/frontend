export const countDaysToEnd = (date: Date) => {
    const now = new Date();
    const d = new Date(date);
    const dayInMilliseconds = 24 * 60 * 60 * 1000;

    if (now.getFullYear() > d.getFullYear()) {
        return 0;
    }

    const diff = Math.abs((now.getTime() - d.getTime()) / dayInMilliseconds);
    return Math.round(diff);
};

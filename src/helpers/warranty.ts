export const countDaysToEnd = (date: Date) => {
    const now = new Date();
    const d = new Date(date);
    const dayInMilliseconds = 24 * 60 * 60 * 1000;

    // if (now.getFullYear() > d.getFullYear()) {
    //     return 0;
    // }

    let diff = (d.getTime() - now.getTime()) / dayInMilliseconds;
    if (diff < 0) {
        diff--;
    }
    return Math.ceil(diff);
};

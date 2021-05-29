export const getUTCTime = (date: Date) => {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
};

export const isTokenExpiredInFuture = (
    expirationDateTime: Date,
    futureTimeInSeconds?: number,
): boolean => {
    const expireTime = new Date(expirationDateTime).getTime();
    const oneDay = 24 * 60 * 60 * 1000;

    const now = new Date();
    const nowUTCTime = getUTCTime(now).getTime();

    const diff = expireTime - nowUTCTime;
    const timeToCompare = futureTimeInSeconds || oneDay;
    return diff <= timeToCompare;
};

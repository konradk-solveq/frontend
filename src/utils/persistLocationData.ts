export const getTimestampToCompare = (
    startDate: Date | undefined,
    lastDate: string,
) => {
    const startedAt = startDate
        ? Date.parse(startDate.toUTCString())
        : Date.parse(new Date().toUTCString());

    const lastTimestamp = lastDate ? Date.parse(lastDate) : startedAt;

    return lastTimestamp;
};

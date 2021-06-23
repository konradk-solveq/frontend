export const getAverageSpeed = (speed: number[]) => {
    if (!speed?.length) {
        return '0,0';
    }
    /* Remove no data */
    const s = speed.filter(sp => sp >= 0);

    if (s.length === 1) {
        const speedToReturn = Math.abs(s[0]).toFixed(1);
        return speedToReturn;
    }

    const speedToReturn = Math.abs(
        s.reduce((a, b) => {
            return a + b;
        }, 0) / s.length,
    ).toFixed(2);

    return speedToReturn;
};

export const msToKH = (speed: number | string | undefined | null) => {
    if (!speed || speed < 0) {
        return null;
    }

    const s = typeof speed === 'string' ? parseFloat(speed) : speed;
    if (isNaN(s)) {
        return null;
    }

    const speedToReturn = Math.abs(s * (3600 / 1000)).toFixed(1);
    return speedToReturn;
};

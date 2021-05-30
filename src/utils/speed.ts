export const getAverageSpeed = (speed: number[]) => {
    if (!speed?.length) {
        return '0,00';
    }
    /* Remove no data */
    const s = speed.filter(sp => sp >= 0);

    if (s.length === 1) {
        return Math.abs(s[0]).toFixed(2);
    }

    return Math.abs(
        s.reduce((a, b) => {
            return a + b;
        }, 0) / s.length,
    ).toFixed(2);
};

export const msToKH = (speed: number | string | undefined | null) => {
    if (!speed || speed < 0) {
        return null;
    }

    const s = typeof speed === 'string' ? parseFloat(speed) : speed;
    if (isNaN(s)) {
        return null;
    }

    return Math.abs(s * (3600 / 1000)).toFixed(2);
};

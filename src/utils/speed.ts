export const getAverageSpeed = (speed: number[]) => {
    if (!speed?.length) {
        return 0;
    }

    if (speed.length === 1) {
        return speed[0].toFixed(2);
    }

    return (
        speed.reduce((a, b) => {
            return a + b;
        }, 0) / speed.length
    ).toFixed(2);
};

export const msToKH = (speed: number | string | undefined) => {
    if (!speed) {
        return null;
    }

    const s = typeof speed === 'string' ? parseFloat(speed) : speed;
    if (isNaN(s)) {
        return 0;
    }

    return (s * (3600 / 1000)).toFixed(2);
};

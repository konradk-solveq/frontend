export const jsonParse = (value: any, fallback?: any) => {
    if (!value) {
        return value;
    }

    try {
        return JSON.parse(value);
    } catch (error) {
        console.warn('[jsonParse]', error);
        return fallback || undefined;
    }
};

export const jsonStringify = (value: any, fallback?: any) => {
    if (!value) {
        return value;
    }

    try {
        return JSON.stringify(value);
    } catch (error) {
        console.warn('[jsonStringify]', error);
        return fallback || undefined;
    }
};

export const debounce: Function = (func: Function, wait = 300) => {
    let timeout: NodeJS.Timeout;

    return function executedFunction(...args: unknown[]) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

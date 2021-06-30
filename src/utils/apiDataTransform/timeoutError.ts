class TimeoutError extends Error {
    constructor(message: any) {
        super(message);

        /* Maintains proper stack trace for where our error was thrown (only available on V8) - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error */
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, TimeoutError);
        }

        this.name = 'TimeoutError';
        this.date = new Date();
    }
}

export default TimeoutError;

export const convertToTimeoutError = (error: any) => {
    if (error instanceof Error && error?.['message']?.includes('timeout')) {
        return new TimeoutError(error?.['message']);
    }

    return error;
};

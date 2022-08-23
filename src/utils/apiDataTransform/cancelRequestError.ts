class CancelRequestError extends Error {
    constructor(message: any) {
        super(message);

        /* Maintains proper stack trace for where our error was thrown (only available on V8) - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error */
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CancelRequestError);
        }

        this.name = 'CancelRequestError';
        this.date = new Date();
    }
}

export default CancelRequestError;

export const convertToCancelRequestError = (error: any) => {
    if (error instanceof Error && error?.['message']?.includes('canceled')) {
        return new CancelRequestError(error?.['message']);
    }

    return error;
};

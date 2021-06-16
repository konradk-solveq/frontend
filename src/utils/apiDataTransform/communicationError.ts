class ApiError extends Error {
    constructor(message: any) {
        super(message);

        /* Maintains proper stack trace for where our error was thrown (only available on V8) - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error */
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError);
        }

        this.name = 'ApiError';
        this.date = new Date();
    }
}

export default ApiError;

export const convertToApiError = (error: any) => {
    if (error instanceof Error) {
        return error;
    }

    return new ApiError(error);
};

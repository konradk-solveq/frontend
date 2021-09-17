import * as Sentry from '@sentry/react-native';
import {convertToApiError} from '@src/utils/apiDataTransform/communicationError';

export type SentryLogLevelT = Sentry.Severity;
type ContextT = {[key: string]: any} | null;
export type SentryContextT = {name: string; context: ContextT};

export const sentryMessager = (message: string, level?: SentryLogLevelT) => {
    Sentry.captureMessage(message, level);
};

export const sentryLogger = (err: any) => {
    Sentry.captureException(err);
};

export const sentrySetUserInfo = (user: Sentry.User | null) => {
    Sentry.setUser(user);
};

export const setntryContext = (name: string, context: ContextT) => {
    Sentry.setContext(name, context);
};

export const loggErrorMessage = (
    error: any,
    logName?: string,
    level?: SentryLogLevelT,
) => {
    const defaultLevel = level || Sentry.Severity.Log;
    const logMessage = logName ? `[${logName}] - ${error}` : `${error}`;

    console.error(logMessage);
    sentryMessager(logMessage, defaultLevel);
};

const getErrorObject = (error: any) => {
    try {
        return new Error(error);
    } catch (e) {
        return error;
    }
};

export const loggError = (
    error: any,
    logName?: string,
    convertErr?: boolean,
) => {
    const err = convertErr ? getErrorObject(error) : error;

    loggErrorMessage(error, logName, Sentry.Severity.Log);
    sentryLogger(err);
};

export const loggErrorWithScope = (
    error: any,
    logName?: string,
    context?: SentryContextT,
    logLevel?: SentryLogLevelT,
    convertErr?: boolean,
) => {
    const err = convertErr ? getErrorObject(error) : error;

    Sentry.withScope(function (scope) {
        scope.setTag('method', `[${logName}]`);
        scope.setLevel(logLevel || Sentry.Severity.Error);

        if (context) {
            scope.setContext(context.name, context.context);
        }

        sentryLogger(err);
    });
};

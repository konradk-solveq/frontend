import * as Sentry from '@sentry/react-native';
import {ENVIRONMENT_TYPE, SENTRY_DSN} from '@env';
import {LogLevel} from '@sentry/types';

const envType = ENVIRONMENT_TYPE;
const debugMode = envType !== 'production' ? true : false;

const withDebugLogs = __DEV__ ? LogLevel.None : LogLevel.Debug;

const logLvl = envType === 'production' ? LogLevel.Error : withDebugLogs;

export const initSentry = () => {
    Sentry.init({
        dsn: SENTRY_DSN,
        environment: envType,
        debug: debugMode,
        logLevel: logLvl,
    });
};

export const sentryAutoMonitoring = (component: React.ComponentType) => {
    return Sentry.wrap(component);
};

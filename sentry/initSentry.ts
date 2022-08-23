import * as Sentry from '@sentry/react-native';
import {ENVIRONMENT_TYPE, SENTRY_DSN} from '@env';

const envType = ENVIRONMENT_TYPE;
const debugMode = envType !== 'production' ? true : false;

export const initSentry = () => {
    Sentry.init({
        dsn: SENTRY_DSN,
        environment: envType,
        debug: debugMode,
    });
};

export const sentryAutoMonitoring = (component: React.ComponentType) => {
    return Sentry.wrap(component);
};

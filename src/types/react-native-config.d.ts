declare module 'react-native-config' {
    export const API_URL: string;
    export const TESTING_MODE: 'true' | 'false';
    export const FLIPPER_REDUX_DEBUGGER: 'true' | 'false';
    export const SENTRY_DSN: string;
    export const ENVIRONMENT_TYPE:
        | 'production'
        | 'development'
        | 'test'
        | 'feature';
    export const ROUTE_DEBUG_MODE: 'true' | 'false';
}

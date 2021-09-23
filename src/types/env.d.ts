declare module '@env' {
    export const API_URL: string;
    export const TESTING_MODE: boolean;
    export const FLIPPER_REDUX_DEBUGGER: boolean;
    export const SENTRY_DSN: string;
    export const ENVIRONMENT_TYPE: 'production' | 'development' | 'test';
}

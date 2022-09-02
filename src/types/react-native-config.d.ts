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
    export const DEEPLINKING_NAMESPACE:
        | 'mykross'
        | 'mykrossdev'
        | 'mykrosstest'
        | 'mykrossfeature';
    export const DEEPLINKING_HOST: string;
    export const DEEPLINKING_PREFIX: string;
    export const LOAD_STORYBOOK: 'true' | 'false';
    export const GOOGLE_MAP_ID: string;
    export const NPM_CONFIG_TOKEN_SOLVEQ: string;
}

import {
    ProviderChangeEvent,
    AuthorizationStatus,
} from 'react-native-background-geolocation-android';

export enum locationTypeEnum {
    NONE = 'NONE',
    ALWAYS = 'ALWAYS',
    WHEN_IN_USE = 'WHEN_IN_USE',
}

export type LocationType = locationTypeEnum;

export type AuthorizationStatusT = AuthorizationStatus;
export enum AuthorizationStatusEnum {
    AUTHORIZATION_STATUS_NOT_DETERMINED = 0,
    AUTHORIZATION_STATUS_RESTRICTED = 1,
    AUTHORIZATION_STATUS_DENIED = 2,
    AUTHORIZATION_STATUS_ALWAYS = 3,
    AUTHORIZATION_STATUS_WHEN_IN_USE = 4,
}

export interface ProviderChangeEventI extends ProviderChangeEvent {}

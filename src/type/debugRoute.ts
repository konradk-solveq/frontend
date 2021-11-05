import {LocationProviderInfo, PowerState} from '@interfaces/deviceInfo';
import {InternetConnectionInfoType} from '@interfaces/internetConnection';

export type GeneralDeviceT = {
    airplaneMode: boolean;
    appUsedMemory: number;
    baseOS: string;
    deviceMemory: number;
    freeDiskStorage: number;
    locationProviders: LocationProviderInfo;
    powerState: Partial<PowerState>;
    connectionState?: ConnectionStateT;
};

export type ConnectionStateT = {
    isOffline: boolean;
    internetConnectionInfo: InternetConnectionInfoType;
};

export type RouteAdditionalInfoT = {
    distance?: number;
    routesDataLength?: number;
    synchedDataLength?: number;
    synchErrorMessage?: string;
};

export type RouteActionT =
    | 'start'
    | 'rerun'
    | 'stop'
    | 'pause'
    | 'resume'
    | 'persist'
    | 'synch'
    | 'cancel';

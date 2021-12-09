import {
    GeofenceEvent as GE,
    Location as OL,
    Coords,
    MotionActivityEvent,
    ProviderChangeEvent,
} from 'react-native-background-geolocation-android';

export interface LocationDataI {
    uuid: string;
    timestamp: string;
    coords: {
        latitude: number;
        longitude: number;
        altitude: number | undefined;
        speed: number | undefined;
        accuracy: number;
    };
    provider: ProviderChangeEvent | undefined;
    odometer: number;
    is_moving: boolean;
    activity: MotionActivityEvent;
}

export interface ApiPathI {
    lat: number;
    lon: number;
    altitude: number | undefined;
    speed: number | undefined;
    time: string;
    displayDistance?: number;
}

export interface GeofenceEvent extends GE {}

export interface Location extends OL {}

export interface LocationCoords extends Coords {}

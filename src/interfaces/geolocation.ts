import {
    GeofenceEvent as GE,
    Location as OL,
} from 'react-native-background-geolocation-android';

export interface LocationDataI {
    uuid: string;
    timestamp: string;
    coords: {
        latitude: number;
        longitude: number;
        altitude: number | undefined;
        speed: number | undefined;
    };
    odometer: number;
}

export interface ApiPathI {
    lat: number;
    lon: number;
    altitude: number | undefined;
    speed: number | undefined;
    time: string;
}

export interface GeofenceEvent extends GE {}

export interface Location extends OL {}

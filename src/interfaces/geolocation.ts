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

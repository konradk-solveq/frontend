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

import {ApiPathI, LocationDataI} from '../../interfaces/geolocation';
import {Point} from '../../models/places.model';

export const tranformParamsToBBoxRequest = (data: Point[]): string => {
    const first = `bbox=${data[0].lat}&bbox=${data[0].lng}`;
    const second = `bbox=${data[1].lat}&bbox=${data[1].lng}`;

    return `${first}&${second}`;
};

export const routesDataToAPIRequest = (path: LocationDataI[]): ApiPathI[] => {
    const apiPathArr: ApiPathI[] = [];
    path.forEach(p => {
        const np: ApiPathI = {
            lat: p.coords.latitude,
            lon: p.coords.longitude,
            altitude: p.coords.altitude,
            speed: p.coords.speed,
            time: p.timestamp,
        };
        apiPathArr.push(np);
    });

    return apiPathArr;
};

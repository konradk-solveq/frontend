import {ApiPathI, LocationDataI} from '../../interfaces/geolocation';
import {Point} from '../../models/places.model';
import {MapMetadataType} from '../../interfaces/api';
import {ImageType, MapFormDataResult} from '../../interfaces/form';
import {I18n} from '../../../I18n/I18n';
import {getDateString} from '../dateTime';

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

export const getRouteDefaultName = () => {
    const trans: any = I18n.t('dataAction.routeData');
    const date = getDateString(new Date(), '/');
    const defaultName = `${trans.defaultRouteName} ${date}`;

    return defaultName;
};

export const mapFormMetadataToAPIRequest = (
    data: MapFormDataResult,
    author?: string,
): MapMetadataType => {
    /* TODO: transform to class and add validator */
    const trans: any = I18n.t('dataAction.routeData');

    const mData: MapMetadataType = {
        name: data.name,
        difficulty: data.difficulty || [],
        surface: data.surface || [],
        description: {
            short: data.short || '',
            long: data.long || '',
        },
        author: author || trans.defaultAuthorName,
        tags: data.tags || [],
    };

    return mData;
};

export const createFileFormData = (
    source: ImageType,
    fieldName?: string,
): FormData => {
    const img = {
        uri: source.uri,
        type: source.type,
        name: source.fileName,
    };
    const formdata = new FormData();
    formdata.append(fieldName || 'image', img);

    return formdata;
};

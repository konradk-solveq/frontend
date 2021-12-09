import {Point} from '@models/places.model';
import {ApiPathI, LocationDataI} from '@interfaces/geolocation';
import {MapMetadataType} from '@interfaces/api';
import {ImageType, MapFormDataResult} from '@interfaces/form';
import {BasicCoordsType} from '@type/coords';

import {I18n} from '@translations/I18n';
import {getDateString} from '@utils/dateTime';

export const tranformParamsToBBoxRequest = (data: Point[]): string => {
    const first = `bbox=${data[0].lat}&bbox=${data[0].lng}`;
    const second = `bbox=${data[1].lat}&bbox=${data[1].lng}`;

    return `${first}&${second}`;
};

export const routesDataToAPIRequest = (path: LocationDataI[]): ApiPathI[] => {
    const apiPathArr: ApiPathI[] = [];
    const distance = path?.[path?.length - 1]?.odometer;
    let addedDistance = false;

    path.forEach(p => {
        const np: ApiPathI = {
            lat: p.coords.latitude,
            lon: p.coords.longitude,
            altitude: p.coords.altitude,
            speed: p.coords.speed,
            time: p.timestamp,
        };
        /**
         * Backend searches for that value only in first element
         */
        if (!addedDistance && distance) {
            np.displayDistance = distance;
            addedDistance = true;
        }

        apiPathArr.push(np);
    });

    return apiPathArr;
};

export const getRouteDefaultName = (routeNumber?: number | null) => {
    const date = getDateString(new Date(), '/');
    const defaultName = `${I18n.t(
        'dataAction.routeData.defaultAlternativeRouteName',
        {number: routeNumber || 1},
    )} ${date}`;

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
        description: data.description || '',
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

export const tranformParamsToLocationRequest = (
    locaiton: LocationDataI,
): string => {
    const lat = `lat=${locaiton.coords.latitude}`;
    const lng = `lng=${locaiton.coords.longitude}`;

    return `${lat}&${lng}`;
};

export const tranformParamsToBasicLocationRequest = (
    locaiton: BasicCoordsType,
): string => {
    const lat = `lat=${locaiton.latitude}`;
    const lng = `lng=${locaiton.longitude}`;

    return `${lat}&${lng}`;
};

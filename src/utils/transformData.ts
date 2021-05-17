import {
    BikeBaseData,
    BikeDescription,
    Complaint,
    Parameters,
} from '../models/bike.model';
import {Map} from '../models/map.model';
import {UserBike} from '../models/userBike.model';

export const transfromToBikeDescription = (
    description: BikeDescription,
): BikeDescription => {
    const {name, id, sku, producer, serial_number} = description;

    const desc = new BikeDescription(name, id, sku, producer, serial_number);
    if (description?.color) {
        desc.color = description.color;
    }
    if (description?.bought) {
        desc.bought = description.bought;
    }
    if (description?.bought) {
        desc.bought = description.bought;
    }
    if (description?.colorCodes) {
        desc.colorCodes = description.colorCodes;
    }
    if (description?.purpose) {
        desc.purpose = description.purpose;
    }
    if (description?.size) {
        desc.size = description.size;
    }

    return desc;
};

export const transformToUserBikeType = (data: any): UserBike => {
    const {description, images, warranty, params, complaintsRepairs} = data;

    const desc = transfromToBikeDescription(description);

    const newData = new UserBike(desc);
    if (images) {
        newData.images = images;
    }

    if (warranty) {
        newData.warranty = warranty;
    }
    if (params && Array.isArray(params)) {
        newData.params = params.map((el: Parameters) => {
            return new Parameters(el.name, el.customizable, el?.list);
        });
    }

    if (complaintsRepairs && Array.isArray(complaintsRepairs)) {
        newData.complaintsRepairs = complaintsRepairs.map((el: Complaint) => {
            return new Complaint(
                el.id,
                el.name,
                el.date,
                el.description,
                el.state,
            );
        });
    }

    return newData;
};

export const bikesListToClass = (bikes: []): UserBike[] => {
    const result: UserBike[] = [];
    bikes.forEach(b => {
        result.push(transformToUserBikeType(b));
    });

    return result;
};

export const getBikesBaseData = (
    description: BikeDescription | null,
    frameNumber: string,
): BikeBaseData => {
    return {
        id: description?.id || null,
        sku: '',
        serial_number: frameNumber,
        producer: description?.producer || '',
        name: description?.name || '',
        size: description?.size || '',
        color: description?.color || '',
    };
};

export const transformToMapsType = (data: any): Map => {
    const {id, name, coords, totalDistance} = data;

    const newData = new Map(id, name, coords);
    if (totalDistance) {
        newData.totalDistance = totalDistance;
    }

    return newData;
};

export const mapsListToClass = (maps: []): Map[] => {
    console.log('mm', maps);
    const result: Map[] = [];
    maps.forEach(b => {
        result.push(transformToMapsType(b));
    });

    return result;
};

import {BikeDescription, Complaint, Parameters} from '../models/bike.model';
import {UserBike} from '../models/userBike.model';

export const transformToUserBikeType = (data: any): UserBike => {
    const {description, images, warranty, params, complaintsRepairs} = data;

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

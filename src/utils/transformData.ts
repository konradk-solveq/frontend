import {levelFilter, pavementFilter, tagsFilter} from '../enums/mapsFilters';
import {LocationDataI} from '../interfaces/geolocation';
import {
    BikeBaseData,
    BikeDescription,
    Complaint,
    Parameters,
} from '../models/bike.model';
import {Images, Map} from '../models/map.model';
import {UserBike} from '../models/userBike.model';
import {FormData} from '../pages/main/world/editDetails/form/inputs/types';
import {getLocations} from './geolocation';

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
    const {
        id,
        name,
        author,
        difficulty,
        ownerId,
        surface,
        description,
        tags,
        location,
        path,
        images,
        date,
        createdAt,
        publishedAt,
        distance,
        distanceToRoute,
        time,
        rating,
        isPublic,
        downloads,
    } = data;

    const newData = new Map(id, name, path, date, createdAt);
    if (publishedAt) {
        newData.publishedAt = publishedAt;
    }
    if (distance) {
        newData.distance = distance;
    }
    if (distanceToRoute) {
        newData.distanceToRoute = distanceToRoute;
    }
    if (difficulty) {
        newData.difficulty = difficulty;
    }
    if (ownerId) {
        newData.ownerId = ownerId;
    }
    if (surface) {
        newData.surface = surface;
    }
    if (description) {
        newData.description = description;
    }
    if (location) {
        newData.location = location;
    }
    if (time) {
        newData.time = time;
    }
    if (author) {
        newData.author = author;
    }
    if (rating) {
        newData.rating = rating;
    }
    if (images) {
        newData.images = images;
    }
    if (tags) {
        newData.tags = tags;
    }
    if (isPublic) {
        newData.isPublic = isPublic;
    }
    if (downloads) {
        newData.downloads = downloads;
    }

    return newData;
};

export const mapsListToClass = (maps: []): Map[] => {
    const result: Map[] = [];
    maps.forEach(b => {
        result.push(transformToMapsType(b));
    });

    return result;
};

export const getRouteLevel = (level: string, levelTrans: string[]) => {
    const lcTrans = levelTrans.map(t => t?.toLowerCase());
    const index = lcTrans.indexOf(level?.toLowerCase());

    switch (index) {
        case 0:
            return [levelFilter.easy];
        case 1:
            return [levelFilter.medium];
        case 2:
            return [levelFilter.hard];
        default:
            return [];
    }
};

const findEnumsFromValues = (values: string[], trans: string[]) => {
    const lcTrans = trans.map(t => t?.toLowerCase());
    const result: any[] = [];
    lcTrans.forEach(t => {
        if (values.includes(t)) {
            const index = values.indexOf(t?.toLowerCase());
            result.push(index);
        }
    });

    return result;
};

export const getRoutePavements = (pavements: string[], pavTrans: string[]) => {
    const result: pavementFilter[] = findEnumsFromValues(pavements, pavTrans);

    return result;
};

export const getRouteTags = (tags: string[], tagsTrans: string[]) => {
    const result: tagsFilter[] = findEnumsFromValues(tags, tagsTrans);

    return result;
};

export const mapDataToFormData = (mapData: Map): FormData => {
    return {
        id: mapData.id,
        name: mapData.name,
        publishWithName: mapData?.isPublic || false,
        short: mapData?.description?.short || '',
        long: mapData?.description?.long || '',
        difficulty: mapData?.difficulty || undefined,
        surface: mapData?.surface || undefined,
        tags: mapData?.tags || undefined,
    };
};

export const getImagesThumbs = (images: Images[]) => {
    const imgsUrls: string[] = [];
    const fullSizeImgsUrls: string[] = [];
    let mapImgUrl = '';
    let sliverImgUrl = '';

    if (!images?.length) {
        return {
            images: imgsUrls,
            mapImg: mapImgUrl,
        };
    }

    images.forEach(i => {
        if (i.type === 'photo') {
            const imgUrl = i.variants?.square?.[0]?.url;
            const bigImgUrl =
                i.variants?.square?.[2]?.url || i.variants?.square?.[0]?.url;
            const fullSizeImage =
                i.variants?.vertical?.[2]?.url ||
                i.variants?.vertical?.[1]?.url ||
                i.variants?.vertical?.[0]?.url;

            if (sliverImgUrl === '') {
                sliverImgUrl = bigImgUrl;
            }

            if (imgUrl) {
                imgsUrls.push(imgUrl);
            }

            if (fullSizeImage) {
                fullSizeImgsUrls.push(fullSizeImage);
            }
        }
        if (i.type === 'map') {
            const url = i.variants?.square?.[1]?.url;
            if (url) {
                mapImgUrl = url;
            }
        }
    });

    return {
        images: imgsUrls,
        fullSizeImages: fullSizeImgsUrls,
        mapImg: mapImgUrl,
        sliverImg: sliverImgUrl,
    };
};

export const routesDataToPersist = async (
    routeId: string,
    oldRoutes: LocationDataI[],
): Promise<LocationDataI[]> => {
    const currRoutes = [...oldRoutes];
    const locations = await getLocations();
    /* https://transistorsoft.github.io/react-native-background-geolocation/interfaces/location.html */
    locations.forEach((l: any) => {
        if (!routeId || routeId !== l?.extras?.route_id) {
            return;
        }

        if (!oldRoutes.find(d => d.uuid === l.uuid)) {
            const newRoute: LocationDataI = {
                uuid: l.uuid,
                coords: {
                    latitude: l.coords.latitude,
                    longitude: l.coords.longitude,
                    altitude: l.coords.altitude,
                    speed: l.coords.speed,
                },
                odometer: l.odometer,
                timestamp: l.timestamp,
            };

            currRoutes.push(newRoute);
        }
    });

    return currRoutes;
};

export const routesData = async (
    routeId: string,
    excludeTimestamp?: {start: number; end: number},
    time?: {start: number; end: number},
): Promise<{latitude: number; longitude: number; timestamp: number}[]> => {
    const currRoutes: {
        latitude: number;
        longitude: number;
        timestamp: number;
    }[] = [];
    const locations = await getLocations();
    /* https://transistorsoft.github.io/react-native-background-geolocation/interfaces/location.html */
    locations.forEach((l: any) => {
        if (!routeId || routeId !== l?.extras?.route_id) {
            return;
        }

        if (time && time.start !== 0) {
            const t = new Date(l.timestamp).getTime();
            if (t <= time.start) {
                return;
            }
        }

        const newRoute = {
            latitude: l.coords.latitude,
            longitude: l.coords.longitude,
            timestamp: l.timestamp,
        };

        currRoutes.push(newRoute);
    });

    // const sorted = currRoutes.sort((a, b) => {
    //     if (new Date(a.timestamp) === new Date(b.timestamp)) {
    //         return 0;
    //     }

    //     return new Date(a.timestamp) > new Date(b.timestamp) ? 1 : -1;
    // });

    return currRoutes;
};

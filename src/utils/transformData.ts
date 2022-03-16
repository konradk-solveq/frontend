import {AppConfigI} from '@models/config.model';
import {ShortCoordsType} from '@type/coords';
import {Platform} from 'react-native';
import {levelFilter, pavementFilter, tagsFilter} from '../enums/mapsFilters';
import {LocationDataI} from '../interfaces/geolocation';
import {
    BikeBaseData,
    BikeDescription,
    Complaint,
    Parameters,
} from '../models/bike.model';
import {Images, Map, MapType, OptionsEnumsT} from '../models/map.model';
import {UserBike} from '../models/userBike.model';
import {FormData} from '../pages/main/world/editDetails/form/inputs/types';
import {transformTimestampToDate} from './dateTime';
import {
    getLocations,
    LOCATION_ACCURACY,
    transformGeoloCationData,
} from './geolocation';
import {
    isLocationValidate,
    removeLessAccuratePointsLocations,
    removeLessAccuratePoints,
} from './locationData';

const isIOS = Platform.OS === 'ios';

export const getTimeInUTCMilliseconds = (
    date: string | number,
    returnAsNumber?: boolean,
) => {
    const time = new Date(date)?.valueOf();
    if (returnAsNumber && typeof time === 'string') {
        try {
            return parseInt(time, 10);
        } catch (error) {
            return time;
        }
    }

    return time;
};

export const isLocationValidToPass = (
    loc: any,
    routeId?: string,
    skipFiltering?: boolean,
) => {
    if (!routeId || !loc?.extras?.route_id) {
        return false;
    }
    if (routeId !== loc?.extras?.route_id) {
        return false;
    }
    if (!isLocationValidate(loc)) {
        return false;
    }

    if (skipFiltering) {
        return true;
    }

    if (loc?.sample === true) {
        return false;
    }
    if (loc?.coords?.accuracy && loc?.coords?.accuracy > LOCATION_ACCURACY) {
        return false;
    }
    /**
     * Deosn't work properly on Android devices
     */
    if (
        loc?.activity?.type === 'still' &&
        loc?.activity?.confidence >= 90 &&
        isIOS
    ) {
        return false;
    }

    return true;
};

const sortLocationArrayByTime = (locations: ShortCoordsType[]) => {
    return (
        locations?.sort((a, b) => {
            const timeA = getTimeInUTCMilliseconds(a.timestamp);
            const timeB = getTimeInUTCMilliseconds(b.timestamp);
            if (timeA === timeB) {
                if (a.latitude === b.latitude) {
                    if (a.longitude === b.longitude) {
                        return 0;
                    }

                    return a.longitude < b.longitude ? -1 : 1;
                }

                return a.latitude < b.latitude ? -1 : 1;
            }
            return timeA < timeB ? -1 : 1;
        }) || []
    );
};

const sortLocationDataByTime = (locations: LocationDataI[]) => {
    return (
        locations?.sort((a, b) => {
            const timeA = getTimeInUTCMilliseconds(a.timestamp);
            const timeB = getTimeInUTCMilliseconds(b.timestamp);
            if (timeA === timeB) {
                if (a.coords.latitude === b.coords.latitude) {
                    if (a.coords.longitude === b.coords.longitude) {
                        return 0;
                    }

                    return a.coords.longitude < b.coords.longitude ? -1 : 1;
                }

                return a.coords.latitude < b.coords.latitude ? -1 : 1;
            }

            return timeA < timeB ? -1 : 1;
        }) || []
    );
};

export const transfromToBikeDescription = (
    description: BikeDescription,
): BikeDescription => {
    const {name, id, sku, producer, serial_number} = description;

    try {
        const desc = new BikeDescription(
            name,
            id,
            sku,
            producer,
            serial_number,
        );
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
    } catch (error) {
        return description;
    }
};

/* TODO: try catch */
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

export const transformToOptionEnumValues = (
    options: AppConfigI,
): OptionsEnumsT | undefined => {
    try {
        return {
            difficultyOptions: options.difficulties,
            reactions: options.reactions,
            surfacesOptions: options.surfaces,
            tagsOptions: options.tags,
        };
    } catch (error) {
        console.warn('[transformToOptionEnumValues -- error]', error);
        return undefined;
    }
};

const elementExists = (el: any) => {
    if (el !== undefined) {
        return true;
    }

    return false;
};

export const transformToMapsType = (
    data: any,
    options: OptionsEnumsT | undefined,
): Map => {
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
        nearestPoint,
        distanceToRoute,
        time,
        rating,
        isPublic,
        downloads,
        reaction,
        reactions,
    } = data;

    const newData = new Map(id, name, path, date, createdAt);
    if (publishedAt) {
        newData.publishedAt = publishedAt;
    }
    if (elementExists(distance)) {
        newData.distance = distance;
    }
    if (elementExists(nearestPoint)) {
        newData.nearestPoint = nearestPoint;
    }
    if (elementExists(distanceToRoute)) {
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
    if (elementExists(location)) {
        newData.location = location;
    }
    if (elementExists(time)) {
        newData.time = time;
    }
    if (author) {
        newData.author = author;
    }
    if (elementExists(rating)) {
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
    if (elementExists(downloads)) {
        newData.downloads = downloads;
    }
    if (elementExists(reaction)) {
        newData.reaction = reaction;
    }
    if (elementExists(reactions)) {
        newData.reactions = reactions;
    }

    if (options) {
        newData.optionsEnumsValues = options;
    }

    return newData;
};

export const mapToClass = (map: MapType, appConfig: AppConfigI) => {
    const tranformed = transformToOptionEnumValues(appConfig);

    return transformToMapsType(map, tranformed);
};

export const mapsListToClass = (
    maps: MapType[] | [],
    appConfig: AppConfigI,
): Map[] => {
    const tranformed = transformToOptionEnumValues(appConfig);

    const result: Map[] = [];
    maps.forEach(b => {
        result.push(transformToMapsType(b, tranformed));
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
        if (values?.includes(t)) {
            const index = values?.indexOf(t?.toLowerCase());
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
        description: mapData?.mapDescription || '',
        difficulty: mapData?.difficulty || undefined,
        surface: mapData?.surface || undefined,
        tags: mapData?.tags || undefined,
    };
};

export type ImagesUrlsToDisplay = {
    images: string[];
    mapImg: string;
    fullSizeImages?: string[];
    verticalMapImgUrl?: string;
    horizontalMapImgUrl?: string;
    shareMapImgUrl?: string;
    sliverImg?: string;
};

export const getImagesThumbs = (images: Images[]): ImagesUrlsToDisplay => {
    const imgsUrls: string[] = [];
    const fullSizeImgsUrls: string[] = [];
    let mapImgUrl = '';
    let verticalMapImgUrl = '';
    let horizontalMapImgUrl = '';
    let shareMapImgUrl = '';
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
            const url =
                i.variants?.square?.[1]?.url || i.variants?.square?.[0]?.url;
            if (url) {
                mapImgUrl = url;
            }
            const verticalUrl =
                i.variants?.vertical?.[2]?.url ||
                i.variants?.vertical?.[1]?.url ||
                i.variants?.vertical?.[0]?.url;
            if (verticalUrl) {
                verticalMapImgUrl = verticalUrl;
            }
            const horizontalUrl =
                i.variants?.horizontal?.[2]?.url ||
                i.variants?.horizontal?.[1]?.url ||
                i.variants?.horizontal?.[0]?.url;
            if (horizontalUrl) {
                horizontalMapImgUrl = horizontalUrl;
            }
            const shareUrl =
                i.variants?.share?.[2]?.url ||
                i.variants?.share?.[1]?.url ||
                i.variants?.share?.[0]?.url;
            if (shareUrl) {
                shareMapImgUrl = shareUrl;
            }
        }
    });

    return {
        images: imgsUrls,
        fullSizeImages: fullSizeImgsUrls,
        mapImg: mapImgUrl,
        verticalMapImgUrl: verticalMapImgUrl,
        horizontalMapImgUrl: horizontalMapImgUrl,
        shareMapImgUrl: shareMapImgUrl,
        sliverImg: sliverImgUrl,
    };
};

export const routesDataToPersist = async (
    routeId: string,
    withoutFiltering?: boolean,
): Promise<LocationDataI[]> => {
    const currRoutes: LocationDataI[] = [];
    const locations = await getLocations();
    if (!locations) {
        return currRoutes;
    }

    /* https://transistorsoft.github.io/react-native-background-geolocation/interfaces/location.html */
    locations.forEach((l: any) => {
        if (!isLocationValidToPass(l, routeId, withoutFiltering)) {
            return;
        }

        if (!currRoutes.find(d => d.uuid === l.uuid)) {
            const alterTimestamp = transformTimestampToDate(
                l?.timestampMeta?.systemTime,
            );

            const newRoute: LocationDataI = transformGeoloCationData(l);
            if (alterTimestamp) {
                newRoute.timestamp = alterTimestamp.toUTCString();
            }

            currRoutes.push(newRoute);
        }
    });

    const sorted = sortLocationDataByTime(currRoutes);

    const cleanedArr = withoutFiltering
        ? sorted
        : removeLessAccuratePointsLocations(sorted);

    return cleanedArr;
};

export const getRoutesDataFromSQL = async (
    routeId: string,
    timeToExclude?: {start: number; end: number},
): Promise<{latitude: number; longitude: number; timestamp: number}[]> => {
    try {
        const currRoutes: {
            latitude: number;
            longitude: number;
            timestamp: number;
        }[] = [];
        const locations = await getLocations();
        if (!locations?.length) {
            return currRoutes;
        }

        /* https://transistorsoft.github.io/react-native-background-geolocation/interfaces/location.html */
        locations.forEach((l: any) => {
            if (!isLocationValidToPass(l, routeId)) {
                return;
            }

            if (timeToExclude && timeToExclude.start !== 0) {
                const t = new Date(l.timestamp).getTime();
                if (t <= timeToExclude.start) {
                    return;
                }
            }

            if (l?.coords) {
                const alterTimestamp = transformTimestampToDate(
                    l?.timestampMeta?.systemTime,
                );
                const newRoute = {
                    latitude: l.coords.latitude,
                    longitude: l.coords.longitude,
                    timestamp: alterTimestamp || l.timestamp,
                };

                currRoutes.push(newRoute);
            }
        });

        const sorted = sortLocationArrayByTime(currRoutes);

        const cleanedArr = removeLessAccuratePoints(sorted);

        return cleanedArr;
    } catch (error) {
        console.error('[getRoutesDataFromSQL]', error);
        return [];
    }
};

export const getImageToDisplay = (images: ImagesUrlsToDisplay) => {
    const img = images?.images?.length && images.images?.[0];
    const mapImg = images?.mapImg;

    return img || mapImg;
};

export const getSliverImageToDisplay = (images: ImagesUrlsToDisplay) => {
    const img = images?.sliverImg;
    const mapImg = images?.verticalMapImgUrl;

    return img || mapImg;
};

export const getRoutesDataFromSQLWithLastRecord = async (
    routeId: string,
    timeToExclude?: {start: number; end: number},
): Promise<{
    data: {latitude: number; longitude: number; timestamp: number}[];
    lastRecord?: any;
}> => {
    try {
        const currRoutes: {
            latitude: number;
            longitude: number;
            timestamp: number;
        }[] = [];
        const locations = await getLocations();
        if (!locations?.length) {
            return {data: currRoutes};
        }

        let lastRecord: any;
        /* https://transistorsoft.github.io/react-native-background-geolocation/interfaces/location.html */
        locations.forEach((l: any) => {
            if (!isLocationValidToPass(l, routeId)) {
                return;
            }

            if (timeToExclude && timeToExclude.start !== 0) {
                const t = new Date(l.timestamp).getTime();
                if (t <= timeToExclude.start) {
                    return;
                }
            }

            if (l?.coords) {
                const alterTimestamp = transformTimestampToDate(
                    l?.timestampMeta?.systemTime,
                );
                const newRoute = {
                    latitude: l.coords.latitude,
                    longitude: l.coords.longitude,
                    timestamp: alterTimestamp || l.timestamp,
                };

                currRoutes.push(newRoute);
                lastRecord = l;
            }
        });

        const sorted = sortLocationArrayByTime(currRoutes);

        const cleanedArr = removeLessAccuratePoints(sorted);

        return {
            data: cleanedArr,
            lastRecord: isLocationValidate(lastRecord) ? lastRecord : undefined,
        };
    } catch (error) {
        console.error('[getRoutesDataFromSQLWithLastRecord]', error);
        return {
            data: [],
            lastRecord: undefined,
        };
    }
};

export const getFilterDistance = (val: string) => {
    const parsedValue = parseFloat(val.replace(',', '.')) * 1000;
    if (isNaN(parsedValue)) {
        return;
    }
    return parsedValue;
};

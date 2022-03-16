import {Dimensions, PixelRatio} from 'react-native';
import {levelFilter, pavementFilter, tagsFilter} from '@enums/mapsFilters';
import {LocationDataI} from '@interfaces/geolocation';
import {
    BikeBaseData,
    BikeDescription,
    Complaint,
    Parameters,
    BikesConfig,
    BikesConfigI,
} from '@models/bike.model';
import {AppConfigI} from '@models/config.model';
import {ShortCoordsType} from '@type/coords';
import {
    Images,
    Map,
    MapType,
    OptionsEnumsT,
    Thumbnails,
} from '../models/map.model';
import {isIOS} from '@utils/platform';
import {GenericBike, GenericBikeI, UserBike} from '@models/userBike.model';
import {FormData} from '@pages/main/world/editDetails/form/inputs/types';
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

const {width} = Dimensions.get('window');

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
    const desc = transfromToBikeDescription(data.description);
    const newData = new UserBike(desc);

    const {images, warranty, params, complaintsRepairs} = data;

    if (images && Array.isArray(params) && images?.length) {
        newData.images = images;
    }

    if (warranty) {
        newData.warranty = warranty;
    }
    if (params && Array.isArray(params) && params.length) {
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

export const genericBikeToClass = (
    data?: GenericBikeI,
): GenericBike | undefined => {
    if (!data) {
        return;
    }

    const desc = transfromToBikeDescription(data.description);
    const newData = new GenericBike(desc);

    const {images, warranty, params, complaintsRepairs} = data;

    if (images && Array.isArray(params) && images?.length) {
        newData.images = images;
    }

    if (warranty) {
        newData.warranty = warranty;
    }
    if (params && Array.isArray(params) && params.length) {
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
        thumbnails,
        date,
        createdAt,
        publishedAt,
        distance,
        nearestPoint,
        distanceToRoute,
        time,
        rating,
        isPublic,
        isUserFavorite,
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
        newData.pictures.images = images;
    }
    if (thumbnails) {
        newData.pictures.thumbnails = thumbnails;
    }
    if (tags) {
        newData.tags = tags;
    }
    if (isPublic) {
        newData.isPublic = isPublic;
    }
    if (isUserFavorite) {
        newData.isUserFavorite = isUserFavorite;
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

export const getImagesThumbs = (
    pictures:
        | {
              images: Images[];
              thumbnails: Thumbnails[];
              // photos: Photos[] TODO add photos when photos will be enable
          }
        | undefined,
): ImagesUrlsToDisplay => {
    const imgsUrls: string[] = [];
    const fullSizeImgsUrls: string[] = [];
    let mapImgUrl = '';
    let verticalMapImgUrl = '';
    let horizontalMapImgUrl = '';
    let shareMapImgUrl = '';
    let sliverImgUrl = '';

    if (!pictures) {
        return {
            images: imgsUrls,
            mapImg: mapImgUrl,
        };
    }

    const {images, thumbnails} = pictures; // TODO add photos when photos will be enable

    if (images.length === 0 && thumbnails.length === 0) {
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
    });

    if (thumbnails.length > 0) {
        const ratio = PixelRatio.get();
        const originWidth = width * ratio;
        for (let i = 0; i < thumbnails.length; i++) {
            const thumbnail = thumbnails[i];
            if (thumbnail.width > originWidth) {
                imgsUrls.push(thumbnail.url);
                break;
            }
            if (i === thumbnails.length - 1) {
                imgsUrls.push(thumbnail.url);
            }
        }
    }

    // TODO iterate by photos like by thumbnails, when photos will be enable

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

<<<<<<< HEAD
export const getFilterDistance = (val: string) => {
    const parsedValue = parseFloat(val.replace(',', '.')) * 1000;
    if (isNaN(parsedValue)) {
        return;
    }
    return parsedValue;
};

=======
>>>>>>> 5f53bebd (add types and test for the fuel equivalent function)
export const getRouteLengthFuelEquivalent = (
    ratio: number,
    distance: string | undefined,
) => {
<<<<<<< HEAD
    if (typeof ratio !== 'number') {
        return '0';
    }
    let fuelEq = 0;
    if (typeof distance === 'string') {
        fuelEq = Number(distance.replace(',', '.'));
    } else {
        return '0';
    }
    const res = fuelEq * (ratio / 100);
    if (res < 0 || isNaN(res)) {
=======
    let fuelEq = 0.001;
    if (typeof distance !== 'undefined') {
        fuelEq = Number(distance.replace(',', '.'));
    }

    const res = fuelEq * (ratio / 100);
    if (res < 0) {
>>>>>>> 5f53bebd (add types and test for the fuel equivalent function)
        return '0';
    }

    /**
     * this makes sure to display only one digit after a dot,
     * but also deletes the trailing 0s, so '1,0' becomes just '1'
     */

    return Number(res.toFixed(1)).toString().replace('.', ',');
};
<<<<<<< HEAD

export const getRouteLengthCarbonEquivalent = (
    fuelRatio: number,
    carbonRatio: number,
    distance: string,
): string => {
    const savedFuel = getRouteLengthFuelEquivalent(fuelRatio, distance);
    return (carbonRatio * parseFloat(savedFuel.replace(',', '.'))).toString();
};

export const bikesConfigToClass = (
    data?: BikesConfigI,
): BikesConfig | undefined => {
    if (!data) {
        return;
    }

    try {
        return new BikesConfig(data);
    } catch (e) {
        return;
    }
};
=======
>>>>>>> 5f53bebd (add types and test for the fuel equivalent function)

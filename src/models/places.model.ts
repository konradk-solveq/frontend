export type Point = {
    lat: number;
    lng: number;
};

export interface BBox {
    bbox: [Point, Point];
    width: number;
}

export type PointDetails = {
    name: string;
    phone: string;
    email: string;
    city: string;
    street: string;
    country: string;
};

export enum markerTypes {
    SHOP = 'shop',
    SERVICE = 'service',
}

export interface Place {
    type: string;
    lat: number;
    lng: number;
    details: PointDetails;
    markerTypes: markerTypes[];
    markerType: string;
}

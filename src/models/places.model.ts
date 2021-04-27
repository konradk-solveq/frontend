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

export interface Place {
    type: string;
    lat: number;
    lng: number;
    details: PointDetails;
    markerType: string;
}

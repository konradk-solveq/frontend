import {ImageType} from './form';

export type MapPagination = {
    next?: string | undefined;
    prev?: string | undefined;
    self?: string | undefined;
};

export interface actionAsyncResponse {
    success: boolean;
    errorMessage: string;
    data: any;
}

export type UserRoleT = 'notRegistered' | 'user' | 'admin';

export type SessionDataType = {
    access_token: string;
    refresh_token: string;
    expiration_date: Date | undefined;
    expires_in: number | null;
    user: {
        id: string;
        email: string;
        role?: UserRoleT;
    };
};

export type MapMetadataType = {
    name: string;
    difficulty: string[];
    surface: string[];
    description: string;
    author: string;
    tags: string[];
    location?: string;
};

export type ImagesMetadataType = {
    save: ImageType[] | undefined;
    delete: string[] | undefined;
};

export type NestedPaginationType = {id: string; pagination: MapPagination};

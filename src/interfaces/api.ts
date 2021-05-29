export type MapPagination = {
    next?: string | undefined;
    prev?: string | undefined;
};

export interface actionAsyncResponse {
    success: boolean;
    errorMessage: string;
    data: any;
}

export type SessionDataType = {
    access_token: string;
    refresh_token: string;
    expiration_date: Date | undefined;
    expires_in: number | null;
    user: {
        id: string;
        email: string;
    };
};

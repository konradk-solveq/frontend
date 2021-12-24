/**
 * 'uknown' - initial type
 * 'mobile' - user registered as mobile device
 * 'authenticated' - user resistered or logged in with email and password
 * 'loggedout' - user logged out after logged in with email and password
 */
export type UserAuthStateT =
    | 'authenticated'
    | 'loggedout'
    | 'mobile'
    | 'uknown';

export type UserAuthResponseT = {
    access_token: string;
    refresh_token: string;
    expiration_date: string;
    expires_in: number;
    user: {
        id: string;
        email: string;
        role: string;
    };
};

export type UserAuthErrorT = {
    error: string;
};

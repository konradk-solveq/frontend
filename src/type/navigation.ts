export type shareContentT = 'cyclingMap' | 'uknown';

export interface DeepLinkUrlI<T> {
    instance: T;
    shareId?: string;
    shareType?: shareContentT;
}

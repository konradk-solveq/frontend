import {DEEPLINKING_HOST} from '@env';
import {DeepLinkUrlI, shareContentT} from '@type/navigation';

/**
 * Retrieves last element of the shared url,
 * which is shareId
 *
 * @param url
 * @returns shareId
 */
const getShareIdFromUrl = (url: string) => {
    if (!url?.includes(DEEPLINKING_HOST)) {
        return;
    }

    const urlSegments = url.split('/');
    const lastSegment = urlSegments?.[urlSegments?.length - 1];
    if (!lastSegment) {
        return;
    }
    const shareId = lastSegment.split('?')?.[0];
    if (!shareId) {
        return;
    }

    return shareId;
};

/**
 * Retrieves next to last element from the shared url,
 * which is shareType (eg. cyclingMap)
 *
 * @param url
 * @returns shareId
 */
const getShareTypeFromUrl = (url: string) => {
    if (!url?.includes(DEEPLINKING_HOST)) {
        return;
    }

    const urlSegments = url.split('/');
    const shareType = urlSegments?.[urlSegments?.length - 2];
    if (!shareType) {
        return;
    }
    return shareType as shareContentT;
};

export const clearDeepLink = () => {
    DeepLink.shareId = undefined;
    DeepLink.shareType = undefined;
};

/**
 * Keeps deep link to share through the app.
 * It helps to keep values when RegularStack is not available
 * (f.eg. user has not finished onboarding yet, or is not registered)
 */
class DeepLinkUrl implements DeepLinkUrlI<DeepLinkUrl> {
    private readonly _instance?: DeepLinkUrl;

    shareId?: string;
    shareType?: shareContentT;

    constructor() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = this;
    }

    get instance() {
        if (!this._instance) {
            return new DeepLinkUrl();
        }

        return this._instance;
    }

    set setShareIdFromUrl(url: string) {
        this.shareId = getShareIdFromUrl(url);
    }

    set setShareTypeFromUrl(url: string) {
        this.shareType = getShareTypeFromUrl(url);
    }
}

export const DeepLink = new DeepLinkUrl();

import {axiosGet} from './api';
import {convertToTimeoutError} from '../utils/apiDataTransform/timeoutError';

export const checkInternetConnectionQuality = async () => {
    return await axiosGet('https://clients3.google.com/generate_204', {
        timeout: 3000,
    }).catch(e => {
        return Promise.reject(convertToTimeoutError(e));
    });
};

export const getConfig = async () => {
    return await axiosGet('/application/config');
};

export const getTermsAndConditions = async () =>
    await axiosGet('/application/terms-and-conditions');

export const getRegulation = async (versionNr: string) =>
    await axiosGet(`/application/regulation/${versionNr}`);

export const getPolicy = async (versionNr: string) =>
    await axiosGet(`/application/policy/${versionNr}`);

export const getFaq = async () => await axiosGet('/application/faq');

export const getNewAppVersion = async () => await axiosGet('/app-version');

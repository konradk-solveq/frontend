import {axiosGet} from './api';

export const getConfig = async () => await axiosGet('/application/config');

export const getTermsAndConditions = async () =>
    await axiosGet('/application/terms-and-conditions');

export const getRegulation = async (versionNr: string) =>
    await axiosGet(`/application/regulation/${versionNr}`);

export const getPolicy = async (versionNr: string) =>
    await axiosGet(`/application/policy/${versionNr}`);

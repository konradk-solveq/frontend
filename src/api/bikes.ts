import {axiosGet} from './api';

export const getBike = async (frameNr: string) =>
    await axiosGet(`/frame/lookup/${frameNr}`);

export const getGenericBikeData = async () => await axiosGet('/frame/generic');

export const getBikesList = async (frameNrs: string) =>
    await axiosGet(`/frame/lookup?serial_numbers=${frameNrs}`);

export const getBikesConfig = async () => await axiosGet('/frame/config');

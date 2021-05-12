import {axiosGet} from './api';

export const getBike = async (frameNr: string) =>
    await axiosGet(`/frame/lookup/${frameNr}`, {
        validateStatus: () => true,
    });

export const getGenericBikeData = async () =>
    await axiosGet('/frame/generic', {
        validateStatus: () => true,
    });

export const getBikesList = async (frameNrs: string) =>
    await axiosGet(`/frame/lookup?serial_numbers=${frameNrs}`, {
        validateStatus: () => true,
    });

import instance from './api';

export const getBike = async (frameNr: string) =>
    await instance.get(`/frame/lookup/${frameNr}`, {
        validateStatus: () => true,
    });

export const getGenericBikeData = async () =>
    await instance.get('/frame/generic', {
        validateStatus: () => true,
    });

export const getBikesList = async (frameNrs: string) =>
    await instance.get(`/frame/lookup?serial_numbers=${frameNrs}`, {
        validateStatus: () => true,
    });

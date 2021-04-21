import instance from './api';

export const getBike = async (frameNr: string) =>
    await instance.get(`/frame/lookup/${frameNr}`, {
        validateStatus: () => true,
    });

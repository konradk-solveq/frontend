import instance, {source} from './api';

export const modifyReaction = async (mapId: string, reaction: string) => {
    return await instance.put(
        `/routes/route/${mapId}/reaction/${reaction}`,
        {},
        {
            cancelToken: source.token,
        },
    );
};

export const removeReaction = async (mapId: string) => {
    return await instance.delete(`/routes/route/${mapId}/reaction`, {
        cancelToken: source.token,
    });
};

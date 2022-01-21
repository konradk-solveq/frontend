import {useCallback, useEffect, useState} from 'react';

import {API_URL} from '@env';
import {shareRouteService} from '@services/shareService';
import {SharedContentT} from '@src/type/share';

const useFetchShareLink = (mapId: string) => {
    const [sharedContent, setSharedContent] = useState<
        SharedContentT | undefined
    >();
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState('');

    const fetchData = useCallback(async () => {
        if (!mapId) {
            return;
        }
        setIsFetching(true);

        const response = await shareRouteService(mapId);
        if (response.data) {
            setError('');
            const content: SharedContentT = {url: '', content: {}};
            if (response.data.content?.imgUrl) {
                content.content.imgUrl = `${API_URL}/${response.data.content.imgUrl}`;
            }
            content.url = response.data.url;
            setSharedContent(content);
        } else {
            setError(response.error);
        }

        setIsFetching(false);
    }, [mapId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        sharedContent: sharedContent,
        shareError: error,
        isFetching,
    };
};

export default useFetchShareLink;
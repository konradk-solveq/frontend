import {useCallback, useEffect, useState} from 'react';

import {
    checkSharedImageExistsService,
    shareRouteService,
} from '@services/index';
import {SharedContentT} from '@type/share';

/**
 * Response returns faster than operation on AWS
 * so here is small delay timeout
 */
const DELAY = 2000;

const checkImageExists = async (url?: string) => {
    if (!url) {
        return;
    }

    const response = await checkSharedImageExistsService(url);

    if (response.data === 'NOT-EXISTS') {
        return false;
    }

    return true;
};

const useFetchShareLink = (mapId: string) => {
    const [sharedContent, setSharedContent] = useState<
        SharedContentT | undefined
    >();
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState('');

    const fetchData = useCallback(async () => {
        let timeout: NodeJS.Timeout;
        if (!mapId) {
            return;
        }
        setIsFetching(true);

        const response = await shareRouteService(mapId);
        if (response.data) {
            setError('');
            const content: SharedContentT = {url: '', content: {}};
            if (response.data.content?.image) {
                content.content.image = response.data.content.image;
            }
            content.url = response.data.url;

            /**
             * Checks if generated image is available.
             * If not set timeout to wait for
             */
            const checkImgExists = await checkImageExists(
                content.content.image,
            );
            if (checkImgExists) {
                setSharedContent(content);
            } else {
                timeout = setTimeout(() => {
                    setSharedContent(content);
                }, DELAY);
            }
        } else {
            setError(response.error);
        }

        setIsFetching(false);

        return () => {
            clearTimeout(timeout);
        };
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

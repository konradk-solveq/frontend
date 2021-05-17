import instance, {source} from './api';

export const getMaps = async () => {
    /* TODO: replace endpoint data */
    return {
        data: [
            {
                id: '1',
                name: 'firstMap',
                coords: [
                    {
                        langitude: 111,
                        latitude: 222,
                        altitude: 3,
                        timestamp: 11111,
                    },
                    {
                        langitude: 1111,
                        latitude: 2222,
                        altitude: 33,
                        timestamp: 111111,
                    },
                    {
                        langitude: 11111,
                        latitude: 22222,
                        altitude: 333,
                        timestamp: 1111111,
                    },
                ],
                totalDistance: 0,
            },
            {
                id: '2',
                name: 'secondMap',
                coords: [
                    {
                        langitude: 111,
                        latitude: 222,
                        altitude: 3,
                        timestamp: 11111,
                    },
                    {
                        langitude: 1111,
                        latitude: 2222,
                        altitude: 33,
                        timestamp: 111111,
                    },
                    {
                        langitude: 11111,
                        latitude: 22222,
                        altitude: 333,
                        timestamp: 1111111,
                    },
                ],
                totalDistance: 1,
            },
            {
                id: '3',
                name: 'thirdMap',
                coords: [
                    {
                        langitude: 111,
                        latitude: 222,
                        altitude: 3,
                        timestamp: 11111,
                    },
                    {
                        langitude: 1111,
                        latitude: 2222,
                        altitude: 33,
                        timestamp: 111111,
                    },
                    {
                        langitude: 11111,
                        latitude: 22222,
                        altitude: 333,
                        timestamp: 1111111,
                    },
                ],
                totalDistance: 5,
            },
            {
                id: '4',
                name: 'fourthMap',
                coords: [
                    {
                        langitude: 111,
                        latitude: 222,
                        altitude: 3,
                        timestamp: 11111,
                    },
                    {
                        langitude: 1111,
                        latitude: 2222,
                        altitude: 33,
                        timestamp: 111111,
                    },
                    {
                        langitude: 11111,
                        latitude: 22222,
                        altitude: 333,
                        timestamp: 1111111,
                    },
                ],
            },
        ],
        error: '',
        status: 200,
    };
    // return await instance.get('/frame/generic', {
    //     cancelToken: source.token,
    //     validateStatus: () => true,
    // });
};

import instance, {source} from './api';

export const getMaps = async () => {
    /* TODO: replace endpoint data */
    return {
        data: [
            {
                id: '222',
                name: 'Przykładowy tytuł - 1',
                coords: [],
                date: new Date(),
                details: {
                    intro: 'Przykładowe intro',
                    description: 'Przykładowy opis trasy.',
                    localization: 'Miasto, województwo, Kraj',
                    level: 'umiarkowana',
                    pavement: ['ścieżka rowerowa', 'utwardzona'],
                    images: [
                        'https://kross.eu/media/cache/gallery/images/34/34231/hexagon_1_0_black_red_white_matte.png',
                        'https://kross.eu/media/cache/gallery/images/36/36853/2021_KR Trans 5.0 D 28 M rub_cza p.jpg',
                        'https://kross.eu/media/cache/gallery/images/31/31551/level_6_0_black_white_red_matte.png',
                    ],
                    mapUrl: '',
                },
                author: 'Jan Kowalski',
                totalDistance: 100,
                tags: ['widokowa', 'mały ruch'],
            },
            {
                id: JSON.stringify(Math.random()),
                name: 'Przykładowy tytuł',
                coords: [],
                date: new Date(),
                details: {
                    intro: 'Przykładowe intro',
                    description: 'Przykładowy opis trasy.',
                    localization: 'Miasto, województwo, Kraj',
                    level: 'łatwa',
                    pavement: ['ścieżka rowerowa'],
                    images: [
                        'https://kross.eu/media/cache/gallery/images/34/34231/hexagon_1_0_black_red_white_matte.png',
                        'https://kross.eu/media/cache/gallery/images/36/36853/2021_KR Trans 5.0 D 28 M rub_cza p.jpg',
                        'https://kross.eu/media/cache/gallery/images/31/31551/level_6_0_black_white_red_matte.png',
                    ],
                    mapUrl: '',
                },
                author: 'Jan Kowalski',
                totalDistance: 100,
                tags: ['widokowa', 'mały ruch'],
            },
            {
                id: JSON.stringify(Math.random()),
                name: 'Przykładowy tytuł',
                coords: [],
                date: new Date(),
                details: {
                    intro: 'Przykładowe intro',
                    description: 'Przykładowy opis trasy.',
                    localization: 'Miasto, województwo, Kraj',
                    level: 'łatwa',
                    pavement: ['ścieżka rowerowa', 'asfalt'],
                    images: [
                        'https://kross.eu/media/cache/gallery/images/34/34231/hexagon_1_0_black_red_white_matte.png',
                        'https://kross.eu/media/cache/gallery/images/36/36853/2021_KR Trans 5.0 D 28 M rub_cza p.jpg',
                        'https://kross.eu/media/cache/gallery/images/31/31551/level_6_0_black_white_red_matte.png',
                    ],
                    mapUrl: '',
                },
                author: 'Jan Kowalski',
                totalDistance: 100,
                tags: ['widokowa', 'mały ruch'],
            },
            {
                id: '333',
                name: 'Przykładowy tytuł - 4',
                coords: [],
                date: new Date(),
                details: {
                    intro: 'Przykładowe intro',
                    description: 'Przykładowy opis trasy.',
                    localization: 'Miasto, województwo, Kraj',
                    level: 'wymagająca',
                    pavement: ['ścieżka rowerowa'],
                    images: [
                        'https://kross.eu/media/cache/gallery/images/34/34231/hexagon_1_0_black_red_white_matte.png',
                        'https://kross.eu/media/cache/gallery/images/36/36853/2021_KR Trans 5.0 D 28 M rub_cza p.jpg',
                        'https://kross.eu/media/cache/gallery/images/31/31551/level_6_0_black_white_red_matte.png',
                    ],
                    mapUrl: '',
                },
                author: 'Jan Kowalski',
                totalDistance: 100,
                tags: ['widokowa', 'mały ruch'],
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

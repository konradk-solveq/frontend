import {MapFormDataResult} from '@interfaces/form';
import {ImagesMetadataType} from '@interfaces/api';

export const MOCK_DATA: MapFormDataResult = {
    id: 'TEST',
    name: 'TEST',
    publishWithName: false,
};

export const MOCK_AUTHOR = 'TEST USER';

export const MOCK_SAVE_IMAGES: ImagesMetadataType = {
    delete: [],
    save: [
        {
            uri: 'test1',
            fileName: 'test1',
        },
        {
            uri: 'test2',
            fileName: 'test2',
        },
        {
            uri: 'test3',
            fileName: 'test3',
        },
    ],
};

export const MOCK_ERROR_400_MESSAGE = 'TEST ERROR MESSAGE';

export const MOCK_ERROR_500_MESSAGE =
    'Plik [ test1 ] nie został wysłany. Spróbuj ponownie później., Plik [ test2 ] nie został wysłany. Spróbuj ponownie później., Plik [ test3 ] nie został wysłany. Spróbuj ponownie później.';

export const MOCK_ERROR_400_RESPONSE = {
    data: {
        message: MOCK_ERROR_400_MESSAGE,
    },
    status: 400,
};

export const MOCK_ERROR_500_RESPONSE = {
    data: {},
    status: 500,
};

export const MOCK_OK_RESPONSE = {
    data: {},
    status: 200,
};

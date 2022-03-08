import {MapFormDataResult} from '@interfaces/form';
import {ImagesMetadataType} from '@interfaces/api';
import i18next from '@translations/i18next';

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

export const MOCK_SAVE_IMAGES_NO_FILENAMES: ImagesMetadataType = {
    delete: [],
    save: [
        {
            uri: 'test1',
        },
    ],
};

export const MOCK_ERROR_400_MESSAGE = 'TEST ERROR MESSAGE';

export const MOCK_ERROR_500_DEFAULT_MESSAGE = i18next.t(
    'dataAction.mapData.fileUploadError',
);

export const MOCK_ERROR_500_MESSAGE = i18next.t(
    'dataAction.mapData.fileUploadError',
);

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

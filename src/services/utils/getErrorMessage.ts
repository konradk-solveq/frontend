import i18next from '@translations/i18next';

import {AxiosResponse} from 'axios';

export const getImgErrorMessage = (
    response: AxiosResponse<any>,
    filename: String | undefined,
) => {
    if (response?.data?.message || response?.data?.error) {
        return response?.data.message || response?.data.error;
    } else {
        return i18next.t('dataAction.mapData.fileUploadError', {
            value: filename
                ? filename
                : i18next.t('dataAction.mapData.defaultFilename'),
        });
    }
};

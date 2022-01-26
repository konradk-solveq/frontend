import {I18n} from '@translations/I18n';
import {AxiosResponse} from 'axios';

export const getImgErrorMessage = (
    response: AxiosResponse<any>,
    filename: String | undefined,
) => {
    if (response?.data?.message || response?.data?.error) {
        return response?.data.message || response?.data.error;
    } else {
        return I18n.t('dataAction.mapData.fileUploadError', {
            value: filename
                ? filename
                : I18n.t('dataAction.mapData.defaultFilename'),
        });
    }
};

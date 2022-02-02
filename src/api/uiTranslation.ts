import {axiosGet} from './api';

export const getUiTranslation = async () =>
    await axiosGet('/application/ui-translation');

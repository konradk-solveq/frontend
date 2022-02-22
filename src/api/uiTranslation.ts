import {axiosGet} from './api';

export const getUiTranslation = async () =>
    await axiosGet('/application/ui-translation');

export const getLanguagesList = async () =>
    await axiosGet('/application/languages');

export const getControlSum = async () =>
    await axiosGet('/application/ui-translation/control-sum');

import {axiosGet} from '@api/api';

export const getUiTranslation = async (controller?: AbortController) =>
    await axiosGet('/application/ui-translation', undefined, controller);

export const getLanguagesList = async (controller?: AbortController) =>
    await axiosGet('/application/languages', undefined, controller);

export const getControlSum = async (controller?: AbortController) =>
    await axiosGet(
        '/application/ui-translation/control-sum',
        undefined,
        controller,
    );

import {AppConfigI, ControlSumsType} from '@models/config.model';
import i18next from '@translations/i18next';
import {getControlSumService} from '@services/uiTranslation';
import {convertToApiError} from '@utils/apiDataTransform/communicationError';
import {loggErrorWithScope} from '@sentryLogger/sentryLogger';

type AppTranslationStatusT = {
    status: 'update' | 'no-update' | 'error' | 'missing';
    error?: string;
};

export const checkIfNewTranslationExists = async (
    config: Pick<AppConfigI, 'uiTranslations'>,
    language: string,
): Promise<AppTranslationStatusT> => {
    /**
     * Check if translation for chosen language exists.
     */
    if (!checkIfTranslationExists(config, language)) {
        return {status: 'missing'};
    }

    const response = await getControlSumService();

    /**
     * Check if API returned control sum for current app version.
     */
    if (!response.data) {
        console.error(`[getControlSumService] - ${response.error}`);
        const err = convertToApiError(response.error);

        loggErrorWithScope(err, 'getControlSumService');

        const errorMessage = i18next.t('dataAction.translationError');

        return {status: 'error', error: errorMessage};
    }

    const newControlSum = response.data?.controlSum;
    /**
     * Check if translation changed by comparing control sum value.
     */
    const controlSumChanged = checkIfControlSumChanged(
        config.uiTranslations?.controlSums,
        language,
        newControlSum,
    );
    if (controlSumChanged) {
        return {status: 'update'};
    }

    return {status: 'no-update'};
};

export const checkIfTranslationExists = (
    config: Pick<AppConfigI, 'uiTranslations'>,
    language: string,
) => {
    return config.uiTranslations.codes.includes(language);
};

export const checkIfControlSumChanged = (
    controlSums: ControlSumsType[],
    currentLanguage: string,
    newControlSum?: string,
) => {
    const currentLanguageControlSum = controlSums.find(
        t => t.code === currentLanguage,
    )?.controlSum;

    if (!currentLanguageControlSum) {
        return true;
    }

    if (!newControlSum) {
        return true;
    }

    if (currentLanguageControlSum !== newControlSum) {
        return true;
    }

    return false;
};

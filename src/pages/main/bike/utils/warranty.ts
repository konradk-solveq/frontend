import i18next from '@translations/i18next';

const WARRANTY_TRANSLATION_PATH = 'MainBike.warranty';

/**
 * When no info about warranty is available,
 * returns information about 'contact'.
 */
export const getWarrantyStatusInfo = (containsInfo: boolean) =>
    containsInfo
        ? i18next.t(`${WARRANTY_TRANSLATION_PATH}.toEnd`)
        : i18next.t(`${WARRANTY_TRANSLATION_PATH}.missingToEnd`);

/**
 * extended = warranty date never expires
 * no-info = there is no information about warranty,
 * but we want to display alternative text
 */
export const shouldShowWarrantyStatusInfo = (
    type?: 'no-info' | 'extended' | string,
    daysToEnd?: number,
) =>
    !!(
        type === 'no-info' ||
        type === 'extended' ||
        (daysToEnd && daysToEnd > 0)
    );

export const getWarrantyTypeText = (
    withInfo: boolean,
    info: string,
    containsInfo?: boolean,
) =>
    containsInfo
        ? _warrantyInfoText(withInfo, info)
        : i18next.t(`${WARRANTY_TRANSLATION_PATH}.noInfo`);

/**
 * When no info about warranty is available,
 * returns information about 'contact'.
 */
export const getWarrantyStatusInfoText = (
    type?: 'no-info' | 'extended' | string,
    daysToEnd?: number,
) =>
    type !== 'no-info'
        ? _getWarrantyToEndDaysText(type === 'extended', daysToEnd)
        : i18next.t(`${WARRANTY_TRANSLATION_PATH}.missingToEndAction`);

const _getWarrantyToEndDaysText = (extended: boolean, daysToEnd?: number) =>
    extended
        ? i18next.t(`${WARRANTY_TRANSLATION_PATH}.lifetime`)
        : `${daysToEnd} ` +
          i18next.t(`${WARRANTY_TRANSLATION_PATH}.days`, {count: daysToEnd});

const _warrantyInfoText = (show: boolean, info: string) =>
    show ? info : i18next.t(`${WARRANTY_TRANSLATION_PATH}.expired`);

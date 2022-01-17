import {useTranslation} from 'react-i18next';

export const useMergedTranslation = (prefix: string) =>
    useTranslation(['backend', 'local'], {keyPrefix: prefix});

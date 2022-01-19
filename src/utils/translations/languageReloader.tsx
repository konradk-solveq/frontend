import React, {useEffect} from 'react';
import {useAppSelector} from '@hooks/redux';

import {changeLanguage} from '@utils/translations/useMergedTranslation';

const LanguageReloader: React.FC = () => {
    const language: string = useAppSelector(state => state.user.language);

    useEffect(() => {
        changeLanguage(language);
    }, [language]);

    return null;
};

export default LanguageReloader;

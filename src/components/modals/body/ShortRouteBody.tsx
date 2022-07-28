import React from 'react';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {BodyPrimary, Header3} from '@src/components/texts/texts';
import {getFVerticalPx} from '@src/theme/utils/appLayoutDimensions';

const boldedText = (string: string) => {
    const stringToBold = string.split('**');

    if (stringToBold?.[1]) {
        return (
            <>
                {stringToBold?.[0] || ''}
                <Header3>{stringToBold?.[1]}</Header3>
                {stringToBold?.[2] || ''}
            </>
        );
    }

    return string;
};

interface IProps {
    showAlterMessage?: string;
}

const ShortRouteBody: React.FC<IProps> = ({showAlterMessage}: IProps) => {
    const {t} = useMergedTranslation('CounterThankYouPage');

    return (
        <>
            {!showAlterMessage ? (
                <>
                    <BodyPrimary>
                        {boldedText(t('errorMessageTitle'))}
                    </BodyPrimary>
                    <BodyPrimary style={{marginTop: getFVerticalPx(16)}}>
                        {t('errorMessageContent')}
                    </BodyPrimary>
                </>
            ) : (
                <BodyPrimary>{showAlterMessage}</BodyPrimary>
            )}
        </>
    );
};

export default ShortRouteBody;

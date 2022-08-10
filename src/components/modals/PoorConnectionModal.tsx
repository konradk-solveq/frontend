import React, {useState} from 'react';
import {useEffect} from 'react';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {ErrorModal} from '@src/components/modals';

interface IProps {
    onAbort: () => void;
}

const PoorConnectionModal: React.FC<IProps> = ({onAbort}: IProps) => {
    const {t} = useMergedTranslation('PublishPoorConnectionPage');

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowModal(true);
        }, 30000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const onCloseHandler = () => {
        setShowModal(false);
    };

    const onAbortHandler = () => {
        setShowModal(false);
        onAbort();
    };

    return (
        <ErrorModal
            showModal={showModal}
            errorTitle={t('title')}
            errorMessage={t('content')}
            handleClose={onAbortHandler}
            handleRetryAction={onCloseHandler}
            primaryActionButtonText={t('continueBtn')}
            secondaryActionButtonText={t('cancelBtn')}
            isFullScreen
        />
    );
};

export default PoorConnectionModal;

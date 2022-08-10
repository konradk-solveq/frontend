import React from 'react';
import ShortRouteBody from './body/ShortRouteBody';
import {ErrorModal} from '@src/components/modals';

interface IProps {
    showModal: boolean;
    onClose: () => void;
    showAlterMessage?: string;
    errorTitle: string;
}

const ShortRouteModal: React.FC<IProps> = ({
    showModal,
    onClose,
    showAlterMessage,
    errorTitle,
}: IProps) => {
    return (
        <ErrorModal
            errorTitle={errorTitle}
            showModal={showModal}
            handleClose={onClose}
            errorMessageComponent={
                <ShortRouteBody showAlterMessage={showAlterMessage} />
            }
        />
    );
};

export default ShortRouteModal;

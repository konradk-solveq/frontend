import React from 'react';
import {Modal, Platform} from 'react-native';

import ShortRouteBody from '@sharedComponents/modals/body/shortRouteBody';

const isAndroid = Platform.OS === 'android';

interface IProps {
    showModal: boolean;
    onClose: () => void;
    showAlterMessage?: string;
}

const ShortRouteModal: React.FC<IProps> = ({
    showModal,
    onClose,
    showAlterMessage,
}: IProps) => {
    const onCloseHandler = () => {
        onClose();
    };

    return (
        <Modal
            animationType="slide"
            visible={showModal}
            presentationStyle="fullScreen"
            hardwareAccelerated={isAndroid}
            statusBarTranslucent
            onRequestClose={onCloseHandler}>
            <ShortRouteBody
                showAlterMessage={showAlterMessage}
                onClose={onCloseHandler}
            />
        </Modal>
    );
};

export default ShortRouteModal;

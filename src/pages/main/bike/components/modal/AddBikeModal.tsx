import React, {useEffect, useState} from 'react';
import {GestureResponderEvent, Modal, StyleSheet} from 'react-native';

import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

import colors from '@theme/colors';
import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';

import {Backdrop} from '@components/backdrop';
import {BottomModal, ModalHeader} from '@components/modals';
import {HorizontalSpacer} from '@components/divider';
import {AddBikeTile} from '@components/tiles';
import {SignpostSvg} from '@components/svg';
import {screenHeight, SMALL_SCREEN_HEIGHT} from '@theme/commonStyle';

const modalHeight = screenHeight <= SMALL_SCREEN_HEIGHT ? 498 : 458;
const imageContinaerHeight = 136;

interface IProps {
    onAddBike: () => void;
    onAddOtherBike: (e: GestureResponderEvent) => void;
    onClose: () => void;
    showModal?: boolean;
    height?: number;
    testID?: string;
}

const AddBikeModal: React.FC<IProps> = ({
    onAddBike,
    onAddOtherBike,
    onClose,
    showModal = false,
    height = modalHeight,
    testID = 'add-bike-modal-id',
}: IProps) => {
    const {t} = useMergedTranslation('MainBike.AddBikeTile');

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(
            () => {
                setVisible(showModal);
            },
            showModal ? 0 : 800,
        );

        return () => clearTimeout(timer);
    }, [showModal]);

    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
            testID={testID}>
            <BottomModal
                show={showModal}
                openModalHeight={getFVerticalPx(height)}
                header={
                    <>
                        <HorizontalSpacer height={16} />
                        <ModalHeader
                            onPress={onClose}
                            testID={`${testID}-bike-modal-header`}
                        />
                    </>
                }
                style={{backgroundColor: colors.white}}
                testID={`${testID}-bottom-modal`}>
                <AddBikeTile
                    header={t('header2')}
                    image={<SignpostSvg />}
                    height={'100%'}
                    onPressPrimary={onAddBike}
                    onPressSecondary={onAddOtherBike}
                    imageContainer={styles.imageContainer}
                    testID={`${testID}-add-bike-tile`}
                />
            </BottomModal>
            <Backdrop isVisible onPress={onClose} />
        </Modal>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        marginTop: -getFVerticalPx(20),
        marginBottom: getFVerticalPx(16),
        height: getFVerticalPx(imageContinaerHeight),
        width: '100%',
        alignItems: 'center',
    },
});

export default React.memo(AddBikeModal);

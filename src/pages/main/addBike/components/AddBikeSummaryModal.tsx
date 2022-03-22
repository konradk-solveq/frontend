import React from 'react';
import {StyleSheet, View} from 'react-native';

import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

import colors from '@theme/colors';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import {getFFontSize, getFVerticalPx} from '@theme/utils/appLayoutDimensions';

import {Backdrop} from '@components/backdrop';
import {IconButton} from '@components/buttons';
import {BottomModal} from '@components/modals';
import {Header2} from '@components/texts/texts';
import {AddBikeSummaryContainer} from '@containers/AddBike';
import {HorizontalSpacer} from '@components/divider';

interface IProps {
    bikeData: {bikeName: string; frameNumber: string; imageUrl: string};
    onAddBike: () => void;
    onClose: () => void;
    header?: string;
    showModal?: boolean;
    testID?: string;
}

const AddBikeSummaryModal: React.FC<IProps> = ({
    bikeData,
    onAddBike,
    onClose,
    header = '',
    showModal = false,
    testID = 'add-bike-summary-modal',
}: IProps) => {
    const {t} = useMergedTranslation('AddBikeSummary');

    return (
        <>
            <BottomModal
                show={showModal}
                openModalHeight={528}
                header={
                    <ModalHeader
                        header={header || t('header')}
                        onPress={onClose}
                        testID={`${testID}-modal-header`}
                    />
                }
                style={{backgroundColor: colors.white}}
                testID={testID}>
                <AddBikeSummaryContainer
                    onAddBike={onAddBike}
                    {...bikeData}
                    testID={`${testID}-summary`}
                />
            </BottomModal>
            <Backdrop isVisible={showModal} />
        </>
    );
};

interface IModalProps {
    onPress: () => void;
    header?: string;
    testID?: string;
}

const ModalHeader: React.FC<IModalProps> = React.memo(
    ({onPress, header = '', testID = 'modal-header-test-id'}: IModalProps) => {
        return (
            <>
                <HorizontalSpacer height={16} />
                <View style={styles.modalHeaderContainer} testID={testID}>
                    <View style={styles.modalHeaderButtonContainer}>
                        <IconButton
                            icon={MykrossIconFont.MYKROSS_ICON_EXIT}
                            iconColor={colors.black}
                            iconSize={14}
                            onPress={onPress}
                            style={styles.modalHeaderButton}
                        />
                    </View>
                    <Header2 algin="center" testID={`${testID}-header`}>
                        {header}
                    </Header2>
                </View>
            </>
        );
    },
);

const styles = StyleSheet.create({
    modalHeaderContainer: {
        width: '100%',
        marginBottom: getFVerticalPx(24),
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalHeaderButtonContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    modalHeaderButton: {
        height: getFFontSize(24),
    },
});

export default AddBikeSummaryModal;

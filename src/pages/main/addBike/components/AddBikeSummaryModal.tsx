import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

import colors from '@theme/colors';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import {getFFontSize, getFVerticalPx} from '@theme/utils/appLayoutDimensions';

import {Backdrop} from '@components/backdrop';
import {IconButton} from '@components/buttons';
import {BottomModal} from '@components/modals';
import {Header2} from '@components/texts/texts';
import {
    AddBikeSummaryContainer,
    AddOtherBikeSummaryContainer,
} from '@containers/AddBike';
import {HorizontalSpacer} from '@components/divider';

const HEIGHT_WITH_PLACEHOLDER = 443;

interface IProps {
    bikeData: {
        bikeName: string;
        frameNumber: string;
        imageUrl?: string;
        producer?: string;
    };
    onAddBike: () => void;
    onClose: () => void;
    header?: string;
    showModal?: boolean;
    height?: number;
    otherBike?: boolean;
    testID?: string;
}

const AddBikeSummaryModal: React.FC<IProps> = ({
    bikeData,
    onAddBike,
    onClose,
    header = '',
    showModal = false,
    height = 528,
    otherBike = false,
    testID = 'add-bike-summary-modal',
}: IProps) => {
    const {t} = useMergedTranslation('AddBikeSummary');
    const {bottom} = useSafeAreaInsets();
    const modalH = useMemo(
        () => (bikeData?.imageUrl ? height : HEIGHT_WITH_PLACEHOLDER),
        [bikeData?.imageUrl, height],
    );
    const modalHeight = useMemo(() => getFVerticalPx(modalH) - bottom, [
        modalH,
        bottom,
    ]);

    return (
        <>
            <BottomModal
                show={showModal}
                openModalHeight={modalHeight}
                header={
                    <ModalHeader
                        header={header || t('header')}
                        onPress={onClose}
                        testID={`${testID}-modal-header`}
                    />
                }
                style={{backgroundColor: colors.white}}
                testID={testID}>
                {!otherBike ? (
                    <AddBikeSummaryContainer
                        onAddBike={onAddBike}
                        {...bikeData}
                        testID={`${testID}-summary`}
                    />
                ) : (
                    <AddOtherBikeSummaryContainer
                        onAddBike={onAddBike}
                        {...bikeData}
                        testID={`${testID}-other-summary`}
                    />
                )}
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
                            iconSize={24}
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

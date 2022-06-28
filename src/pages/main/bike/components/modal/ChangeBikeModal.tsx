import {getFVerticalPx, getFHorizontalPx} from '@helpers/appLayoutDimensions';
import {IconButton, SecondaryButton} from '@components/buttons';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import colors from '@theme/colors';
import {BottomModal} from '@components/modals';
import React, {useCallback, useMemo} from 'react';
import {
    View,
    StyleSheet,
    Pressable,
    Dimensions,
    ScrollView,
    Modal,
} from 'react-native';
import {Header2, BodyPrimary} from '@components/texts/texts';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {UserBike} from '@models/userBike.model';
import {HorizontalDivider} from '@components/divider';
import {TextIcon} from '@components/icons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {isAndroid} from '@utils/platform';
import {Backdrop} from '@components/backdrop';

interface IProps {
    visible: boolean;
    onCloseBottomModal: () => void;
    onAddKrossBike: () => void;
    bikes: UserBike[];
    onBikeSelect: (bike: UserBike) => void;
    selectedBike: UserBike | null;
    testID?: string;
}

interface SingleBikeIProps {
    bike: UserBike;
    isSelected: boolean;
    onBikeSelect: (bike: UserBike) => void;
}

const {height: screenHeight} = Dimensions.get('window');

const SingleBike = ({bike, isSelected, onBikeSelect}: SingleBikeIProps) => {
    const handleBikePress = useCallback(() => onBikeSelect(bike), [
        bike,
        onBikeSelect,
    ]);
    return (
        <>
            <Pressable onPress={handleBikePress}>
                <View style={styles.singleBike}>
                    <BodyPrimary>{bike.description.name}</BodyPrimary>
                    {isSelected && (
                        <TextIcon icon={MykrossIconFont.MYKROSS_ICON_OK} />
                    )}
                </View>
            </Pressable>
            <HorizontalDivider />
        </>
    );
};

const ChangeBikeModal = ({
    visible,
    onCloseBottomModal,
    bikes,
    onBikeSelect,
    selectedBike,
    onAddKrossBike,
    testID = 'change-bike-modal-id',
}: IProps) => {
    const {t} = useMergedTranslation('MainBike');
    const {bottom, top} = useSafeAreaInsets();
    /**
     * header and button padding are 48 units each,
     * 28 units stand for button margin
     * bikes.length * 48 takes care of adding height relatively to the number of bikes
     */
    const modalHeight = useMemo(() => {
        const modalH =
            getFVerticalPx(2 * 48 + 28 + bikes.length * 48) +
            bottom +
            (isAndroid ? getFVerticalPx(50) : 0);
        const maxHeight = screenHeight - top;
        return maxHeight < modalH ? maxHeight : modalH;
    }, [bikes.length, bottom, top]);
    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
            testID={testID}>
            <BottomModal
                show={visible}
                openModalHeight={getFVerticalPx(modalHeight)}
                header={
                    <View style={styles.headerContainer}>
                        <Header2>{t('chooseBike')}</Header2>
                        <View style={styles.closeButton}>
                            <IconButton
                                icon={MykrossIconFont.MYKROSS_ICON_EXIT}
                                iconColor={colors.black}
                                onPress={onCloseBottomModal}
                            />
                        </View>
                    </View>
                }
                style={{backgroundColor: colors.white}}
                testID={`${testID}-bottom-modal`}>
                <ScrollView>
                    {bikes.map(bike => (
                        <SingleBike
                            key={bike.description.serial_number}
                            bike={bike}
                            isSelected={
                                !!selectedBike?.description.serial_number &&
                                bike.description.serial_number ===
                                    selectedBike?.description.serial_number
                            }
                            onBikeSelect={onBikeSelect}
                        />
                    ))}
                </ScrollView>
                <SecondaryButton
                    style={styles.addButton}
                    text={t('addNextBike')}
                    onPress={onAddKrossBike}
                    withoutShadow
                />
            </BottomModal>
            <Backdrop isVisible={visible} />
        </Modal>
    );
};

export default ChangeBikeModal;

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: colors.white,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        paddingVertical: getFVerticalPx(16),
    },
    closeButton: {
        position: 'absolute',
        paddingTop: getFVerticalPx(5),
        left: 0,
        top: 0,
    },
    singleBike: {
        paddingLeft: getFHorizontalPx(16),
        paddingRight: getFHorizontalPx(20),
        paddingVertical: getFVerticalPx(16),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    addButton: {
        width: '100%',
        marginBottom: getFVerticalPx(28),
    },
});

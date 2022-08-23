import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {BottomModal} from '@components/modals/index';
import {getFHorizontalPx, getFVerticalPx} from '@helpers/appLayoutDimensions';
import {IconButton} from '@components/buttons';
import colors from '@theme/colors';
import {Backdrop} from '@components/backdrop';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import nfc from '@assets/images/nfc/nfc.png';
import {Header2} from '@components/texts/texts';

interface IProps {
    showModal?: boolean;
    onPressCancel: () => void;
}

const ScanModal: React.FC<IProps> = ({onPressCancel, showModal}: IProps) => {
    const {t} = useMergedTranslation('TutorialNFCmodal');

    return (
        <>
            <BottomModal
                show={showModal}
                transparent
                openModalHeight={getFVerticalPx(365 + 32)}>
                <View style={styles.wrap}>
                    <IconButton
                        icon={MykrossIconFont.MYKROSS_ICON_EXIT}
                        onPress={onPressCancel}
                        iconColor={colors.black}
                    />
                    <View style={styles.content}>
                        <Image
                            source={nfc}
                            style={styles.image}
                            resizeMethod={'resize'}
                        />
                        <Header2>{t('text')}</Header2>
                    </View>
                </View>
            </BottomModal>
            <Backdrop isVisible={showModal} onPress={onPressCancel} />
        </>
    );
};

export default ScanModal;

const styles = StyleSheet.create({
    wrap: {
        margin: getFHorizontalPx(16),
        height: getFVerticalPx(365),
        backgroundColor: colors.white,
        borderRadius: getFHorizontalPx(24),
    },
    content: {
        flex: 1,
        alignItems: 'center',
    },
    image: {
        height: getFVerticalPx(240),
        resizeMode: 'contain',
    },
});

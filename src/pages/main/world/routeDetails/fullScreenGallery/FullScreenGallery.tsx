import React, {useCallback} from 'react';
import {Modal, Text, View} from 'react-native';

import {isAndroid} from '@utils/platform';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';
import useStatusBarHeight from '@hooks/statusBarHeight';

import ImageGallery from '@sharedComponents/imageGallery/imageGallery';
import {CloseBtn} from '@sharedComponents/buttons';

import styles from './style';

interface IProps {
    show?: boolean;
    onClose?: () => void;
    author?: string;
    imagesUrls: string[];
}

const FullScreenGallery: React.FC<IProps> = ({
    show = false,
    onClose,
    author,
    imagesUrls,
}: IProps) => {
    const {t} = useMergedTranslation('RoutesDetails.details');
    const statusBarHeight = useStatusBarHeight();

    const onCloseModal = useCallback(() => {
        if (onClose) {
            onClose();
        }
    }, [onClose]);

    return (
        <Modal
            animationType="slide"
            statusBarTranslucent
            hardwareAccelerated={isAndroid}
            visible={show}
            onRequestClose={onCloseModal}>
            <View
                style={[
                    styles.galleryWrapper,
                    {
                        paddingTop: getFVerticalPx(67) - statusBarHeight,
                    },
                ]}>
                <View
                    style={[
                        styles.closeGalleryBtnContainer,
                        {
                            top: getFVerticalPx(67) - statusBarHeight,
                        },
                    ]}>
                    <CloseBtn onPress={onCloseModal} iconColor="#ffffff" />
                </View>
                <View style={styles.swiperContainer}>
                    <ImageGallery images={imagesUrls} />
                    {author && (
                        <Text style={styles.authorText}>
                            {t('author')}: {author}
                        </Text>
                    )}
                </View>
            </View>
        </Modal>
    );
};

export default FullScreenGallery;

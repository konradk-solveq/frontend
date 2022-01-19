import React from 'react';
import {Modal, View, Text, ScrollView, Platform} from 'react-native';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {getVerticalPx} from '@helpers/layoutFoo';
import useStatusBarHeight from '@hooks/statusBarHeight';
import {BigRedBtn, BigWhiteBtn} from '@sharedComponents/buttons';
import ImgSvg from './imgSvg';

import styles from './style';

const isAndroid = Platform.OS === 'android';

interface IProps {
    showModal: boolean;
    onContinue: () => void;
    onClose: () => void;
    errorMessage?: string;
}

const NoBikeAddedModal: React.FC<IProps> = ({
    showModal,
    errorMessage,
    onContinue,
    onClose,
}: IProps) => {
    const {t} = useMergedTranslation('NoBikeAddedModal');
    const statusBarHeight = useStatusBarHeight();

    return (
        <Modal
            animationType="slide"
            visible={showModal}
            presentationStyle="fullScreen"
            hardwareAccelerated={isAndroid}
            statusBarTranslucent
            onRequestClose={onClose}>
            <View style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.wrap}>
                        <View
                            style={[
                                styles.headerWrapper,
                                {
                                    marginTop:
                                        getVerticalPx(128) - statusBarHeight,
                                },
                            ]}>
                            <Text style={styles.header}>{t('errorTitle')}</Text>
                        </View>
                        <View style={styles.imgage}>
                            <ImgSvg />
                        </View>

                        <View style={styles.contentWrapper}>
                            <Text style={styles.content}>
                                {errorMessage || t('errorMessage')}
                            </Text>
                        </View>

                        <View style={styles.buttonsWrapper}>
                            <BigRedBtn
                                title={t('okBtn')}
                                onpress={onContinue}
                                style={[styles.onPressBtn, styles.bottomBtn]}
                            />
                            <BigWhiteBtn
                                title={t('cancelBtn')}
                                onpress={onClose}
                                style={[styles.onPressBtn, styles.bottomBtn]}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
};

export default NoBikeAddedModal;

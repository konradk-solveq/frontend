import React from 'react';
import {
    Modal,
    View,
    Text,
    ScrollView,
    Platform,
    StyleSheet,
} from 'react-native';
import {I18n} from '../../../../I18n/I18n';
import {
    getFontSize,
    getHorizontalPx,
    getVerticalPx,
    mainButtonsHeight,
} from '../../../helpers/layoutFoo';
import useStatusBarHeight from '../../../hooks/statusBarHeight';
import {BigRedBtn} from '../../../sharedComponents/buttons';
import ImgSvg from './imgSvg';

const isAndroid = Platform.OS === 'android';

interface IProps {
    showModal: boolean;
    errorMessage: string;
    onClose: () => void;
}

const FailedResponseModal: React.FC<IProps> = ({
    showModal,
    errorMessage,
    onClose,
}: IProps) => {
    const trans: any = I18n.t('PublishThankYouPage');
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
                                        getVerticalPx(138) - statusBarHeight,
                                },
                            ]}>
                            <Text style={styles.header}>
                                {trans.errorTitle}
                            </Text>
                        </View>
                        <ImgSvg />

                        <View style={styles.contentWrapper}>
                            <Text style={styles.content}>{errorMessage}</Text>
                        </View>

                        <View style={styles.buttonsWrapper}>
                            <BigRedBtn
                                title={trans.okBtn}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    wrap: {
        flex: 1,
        marginHorizontal: getHorizontalPx(40),
        marginBottom: getVerticalPx(65),
        justifyContent: 'space-between',
    },
    headerWrapper: {
        marginBottom: getVerticalPx(30),
    },
    header: {
        fontFamily: 'DIN2014Narrow-Regular',
        textAlign: 'center',
        fontSize: getFontSize(40),
        paddingVertical: getVerticalPx(5),
        color: '#d8232a',
    },
    imgage: {
        marginTop: getVerticalPx(20),
    },
    contentWrapper: {
        marginTop: getVerticalPx(20),
        marginBottom: getVerticalPx(108),
    },
    content: {
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: getFontSize(23),
        color: '#414141',
    },
    buttonsWrapper: {
        marginTop: getVerticalPx(50),
    },
    onPressBtn: {
        height: mainButtonsHeight(50),
    },
    bottomBtn: {
        marginTop: getVerticalPx(30),
    },
    iconContainer: {
        alignItems: 'flex-end',
    },
    icon: {
        marginBottom: getVerticalPx(30),
    },
});

export default FailedResponseModal;

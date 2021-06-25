import React from 'react';
import {
    Modal,
    View,
    Text,
    ScrollView,
    Platform,
    StyleSheet,
} from 'react-native';
import {I18n} from '../../../../../../I18n/I18n';
import useStatusBarHeight from '../../../../../hooks/statusBarHeight';
import {BigWhiteBtn} from '../../../../../sharedComponents/buttons';
import ImgSvg from './imgSvg';

const isAndroid = Platform.OS === 'android';

interface IProps {
    showModal: boolean;
    errorMessage: string;
    onClose: () => void;
}

const WrongCredentialsModal: React.FC<IProps> = ({
    showModal,
    errorMessage,
    onClose,
}: IProps) => {
    const trans: any = I18n.t('Login');
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
                <ScrollView>
                    <View style={styles.wrap}>
                        <View
                            style={[
                                styles.headerWrapper,
                                {marginTop: 138 - statusBarHeight},
                            ]}>
                            <Text style={styles.header}>
                                {trans.authErrorTitle}
                            </Text>
                        </View>
                        <ImgSvg />

                        <View style={styles.contentWrapper}>
                            <Text style={styles.content}>{errorMessage}</Text>
                        </View>

                        <View style={styles.buttonsWrapper}>
                            <BigWhiteBtn
                                title={trans.authErrorBtn}
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
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    wrap: {
        flex: 1,
        marginHorizontal: 40,
        marginBottom: 65,
        justifyContent: 'space-between',
    },
    headerWrapper: {
        marginBottom: 30,
    },
    header: {
        fontFamily: 'DIN2014Narrow-Regular',
        textAlign: 'center',
        fontSize: 40,
        paddingVertical: 5,
        color: '#d8232a',
    },
    imgage: {
        marginTop: 20,
    },
    contentWrapper: {
        marginTop: 20,
        marginBottom: 108,
    },
    content: {
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: 23,
        color: '#414141',
    },
    buttonsWrapper: {
        marginTop: 50,
    },
    onPressBtn: {
        height: 50,
    },
    bottomBtn: {
        marginTop: 30,
    },
    iconContainer: {
        alignItems: 'flex-end',
    },
    icon: {
        marginBottom: 30,
    },
});

export default WrongCredentialsModal;
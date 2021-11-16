import React from 'react';
import {View, Text, Modal, StyleSheet, ScrollView} from 'react-native';

import useStatusBarHeight from '../../../../hooks/statusBarHeight';
import {
    BigRedBtn,
    BigWhiteBtn,
    ShareBtn,
} from '../../../../sharedComponents/buttons';

import {useAppSelector} from '../../../../hooks/redux';
import ImgSvg from './imgSvg';
import StatsSummary from './statsSummary';
import {I18n} from '../../../../../I18n/I18n';
import {
    getFontSize,
    getHorizontalPx,
    getVerticalPx,
<<<<<<< HEAD
    mainButtonsHeight,
=======
>>>>>>> eeb10bc (modals)
} from '@src/helpers/layoutFoo';

interface IProps {
    showModal?: boolean;
    onPress: () => void;
    onBackPress: () => void;
    onPressShareBtn?: () => void;
}

const ThankYouPageModal: React.FC<IProps> = ({
    showModal,
    onPress,
    onBackPress,
    onPressShareBtn,
}: IProps) => {
    const userName = useAppSelector<string>(state => state.user.userName);
    const statusBarHeight = useStatusBarHeight();
    const trans: any = I18n.t('ThankYouPage');

    const onShareHandler = () => {
        if (onPressShareBtn) {
            onPressShareBtn();
            return;
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
            onRequestClose={onBackPress}>
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.wrap}>
                        <ShareBtn
                            onPress={onShareHandler}
                            containerStyle={styles.iconContainer}
                            iconStyle={[
                                styles.icon,
                                {
                                    marginTop:
                                        getVerticalPx(66) - statusBarHeight,
                                },
                            ]}
                        />
                        <View style={styles.headerWrapper}>
                            <Text style={styles.header}>
                                {`${userName || trans.defaultName}${
                                    trans.titleSufix
                                }`}
                            </Text>
                        </View>
                        <ImgSvg />

                        <StatsSummary />
                        <View style={styles.buttonsWrapper}>
                            <BigRedBtn
                                title={trans.publishBtn}
                                onpress={onPress}
                                style={styles.onPressBtn}
                            />
                            <BigWhiteBtn
                                title={trans.cancelButton}
                                onpress={onBackPress}
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
        marginHorizontal: getHorizontalPx(40),
        marginBottom: getVerticalPx(65),
        justifyContent: 'space-between',
    },
    headerWrapper: {
        marginBottom: getVerticalPx(20),
    },
    header: {
        fontFamily: 'DIN2014Narrow-Regular',
        textAlign: 'center',
        fontSize: getFontSize(40),
        paddingVertical: getVerticalPx(5),
        color: '#2cba3f',
    },
    imgage: {
        marginTop: getVerticalPx(20),
    },
    buttonsWrapper: {
        marginTop: getVerticalPx(50),
    },
    onPressBtn: {
<<<<<<< HEAD
        height: mainButtonsHeight(50),
=======
        height: getVerticalPx(50),
>>>>>>> eeb10bc (modals)
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

export default ThankYouPageModal;

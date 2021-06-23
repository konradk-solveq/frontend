import React from 'react';
import {
    View,
    Text,
    Modal,
    StyleSheet,
    ScrollView,
    Platform,
} from 'react-native';

import useStatusBarHeight from '../../../hooks/statusBarHeight';
import {BigRedBtn} from '../../buttons';

import {useAppSelector} from '../../../hooks/redux';
import ImgSvg from './imgSvg';
import {I18n} from '../../../../I18n/I18n';
import {getVerticalPx} from '../../../helpers/layoutFoo';

interface IProps {
    showModal?: boolean;
    onPress: () => void;
    onBackPress: () => void;
    isPublished?: boolean;
}

const PublishRouteThankYouPageModal: React.FC<IProps> = ({
    showModal,
    onPress,
    onBackPress,
    isPublished,
}: IProps) => {
    const userName = useAppSelector<string>(state => state.user.userName);
    const statusBarHeight = useStatusBarHeight();
    const trans: any = I18n.t('PublishThankYouPage');

    return (
        <Modal
            statusBarTranslucent
            animationType="slide"
            transparent={true}
            hardwareAccelerated={Platform.OS === 'android'}
            visible={showModal}
            onRequestClose={onBackPress}>
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
                                        getVerticalPx(136) - statusBarHeight,
                                },
                            ]}>
                            <Text style={styles.header}>
                                {`${userName || trans.defaultName}${
                                    trans.titleSufix
                                }`}
                                {`${
                                    isPublished
                                        ? trans.titleSufixPublished
                                        : trans.titleSufixSaved
                                }`}
                            </Text>
                        </View>
                        <ImgSvg />

                        <View style={styles.buttonsWrapper}>
                            <BigRedBtn
                                title={trans.okBtn}
                                onpress={onPress}
                                style={styles.onPressBtn}
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
        height: '100%',
        marginHorizontal: 40,
        marginBottom: getVerticalPx(65),
        justifyContent: 'space-between',
    },
    headerWrapper: {
        marginBottom: getVerticalPx(37),
    },
    header: {
        fontFamily: 'DIN2014Narrow-Regular',
        textAlign: 'center',
        fontSize: 30,
        paddingVertical: 5,
        color: '#2cba3f',
    },
    imgage: {
        marginTop: getVerticalPx(20),
    },
    buttonsWrapper: {
        marginBottom: getVerticalPx(65),
    },
    onPressBtn: {
        height: 50,
    },
});

export default PublishRouteThankYouPageModal;

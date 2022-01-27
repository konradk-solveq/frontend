import React from 'react';
import {
    View,
    Text,
    Modal,
    StyleSheet,
    ScrollView,
    Platform,
    SafeAreaView,
} from 'react-native';

import useStatusBarHeight from '@hooks/statusBarHeight';
import {BigRedBtn} from '../../buttons';

import {useAppSelector} from '@hooks/redux';
import ImgSvg from './imgSvg';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {
    getFontSize,
    getHorizontalPx,
    getVerticalPx,
    mainButtonsHeight,
} from '@helpers/layoutFoo';

const isIOS = Platform.OS === 'ios';

interface IProps {
    showModal?: boolean;
    onPress: () => void;
    onBackPress: () => void;
    isPublished?: boolean;
    wasPublished?: boolean;
}

const PublishRouteThankYouPageModal: React.FC<IProps> = ({
    showModal,
    onPress,
    onBackPress,
    isPublished,
    wasPublished,
}: IProps) => {
    const userName = useAppSelector<string>(state => state.user.userName);
    const statusBarHeight = useStatusBarHeight();
    const {t} = useMergedTranslation('PublishThankYouPage');

    const publishedText = wasPublished
        ? t('titleSuffixUpdated')
        : t('titleSuffixPublished');

    return (
        <Modal
            statusBarTranslucent
            animationType="slide"
            transparent={true}
            hardwareAccelerated={!isIOS}
            visible={showModal}
            onRequestClose={onBackPress}>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.wrap}>
                        <View
                            style={[
                                {
                                    marginTop:
                                        getVerticalPx(136) - statusBarHeight,
                                },
                            ]}>
                            <Text style={styles.header}>
                                {`${userName || t('defaultName')}${t(
                                    'titleSuffix',
                                )}`}
                                {`${
                                    isPublished
                                        ? publishedText
                                        : t('titleSuffixSaved')
                                }`}
                            </Text>
                        </View>
                        <ImgSvg style={styles.imgage} />
                    </View>
                </ScrollView>

                <SafeAreaView>
                    <View
                        style={[
                            styles.buttonsWrapper,
                            {bottom: isIOS ? -10 : -statusBarHeight},
                        ]}>
                        <BigRedBtn
                            title={t('okBtn')}
                            onpress={onPress}
                            style={styles.onPressBtn}
                        />
                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        width: getHorizontalPx(414),
        height: getVerticalPx(896),
        backgroundColor: 'white',
    },
    wrap: {
        marginHorizontal: getHorizontalPx(40),
    },

    header: {
        fontFamily: 'DIN2014Narrow-Regular',
        textAlign: 'center',
        fontSize: getFontSize(40),
        color: '#2cba3f',
        lineHeight: getFontSize(54),
    },
    imgage: {
        marginTop: getVerticalPx(61),
        width: getHorizontalPx(414),
        height: getHorizontalPx(368),
        left: getHorizontalPx(-40),
        marginBottom: getVerticalPx(65 + 20) + mainButtonsHeight(50),
    },
    buttonsWrapper: {
        position: 'absolute',
        left: 0,
        width: getHorizontalPx(414),
        height: getVerticalPx(65 + 20) + mainButtonsHeight(50),
        backgroundColor: 'white',
    },
    onPressBtn: {
        position: 'absolute',
        left: getHorizontalPx(40),
        width: getHorizontalPx(334),
        bottom: getVerticalPx(65),
        height: mainButtonsHeight(50),
    },
});

export default PublishRouteThankYouPageModal;

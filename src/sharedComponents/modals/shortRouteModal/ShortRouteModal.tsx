import React from 'react';
import {Modal, View, Text, ScrollView, Platform} from 'react-native';

import {I18n} from '@translations/I18n';
import useStatusBarHeight from '@hooks/statusBarHeight';
import {BigRedBtn} from '@sharedComponents/buttons';
import {getVerticalPx} from '@helpers/layoutFoo';

import ImgSvg from './imgSvg';

import styles from './style';

const isAndroid = Platform.OS === 'android';

const boldedText = (string: string) => {
    const stringToBold = string.split('**');

    if (stringToBold?.[1]) {
        return (
            <>
                {stringToBold?.[0] || ''}
                <Text style={styles.bolded}>{stringToBold?.[1]}</Text>
                {stringToBold?.[2] || ''}
            </>
        );
    }

    return string;
};

interface IProps {
    showModal: boolean;
    onClose: () => void;
    showAlterMessage?: string;
}

const ShortRouteModal: React.FC<IProps> = ({
    showModal,
    onClose,
    showAlterMessage,
}: IProps) => {
    const trans: any = I18n.t('CounterThankYouPage');
    const statusBarHeight = useStatusBarHeight();

    const onCloseHandler = () => {
        onClose();
    };

    return (
        <Modal
            animationType="slide"
            visible={showModal}
            presentationStyle="fullScreen"
            hardwareAccelerated={isAndroid}
            statusBarTranslucent
            onRequestClose={onCloseHandler}>
            <View style={styles.container}>
                <ScrollView>
                    <Text
                        style={[
                            styles.title,
                            {marginTop: getVerticalPx(138) - statusBarHeight},
                        ]}>
                        {trans.errorTitle}
                    </Text>

                    <ImgSvg containerStyle={styles.imgage} />

                    {!showAlterMessage ? (
                        <>
                            <Text style={styles.content}>
                                {boldedText(trans.errorMessageTitle)}
                            </Text>
                            <Text style={styles.content}>
                                {trans.errorMessageContent}
                            </Text>
                        </>
                    ) : (
                        <Text style={styles.content}>{showAlterMessage}</Text>
                    )}
                </ScrollView>

                <View style={styles.buttonsWrapper}>
                    <BigRedBtn
                        title={trans.errorCloseBtn}
                        onpress={onCloseHandler}
                        style={styles.btn}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default ShortRouteModal;

import React, {useState} from 'react';
import {useEffect} from 'react';
import {Modal, View, Text, ScrollView, Platform} from 'react-native';
import {I18n} from '../../../../I18n/I18n';
import useStatusBarHeight from '../../../hooks/statusBarHeight';
import {BigWhiteBtn, BigRedBtn} from '../../../sharedComponents/buttons';
import ImgSvg from './imgSvg';

import styles from './style';

const isAndroid = Platform.OS === 'android';

interface IProps {
    onAbort: () => void;
}

const PoorConnectionModal: React.FC<IProps> = ({onAbort}: IProps) => {
    const trans: any = I18n.t('PublishPoorConnectionPage');
    const statusBarHeight = useStatusBarHeight();

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowModal(true);
        }, 120000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const onCloseHandler = () => {
        setShowModal(false);
    };

    const onAbortHandler = () => {
        setShowModal(false);
        onAbort();
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
                            {marginTop: 138 - statusBarHeight},
                        ]}>
                        {trans.title}
                    </Text>

                    <ImgSvg style={styles.imgage} />

                    <Text style={styles.content}>{trans.content}</Text>
                </ScrollView>

                <View style={styles.wrap}>
                    <View style={styles.buttonsWrapper}>
                        <BigRedBtn
                            title={trans.continueBtn}
                            onpress={onCloseHandler}
                            style={styles.btn}
                        />
                        <BigWhiteBtn
                            title={trans.cancelBtn}
                            onpress={onAbortHandler}
                            style={styles.btn}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default PoorConnectionModal;

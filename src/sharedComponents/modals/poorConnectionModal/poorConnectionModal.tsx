import React, {useState} from 'react';
import {useEffect} from 'react';
import {Modal, View, Text, ScrollView, Platform} from 'react-native';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import useStatusBarHeight from '@hooks/statusBarHeight';
import {BigWhiteBtn, BigRedBtn} from '@sharedComponents/buttons';
import ImgSvg from './imgSvg';

import {commonStyle as comStyle} from '@helpers/commonStyle';
import styles from './style';

const isAndroid = Platform.OS === 'android';

interface IProps {
    onAbort: () => void;
}

const PoorConnectionModal: React.FC<IProps> = ({onAbort}: IProps) => {
    const {t} = useMergedTranslation('PublishPoorConnectionPage');
    const statusBarHeight = useStatusBarHeight();

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowModal(true);
        }, 30000);

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
            <View style={comStyle.container}>
                <ScrollView>
                    <Text
                        style={[
                            styles.title,
                            {marginTop: 138 - statusBarHeight},
                        ]}>
                        {t('title')}
                    </Text>

                    <ImgSvg style={styles.imgage} />

                    <Text style={styles.content}>{t('content')}</Text>
                </ScrollView>

                <View style={styles.wrap}>
                    <View style={styles.buttonsWrapper}>
                        <BigRedBtn
                            title={t('continueBtn')}
                            onpress={onCloseHandler}
                            style={styles.btn}
                        />
                        <BigWhiteBtn
                            title={t('cancelBtn')}
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

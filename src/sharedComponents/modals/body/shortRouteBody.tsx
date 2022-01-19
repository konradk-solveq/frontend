import React from 'react';
import {View, Text, ScrollView} from 'react-native';

import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import useStatusBarHeight from '@hooks/statusBarHeight';
import {BigRedBtn} from '@sharedComponents/buttons';
import {getVerticalPx} from '@helpers/layoutFoo';

import ImgSvg from './imgSvg';

import styles from './style';

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
    onClose: () => void;
    showAlterMessage?: string;
    withBtnLoader?: boolean;
}

const ShortRouteBody: React.FC<IProps> = ({
    showAlterMessage,
    onClose,
    withBtnLoader,
}: IProps) => {
    const {t} = useMergedTranslation('CounterThankYouPage');
    const statusBarHeight = useStatusBarHeight();

    const onCloseHandler = () => {
        onClose();
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text
                    style={[
                        styles.title,
                        {marginTop: getVerticalPx(138) - statusBarHeight},
                    ]}>
                    {t('errorTitle')}
                </Text>

                <ImgSvg containerStyle={styles.imgage} />

                {!showAlterMessage ? (
                    <>
                        <Text style={styles.content}>
                            {boldedText(t('errorMessageTitle'))}
                        </Text>
                        <Text style={styles.content}>
                            {t('errorMessageContent')}
                        </Text>
                    </>
                ) : (
                    <Text style={styles.content}>{showAlterMessage}</Text>
                )}
            </ScrollView>

            <View style={styles.buttonsWrapper}>
                <BigRedBtn
                    title={t('errorCloseBtn')}
                    onpress={onCloseHandler}
                    withLoader={withBtnLoader}
                    disabled={withBtnLoader}
                    testID="big-red-btn-for-short-route"
                    style={styles.btn}
                />
            </View>
        </View>
    );
};

export default ShortRouteBody;

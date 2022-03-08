/**
 * Error boudnary view component
 *
 * @author Sebastian Kasiński
 */

import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import RNRestart from 'react-native-restart';

import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {BigRedBtn, BigWhiteBtn} from '@sharedComponents/buttons';
import ImgSvg from './ImgsSvg';

import styles from './style';

interface IProps {
    error: Error | null;
    resetError: () => void;
}

const ErrorBoundaryView = ({resetError}: IProps) => {
    const {t} = useMergedTranslation('ErrorBoundary');


    /**
     * Restart app
     */
    const restartView = () => {
        RNRestart.Restart();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <ImgSvg style={styles.image} />
                <View>
                    <Text style={styles.title}>{t('header')}</Text>
                    <Text style={styles.body}>{t('body')}</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <BigRedBtn
                        onpress={resetError}
                        title={t('resetButton')}
                        style={styles.button}
                        testID="error-boundary-reset-button"
                    />
                    <BigWhiteBtn
                        onpress={restartView}
                        title={t('restartButton')}
                        style={[styles.button, styles.restartButton]}
                        testID="error-boundary-restart-button"
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ErrorBoundaryView;

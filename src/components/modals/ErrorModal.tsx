import {getFHorizontalPx, getFVerticalPx} from '@helpers/appLayoutDimensions';
import {SecondaryButton} from '@components/buttons';
import colors from '@theme/colors';
import {BottomModal} from '@components/modals';
import React, {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {BodyPrimary, Header1} from '@components/texts/texts';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {isAndroid} from '@utils/platform';
import ErrorSvg from '../svg/ErrorSvg';
import {Backdrop} from '../backdrop';
import {screenHeight} from '@src/theme/commonStyle';

interface IProps {
    showModal: boolean;
    isFullScreen?: boolean;
    handleRetryAction?: () => void;
    handleClose: () => void;
    errorTitle: string;
    errorMessage?: string;
    primaryActionButtonText?: string;
    secondaryActionButtonText?: string;
    testID?: string;
}

const BOTTOM_PADDING_HEIGHT = 24;

const ErrorModal = ({
    showModal,
    isFullScreen = false,
    handleRetryAction,
    handleClose,
    errorTitle,
    errorMessage,
    primaryActionButtonText,
    secondaryActionButtonText,
    testID = 'error-modal-test-id',
}: IProps) => {
    const {t} = useMergedTranslation('ErrorModal');
    const {bottom} = useSafeAreaInsets();

    const modalHeight = useMemo(() => {
        if (isFullScreen) {
            return screenHeight;
        }

        const modalH =
            getFVerticalPx(BOTTOM_PADDING_HEIGHT) +
            bottom +
            getFVerticalPx(516) +
            (isAndroid ? getFVerticalPx(50) : 0);
        return modalH;
    }, [bottom, isFullScreen]);

    return (
        <View style={styles.mainContainer}>
            <BottomModal
                show={showModal}
                openModalHeight={modalHeight}
                style={styles.modalContainer}>
                <View style={styles.contentContainer}>
                    <ErrorSvg />
                    <View style={styles.textContainer}>
                        <Header1
                            algin="center"
                            testID={`${testID}-error-title`}>
                            {errorTitle}
                        </Header1>
                        {errorMessage ? (
                            <BodyPrimary
                                algin="center"
                                testID={`${testID}-error-message`}>
                                {errorMessage}
                            </BodyPrimary>
                        ) : null}
                    </View>
                    {handleRetryAction && (
                        <SecondaryButton
                            style={styles.buttonMargin}
                            text={secondaryActionButtonText || t('retry')}
                            onPress={handleRetryAction}
                            testID={`${testID}-retry-button`}
                        />
                    )}

                    <SecondaryButton
                        style={styles.buttonMargin}
                        text={primaryActionButtonText || t('close')}
                        onPress={handleClose}
                        testID={`${testID}-close-button`}
                    />
                </View>
            </BottomModal>
            <Backdrop isVisible={showModal} />
        </View>
    );
};

export default ErrorModal;

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: '100%',
    },
    modalContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: getFHorizontalPx(16),
        paddingBottom: getFVerticalPx(16),
    },
    buttonMargin: {
        marginTop: getFVerticalPx(16),
    },
    textContainer: {
        marginTop: getFVerticalPx(32),
        marginBottom: getFVerticalPx(24),
    },
});

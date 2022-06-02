import React, {useMemo} from 'react';
import {Modal, StyleSheet, View, ViewStyle} from 'react-native';

import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import colors from '@theme/colors';
import {getFHorizontalPx} from '@theme/utils/appLayoutDimensions';

import {Backdrop} from '@components/backdrop';
import {PrimaryButton, SecondaryButton} from '@components/buttons';
import {HorizontalSpacer} from '@components/divider';
import {WarningSvg} from '@components/svg';
import {Header3} from '@components/texts/texts';

export interface IProps {
    onPress: () => void;
    onCancel?: () => void;
    noCancel?: boolean;
    text?: string;
    pressText?: string;
    cancelText?: string;
    show?: boolean;
    numberOfLines?: number;
    contentStyle?: ViewStyle;
    testID?: string;
}

const Alert: React.FC<IProps> = ({
    show = false,
    onPress,
    onCancel,
    noCancel = false,
    pressText = '',
    cancelText = '',
    text = '',
    numberOfLines = 0,
    contentStyle,
    testID = 'alert-id',
}: IProps) => {
    const {t} = useMergedTranslation('Alert');

    const onPressText = useMemo(() => pressText || t('positive'), [
        pressText,
        t,
    ]);
    const onCancelText = useMemo(() => cancelText || t('negative'), [
        cancelText,
        t,
    ]);

    /**
     * We use modal to overlay navigation components
     * like tab-bottom.
     */
    return (
        <Modal transparent animationType="fade" visible={show} testID={testID}>
            <View style={styles.container}>
                <View style={[styles.tile, contentStyle]}>
                    <HorizontalSpacer height={29.5} />
                    <WarningSvg />
                    <HorizontalSpacer height={13.5} />
                    <Header3
                        algin="center"
                        testID={`${testID}-content`}
                        adjustsFontSizeToFit
                        numberOfLines={numberOfLines}>
                        {text}
                    </Header3>
                    <HorizontalSpacer height={24} />
                    <View>
                        <PrimaryButton
                            onPress={onPress}
                            text={onPressText}
                            style={styles.button}
                            withoutShadow
                            testID={`${testID}-positive-button`}
                        />
                        {!noCancel && onCancel && (
                            <>
                                <HorizontalSpacer height={16} />
                                <SecondaryButton
                                    onPress={onCancel}
                                    text={onCancelText}
                                    style={styles.button}
                                    withoutShadow
                                    testID={`${testID}-negative-button`}
                                />
                            </>
                        )}
                    </View>
                    <HorizontalSpacer height={24} />
                </View>
            </View>

            <Backdrop isVisible style={styles.backdrop} />
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 21,
    },
    tile: {
        width: getFHorizontalPx(278),
        height: getFHorizontalPx(284),
        paddingHorizontal: getFHorizontalPx(32),
        backgroundColor: colors.white,
        borderRadius: getFHorizontalPx(8),
        alignItems: 'center',
    },
    button: {
        width: '100%',
    },
    backdrop: {
        zIndex: 20,
    },
});

export default React.memo(Alert);

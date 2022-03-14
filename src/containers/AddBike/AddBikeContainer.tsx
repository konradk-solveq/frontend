import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    GestureResponderEvent,
    ViewStyle,
    Dimensions,
} from 'react-native';

import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';

import {HorizontalDividerWithSeparator} from '@components/divider';
import {BodyPrimary, Header2} from '@components/texts/texts';
import {LinkButton, PrimaryButton} from '@components/buttons';
import {appContainerHorizontalMargin} from '@src/theme/commonStyle';

const {height} = Dimensions.get('screen');
/* Cut spacer on smaller screen to fit content */
const dividerSpace = height > 768 ? 48 : 14;
/* Cut spacer on smaller screen to fit content */
const upperTextSpace = height > 768 ? 0 : -48;

interface IProps {
    onPressLink: (e: GestureResponderEvent) => void;
    onPressFindByNumber: (e: GestureResponderEvent) => void;
    onPressScanNfc: (e: GestureResponderEvent) => void;
    scanButtonIsDisabled?: boolean;
    style?: ViewStyle;
    testID?: string;
}

const AddBikeContainer: React.FC<IProps> = ({
    onPressLink,
    onPressFindByNumber,
    onPressScanNfc,
    scanButtonIsDisabled = false,
    style,
    testID = 'add-bike-container-test-id',
}: IProps) => {
    const {t} = useMergedTranslation('AddBikeScreen');

    return (
        <View style={[styles.container, style]} testID={testID}>
            <View style={styles.upperCell}>
                <Image
                    source={require('@assets/images/bike_placeholder_.png')}
                    style={styles.image}
                    testID={`${testID}-placeholder-image`}
                />
                <View style={styles.upperTextContainer}>
                    <Header2 algin="center">{t('upperCell.header')}</Header2>
                    <BodyPrimary algin="center">
                        {t('upperCell.body')}
                    </BodyPrimary>
                </View>
            </View>
            <HorizontalDividerWithSeparator separatorText={t('divider')} />
            <View style={styles.bottomCell}>
                <View style={styles.bottomTextContainer}>
                    <Header2
                        algin="center"
                        style={{
                            paddingBottom: getFVerticalPx(16),
                        }}>
                        {t('bottomCell.header')}
                    </Header2>
                    <LinkButton
                        text={t('bottomCell.linkButton')}
                        onPress={onPressLink}
                        testID={`${testID}-link-button`}
                    />
                </View>
                <View style={styles.buttonsContainer}>
                    <PrimaryButton
                        text={t('bottomCell.scanNfcButton')}
                        onPress={onPressScanNfc}
                        style={styles.button}
                        disabled={scanButtonIsDisabled}
                        testID={`${testID}-scan-nfc-button`}
                    />
                    <PrimaryButton
                        text={t('bottomCell.findByNumberButton')}
                        onPress={onPressFindByNumber}
                        testID={`${testID}-find-by-number-button`}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: appContainerHorizontalMargin,
    },
    upperCell: {
        alignItems: 'center',
    },
    bottomCell: {
        marginTop: getFVerticalPx(dividerSpace),
    },
    upperTextContainer: {
        alignItems: 'center',
        marginTop: getFVerticalPx(upperTextSpace),
        marginBottom: getFVerticalPx(dividerSpace),
    },
    bottomTextContainer: {
        alignItems: 'center',
        marginBottom: getFVerticalPx(56),
    },
    buttonsContainer: {
        alignItems: 'center',
    },
    button: {
        marginBottom: getFVerticalPx(16),
    },
    image: {
        width: getFHorizontalPx(364),
        height: getFHorizontalPx(280),
    },
});

export default AddBikeContainer;

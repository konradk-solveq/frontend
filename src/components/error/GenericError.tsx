import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {
    getFontSize,
    getHorizontalPx,
    getVerticalPx,
    mainButtonsHeight,
} from '@helpers/layoutFoo';
import BrokenBike from '@components/svg/brokenBike';
import {SecondaryButton} from '@components/buttons';

interface IProps {
    errorTitle?: string;
    buttonText?: string;
    errorMessage?: string;
    onButtonPress: () => void;
    testID?: string;
}

const GenericError: React.FC<IProps> = ({
    errorTitle,
    errorMessage,
    buttonText,
    onButtonPress,
    testID,
}: IProps) => {
    const {t} = useMergedTranslation('PublishThankYouPage');

    return (
        <View style={styles.container}>
            <View style={styles.wrap}>
                <BrokenBike />
                <Text style={styles.title}>
                    {errorTitle ?? t('errorTitle')}
                </Text>
                {errorMessage && (
                    <View style={styles.messageWrapper}>
                        <Text
                            style={styles.message}
                            testID={`${testID}Message`}>
                            {errorMessage}
                        </Text>
                    </View>
                )}

                <View style={styles.buttonsWrapper}>
                    <SecondaryButton
                        text={buttonText ?? t('btnOk')}
                        onPress={onButtonPress}
                        style={styles.button}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#FAFAFA',
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrap: {
        alignItems: 'center',
        width: getHorizontalPx(294),
    },
    title: {
        fontFamily: 'DIN2014Narrow-Bold',
        textAlign: 'center',
        fontSize: getFontSize(24),
        marginTop: getVerticalPx(24),
    },
    messageWrapper: {
        marginTop: getVerticalPx(20),
    },
    message: {
        fontFamily: 'DIN2014Narrow-Regular',
        fontSize: getFontSize(16),
        color: '#414141',
    },
    buttonsWrapper: {
        marginTop: getVerticalPx(24),
        width: '100%',
    },
    button: {
        height: mainButtonsHeight(48),
    },
});

export default GenericError;

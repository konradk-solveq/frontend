import React from 'react';
import {
    GestureResponderEvent,
    StyleSheet,
    View,
    ImageURISource,
    Image,
} from 'react-native';
import {getFVerticalPx, getFHorizontalPx} from '@helpers/appLayoutDimensions';
import {Header2, Paragraph} from '@components/texts/texts';
import {PrimaryButton} from '@components/buttons';

interface IProps {
    header?: string;
    info?: string;
    buttonText: string;
    onButtonPress: (e: GestureResponderEvent) => void;
    image: ImageURISource;
}

const LocationUsageInfoContainer: React.FC<IProps> = ({
    header,
    info,
    buttonText,
    onButtonPress,
    image,
}: IProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image source={image} style={styles.image} />
                <Header2 style={[styles.text, styles.header]}>{header}</Header2>
                <Paragraph style={[styles.text, styles.info]}>{info}</Paragraph>
            </View>
            <PrimaryButton
                text={buttonText}
                onPress={onButtonPress}
                testID={'location-usage-button-test-id'}
            />
        </View>
    );
};
export default LocationUsageInfoContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: getFVerticalPx(20),
        alignItems: 'center',
    },
    content: {
        flex: 1,
        marginTop: getFVerticalPx(60),
    },
    image: {
        maxHeight: getFVerticalPx(346),
        maxWidth: getFHorizontalPx(390),
    },
    text: {
        marginHorizontal: getFHorizontalPx(60),
        textAlign: 'center',
    },
    header: {
        marginTop: getFVerticalPx(40),
    },
    info: {
        marginTop: getFVerticalPx(16),
    },
});

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Header1, BodyPrimary} from '@components/texts/texts';
import {SecondaryButton} from '@components/buttons';
import {getFVerticalPx} from '@helpers/appLayoutDimensions';
import colors from '@theme/colors';

interface IProps {
    image?: JSX.Element;
    title?: string;
    description?: string;
    buttonText?: string;
    onPress?: () => void;
}

const EmptyStateContainer = ({
    image,
    title,
    description,
    buttonText,
    onPress,
}: IProps) => {
    return (
        <View style={styles.container}>
            {image}
            {!!title && <Header1 style={styles.header}>{title}</Header1>}
            {!!description && (
                <BodyPrimary style={styles.description}>
                    {description}
                </BodyPrimary>
            )}
            {!!buttonText && !!onPress && (
                <SecondaryButton
                    text={buttonText}
                    onPress={onPress}
                    testID={'empty-state-button'}
                    withoutShadow
                    style={styles.button}
                />
            )}
        </View>
    );
};

export default EmptyStateContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.screenBackgroundPrimary,
    },
    header: {marginTop: getFVerticalPx(24), textAlign: 'center'},
    description: {marginTop: getFVerticalPx(8), textAlign: 'center'},
    button: {marginTop: getFVerticalPx(24)},
});

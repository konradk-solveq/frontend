import React from 'react';
import {View, StyleSheet, Image, ImageURISource} from 'react-native';
import {getFHorizontalPx, getFVerticalPx} from '@helpers/appLayoutDimensions';
import {Header1, Paragraph} from '@components/texts/texts';
import colors from '@theme/colors';

interface IProps {
    title: string;
    description: string;
    imgSource: ImageURISource;
}

const OnboardingTile = ({title, description, imgSource}: IProps) => {
    return (
        <View style={styles.container}>
            <Header1 color={colors.deepBlack} style={styles.header}>
                {title}
            </Header1>
            <View style={styles.content}>
                <Image
                    style={styles.image}
                    source={imgSource}
                    resizeMode={'contain'}
                />
            </View>
            <Paragraph style={styles.description}>{description}</Paragraph>
        </View>
    );
};

export default OnboardingTile;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: getFHorizontalPx(20),
        paddingVertical: getFVerticalPx(24),
        borderRadius: getFVerticalPx(10),
        backgroundColor: colors.whiteGrey,
        width: getFHorizontalPx(318),
        height: getFVerticalPx(581),
    },
    header: {
        textAlign: 'center',
    },
    description: {
        marginHorizontal: getFHorizontalPx(14),
        textAlign: 'center',
        color: colors.darkGrey,
    },
    content: {
        flex: 1,
        maxHeight: getFHorizontalPx(417),
        overflow: 'hidden',
    },
    image: {
        height: '100%',
        width: 'auto',
    },
});

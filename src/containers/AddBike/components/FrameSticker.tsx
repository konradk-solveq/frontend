import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';

import {Header3, Paragraph, Subtitle} from '@components/texts/texts';
import colors from '@theme/colors';

import rectangleBackgroundImage from '@assets/images/layout/rectangle_with_shadow.png';

interface IProps {
    title: string;
    frameNumber: string;
    frameDescription: string;
    additionalInfo: string;
    testID?: string;
}

const FrameSticker: React.FC<IProps> = ({
    title,
    frameNumber,
    frameDescription,
    additionalInfo,
    testID = 'frame-sticker-id',
}: IProps) => (
    <View style={styles.container} testID={testID}>
        <View style={styles.floatingBoxContainer}>
            <View style={styles.floatingBox}>
                <Subtitle
                    style={{color: colors.white}}
                    testID={`${testID}-title`}>
                    {title}
                </Subtitle>
            </View>
        </View>

        <View style={styles.stickerContainer}>
            <Image
                source={rectangleBackgroundImage}
                style={styles.rectangleBackgroundImage}
            />

            <View style={styles.tile}>
                <View style={styles.colorizedRectangle} />

                <View style={styles.column}>
                    <View style={styles.floatingSticker} />
                    <View style={styles.frameNumberBox}>
                        <Header3 testID={`${testID}-frame-number`}>
                            {frameNumber}
                        </Header3>
                    </View>
                    <Paragraph
                        color={colors.greyish}
                        style={styles.frameDescriptionText}
                        testID={`${testID}-frame-description`}>
                        {frameDescription}
                    </Paragraph>
                    <Header3
                        style={styles.additionalInfoText}
                        testID={`${testID}-additional-info`}>
                        {additionalInfo}
                    </Header3>
                </View>
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        height: getFVerticalPx(123),
        width: getFHorizontalPx(254.5),
    },
    stickerContainer: {
        height: getFVerticalPx(98.6),
        width: getFHorizontalPx(250),
        borderRadius: getFHorizontalPx(10),
    },
    rectangleBackgroundImage: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width: getFHorizontalPx(254.5),
        height: getFVerticalPx(138),
        borderRadius: getFHorizontalPx(10),
        zIndex: 0,
    },
    tile: {
        height: getFVerticalPx(98.6),
        width: getFHorizontalPx(254.5),
        borderRadius: getFHorizontalPx(10),
        backgroundColor: colors.whiteGrey,
        flexDirection: 'row',
        zIndex: 1,
    },
    column: {
        flexDirection: 'column',
    },
    colorizedRectangle: {
        width: getFVerticalPx(29),
        height: getFVerticalPx(29),
        backgroundColor: colors.darkGrey,
        marginLeft: getFHorizontalPx(13),
        marginRight: getFHorizontalPx(10),
        marginTop: getFVerticalPx(10),
    },
    floatingBoxContainer: {
        height: getFVerticalPx(24.4),
        width: getFHorizontalPx(254.5),
    },
    floatingBox: {
        alignSelf: 'flex-start',
        height: getFVerticalPx(20),
        backgroundColor: colors.red,
        borderRadius: getFHorizontalPx(7),
        paddingHorizontal: getFHorizontalPx(5),
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: getFHorizontalPx(67),
        zIndex: 1,
    },
    floatingSticker: {
        position: 'absolute',
        top: -getFVerticalPx(7.5),
        marginLeft: getFHorizontalPx(48),
        width: getFVerticalPx(1.8),
        height: getFVerticalPx(15.8),
        backgroundColor: colors.red,
    },
    frameNumberBox: {
        paddingHorizontal: getFHorizontalPx(5),
        marginTop: getFVerticalPx(8.5),
        height: getFVerticalPx(26.8),
        borderWidth: getFVerticalPx(1.8),
        borderColor: colors.red,
        borderRadius: getFHorizontalPx(9),
        alignSelf: 'flex-start',
        justifyContent: 'center',
    },
    frameDescriptionText: {
        marginTop: getFVerticalPx(7.7),
        marginLeft: getFHorizontalPx(5),
    },
    additionalInfoText: {
        marginLeft: getFHorizontalPx(5),
    },
});

export default React.memo(FrameSticker);

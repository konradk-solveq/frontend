import React from 'react';
import {
    StyleSheet,
    View,
    GestureResponderEvent,
    Image,
    ViewStyle,
} from 'react-native';

import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';
import {appContainerHorizontalMargin} from '@theme/commonStyle';

import {PrimaryButton} from '@components/buttons';
import {Header2} from '@components/texts/texts';
import {FrameSticker} from '@containers/AddBike/components';

import bikeFrameImage from '@assets/images/bike/bike_frame.png';

interface IProps {
    onPress: (e: GestureResponderEvent) => void;
    style?: ViewStyle;
    testID?: string;
}

const AddBikeFrameInfoContainer: React.FC<IProps> = ({
    onPress,
    style,
    testID = 'add-bike-frame-info-container-id',
}: IProps) => {
    const {t} = useMergedTranslation('AddBikeFrameInfo');

    return (
        <View style={[styles.container, style]} testID={testID}>
            <Header2 algin="center" testID={`${testID}-header`}>
                {t('content.text')}
            </Header2>
            <Image
                source={bikeFrameImage}
                style={styles.image}
                testID={`${testID}-bike-frame-image`}
            />

            <FrameSticker
                title={t('content.frameSticker.title')}
                frameNumber={t('content.frameSticker.frameNumber')}
                frameDescription={t('content.frameSticker.frameDescription')}
                additionalInfo={t('content.frameSticker.additionalInfo')}
                testID={`${testID}-frame-sticker`}
            />

            <PrimaryButton
                onPress={onPress}
                text={t('buttonText')}
                withoutShadow
                style={styles.button}
                testID={`${testID}-button`}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingHorizontal: appContainerHorizontalMargin,
        paddingTop: getFVerticalPx(40),
        paddingBottom: getFVerticalPx(50),
        alignItems: 'center',
    },
    image: {
        marginTop: getFVerticalPx(5),
        width: getFHorizontalPx(364),
        height: getFVerticalPx(280),
    },
    button: {
        marginTop: getFVerticalPx(66),
    },
});

export default AddBikeFrameInfoContainer;

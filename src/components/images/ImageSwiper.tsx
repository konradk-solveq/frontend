import React, {useCallback, useState} from 'react';
import {
    ScrollView,
    ViewStyle,
    ImageStyle,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from 'react-native';

import {getFHorizontalPx} from '@theme/utils/appLayoutDimensions';
import ImageItem from './ImageItem';

const ITEM_WIDTH = getFHorizontalPx(109);
const INIT_IMGS_NUMBER = 4;

interface IProps {
    images: string[];
    containerStyle?: ViewStyle;
    imageStyle?: ImageStyle;
    withRemoveButton?: boolean;
    onPress?: (uri: string) => void | null;
    onPressRemove?: (uri: string) => void;
    initialImagesNumber?: number;
    testID?: string;
}

const ImageSwiper: React.FC<IProps> = ({
    images,
    containerStyle,
    imageStyle,
    withRemoveButton,
    onPress,
    onPressRemove,
    initialImagesNumber = INIT_IMGS_NUMBER,
    testID,
}: IProps) => {
    const [showRestImages, setShowRestImages] = useState(false);

    const onPressHandle = useCallback(
        (uri: string) => {
            if (onPress) {
                onPress(uri);
            }
        },
        [onPress],
    );

    const onScrollPositionHandler = useCallback(
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            const position = event.nativeEvent.contentOffset.x;
            if (position >= ITEM_WIDTH) {
                setShowRestImages(true);
            }
        },
        [],
    );

    const canShowImage = useCallback(
        (index: number) => {
            /**
             * Inittially allows to render only 3 images
             */
            if (index < initialImagesNumber) {
                return true;
            } else if (index >= initialImagesNumber && showRestImages) {
                return true;
            }

            return false;
        },
        [showRestImages, initialImagesNumber],
    );

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            onScroll={onScrollPositionHandler}
            style={[containerStyle]}
            testID={testID}>
            {images.map((i, index) => (
                <ImageItem
                    key={`${index}-${i}`}
                    testID={i}
                    imageUri={i}
                    onPress={onPressHandle}
                    onRemove={onPressRemove}
                    withRemoveButton={withRemoveButton}
                    style={imageStyle}
                    showImage={canShowImage(index)}
                />
            ))}
        </ScrollView>
    );
};

export default React.memo(ImageSwiper);

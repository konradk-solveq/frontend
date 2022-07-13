import React, {useCallback} from 'react';
import {ScrollView, ViewStyle, ImageStyle} from 'react-native';
import ImageItem from './ImageItem';

interface IProps {
    images: string[];
    containerStyle?: ViewStyle;
    imageStyle?: ImageStyle;
    withRemoveButton?: boolean;
    onPress?: (uri: string) => void | null;
    onPressRemove?: (uri: string) => void;
    testID?: string;
}

const ImageSwiper: React.FC<IProps> = ({
    images,
    containerStyle,
    imageStyle,
    withRemoveButton,
    onPress,
    onPressRemove,
    testID,
}: IProps) => {
    const onPressHandle = useCallback(
        (uri: string) => {
            if (onPress) {
                onPress(uri);
            }
        },
        [onPress],
    );

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={[containerStyle]}
            testID={testID}>
            {images.map(i => (
                <ImageItem
                    key={i}
                    testID={i}
                    imageUri={i}
                    onPress={onPressHandle}
                    onRemove={onPressRemove}
                    withRemoveButton={withRemoveButton}
                    style={imageStyle}
                />
            ))}
        </ScrollView>
    );
};

export default React.memo(ImageSwiper);

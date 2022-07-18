import React, {useCallback} from 'react';
import {
    Image,
    ImageStyle,
    Pressable,
    StyleProp,
    StyleSheet,
    View,
} from 'react-native';
import {RemoveButton} from '@components/buttons';
import {getFHorizontalPx, getFVerticalPx} from '@helpers/appLayoutDimensions';

interface IProps {
    withRemoveButton?: boolean;
    onRemove?: (i: string) => void;
    onPress?: (i: string) => void;
    imageUri: string;
    style?: StyleProp<ImageStyle>;
    showImage?: boolean;
    testID?: string;
}

const ImageItem: React.FC<IProps> = ({
    withRemoveButton,
    onRemove,
    onPress,
    imageUri,
    style,
    showImage = false,
    testID,
}) => {
    const handleImagePress = useCallback(() => {
        onPress && onPress(imageUri);
    }, [imageUri, onPress]);

    const handleRemovePress = useCallback(() => {
        onRemove && onRemove(imageUri);
    }, [imageUri, onRemove]);

    return (
        <View style={styles.container}>
            <Pressable onPress={handleImagePress} testID={testID}>
                {showImage && (
                    <Image
                        source={{uri: imageUri}}
                        style={[styles.image, style]}
                        resizeMode="cover"
                    />
                )}
            </Pressable>
            {withRemoveButton && onRemove && (
                <View style={styles.buttonContainer}>
                    <RemoveButton
                        onPress={handleRemovePress}
                        testID={`${testID}-remove-button`}
                    />
                </View>
            )}
        </View>
    );
};

export default React.memo(ImageItem);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    image: {
        backgroundColor: '#ededed',
        width: getFHorizontalPx(109),
        height: getFVerticalPx(81),
        marginRight: getFHorizontalPx(8),
        borderRadius: getFVerticalPx(10),
    },
    buttonContainer: {
        position: 'absolute',
        right: getFHorizontalPx(16),
        top: getFVerticalPx(8),
    },
});

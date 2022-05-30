import React from 'react';
import {
    ScrollView,
    Image,
    StyleSheet,
    ViewStyle,
    View,
    Pressable,
    ImageStyle,
} from 'react-native';

import {RemoveBtn} from '../buttons';
import {getFHorizontalPx, getFVerticalPx} from '@helpers/appLayoutDimensions';

interface IProps {
    images: string[];
    containerStyle?: ViewStyle;
    imageStyle?: ImageStyle;
    withRemoveButton?: boolean;
    onPress?: (uri: string) => void | null;
    onPressRemove?: (uri: string) => void;
}

const ImageSwiper: React.FC<IProps> = ({
    images,
    containerStyle,
    imageStyle,
    withRemoveButton,
    onPress,
    onPressRemove,
}: IProps) => {
    const onPressHandle = (uri: string) => {
        if (onPress) {
            onPress(uri);
        }
    };

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={[styles.scrollView, containerStyle]}>
            {images.map(i => (
                <View key={JSON.stringify(i)} style={styles.container}>
                    <Pressable onPress={() => onPressHandle(i)}>
                        <Image
                            source={{uri: i}}
                            style={[styles.image, imageStyle]}
                            resizeMode="cover"
                        />
                    </Pressable>
                    {withRemoveButton && onPressRemove && (
                        <View style={styles.buttonContainer}>
                            <RemoveBtn onPress={() => onPressRemove(i)} />
                        </View>
                    )}
                </View>
            ))}
        </ScrollView>
    );
};

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

export default ImageSwiper;

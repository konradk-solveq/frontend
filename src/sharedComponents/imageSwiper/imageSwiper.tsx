import React from 'react';
import {
    ScrollView,
    Image,
    StyleSheet,
    ViewStyle,
    ImageProps,
    View,
    Pressable,
} from 'react-native';

import {RemoveBtn} from '../buttons';

interface IProps {
    images: string[];
    containerStyle?: ViewStyle;
    imageStyle?: ImageProps;
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
    scrollView: {
        height: 150,
    },
    container: {
        flexDirection: 'row',
    },
    image: {
        backgroundColor: '#ededed',
        width: 125,
        height: 125,
        marginRight: 15,
        borderRadius: 16,
    },
    buttonContainer: {
        width: '100%',
        position: 'absolute',
        alignItems: 'center',
        paddingRight: 15,
        bottom: 0,
    },
});

export default ImageSwiper;

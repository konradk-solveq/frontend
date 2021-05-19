import React from 'react';
import {
    ScrollView,
    Image,
    StyleSheet,
    ViewStyle,
    ImageProps,
} from 'react-native';

interface IProps {
    images: string[];
    containerStyle?: ViewStyle;
    imageStyle?: ImageProps;
}

const ImageSwiper: React.FC<IProps> = ({
    images,
    containerStyle,
    imageStyle,
}: IProps) => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={[styles.scrollView, containerStyle]}>
            {images.map(i => (
                <Image
                    key={JSON.stringify(i)}
                    source={{uri: i}}
                    style={[styles.image, imageStyle]}
                    resizeMode="cover"
                />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        height: 125,
    },
    image: {
        width: 125,
        height: 125,
        marginRight: 15,
        borderRadius: 16,
    },
});

export default ImageSwiper;

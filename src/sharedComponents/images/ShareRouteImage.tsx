import React, {useCallback} from 'react';
import {View, Image, StyleSheet, ViewStyle, ImageStyle} from 'react-native';

interface IProps {
    onImageLoaded: () => void;
    imgUrl?: string;
    containerStyles?: ViewStyle;
    imageStyles?: ImageStyle;
}

const ShareRouteImage: React.FC<IProps> = ({
    imgUrl,
    onImageLoaded,
    containerStyles,
    imageStyles,
}: IProps) => {
    const onLoadEndHandler = useCallback(() => {
        if (imgUrl) {
            onImageLoaded();
        }
    }, [onImageLoaded, imgUrl]);

    return (
        <View style={[styles.container, containerStyles]}>
            <Image
                resizeMode="contain"
                style={[styles.image, imageStyles]}
                source={{uri: imgUrl}}
                onLoad={onLoadEndHandler}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        margin: 0,
    },
    image: {
        height: '100%',
        width: '100%',
    },
});

export default ShareRouteImage;

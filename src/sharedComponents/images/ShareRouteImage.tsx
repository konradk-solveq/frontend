import React, {useEffect, useState} from 'react';
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
    const [imageIsLoaded, setImageIsLoaded] = useState(false);

    const onLoadEndHandler = () => {
        setImageIsLoaded(true);
    };

    useEffect(() => {
        if (imageIsLoaded && imgUrl) {
            onImageLoaded();
        }
    }, [onImageLoaded, imageIsLoaded, imgUrl]);

    return (
        <View
            style={[styles.container, containerStyles]}
            testID="share-route-image">
            <Image
                resizeMode="contain"
                style={[styles.image, imageStyles]}
                source={{uri: imgUrl, cache: 'reload'}}
                onLoadEnd={onLoadEndHandler}
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

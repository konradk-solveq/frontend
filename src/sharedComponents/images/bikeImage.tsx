import {getHorizontalPx} from '@src/helpers/layoutFoo';
import React from 'react';
import {View, Image, StyleSheet, ViewStyle, ImageStyle} from 'react-native';

import DefaultImage from '../../assets/images/bike_placeholder.png';

const DEFAULT_IMAGE = Image.resolveAssetSource(DefaultImage).uri;

interface IProps {
    imgUrl?: string;
    containerStyles?: ViewStyle;
    imageStyles?: ImageStyle;
}

const BikeImage: React.FC<IProps> = ({
    imgUrl,
    containerStyles,
    imageStyles,
}: IProps) => {
    return (
        <View style={[styles.container, containerStyles]}>
            <Image
                resizeMode="contain"
                style={[styles.image, imageStyles]}
                source={{uri: imgUrl || DEFAULT_IMAGE}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: getHorizontalPx(195),
        marginTop: getHorizontalPx(20),
    },
    image: {
        height: '100%',
        width: '100%',
    },
});

export default BikeImage;

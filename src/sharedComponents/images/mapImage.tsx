import React from 'react';
import {View, Image, StyleSheet, ViewStyle, ImageStyle} from 'react-native';
import { getVerticalPx } from '../../helpers/layoutFoo';

interface IProps {
    imgUrl: string;
    containerStyles?: ViewStyle;
    imageStyles?: ImageStyle;
}

const MapImage: React.FC<IProps> = ({
    imgUrl,
    containerStyles,
    imageStyles,
}: IProps) => {
    return (
        <View style={[styles.container, containerStyles]}>
            <Image
                resizeMode="contain"
                style={[styles.image, imageStyles]}
                source={{uri: imgUrl}}
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

export default MapImage;

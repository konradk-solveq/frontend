import React from 'react';
import {StyleSheet, Image, Pressable} from 'react-native';

interface IProps {
    imgUrl: string;
    onPress: () => void;
}

const ImageButton: React.FC<IProps> = ({imgUrl, onPress}: IProps) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Image
                style={styles.mImg}
                resizeMode="cover"
                source={{uri: imgUrl}}
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f7f7f7',
        borderRadius: 10,
        overflow: 'hidden',
    },
    mImg: {
        width: '100%',
        height: '100%',
    },
});

export default ImageButton;

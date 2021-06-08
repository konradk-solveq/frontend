import React, {useCallback} from 'react';
import {ViewStyle, View, StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';

import MapImage from '../images/mapImage';

interface IProps {
    images: string[];
    containerStyle?: ViewStyle;
}

const ImageGallery: React.FC<IProps> = ({images, containerStyle}: IProps) => {
    const renderItem = useCallback(() => {
        return images.map((el, i) => {
            return (
                <View style={styles.imageContainer}>
                    <MapImage
                        key={`${el}_${i}_m`}
                        imgUrl={el}
                        containerStyles={styles.image}
                    />
                </View>
            );
        });
    }, [images]);

    return (
        <>
            <Swiper
                key={images.length}
                loop={false}
                scrollEnabled
                horizontal
                dotColor="#f0f0f0"
                activeDotColor="#d8232a"
                dotStyle={styles.dot}
                activeDot={
                    <View style={styles.dotOuter}>
                        <View style={styles.dotInner} />
                    </View>
                }
                style={containerStyle}>
                {renderItem()}
            </Swiper>
        </>
    );
};

const styles = StyleSheet.create({
    dot: {
        marginHorizontal: 20,
        width: 13,
        height: 13,
        borderRadius: 50,
        opacity: 0.8,
    },
    dotOuter: {
        width: 13,
        height: 13,
        borderRadius: 50,
        borderWidth: 1,
        backgroundColor: 'transparent',
        borderColor: '#d8232a',
        marginHorizontal: 3,
    },
    dotInner: {
        backgroundColor: '#d8232a',
        width: 5,
        height: 5,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    },
    imageContainer: {
        height: '100%',
        justifyContent: 'center',
    },
    image: {
        maxHeight: '80%',
    },
});

export default ImageGallery;

import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const {width} = Dimensions.get('window');

const CurvedShape: React.FC = () => {
    return (
        <View style={styles.container}>
            <Svg height="100%" width="100%" viewBox={`0 0 ${414} ${132}`}>
                <Path
                    d="m 0,94.362406 c 0,0 82.50881,21.581224 207,21.581224 124.49119,0 207,-21.581224 207,-21.581224 V 180.06156 H 0 Z"
                    fill="white"
                    stroke="white"
                />
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width,
        aspectRatio: 414 / 132,
        position: 'absolute',
        top: -110,
        left: 0,
        right: 0,
    },
});

export default CurvedShape;

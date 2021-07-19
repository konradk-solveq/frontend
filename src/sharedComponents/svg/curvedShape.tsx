import React from 'react';
import {Platform} from 'react-native';
import {View, Dimensions, StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {getHorizontalPx, getVerticalPx} from '../../helpers/layoutFoo';

const {width} = Dimensions.get('window');

const isIOS = Platform.OS === 'ios';
const shapeWidth = getHorizontalPx(414);
const shapeHeight = getVerticalPx(142);

const CurvedShape: React.FC = () => {
    return (
        <View style={styles.container} pointerEvents="box-none">
            <Svg
                height="100%"
                width="100%"
                viewBox={`0 0 ${shapeWidth} ${shapeHeight}`}>
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
        width: width * 1.05,
        aspectRatio: isIOS
            ? shapeWidth / shapeHeight / 1.5
            : shapeWidth / shapeHeight,
        position: 'absolute',
        top: getVerticalPx(isIOS ? -200 : -140),
        left: 0,
        right: 0,
    },
});

export default CurvedShape;

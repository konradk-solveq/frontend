import React from 'react';
import {Platform} from 'react-native';
import {View, Dimensions, StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {
    getHorizontalPx,
    getVerticalPx,
} from '../../../../../../helpers/layoutFoo';

const {width} = Dimensions.get('window');

const isIOS = Platform.OS === 'ios';
const shapeWidth = getHorizontalPx(414);
const shapeHeight = getVerticalPx(142);

const CurvedShape: React.FC = () => {
    return (
        <View style={styles.container}>
            <Svg

                viewBox={'0 0 ' + shapeWidth + ' ' + shapeHeight}>
                <Path
                    d="M0 94.362s82.509 21.582 207 21.582 207-21.582 207-21.582v85.7H0z"
                    fill="white"
                />
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: shapeWidth,
        height: shapeHeight,
        position: 'absolute',
        top: getVerticalPx(isIOS ? -125 : -140),
        left: 0,
        right: 0,
        // zIndex: 100,
        // backgroundColor: 'khaki',
    },
    svg: {
        // backgroundColor: 'red',
    },
});

export default CurvedShape;

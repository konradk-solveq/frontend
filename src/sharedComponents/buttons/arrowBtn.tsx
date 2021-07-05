import React from 'react';
import {StyleSheet, Dimensions, View, Platform} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Svg, {G, Path} from 'react-native-svg';

import {
    setObjSize,
    getCenterLeftPx,
    getVerticalPx,
    getWidthPx,
} from '../../helpers/layoutFoo';

interface Props {
    style?: any;
    onPress: () => void;
}

const {width} = Dimensions.get('window');
const isIOS = Platform.OS === 'ios';

const ArrowBtn: React.FC<Props> = ({onPress, style}: Props) => {
    setObjSize(51, 51);
    const h = width * (40 / 120.8);
    const w = getWidthPx();
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: h * 0.8,
        },
        background: {
            position: 'absolute',
            width: width,
            height: h,
            marginBottom: getVerticalPx(40),
        },
        button: {
            position: 'absolute',
            width: w,
            height: w,
            left: getCenterLeftPx(),
            top: h * 0.4 - w / 2,
            elevation: 20,
            shadowColor: 'grey',
            shadowOffset: {height: 0, width: 0},
            backgroundColor: 'white',
            shadowRadius: 10,
            shadowOpacity: isIOS ? 0.4 : 1,
            borderRadius: 50,
        },
        btnContainer: {
            width: '100%',
            height: '100%',
        },
    });

    return (
        <View style={[styles.container, style]}>
            <View style={styles.button}>
                <TouchableWithoutFeedback onPress={onPress}>
                    <Svg viewBox="0 0 15.4 15.4" style={styles.btnContainer}>
                        <G transform="translate(-107.1 -22)">
                            <Path
                                fill="#313131"
                                fill-rule="nonzero"
                                d={
                                    'm 116.7,30.754844 a 0.3,0.3 0 0 1 -0.4,0 l -1.5,-1.5 -1.4,1.5 a 0.32015621,0.32015621 0 0 1 -0.5,-0.4 l 1.7,-1.7 c 0.2,-0.1 0.3,-0.1 0.4,0 l 1.7,1.7 c 0.1,0.1 0.1,0.3 0,0.4 z'
                                }
                            />
                        </G>
                    </Svg>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
};

export default ArrowBtn;

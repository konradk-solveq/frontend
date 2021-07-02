import React from 'react';
import {
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
    View,
    Platform,
} from 'react-native';
import Svg, {G, Path} from 'react-native-svg';

import {
    setObjSize,
    getCenterLeftPx,
    getVerticalPx,
    getWidthPx,
} from '../../helpers/layoutFoo';

interface Props {
    style?: any;
    down?: boolean;
    onPress: () => void;
}

const {width} = Dimensions.get('window');
const isIOS = Platform.OS === 'ios';

const ArrowBtn: React.FC<Props> = ({onPress, down, style}: Props) => {
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
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={styles.button}>
                    <Svg viewBox="0 0 15.4 15.4" style={styles.btnContainer}>
                        <G transform="translate(-107.1 -22)">
                            <Path
                                fill="#313131"
                                fill-rule="nonzero"
                                d={
                                    !down
                                        ? 'm 116.7,30.754844 a 0.3,0.3 0 0 1 -0.4,0 l -1.5,-1.5 -1.4,1.5 a 0.32015621,0.32015621 0 0 1 -0.5,-0.4 l 1.7,-1.7 c 0.2,-0.1 0.3,-0.1 0.4,0 l 1.7,1.7 c 0.1,0.1 0.1,0.3 0,0.4 z'
                                        : 'M116.7 28.7a.3.3 0 00-.4 0l-1.5 1.5-1.4-1.5a.3.3 0 00-.5.4l1.7 1.7c.2.1.3.1.4 0l1.7-1.7c.1-.1.1-.3 0-.4z'
                                }
                            />
                        </G>
                    </Svg>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default ArrowBtn;

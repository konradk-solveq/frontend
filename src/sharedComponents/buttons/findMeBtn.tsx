import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity as TouchableOpacityRN,
    Platform,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {getHorizontalPx} from '../../helpers/layoutFoo';
import {TouchableOpacity as TouchableOpacityIOS} from 'react-native-gesture-handler';

const TouchableOpacity =
    Platform.OS === 'ios' ? TouchableOpacityIOS : TouchableOpacityRN;

interface Props {
    style?: any;
    onpress: () => void;
    toggle?: boolean;
}

const FindMeButton: React.FC<Props> = ({style, onpress, toggle}: Props) => {
    const styles = StyleSheet.create({
        findBtn: {
            width: getHorizontalPx(41),
            height: getHorizontalPx(41),
            backgroundColor: toggle ? 'red' : '#fff',
            borderRadius: getHorizontalPx(41 / 2),
            padding: getHorizontalPx((41 - 20) / 2),
        },
    });

    return (
        <View style={style}>
            <TouchableOpacity
                onPress={onpress}
                hitSlop={{left: 20, right: 20, top: 20, bottom: 20}}>
                <View style={styles.findBtn}>
                    <Svg viewBox="0 0 20 20">
                        <Path
                            fill={toggle ? '#fff' : '#313131'}
                            fill-rule="nonzero"
                            d="M10 0c.513 0 .936.386.993.883L11 1v2l-.003.07c3.068.438 5.496 2.865 5.933 5.934L17 9h2c.552 0 1 .448 1 1 0 .513-.386.936-.883.993L19 11h-2l-.07-.003c-.438 3.068-2.865 5.495-5.934 5.933L11 17v2c0 .552-.448 1-1 1-.513 0-.936-.386-.993-.883L9 19v-2l.005-.07c-3.07-.437-5.497-2.864-5.935-5.933L3 11H1c-.552 0-1-.448-1-1 0-.513.386-.936.883-.993L1 9h2l.07.004c.437-3.069 2.865-5.497 5.934-5.934L9 3V1c0-.552.448-1 1-1zm0 5c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5zm0 2c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0 2c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1z"
                            transform="translate(-344.000000, -572.000000) translate(333.000000, 561.000000) translate(11.000000, 11.000000)"
                        />
                    </Svg>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default FindMeButton;

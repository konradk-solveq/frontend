import React, {useEffect, useState, useRef} from 'react';
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
    compassHeading: any;
}

const CompassButton: React.FC<Props> = ({
    style,
    onpress,
    toggle,
    compassHeading,
}: Props) => {
    const styles = StyleSheet.create({
        findBtn: {
            width: getHorizontalPx(41),
            height: getHorizontalPx(41),
            backgroundColor: '#fff',
            borderRadius: getHorizontalPx(41 / 2),
            padding: getHorizontalPx((41 - 20) / 2),
            marginBottom: getHorizontalPx(20),
        },
        svg: {
            transform: [{rotate: (!toggle ? -compassHeading : 0) + 'deg'}],
        },
    });

    return (
        <View style={style}>
            <TouchableOpacity
                onPress={onpress}
                hitSlop={{left: 20, right: 20, top: 20, bottom: 20}}>
                <View style={styles.findBtn}>
                    <Svg viewBox="0 0 20 20" style={styles.svg}>
                        <Path
                            d="M3.053 2.807c3.973-3.837 10.304-3.726 14.14.246 3.837 3.973 3.726 10.304-.246 14.14-3.973 3.837-10.304 3.726-14.14-.246-3.837-3.973-3.726-10.304.246-14.14zm12.702 1.636a8 8 0 10-11.51 11.114 8 8 0 0011.51-11.114zM9.212 3.88a1 1 0 011.789.031l2.73 5.706a1 1 0 01-.017.894l-2.926 5.607a1 1 0 01-1.789-.031l-2.73-5.706a1 1 0 01.017-.894zm-.923 6.09l1.651 3.45 1.77-3.391-3.42-.06z"
                            fill={toggle ? '#D8232A' : '#313131'}
                        />
                    </Svg>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default CompassButton;

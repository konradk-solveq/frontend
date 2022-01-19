import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import Svg, {Path, Circle} from 'react-native-svg';

import {getHorizontalPx} from '@helpers/layoutFoo';

interface IProps {
    style?: ViewStyle;
}

const Cz: React.FC<IProps> = ({style}: IProps) => {
    return (
        <View style={[styles.icon, style]}>
            <Svg viewBox="0 0 32 32">
                <Circle cx="16" cy="16" fill="#f6f6f6" r="16" />
                <Path
                    d="M.008 15.77A16 16 0 0 0 0 16a16 16 0 0 0 16 16 16 16 0 0 0 16-16 16 16 0 0 0-.004-.23z"
                    fill="red"
                />
                <Path
                    d="M5.164 4.232A16 16 0 0 0 0 16a16 16 0 0 0 4.92 11.531L16.69 15.76z"
                    fill="#0052b4"
                />
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    icon: {
        width: getHorizontalPx(32),
        height: getHorizontalPx(32),
        marginLeft: getHorizontalPx(5),
    },
});

export default Cz;

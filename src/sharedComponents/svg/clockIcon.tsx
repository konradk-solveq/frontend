import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface IProps {
    containerStyle?: ViewStyle;
    iconStyle?: ViewStyle;
}

const ClockIcon: React.FC<IProps> = ({containerStyle, iconStyle}: IProps) => {
    return (
        <View style={containerStyle}>
            <Svg viewBox="0 0 15 15" style={[styles.icon, iconStyle]}>
                <Path
                    fill="#555"
                    fill-rule="nonzero"
                    d="M7.5 0a7.5 7.5 0 110 15 7.5 7.5 0 010-15zm0 .714a6.786 6.786 0 100 13.571A6.786 6.786 0 007.5.714zm.143 2.143c.245 0 .45.126.492.293l.008.064L8.142 7.4l3.434 1.562a.356.356 0 01-.234.671l-.061-.021-3.929-1.786a.358.358 0 01-.209-.312v-4.3c0-.197.224-.357.5-.357z"
                />
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 15,
        marginLeft: 5,
    },
});

export default ClockIcon;

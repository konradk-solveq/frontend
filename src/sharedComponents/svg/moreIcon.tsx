import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface IProps {
    containerStyle?: ViewStyle;
    iconStyle?: ViewStyle;
}

const MoreIcon: React.FC<IProps> = ({containerStyle, iconStyle}: IProps) => {
    return (
        <View style={containerStyle}>
            <Svg viewBox="0 0 20 4" style={[styles.icon, iconStyle]}>
                <Path
                    fill="#313131"
                    fill-rule="nonzero"
                    d="M1.5.5a1.5 1.5 0 11-.001 3.001A1.5 1.5 0 011.5.5zm8.5 0a1.5 1.5 0 11-.001 3.001A1.5 1.5 0 0110 .5zm8.5 0a1.5 1.5 0 11-.001 3.001A1.5 1.5 0 0118.5.5z"
                />
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 4,
        marginLeft: 5,
    },
});

export default MoreIcon;

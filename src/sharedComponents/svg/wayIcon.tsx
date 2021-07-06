import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface IProps {
    containerStyle?: ViewStyle;
    iconStyle?: ViewStyle;
}

const WayIcon: React.FC<IProps> = ({containerStyle, iconStyle}: IProps) => {
    return (
        <View style={containerStyle}>
            <Svg viewBox="0 0 12 12" style={[styles.icon, iconStyle]}>
                <Path
                    fill="#313131"
                    fill-rule="nonzero"
                    d="M12 2.228l-.704-1.173H7.407v2.346h3.889zM0 3.635l.704 1.173h3.889V2.463H.704zM5.296 0h1.408v12H5.296z"
                />
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    icon: {
        width: 21,
        height: 15,
        marginLeft: 5,
    },
});

export default WayIcon;

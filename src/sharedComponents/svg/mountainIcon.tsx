import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface IProps {
    containerStyle?: ViewStyle;
    iconStyle?: ViewStyle;
}

const MountainIcon: React.FC<IProps> = ({
    containerStyle,
    iconStyle,
}: IProps) => {
    return (
        <View style={containerStyle}>
            <Svg viewBox="0 0 12 8" style={[styles.icon, iconStyle]}>
                <Path
                    fill="#313131"
                    fill-rule="nonzero"
                    d="M7.09.621L5.046 3.35 6.6 5.42l-.873.655c-.922-1.227-2.454-3.273-2.454-3.273L0 7.167h12L7.09.62z"
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

export default MountainIcon;

import React from 'react';
import {
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface IProps {
    callback: Function;
    containerStyle?: ViewStyle;
    iconStyle?: ViewStyle;
}

const CogBtn: React.FC<IProps> = ({
    callback,
    containerStyle,
    iconStyle,
}: IProps) => {
    return (
        <TouchableWithoutFeedback onPress={() => callback()}>
            <View style={containerStyle}>
                <Svg viewBox="0 0 16 20" style={[styles.icon, iconStyle]}>
                    <Path
                        fill="#313131"
                        fill-rule="nonzero"
                        d="M16 0c1.105 0 2 .895 2 2v11l-8 7H4c-1.105 0-2-.895-2-2V2c0-1.105.895-2 2-2h12zM9 10.5h7V2H4v16h5v-7.5zm2 5.966l4.533-3.966H11v3.966zM14 5.5c.552 0 1 .448 1 1 0 .513-.386.936-.883.993L14 7.5H6c-.552 0-1-.448-1-1 0-.513.386-.936.883-.993L6 5.5h8z"
                    />
                </Svg>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    icon: {
        margin: 20,
        width: 20,
        height: 20,
    },
});

export default CogBtn;

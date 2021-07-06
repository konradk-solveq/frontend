import React from 'react';
import {
    StyleProp,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface IProps {
    onPress: () => void;
    containerStyle?: ViewStyle;
    iconStyle?: StyleProp<ViewStyle>;
}

const MapBtn: React.FC<IProps> = ({
    onPress,
    containerStyle,
    iconStyle,
}: IProps) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={containerStyle}>
                <Svg viewBox="0 0 17 21" style={[styles.icon, iconStyle]}>
                    <Path
                        fill="#313131"
                        fill-rule="nonzero"
                        d="M8.125.81c2.661 0 5.052 1.246 6.561 3.417 1.505 2.165 1.854 4.9.932 7.324a5.71 5.71 0 01-.895 1.546l-.212.255-6.386 7.458-6.39-7.463c-.504-.58-.875-1.185-1.105-1.802-.919-2.417-.57-5.153.934-7.318C3.073 2.056 5.464.81 8.125.81zm0 2c-2.007 0-3.784.926-4.919 2.558-1.129 1.626-1.39 3.67-.701 5.48.118.317.308.648.578.99l.171.208 4.871 5.689 4.885-5.705c.348-.401.594-.801.739-1.19.685-1.802.425-3.846-.705-5.472C11.91 3.736 10.132 2.81 8.125 2.81zm0 2.738a3.52 3.52 0 013.518 3.517 3.52 3.52 0 01-3.518 3.518 3.52 3.52 0 01-3.517-3.518 3.52 3.52 0 013.517-3.517zm0 2a1.52 1.52 0 00-1.517 1.517 1.52 1.52 0 001.517 1.518 1.52 1.52 0 001.518-1.518 1.52 1.52 0 00-1.518-1.517z"
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

export default MapBtn;

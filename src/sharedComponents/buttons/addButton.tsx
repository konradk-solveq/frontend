import React from 'react';
import {
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface IProps {
    onPress: Function;
    containerStyle?: ViewStyle;
    iconStyle?: ViewStyle;
}

const CogBtn: React.FC<IProps> = ({
    onPress,
    containerStyle,
    iconStyle,
}: IProps) => {
    return (
        <TouchableWithoutFeedback onPress={() => onPress()}>
            <View style={containerStyle}>
                <Svg viewBox="0 0 126 126" style={[styles.icon, iconStyle]}>
                    <Path
                        fill="none"
                        fill-rule="evenodd"
                        stroke="#555"
                        strokeDasharray="2 2"
                        d="M21.511 1h82.978c7.132 0 9.718.743 12.326 2.137a14.543 14.543 0 016.048 6.048C124.257 11.793 125 14.38 125 21.511v82.978c0 7.132-.743 9.718-2.137 12.326a14.543 14.543 0 01-6.048 6.048c-2.608 1.394-5.194 2.137-12.326 2.137H21.51c-7.132 0-9.718-.743-12.326-2.137a14.543 14.543 0 01-6.048-6.048C1.743 114.207 1 111.62 1 104.489V21.51c0-7.132.743-9.718 2.137-12.326a14.543 14.543 0 016.048-6.048C11.793 1.743 14.38 1 21.511 1z"
                    />
                    <Path
                        fill="#313131"
                        d="M65.186 76.13c0 1.21-.978 2.188-2.188 2.188a2.184 2.184 0 01-2.188-2.189l.001-10.942-10.94.002a2.186 2.186 0 01-2.188-2.188c0-1.21.979-2.19 2.188-2.188l10.94-.002v-10.94c0-1.21.98-2.19 2.188-2.189a2.187 2.187 0 012.189 2.188v10.941h10.941c1.21 0 2.189.978 2.189 2.188a2.186 2.186 0 01-2.189 2.188H65.188l-.002 10.943z"
                    />
                </Svg>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    icon: {
        width: 126,
        height: 126,
    },
});

export default CogBtn;

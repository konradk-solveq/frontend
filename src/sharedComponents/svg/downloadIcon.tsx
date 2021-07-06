import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface IProps {
    containerStyle?: ViewStyle;
    iconStyle?: ViewStyle;
}

const DownloadIcon: React.FC<IProps> = ({
    containerStyle,
    iconStyle,
}: IProps) => {
    return (
        <View style={containerStyle}>
            <Svg viewBox="0 0 12 10" style={[styles.icon, iconStyle]}>
                <Path
                    fill="#313131"
                    fill-rule="nonzero"
                    d="M11.125 8c.482 0 .875.393.875.875v.25a.877.877 0 01-.875.875H.875A.877.877 0 010 9.125v-.25C0 8.393.393 8 .875 8h10.25zm-4.5-8c.345 0 .625.28.625.625V3.5h1.375c.33 0 .498.396.271.634l-2.625 2.75a.373.373 0 01-.542 0l-2.625-2.75a.375.375 0 01.271-.634H4.75V.625c0-.344.28-.625.625-.625h1.25z"
                />
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    icon: {
        width: 12,
        height: 10,
        marginLeft: 5,
    },
});

export default DownloadIcon;

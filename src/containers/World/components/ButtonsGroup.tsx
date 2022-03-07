import React, {ReactNode} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

interface IProps {
    children: ReactNode;
    style?: ViewStyle;
}

const ButtonsGroup: React.FC<IProps> = ({children, style}: IProps) => {
    return <View style={{...styles.container, ...style}}>{children}</View>;
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
});

export default ButtonsGroup;

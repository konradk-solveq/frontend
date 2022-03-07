import React, {ReactNode} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

interface IProps {
    children: ReactNode;
    style?: ViewStyle;
    testID?: string;
}

const ButtonsGroup: React.FC<IProps> = ({
    children,
    style,
    testID = 'buttons-group-test-id',
}: IProps) => {
    return (
        <View style={{...styles.container, ...style}} testID={testID}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
});

export default ButtonsGroup;

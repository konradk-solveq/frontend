import React, {ReactNode} from 'react';
import {View, StyleSheet} from 'react-native';

interface IProps {
    children: ReactNode;
}

const ButtonsGroup: React.FC<IProps> = ({children}: IProps) => {
    return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
});

export default ButtonsGroup;

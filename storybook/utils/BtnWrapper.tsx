import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';

const BtnWrapper = ({children}: {children: ReactNode}) => (
    <View style={styles.container}>
        <View style={styles.button}>{children}</View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: 200,
        height: 40,
    },
});

export default BtnWrapper;

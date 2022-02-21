import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';

import LayoutCenter from './LayoutCenter';

const BtnWrapper = ({children}: {children: ReactNode}) => (
    <LayoutCenter>
        <View style={styles.button}>{children}</View>
    </LayoutCenter>
);

const styles = StyleSheet.create({
    button: {
        width: 200,
        height: 40,
    },
});

export default BtnWrapper;

import React, {ReactNode, Suspense} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

import {initAppSize} from '@helpers/layoutFoo';
import {appContainerHorizontalMargin} from '@theme/commonStyle';

interface IProps {
    children: ReactNode;
    style?: ViewStyle;
}

const LayoutCenter: React.FC<IProps> = ({children, style}: IProps) => {
    initAppSize();

    return (
        <Suspense fallback={null}>
            <View style={[styles.container, style]}>{children}</View>
        </Suspense>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: appContainerHorizontalMargin,
    },
});

export default LayoutCenter;

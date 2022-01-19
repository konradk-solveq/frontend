import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import Svg, {Path, Circle} from 'react-native-svg';

import {getHorizontalPx} from '@helpers/layoutFoo';

interface IProps {
    style?: ViewStyle;
}

const En: React.FC<IProps> = ({style}: IProps) => {
    return (
        <View style={[styles.icon, style]}>
            <Svg viewBox="0 0 32 32">
                <Circle cx="16" cy="16" fill="#283477" r="16" />
                <Path
                    d="M16 0a16 16 0 0 0-3.717.443V10.9L3.528 5.98a16 16 0 0 0-2.263 3.81l5.512 3.096H.317A16 16 0 0 0 0 16a16 16 0 0 0 .695 4.656h4.33L1.46 22.658a16 16 0 0 0 2.391 3.738l8.431-4.736v9.897A16 16 0 0 0 16 32a16 16 0 0 0 3.666-.43v-8.92l7.872 4.423a16 16 0 0 0 2.606-3.617l-4.984-2.8h6.145A16 16 0 0 0 32 16a16 16 0 0 0-.307-3.113h-4.767l4.123-2.316a16 16 0 0 0-2.066-3.92l-9.317 5.234V.425A16 16 0 0 0 16 0z"
                    fill="#fff"
                />
                <Path
                    d="M16 0a16 16 0 0 0-2.148.152v14.485H.064A16 16 0 0 0 0 16a16 16 0 0 0 .273 2.881h13.58v12.967A16 16 0 0 0 16 32a16 16 0 0 0 2.096-.146V18.88h13.631A16 16 0 0 0 32 16a16 16 0 0 0-.06-1.363H18.097V.138A16 16 0 0 0 16 0zm13.47 7.368l-9.804 5.508v.011h3.737l6.97-3.915a16 16 0 0 0-.902-1.604zm-26.939.015a16 16 0 0 0-.908 1.601l6.949 3.903h3.711v-.026zM8.51 20.656L2.251 24.17a16 16 0 0 0 1.037 1.53l8.98-5.045zm11.157 0v.006l9.024 5.07a16 16 0 0 0 1.038-1.528l-6.316-3.548z"
                    fill="#da1f2b"
                />
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    icon: {
        width: getHorizontalPx(32),
        height: getHorizontalPx(32),
        marginLeft: getHorizontalPx(5),
    },
});

export default En;

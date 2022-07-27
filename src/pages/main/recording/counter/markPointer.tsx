import React from 'react';
import {StyleSheet, View} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';

import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';

const size = getFVerticalPx(31);

const MarkPointer: React.FC = () => {
    const styles = StyleSheet.create({
        markWrap: {
            width: size * 2,
            height: size * 2,
        },
        mark: {
            position: 'absolute',
            left: size * 0.5,
            top: size * 0.5,
            width: size,
            height: size,
        },
    });

    return (
        <View style={styles.markWrap} pointerEvents="none">
            <View style={styles.mark}>
                <Svg viewBox="0 0 31 31">
                    <Circle cx="15.5" cy="15.5" r="15.5" fill="#fff" />
                    <Path
                        d="M15.544 6.294s-6.429 19.152-6.34 18.974c.09-.179 6.34-4.286 6.34-4.286s6.25 4.107 6.34 4.286c.088.179-6.34-18.974-6.34-18.974z"
                        fill="#d8232a"
                    />
                </Svg>
            </View>
        </View>
    );
};

export default React.memo(MarkPointer);

import React from 'react';
import {StyleSheet, View} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';

const MarkPointer: React.FC = () => {
    return (
        <View style={styles.markWrap} pointerEvents="none">
            <Svg viewBox="0 0 31 31" style={styles.mark}>
                <Circle cx="15.5" cy="15.5" r="15.5" fill="#fff" />
                <Path
                    d="M15.544 6.294s-6.429 19.152-6.34 18.974c.09-.179 6.34-4.286 6.34-4.286s6.25 4.107 6.34 4.286c.088.179-6.34-18.974-6.34-18.974z"
                    fill="#d8232a"
                />
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    markWrap: {
        position: 'absolute',
        left: '50%',
        top: '50%',
    },
    mark: {
        width: 31,
        height: 31,
    },
});

export default React.memo(MarkPointer);

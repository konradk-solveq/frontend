import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import Svg, {Circle} from 'react-native-svg';

import {setObjSize, getHorizontalPx} from '../../../../helpers/layoutFoo';

interface IProps {
    size?: number;
    containerStyle?: ViewStyle;
}

const ImgSvg: React.FC<IProps> = ({size, containerStyle}: IProps) => {
    setObjSize(350, 23);
    const imgSize = size || getHorizontalPx(286);

    return (
        <View style={[styles.container, containerStyle]}>
            <Svg width={imgSize} height={imgSize}>
                <Circle
                    cx={imgSize / 2}
                    cy={imgSize / 2}
                    r={imgSize / 2}
                    fill="#FDF5F5"
                />
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 60,
    },
});

export default ImgSvg;

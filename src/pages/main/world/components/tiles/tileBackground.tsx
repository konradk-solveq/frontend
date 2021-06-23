import React, {useState} from 'react';
import {View, ViewStyle} from 'react-native';

import {createSvgShadow} from '../../../../../helpers/createSvgShadow';

import AnimSvg from '../../../../../helpers/animSvg';

interface Props {
    children: React.ReactNode;
    containerStyle?: ViewStyle;
}

const TileBackground: React.FC<Props> = ({children, containerStyle}: Props) => {
    const [source, setSource] = useState(
        '<svg xmlns="http://www.w3.org/2000/svg"/>',
    ); // do odpalania animacji svg
    const [boxStyle, setBoxStyle] = useState({}); // do odpalania animacji svg

    const handleShadowBox = (layout: any) => {
        let b = 30;
        let w = layout.width - 1;
        let h = layout.height - 1;

        const svg = createSvgShadow(b, w, h);

        setSource(svg);

        setBoxStyle({
            position: 'absolute',
            left: -b,
            top: -b,
            width: w + b * 2,
            height: h + b * 2,
        });
    };

    return (
        <View
            style={containerStyle}
            onLayout={({nativeEvent}) => handleShadowBox(nativeEvent.layout)}>
            <AnimSvg source={source} style={boxStyle} />
            <View>{children}</View>
        </View>
    );
};

export default TileBackground;

import React from 'react';
import {ViewStyle} from 'react-native';
import Svg, {Circle, Defs, G, Path ,ClipPath} from 'react-native-svg';

import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';
import colors from '@theme/colors';

interface IProps {
    style?: ViewStyle;
    width?: number;
    height?: number;
    color?: string;
    stroke?: string;
}

const CompassSvg: React.FC<IProps> = ({
    style,
    width = 32,
    height = 32,
    color = colors.red,
    secondColor = colors.black,
    fill = colors.white,
}) => {
    return (
        <Svg
            style={style}
            viewBox="0 0 32 32"
            width={getFVerticalPx(width)}
            height={getFVerticalPx(height)}>
            <G>
                <Circle cx="16" cy="16.125" r="16" fill={fill} />
                <Path
                    fill={color}
                    d="M15.364 4.183c.193-.627 1.08-.627 1.273 0l2.95 9.531a1.333 1.333 0 0 1-1.665 1.669l-1.53-.47a1.333 1.333 0 0 0-.784 0l-1.529.47a1.333 1.333 0 0 1-1.666-1.669l2.95-9.531Z"
                />
                <Path
                    fill={secondColor}
                    d="M16.637 28.067c-.194.627-1.08.627-1.274 0l-2.95-9.531a1.333 1.333 0 0 1 1.665-1.669l1.53.47c.255.08.528.08.784 0l1.529-.47a1.333 1.333 0 0 1 1.666 1.669l-2.95 9.531Z"
                />
            </G>
            <Defs>
                <ClipPath id="a">
                    <Path fill={fill} transform="translate(0 .125)" d="M0 0h32v32H0z"/>
                </ClipPath>
            </Defs>
        </Svg>
    );
};

export default CompassSvg;

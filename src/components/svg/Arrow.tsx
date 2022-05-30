import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';
import {ViewStyle} from 'react-native';
import colors from '@src/theme/colors';

interface IProps {
    style?: ViewStyle;
    width?: number;
    height?: number;
    color?: string;
}

const ArrowSvg: React.FC<IProps> = ({
    style,
    width = 9,
    height = 14,
    color = colors.black,
}) => {
    return (
        <Svg
            style={style}
            viewBox="0 0 9 15"
            width={getFHorizontalPx(width)}
            height={getFVerticalPx(height)}>
            <Path
                fill={color}
                fill-rule="nonzero"
                d="M.309.79c-.38.355-.41.915-.088 1.302l.088.093 5.145 4.814L.31 11.815l-.088.093c-.322.387-.292.947.088 1.303s.978.383 1.392.082l.1-.082 5.89-5.513.088-.093c.295-.355.295-.855 0-1.21l-.088-.093L1.801.79C1.387.404.72.404.308.79z"
            />
        </Svg>
    );
};

export default ArrowSvg;

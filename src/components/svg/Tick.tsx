import React from 'react';
import Svg, {Path} from 'react-native-svg';

import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';

interface IProps {
    imageSize?: number;
}

const TickSvg: React.FC<IProps> = ({imageSize = 15}: IProps) => {
    return (
        <Svg
            width={getFHorizontalPx(imageSize)}
            height={getFVerticalPx(imageSize)}
            viewBox="0 0 15 11">
            <Path
                d="M1.297 5.297 5.5 9.5l8.406-8.406"
                stroke="#C63733"
                strokeWidth={1.8}
                strokeLinecap="round"
            />
        </Svg>
    );
};

export default TickSvg;

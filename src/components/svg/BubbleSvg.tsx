import React from 'react';
import Svg, {G, Path} from 'react-native-svg';

import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';
import colors from '@theme/colors';

interface IProps {
    width?: number;
    height?: number;
    color?: string;
}

const BubbleSvg: React.FC<IProps> = ({
    width = 275,
    height = 103,
    color = colors.white,
}: IProps) => {
    return (
        <Svg
            width={getFHorizontalPx(width)}
            height={getFVerticalPx(height)}
            fill="none"
            preserveAspectRatio={'XMinYMin slice'}
            viewBox={'0 0 275 103'}>
            <G>
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M28 8c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h222.87a2 2 0 0 1 1.765 1.06l2.6 4.877c.98 1.838 3.765 1.142 3.765-.94V20c0-6.627-5.373-12-12-12H28Z"
                    fill={color}
                />
            </G>
        </Svg>
    );
};

export default BubbleSvg;

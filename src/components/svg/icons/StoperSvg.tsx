import React from 'react';
import Svg, {Path} from 'react-native-svg';

import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';
import colors from '@theme/colors';

interface IProps {
    size?: number;
    color?: string;
}

const StoperSvg: React.FC<IProps> = ({
    size = 32,
    color = colors.red,
}: IProps) => (
    <Svg
        width={getFVerticalPx(size)}
        height={getFVerticalPx(size)}
        viewBox="0 0 32 32">
        <Path
            d="M15.52 28.097c6.304 0 11.52-5.215 11.52-11.52 0-2.52-.845-4.863-2.25-6.773l.89-.89c.293-.294.457-.645.457-.985 0-.703-.563-1.266-1.278-1.266-.422 0-.715.117-1.007.41l-.832.809c-1.711-1.477-3.844-2.473-6.188-2.742V4.003c0-.738-.586-1.336-1.313-1.336a1.34 1.34 0 0 0-1.324 1.336V5.14C8.5 5.808 4 10.718 4 16.577c0 6.305 5.215 11.52 11.52 11.52Zm0-2.426a9.055 9.055 0 0 1-9.082-9.094 9.053 9.053 0 0 1 9.07-9.094 9.082 9.082 0 0 1 9.105 9.094 9.058 9.058 0 0 1-9.093 9.094Zm0-7.125a1.96 1.96 0 0 0 1.957-1.957c0-.738-.41-1.371-1.032-1.723V9.897a.916.916 0 0 0-.937-.925.913.913 0 0 0-.926.925v4.97c-.61.35-1.02.984-1.02 1.722 0 1.078.868 1.957 1.958 1.957Z"
            fill={color}
        />
    </Svg>
);

export default StoperSvg;

import React from 'react';
import {ViewStyle} from 'react-native';
import Svg, {Path} from 'react-native-svg';

import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';
import colors from '@theme/colors';

interface IProps {
    style?: ViewStyle;
    width?: number;
    height?: number;
    color?: string;
    testID?: string;
}

const DiscoverySvg: React.FC<IProps> = ({
    style,
    width = 24,
    height = 24,
    color = colors.red,
    testID = 'discovery-svg-test-id',
}) => {
    return (
        <Svg
            style={style}
            viewBox="0 0 24 24"
            width={getFVerticalPx(width)}
            height={getFVerticalPx(height)}
            testID={testID}>
            <Path
                fill={color}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.5 12a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Zm2 0c0 5.799-4.701 10.5-10.5 10.5S1.5 17.799 1.5 12 6.201 1.5 12 1.5 22.5 6.201 22.5 12ZM8.964 7.399C7.565 6.34 6.34 7.566 7.398 8.965l1.906 3.482a7.03 7.03 0 0 0 2.25 2.249l3.482 1.905c1.399 1.058 2.623-.167 1.566-1.566l-1.906-3.483a7.04 7.04 0 0 0-2.25-2.248L8.965 7.399ZM13 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
            />
        </Svg>
    );
};

export default DiscoverySvg;

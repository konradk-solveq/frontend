import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ViewStyle} from 'react-native';
import {getFFontSize} from '@helpers/appLayoutDimensions';

interface IProps {
    style?: ViewStyle;
    size?: number;
    testID?: string;
}

const ApprovedMarker = ({
    style,
    size = 32,
    testID = 'approved-marker-icon',
}: IProps) => {
    const svgSize = getFFontSize(size);
    return (
        <Svg
            width={svgSize}
            height={svgSize}
            fill="none"
            style={style}
            testID={testID}>
            <Path
                d="M23.707 6.293c-4.256-4.257-11.158-4.257-15.414 0-4.257 4.256-4.257 11.158 0 15.414l5.727 5.727a2.8 2.8 0 0 0 3.96 0l5.727-5.727c4.257-4.256 4.257-11.158 0-15.414Z"
                fill="#78BA35"
                stroke="#fff"
                strokeWidth={2}
            />
            <Path
                d="m12 14.188 2.797 2.796 5.594-5.593"
                stroke="#fff"
                strokeWidth={2.5}
                strokeLinecap="round"
            />
        </Svg>
    );
};

export default ApprovedMarker;

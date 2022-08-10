import * as React from 'react';
import Svg, {Ellipse, Path} from 'react-native-svg';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';

interface IProps {
    width?: number;
    height?: number;
}

const RouteImagePlaceholderIcon: React.FC<IProps> = ({
    width = 97,
    height = 40,
}: IProps) => {
    return (
        <Svg width={getFHorizontalPx(width)} height={getFVerticalPx(height)}>
            <Path
                d="M23.712 6.209c-4.26-4.205-11.165-4.205-15.424 0a10.672 10.672 0 0 0 0 15.228l5.728 5.654a2.832 2.832 0 0 0 3.968 0l5.728-5.654a10.672 10.672 0 0 0 0-15.228Z"
                fill="#78BA35"
                stroke="#fff"
                strokeWidth={2}
            />
            <Path
                d="m12 14.008 2.797 2.761 5.594-5.523"
                stroke="#fff"
                strokeWidth={2.5}
                strokeLinecap="round"
            />
            <Path
                d="M88.712 6.209c-4.26-4.205-11.165-4.205-15.424 0a10.672 10.672 0 0 0 0 15.228l5.728 5.654a2.832 2.832 0 0 0 3.968 0l5.728-5.654a10.672 10.672 0 0 0 0-15.228Z"
                fill="#333"
                stroke="#fff"
                strokeWidth={2}
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M78.465 9.275a.795.795 0 0 0-.795.794v4.296c0 .44.356.795.795.795H84.9a.795.795 0 0 0 .607-1.307l-.947-1.123a.795.795 0 0 1 0-1.025l.947-1.123a.795.795 0 0 0-.607-1.307h-6.435Zm-.199 7.356a.596.596 0 0 0-.596.596v1.75c0 .33.267.597.596.597h1.043c.33 0 .596-.267.596-.596v-1.75a.596.596 0 0 0-.596-.597h-1.043Z"
                fill="#fff"
            />
            <Path
                d="M16 33.076h16.089A6.911 6.911 0 0 0 39 26.165v-1.412a5.5 5.5 0 0 1 5.5-5.5v0a5.5 5.5 0 0 1 5.5 5.5V36c0 1.657 1.362 3 3.02 3v0c1.635 0 2.98-1.326 2.98-2.962v0a2.962 2.962 0 0 1 2.962-2.962H80.5"
                stroke="#C63733"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="3 4"
            />
            <Ellipse cx={15.5} cy={33.076} rx={3.5} ry={3.456} fill="#C63733" />
            <Ellipse cx={81.5} cy={33.076} rx={3.5} ry={3.456} fill="#C63733" />
        </Svg>
    );
};

export default RouteImagePlaceholderIcon;

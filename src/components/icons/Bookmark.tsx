import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ViewStyle} from 'react-native';
import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';
interface IProps {
    style?: ViewStyle;
    testID?: string;
}

const Bookmark = ({testID = 'bookmark-icon', style}: IProps) => {
    return (
        <Svg
            width={getFVerticalPx(22)}
            height={getFVerticalPx(32)}
            fill="none"
            viewBox="0 0 26 24"
            style={style}
            testID={testID}>
            <Path
                d="M23.707 6.293c-4.256-4.257-11.158-4.257-15.414 0-4.257 4.256-4.257 11.158 0 15.414l5.727 5.727a2.8 2.8 0 0 0 3.96 0l5.727-5.727c4.257-4.256 4.257-11.158 0-15.414Z"
                fill="#FC8B4B"
                stroke="#fff"
                strokeWidth={2}
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.369 19.86a.631.631 0 0 1-.395.14c-.206 0-.367-.066-.483-.198-.116-.128-.175-.308-.175-.54V9.679c0-.531.136-.935.408-1.21.275-.279.676-.418 1.203-.418h4.35c.527 0 .926.14 1.198.418.271.275.407.679.407 1.21v9.583c0 .232-.059.412-.175.54a.609.609 0 0 1-.482.198.631.631 0 0 1-.396-.14 6.776 6.776 0 0 1-.546-.482l-2.129-2.11c-.035-.036-.07-.036-.104 0l-2.134 2.11c-.24.232-.423.393-.547.482Z"
                fill="#fff"
            />
        </Svg>
    );
};

export default Bookmark;

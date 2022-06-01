import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';

interface IProps {
    imageSize?: number;
    viewBox?: number;
}

const CameraSvg: React.FC<IProps> = ({
    imageSize = 24,
    viewBox = 24,
}: IProps) => {
    const size = getFVerticalPx(imageSize);

    return (
        <Svg
            width={size}
            height={size}
            viewBox={`0 0 ${viewBox} ${viewBox}`}
            fill="none">
            <Path
                d="M3.375 21.614h17.25c2.186 0 3.375-1.19 3.375-3.355V8.135c0-2.165-1.19-3.355-3.375-3.355h-2.287c-.742 0-1.006-.101-1.525-.6l-.752-.752c-.529-.518-1.057-.752-2.013-.752H9.921c-.965 0-1.484.234-2.023.752l-.752.752c-.508.499-.772.6-1.514.6H3.375C1.189 4.78 0 5.97 0 8.135v10.124c0 2.165 1.19 3.355 3.375 3.355zm8.63-3.273a5.098 5.098 0 01-5.113-5.114 5.1 5.1 0 015.113-5.123 5.091 5.091 0 015.103 5.123 5.095 5.095 0 01-5.103 5.114zm5.682-8.64c0-.723.62-1.343 1.352-1.343.722 0 1.342.62 1.342 1.342 0 .742-.61 1.332-1.342 1.332A1.334 1.334 0 0117.687 9.7zm-5.682 6.515a2.985 2.985 0 002.978-2.989 2.972 2.972 0 00-2.978-2.988 2.974 2.974 0 00-2.988 2.988 2.993 2.993 0 002.988 2.99z"
                fill="#C63733"
            />
        </Svg>
    );
};

export default CameraSvg;

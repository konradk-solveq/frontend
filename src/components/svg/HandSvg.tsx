import React from 'react';
import {ViewStyle} from 'react-native';
import Svg, {Path} from 'react-native-svg';

import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';
import colors from '@theme/colors';

interface IProps {
    size?: number;
    color?: string;
    style?: ViewStyle;
}

const HandSvg: React.FC<IProps> = ({
    size = 24,
    color = colors.red,
    style,
}: IProps) => (
    <Svg
        width={getFVerticalPx(size)}
        height={getFVerticalPx(size)}
        viewBox="0 0 24 24"
        fill="none"
        style={style}>
        <Path
            d="M17.004 22.172c1.644-.594 2.922-1.428 3.833-2.502.912-1.082 1.445-2.356 1.6-3.82.154-1.466-.09-3.073-.733-4.822l-.794-2.186c-.358-.984-.854-1.696-1.489-2.136-.626-.447-1.224-.565-1.794-.354-.31.114-.407.318-.293.61l.33.928c.08.212.097.383.048.513a.402.402 0 0 1-.256.256.441.441 0 0 1-.378-.024c-.122-.065-.224-.204-.306-.415l-.22-.61c-.211-.603-.557-1.022-1.037-1.258-.48-.244-.985-.268-1.514-.073-.496.17-.659.48-.488.928l.452 1.281c.081.204.097.37.049.5a.441.441 0 0 1-.635.245c-.122-.073-.224-.216-.305-.427l-.428-1.184c-.236-.66-.586-1.095-1.05-1.306-.463-.212-.96-.22-1.489-.025-.488.18-.655.484-.5.916l.928 2.527c.073.203.085.374.036.512a.403.403 0 0 1-.244.257.467.467 0 0 1-.39-.025c-.123-.073-.22-.211-.294-.415l-3.04-8.337c-.154-.432-.406-.733-.756-.904-.35-.179-.716-.199-1.099-.06-.398.138-.675.39-.83.756-.154.358-.154.757 0 1.196l4.395 12.061c.049.138.053.256.012.354a.333.333 0 0 1-.195.183c-.163.057-.338-.012-.525-.207l-2.942-3.162c-.236-.252-.488-.42-.757-.5a1.218 1.218 0 0 0-.83.024c-.423.154-.716.403-.879.745a1.337 1.337 0 0 0-.049 1.062c.057.13.118.248.183.354.066.105.13.203.196.293l3.87 4.797c1.61 1.994 3.316 3.235 5.114 3.723 1.807.497 3.638.407 5.493-.268Z"
            fill={color}
        />
    </Svg>
);

export default HandSvg;

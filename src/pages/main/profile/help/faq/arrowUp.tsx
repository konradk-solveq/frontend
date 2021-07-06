import React from 'react';
import Svg, {Path} from 'react-native-svg';

const ArrowUp: React.FC = () => (
    <Svg width="15" height="9">
        <Path
            d="M13.71 8.19a.94.94 0 01-1.302.088l-.093-.088-4.814-5.145L2.685 8.19l-.093.09a.943.943 0 01-1.303-.09 1.106 1.106 0 01-.082-1.39l.082-.1L6.802.81l.093-.088a.938.938 0 011.21 0l.093.088 5.513 5.89c.385.413.385 1.08 0 1.492z"
            fill="#313131"
            fill-rule="nonzero"
        />
    </Svg>
);

export default ArrowUp;

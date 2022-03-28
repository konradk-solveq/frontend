import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

export default () => (
    <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <Circle cx="16" cy="16" r="12" fill="#78BA35" />
        <Path
            d="M11.2373 16.7627L14.5707 20.096L21.3333 13.3333"
            stroke="white"
            stroke-width="2.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </Svg>
);

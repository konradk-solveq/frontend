import React from 'react';
import Svg, { G, Rect, Path } from 'react-native-svg';

const ChecboxOn = () => (
    <Svg width="26" height="27" viewBox="0 0 26 27">
        <G fill="none" fill-Rule="evenodd" transform="translate(-40 -588) translate(40 315.796) translate(0 272.412)">
            <Rect width="26" height="26.232" fill="#D8232A" rx="4" />
            <G fill="#FFF" fillRule="nonzero">
                <Path d="M11.649 2.132L5.318 8.715c-.469.487-1.23.487-1.698 0L.352 5.316c-.47-.487-.47-1.278 0-1.766.469-.488 1.23-.488 1.698 0l2.419 2.515L9.95.365c.469-.487 1.23-.487 1.698 0 .47.488.47 1.279 0 1.767z" 
                transform="translate(7 9.08)" />
            </G>
        </G>
    </Svg>
)

export default ChecboxOn;
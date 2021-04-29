import React from 'react';
import {StyleSheet, Dimensions, View, StatusBar} from 'react-native';
import AnimSvg from '../../../helpers/animSvg';

import {
    setObjSize,
    getStandardPx,
    getVerticalPx,
    getWidthPx,
    getRelativeHeight,
} from '../../../helpers/layoutFoo';

const ww = Dimensions.get('window').width;
const wh = Dimensions.get('window').height;

interface Props {
    navigation: any;
}

const SplashScreen: React.FC<Props> = (props: Props) => {
    setTimeout(() => {
        props.navigation.replace('MineMenu');
    }, 3000);

    const krossLogo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 242 130">
    <defs>
        <clipPath id="clip">
            <polygon  opacity=".3">
                <animate attributeName="points" begin="0.1s" dur="1s" repeatCount="1" fill="freeze" values="-260,-10 -85,-10 -220,180 -260,180 ; -20,-10 355,-10 220,180 -20,180"/>
            </polygon>
        </clipPath>
        <clipPath id="clip2">
            <polygon  opacity=".3">
                <animate attributeName="points" begin="0s" dur="1s" repeatCount="1" fill="freeze" values="-25,-10 -85,-10 -220,180 -160,180 ; 415,-10 355,-10 220,180 280,180"/>
            </polygon>
        </clipPath>
    </defs>
    <g clip-path="url(#clip)">
        <path fill="#d8232a" fill-rule="evenodd" d="M 115.76172 0 C 112.59172 0 109.97378 0.29428125 107.92578 0.86328125 C 105.87878 1.4332812 104.14694 2.1618594 102.71094 3.0058594 C 101.29294 3.8708594 100.07087 4.8120469 99.046875 5.8730469 C 98.102875 6.8540469 55.813438 60.112875 55.773438 60.171875 L 84.123047 81.445312 C 85.148047 81.995312 86.171312 82.605844 87.195312 83.214844 C 88.218312 83.842844 89.439422 84.411828 90.857422 84.923828 C 92.274422 85.433828 94.027219 85.865219 96.074219 86.199219 C 98.102219 86.533219 100.73916 86.710937 103.91016 86.710938 L 123.7168 86.710938 L 89.085938 60.150391 L 135.56836 0 L 115.76172 0 z M 145.64648 21.195312 C 142.87148 21.195312 140.58788 21.452359 138.79688 21.943359 C 137.02488 22.453359 135.50658 23.083125 134.26758 23.828125 C 133.02758 24.575125 131.96413 25.399266 131.07812 26.322266 C 130.25113 27.167266 103.75236 60.073281 103.69336 60.113281 L 144.42773 90.738281 C 145.31373 91.229281 146.21852 91.758062 147.10352 92.289062 C 147.98952 92.839062 149.05492 93.331203 150.29492 93.783203 C 151.53492 94.235203 153.0498 94.587344 154.8418 94.902344 C 156.6318 95.197344 158.89783 95.335937 161.67383 95.335938 L 178.93945 95.335938 L 132.75195 60.111328 L 162.89453 21.195312 L 145.64648 21.195312 z "/>
        <path fill="#1c1b19" fill-rule="evenodd" d="M 19.018,107.102 H 8.15 L 0,129.438 h 0.984 c 1.3,0 2.56,-0.059 3.8,-0.217 1.24,-0.137 2.382,-0.372 3.425,-0.707 1.064,-0.333 1.95,-0.766 2.698,-1.316 0.59,-0.452 1.023,-0.982 1.338,-1.59 z m 28.547,0 h -12.01 l -19.924,11.04 12.128,9.095 c 0.433,0.236 0.847,0.472 1.28,0.747 0.433,0.255 0.945,0.491 1.535,0.708 0.592,0.215 1.34,0.392 2.186,0.53 0.866,0.157 1.95,0.216 3.287,0.216 h 8.309 L 28.9,117.593 47.564,107.102 Z m 97.216,1.218 c -1.555,-0.786 -3.818,-1.18 -6.772,-1.18 H 113.91 c -1.338,0 -2.618,0.1 -3.859,0.316 -1.24,0.216 -2.382,0.53 -3.406,0.942 -1.023,0.393 -1.89,0.884 -2.598,1.454 -0.728,0.57 -1.201,1.199 -1.438,1.867 l -4.862,13.2 c -0.236,0.707 -0.217,1.336 0.099,1.886 0.314,0.55 0.826,1.022 1.535,1.435 0.728,0.392 1.634,0.707 2.717,0.923 1.103,0.215 2.323,0.314 3.662,0.314 h 24.097 c 1.378,0 2.697,-0.078 3.977,-0.236 1.26,-0.176 2.422,-0.451 3.465,-0.825 1.044,-0.392 1.93,-0.845 2.657,-1.395 0.71,-0.55 1.202,-1.218 1.497,-2.042 l 4.784,-13.202 c 0.571,-1.512 0.08,-2.672 -1.457,-3.457 z m -13.603,14.95 c -0.099,0.235 -0.276,0.45 -0.532,0.667 -0.256,0.197 -0.572,0.374 -0.945,0.531 -0.354,0.137 -0.769,0.255 -1.22,0.334 -0.454,0.078 -0.926,0.117 -1.399,0.117 h -18.466 l 4.193,-11.413 c 0.079,-0.236 0.256,-0.472 0.512,-0.668 0.256,-0.196 0.57,-0.373 0.945,-0.53 0.374,-0.138 0.787,-0.255 1.22,-0.334 0.453,-0.08 0.925,-0.118 1.398,-0.118 h 18.486 l -4.193,11.414 z M 95.267,108.359 c -1.516,-0.806 -3.76,-1.218 -6.772,-1.218 H 54.672 l -8.092,22.277 h 1.083 c 1.28,0 2.56,-0.06 3.82,-0.177 1.26,-0.118 2.441,-0.373 3.543,-0.747 2.087,-0.766 3.524,-2.2 4.293,-4.302 l 4.508,-12.336 h 22.03 l -1.575,4.086 c -0.079,0.236 -0.257,0.471 -0.512,0.668 -0.256,0.216 -0.57,0.393 -0.945,0.53 -0.374,0.157 -0.767,0.255 -1.22,0.334 -0.375,0.06 -0.768,0.098 -1.163,0.118 h -16.36 l 1.989,1.453 11.183,8.33 c 0.432,0.256 0.865,0.49 1.28,0.766 0.432,0.256 0.944,0.491 1.554,0.707 0.59,0.216 1.32,0.393 2.166,0.53 0.866,0.139 1.97,0.217 3.288,0.217 h 8.308 l -9.647,-7.289 h 0.551 c 2.442,-0.176 4.47,-0.608 6.083,-1.296 1.91,-0.805 3.131,-1.925 3.643,-3.36 l 2.165,-5.794 c 0.591,-1.532 0.119,-2.691 -1.378,-3.497 m 65.816,4.479 c 0.255,-0.216 0.57,-0.373 0.945,-0.53 0.373,-0.138 0.787,-0.255 1.22,-0.334 0.453,-0.08 0.925,-0.118 1.398,-0.118 h 29.374 c 0.63,-1.611 0.118,-2.81 -1.536,-3.575 -1.634,-0.767 -3.997,-1.14 -7.048,-1.14 h -22.74 c -1.338,0 -2.637,0.099 -3.897,0.295 -1.28,0.177 -2.442,0.491 -3.504,0.923 -1.084,0.432 -2.008,0.963 -2.756,1.61 -0.77,0.63 -1.32,1.415 -1.654,2.319 L 149.526,116 c -0.275,0.806 -0.256,1.494 0.078,2.064 0.336,0.569 0.887,1.06 1.635,1.453 0.767,0.413 1.712,0.708 2.835,0.904 1.121,0.196 2.324,0.275 3.603,0.275 h 23.25 l -1.063,2.848 c -0.078,0.138 -0.196,0.256 -0.354,0.393 -0.256,0.197 -0.571,0.374 -0.945,0.53 -0.374,0.138 -0.787,0.256 -1.24,0.335 -0.434,0.078 -0.906,0.098 -1.398,0.098 h -1.024 v 0.02 h -28.665 c -0.295,0.746 -0.236,1.414 0.137,1.984 0.395,0.588 1.006,1.06 1.833,1.473 0.826,0.412 1.83,0.707 2.991,0.884 1.182,0.196 2.402,0.295 3.702,0.295 h 23.172 c 3.15,0 5.808,-0.373 7.973,-1.14 2.166,-0.766 3.564,-1.965 4.194,-3.576 l 1.574,-4.419 c 0.276,-0.766 0.237,-1.434 -0.156,-2.004 -0.374,-0.57 -0.986,-1.041 -1.812,-1.395 -0.846,-0.353 -1.85,-0.609 -3.051,-0.785 -1.202,-0.157 -2.422,-0.237 -3.72,-0.237 h -23.39 l 0.964,-2.631 c 0.099,-0.197 0.217,-0.374 0.434,-0.53 m 47.702,-0.001 c 0.256,-0.216 0.571,-0.373 0.945,-0.53 0.374,-0.138 0.787,-0.255 1.22,-0.334 0.454,-0.08 0.926,-0.118 1.399,-0.118 h 29.373 c 0.63,-1.611 0.118,-2.81 -1.536,-3.575 -1.633,-0.767 -3.995,-1.14 -7.047,-1.14 h -22.74 c -1.338,0 -2.637,0.099 -3.898,0.295 -1.26,0.177 -2.44,0.491 -3.504,0.923 -1.083,0.432 -1.988,0.963 -2.756,1.61 -0.768,0.63 -1.32,1.415 -1.654,2.319 L 197.23,116 c -0.276,0.806 -0.256,1.494 0.078,2.064 0.335,0.569 0.887,1.06 1.654,1.453 0.748,0.413 1.693,0.708 2.816,0.904 1.121,0.196 2.323,0.275 3.602,0.275 h 23.25 l -1.062,2.848 c -0.079,0.138 -0.196,0.256 -0.355,0.393 -0.255,0.197 -0.57,0.374 -0.944,0.53 -0.374,0.138 -0.768,0.256 -1.22,0.335 -0.454,0.078 -0.926,0.098 -1.4,0.098 h -1.023 v 0.02 h -28.684 c -0.275,0.746 -0.237,1.414 0.137,1.984 0.395,0.588 1.005,1.06 1.832,1.473 0.826,0.412 1.83,0.707 3.012,0.884 1.162,0.196 2.382,0.295 3.682,0.295 h 23.172 c 3.15,0 5.808,-0.373 7.972,-1.14 2.166,-0.766 3.565,-1.965 4.195,-3.576 l 1.575,-4.419 c 0.275,-0.766 0.216,-1.434 -0.158,-2.004 -0.374,-0.57 -0.984,-1.041 -1.81,-1.395 -0.848,-0.353 -1.852,-0.609 -3.053,-0.785 -1.181,-0.157 -2.421,-0.237 -3.72,-0.237 h -23.39 l 0.965,-2.631 c 0.099,-0.197 0.237,-0.374 0.433,-0.53"/>
    </g>
    <g clip-path="url(#clip2)" opacity=".3">
        <path fill="#d8232a" fill-rule="evenodd" d="M 115.76172 0 C 112.59172 0 109.97378 0.29428125 107.92578 0.86328125 C 105.87878 1.4332812 104.14694 2.1618594 102.71094 3.0058594 C 101.29294 3.8708594 100.07087 4.8120469 99.046875 5.8730469 C 98.102875 6.8540469 55.813438 60.112875 55.773438 60.171875 L 84.123047 81.445312 C 85.148047 81.995312 86.171312 82.605844 87.195312 83.214844 C 88.218312 83.842844 89.439422 84.411828 90.857422 84.923828 C 92.274422 85.433828 94.027219 85.865219 96.074219 86.199219 C 98.102219 86.533219 100.73916 86.710937 103.91016 86.710938 L 123.7168 86.710938 L 89.085938 60.150391 L 135.56836 0 L 115.76172 0 z M 145.64648 21.195312 C 142.87148 21.195312 140.58788 21.452359 138.79688 21.943359 C 137.02488 22.453359 135.50658 23.083125 134.26758 23.828125 C 133.02758 24.575125 131.96413 25.399266 131.07812 26.322266 C 130.25113 27.167266 103.75236 60.073281 103.69336 60.113281 L 144.42773 90.738281 C 145.31373 91.229281 146.21852 91.758062 147.10352 92.289062 C 147.98952 92.839062 149.05492 93.331203 150.29492 93.783203 C 151.53492 94.235203 153.0498 94.587344 154.8418 94.902344 C 156.6318 95.197344 158.89783 95.335937 161.67383 95.335938 L 178.93945 95.335938 L 132.75195 60.111328 L 162.89453 21.195312 L 145.64648 21.195312 z "/>
        <path fill="#1c1b19" fill-rule="evenodd" d="M 19.018,107.102 H 8.15 L 0,129.438 h 0.984 c 1.3,0 2.56,-0.059 3.8,-0.217 1.24,-0.137 2.382,-0.372 3.425,-0.707 1.064,-0.333 1.95,-0.766 2.698,-1.316 0.59,-0.452 1.023,-0.982 1.338,-1.59 z m 28.547,0 h -12.01 l -19.924,11.04 12.128,9.095 c 0.433,0.236 0.847,0.472 1.28,0.747 0.433,0.255 0.945,0.491 1.535,0.708 0.592,0.215 1.34,0.392 2.186,0.53 0.866,0.157 1.95,0.216 3.287,0.216 h 8.309 L 28.9,117.593 47.564,107.102 Z m 97.216,1.218 c -1.555,-0.786 -3.818,-1.18 -6.772,-1.18 H 113.91 c -1.338,0 -2.618,0.1 -3.859,0.316 -1.24,0.216 -2.382,0.53 -3.406,0.942 -1.023,0.393 -1.89,0.884 -2.598,1.454 -0.728,0.57 -1.201,1.199 -1.438,1.867 l -4.862,13.2 c -0.236,0.707 -0.217,1.336 0.099,1.886 0.314,0.55 0.826,1.022 1.535,1.435 0.728,0.392 1.634,0.707 2.717,0.923 1.103,0.215 2.323,0.314 3.662,0.314 h 24.097 c 1.378,0 2.697,-0.078 3.977,-0.236 1.26,-0.176 2.422,-0.451 3.465,-0.825 1.044,-0.392 1.93,-0.845 2.657,-1.395 0.71,-0.55 1.202,-1.218 1.497,-2.042 l 4.784,-13.202 c 0.571,-1.512 0.08,-2.672 -1.457,-3.457 z m -13.603,14.95 c -0.099,0.235 -0.276,0.45 -0.532,0.667 -0.256,0.197 -0.572,0.374 -0.945,0.531 -0.354,0.137 -0.769,0.255 -1.22,0.334 -0.454,0.078 -0.926,0.117 -1.399,0.117 h -18.466 l 4.193,-11.413 c 0.079,-0.236 0.256,-0.472 0.512,-0.668 0.256,-0.196 0.57,-0.373 0.945,-0.53 0.374,-0.138 0.787,-0.255 1.22,-0.334 0.453,-0.08 0.925,-0.118 1.398,-0.118 h 18.486 l -4.193,11.414 z M 95.267,108.359 c -1.516,-0.806 -3.76,-1.218 -6.772,-1.218 H 54.672 l -8.092,22.277 h 1.083 c 1.28,0 2.56,-0.06 3.82,-0.177 1.26,-0.118 2.441,-0.373 3.543,-0.747 2.087,-0.766 3.524,-2.2 4.293,-4.302 l 4.508,-12.336 h 22.03 l -1.575,4.086 c -0.079,0.236 -0.257,0.471 -0.512,0.668 -0.256,0.216 -0.57,0.393 -0.945,0.53 -0.374,0.157 -0.767,0.255 -1.22,0.334 -0.375,0.06 -0.768,0.098 -1.163,0.118 h -16.36 l 1.989,1.453 11.183,8.33 c 0.432,0.256 0.865,0.49 1.28,0.766 0.432,0.256 0.944,0.491 1.554,0.707 0.59,0.216 1.32,0.393 2.166,0.53 0.866,0.139 1.97,0.217 3.288,0.217 h 8.308 l -9.647,-7.289 h 0.551 c 2.442,-0.176 4.47,-0.608 6.083,-1.296 1.91,-0.805 3.131,-1.925 3.643,-3.36 l 2.165,-5.794 c 0.591,-1.532 0.119,-2.691 -1.378,-3.497 m 65.816,4.479 c 0.255,-0.216 0.57,-0.373 0.945,-0.53 0.373,-0.138 0.787,-0.255 1.22,-0.334 0.453,-0.08 0.925,-0.118 1.398,-0.118 h 29.374 c 0.63,-1.611 0.118,-2.81 -1.536,-3.575 -1.634,-0.767 -3.997,-1.14 -7.048,-1.14 h -22.74 c -1.338,0 -2.637,0.099 -3.897,0.295 -1.28,0.177 -2.442,0.491 -3.504,0.923 -1.084,0.432 -2.008,0.963 -2.756,1.61 -0.77,0.63 -1.32,1.415 -1.654,2.319 L 149.526,116 c -0.275,0.806 -0.256,1.494 0.078,2.064 0.336,0.569 0.887,1.06 1.635,1.453 0.767,0.413 1.712,0.708 2.835,0.904 1.121,0.196 2.324,0.275 3.603,0.275 h 23.25 l -1.063,2.848 c -0.078,0.138 -0.196,0.256 -0.354,0.393 -0.256,0.197 -0.571,0.374 -0.945,0.53 -0.374,0.138 -0.787,0.256 -1.24,0.335 -0.434,0.078 -0.906,0.098 -1.398,0.098 h -1.024 v 0.02 h -28.665 c -0.295,0.746 -0.236,1.414 0.137,1.984 0.395,0.588 1.006,1.06 1.833,1.473 0.826,0.412 1.83,0.707 2.991,0.884 1.182,0.196 2.402,0.295 3.702,0.295 h 23.172 c 3.15,0 5.808,-0.373 7.973,-1.14 2.166,-0.766 3.564,-1.965 4.194,-3.576 l 1.574,-4.419 c 0.276,-0.766 0.237,-1.434 -0.156,-2.004 -0.374,-0.57 -0.986,-1.041 -1.812,-1.395 -0.846,-0.353 -1.85,-0.609 -3.051,-0.785 -1.202,-0.157 -2.422,-0.237 -3.72,-0.237 h -23.39 l 0.964,-2.631 c 0.099,-0.197 0.217,-0.374 0.434,-0.53 m 47.702,-0.001 c 0.256,-0.216 0.571,-0.373 0.945,-0.53 0.374,-0.138 0.787,-0.255 1.22,-0.334 0.454,-0.08 0.926,-0.118 1.399,-0.118 h 29.373 c 0.63,-1.611 0.118,-2.81 -1.536,-3.575 -1.633,-0.767 -3.995,-1.14 -7.047,-1.14 h -22.74 c -1.338,0 -2.637,0.099 -3.898,0.295 -1.26,0.177 -2.44,0.491 -3.504,0.923 -1.083,0.432 -1.988,0.963 -2.756,1.61 -0.768,0.63 -1.32,1.415 -1.654,2.319 L 197.23,116 c -0.276,0.806 -0.256,1.494 0.078,2.064 0.335,0.569 0.887,1.06 1.654,1.453 0.748,0.413 1.693,0.708 2.816,0.904 1.121,0.196 2.323,0.275 3.602,0.275 h 23.25 l -1.062,2.848 c -0.079,0.138 -0.196,0.256 -0.355,0.393 -0.255,0.197 -0.57,0.374 -0.944,0.53 -0.374,0.138 -0.768,0.256 -1.22,0.335 -0.454,0.078 -0.926,0.098 -1.4,0.098 h -1.023 v 0.02 h -28.684 c -0.275,0.746 -0.237,1.414 0.137,1.984 0.395,0.588 1.005,1.06 1.832,1.473 0.826,0.412 1.83,0.707 3.012,0.884 1.162,0.196 2.382,0.295 3.682,0.295 h 23.172 c 3.15,0 5.808,-0.373 7.972,-1.14 2.166,-0.766 3.565,-1.965 4.195,-3.576 l 1.575,-4.419 c 0.275,-0.766 0.216,-1.434 -0.158,-2.004 -0.374,-0.57 -0.984,-1.041 -1.81,-1.395 -0.848,-0.353 -1.852,-0.609 -3.053,-0.785 -1.181,-0.157 -2.421,-0.237 -3.72,-0.237 h -23.39 l 0.965,-2.631 c 0.099,-0.197 0.237,-0.374 0.433,-0.53"/>
    </g>
</svg>`;

    const krossYouCan = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 118 52">
    <defs>
        <clipPath id="clip">
            <polygon>
                <animate attributeName="points" begin="0.4s" dur="1s" repeatCount="1" fill="freeze" values="-260,-10 -85,-10 -130,60 -260,60 ; -20,-10 175,-10 130,60 -20,60"></animate>
            </polygon>
        </clipPath>
        <clipPath id="clip2">
            <polygon fill="blue"  opacity=".3">
                <animate attributeName="points" begin="0.3s" dur="1s" repeatCount="1" fill="freeze" values="-85,-10 -65,-10 -110,60 -130,60  ;  175,-10 195,-10 150,60 130,60 "></animate>
            </polygon>
        </clipPath>
    </defs>
    <path clip-path="url(#clip)" fill="#d8232a" fill-rule="evenodd" d="M 26.675,0 24.338,6.268 22.779,12.05 H 21.578 L 22.13,6.268 22.195,0 H 17 l 0.016,23 h 5.006 l -0.054,-2.97 2.337,-4.523 2.18,7.493 h 4.736 L 27.681,10.629 32,0 Z M 8.019,9 H 9.622 L 9.639,6.739 10.989,6.735 V 5.064 L 9.639,5.088 V 2.65 H 12 V 1 H 8 L 8.02,9 Z M 1.066,1.85 C 1.075,1.543 1.152,1.324 1.298,1.194 1.444,1.065 1.68,1 2.007,1 c 0.326,0 0.56,0.065 0.702,0.194 0.14,0.13 0.216,0.349 0.225,0.657 0.088,1.758 0.088,3.52 0,5.286 C 2.925,7.445 2.85,7.666 2.709,7.799 2.567,7.933 2.333,8 2.007,8 1.68,8 1.444,7.933 1.298,7.8 1.152,7.666 1.075,7.445 1.066,7.137 0.978,5.371 0.978,3.609 1.066,1.851 Z M 0.618,9.433 C 1.002,9.811 1.626,10 2.49,10 3.34,10 3.955,9.811 4.335,9.433 4.715,9.055 4.92,8.427 4.95,7.549 4.972,6.939 4.987,6.362 4.995,5.817 5.002,5.272 5.002,4.726 4.995,4.177 4.987,3.628 4.972,3.049 4.95,2.439 4.92,1.569 4.715,0.945 4.335,0.567 3.955,0.189 3.34,0 2.49,0 1.626,0 1.002,0.189 0.618,0.567 0.234,0.945 0.034,1.569 0.02,2.439 0.012,3.049 0.007,3.626 0.003,4.171 c -0.004,0.545 -0.004,1.091 0,1.64 0.004,0.549 0.01,1.128 0.017,1.738 0.014,0.878 0.214,1.506 0.598,1.884 z m 105.348,3.32 c 0.595,1.024 1.663,1.73 3.205,2.114 l 2.693,0.673 c 0.468,0.107 0.858,0.347 1.17,0.72 0.312,0.375 0.488,0.786 0.527,1.234 0.117,1.069 0.117,2.147 0,3.236 -0.117,1.09 -0.8,1.634 -2.049,1.634 -1.327,0 -2.039,-0.544 -2.136,-1.634 -0.059,-0.619 -0.083,-1.308 -0.073,-2.066 0.01,-0.758 0.033,-1.533 0.073,-2.323 h -4.127 c -0.078,0.512 -0.122,1.095 -0.132,1.746 -0.01,0.652 -0.005,1.233 0.015,1.746 0.097,2.307 1.936,4.167 1.936,4.167 h 8.204 c 0,0 2.601,-1.86 2.68,-4.167 0.019,-0.363 0.033,-0.753 0.043,-1.17 0.01,-0.416 0.005,-0.805 -0.014,-1.169 -0.059,-1.644 -0.444,-3 -1.156,-4.069 -0.713,-1.068 -1.898,-1.794 -3.557,-2.179 l -2.37,-0.544 c -0.488,-0.107 -0.85,-0.342 -1.083,-0.705 -0.234,-0.363 -0.371,-0.758 -0.41,-1.186 -0.117,-1.11 -0.117,-2.21 0,-3.3 0.117,-1.068 0.82,-1.602 2.107,-1.602 1.366,0 2.068,0.534 2.108,1.602 0.039,0.726 0.053,1.458 0.044,2.195 -0.01,0.737 -0.035,1.48 -0.074,2.227 h 4.215 c 0.039,-0.556 0.063,-1.164 0.073,-1.827 0.01,-0.662 0.005,-1.228 -0.014,-1.698 C 117.785,4.123 117.254,2.483 116.268,1.49 115.283,0.497 113.698,0 111.512,0 c -2.244,0 -3.863,0.497 -4.858,1.49 -0.995,0.993 -1.542,2.633 -1.64,4.918 -0.019,0.748 -0.019,1.55 0,2.403 0.04,1.602 0.357,2.916 0.952,3.941 z m -10.015,7.08 c 0.02,-0.363 0.034,-0.753 0.044,-1.17 0.01,-0.416 0.005,-0.805 -0.014,-1.169 -0.059,-1.644 -0.444,-3 -1.156,-4.069 -0.713,-1.068 -1.898,-1.794 -3.557,-2.179 l -2.37,-0.544 C 88.41,10.595 88.048,10.36 87.815,9.997 87.581,9.634 87.444,9.239 87.405,8.811 c -0.117,-1.11 -0.117,-2.21 0,-3.3 0.117,-1.068 0.82,-1.602 2.107,-1.602 1.366,0 2.068,0.534 2.108,1.602 0.039,0.726 0.053,1.458 0.044,2.195 -0.01,0.737 -0.035,1.48 -0.074,2.227 h 4.215 C 95.844,9.377 95.868,8.769 95.878,8.106 95.888,7.444 95.883,6.878 95.864,6.408 95.785,4.123 95.254,2.483 94.268,1.49 93.283,0.497 91.698,0 89.512,0 c -2.244,0 -3.863,0.497 -4.858,1.49 -0.995,0.993 -1.542,2.633 -1.64,4.918 -0.019,0.748 -0.019,1.55 0,2.403 0.04,1.602 0.357,2.916 0.952,3.941 0.595,1.025 1.663,1.73 3.205,2.115 l 2.693,0.673 c 0.468,0.107 0.858,0.347 1.17,0.72 0.312,0.375 0.488,0.786 0.527,1.234 0.117,1.069 0.117,2.147 0,3.236 -0.117,1.09 -0.8,1.634 -2.049,1.634 -1.327,0 -2.039,-0.544 -2.136,-1.634 -0.059,-0.619 -0.083,-1.308 -0.073,-2.066 0.01,-0.758 0.033,-1.533 0.073,-2.323 h -4.127 c -0.078,0.512 -0.122,1.095 -0.132,1.746 -0.01,0.652 -0.005,1.233 0.015,1.746 C 83.229,22.14 85.098,24 85.098,24 h 7.952 c 0,0 2.823,-1.86 2.901,-4.167 z M 69.835,19.781 c -0.023,0.792 -0.21,1.36 -0.563,1.703 C 68.918,21.828 68.333,22 67.517,22 66.7,22 66.109,21.828 65.745,21.484 c -0.364,-0.343 -0.558,-0.91 -0.58,-1.703 -0.22,-4.541 -0.22,-9.073 0,-13.593 C 65.187,5.396 65.381,4.833 65.745,4.5 66.109,4.167 66.7,4 67.517,4 c 0.816,0 1.401,0.167 1.755,0.5 0.353,0.333 0.54,0.896 0.563,1.688 0.22,4.52 0.22,9.052 0,13.593 z M 73.869,6.401 C 73.792,4.118 73.259,2.481 72.271,1.488 71.283,0.496 69.684,0 67.475,0 65.227,0 63.604,0.496 62.606,1.488 61.608,2.48 61.09,4.118 61.051,6.401 c -0.02,1.6 -0.034,3.116 -0.043,4.545 -0.01,1.43 -0.01,2.864 0,4.305 0.01,1.44 0.024,2.96 0.043,4.56 0.039,2.305 1.008,3.818 1.28,4.163 0.045,0.059 5.265,0 5.265,0 0,0 5.404,0.059 5.39,0 0.234,-0.281 0.806,-1.858 0.883,-4.163 0.059,-1.6 0.097,-3.115 0.117,-4.544 0.019,-1.43 0.019,-2.865 0,-4.305 -0.02,-1.44 -0.058,-2.96 -0.117,-4.56 z M 47.917,10.346 C 47.851,11.449 47.131,12 45.759,12 H 44 V 4 h 1.76 c 1.371,0 2.09,0.552 2.157,1.654 0.11,1.564 0.11,3.128 0,4.692 z m 5.03,-4.014 C 52.863,4.082 52.312,2.463 51.293,1.478 50.273,0.493 48.609,0 46.301,0 H 40.027 L 40,24 h 4.665 l -0.002,-6.789 h 1.36 L 47.864,24 h 4.799 l -2.282,-7.6 c 0.844,-0.477 1.473,-1.164 1.885,-2.063 0.412,-0.898 0.639,-2.05 0.68,-3.458 0.02,-0.606 0.036,-1.137 0.046,-1.591 0.01,-0.455 0.01,-0.91 0,-1.364 C 52.982,7.469 52.966,6.939 52.946,6.332 Z M 111.04,51 H 117 v -3 l -6,0.036 z m 6.92,-18 h -3.954 L 114,39.532 114.533,46 h 2.934 L 118,39.532 Z m -13.72,1 0.241,7.464 0.812,8.008 h -1.152 L 101.635,34 H 95.022 L 95,52 h 3.757 l -0.325,-7.565 -0.652,-8.92 h 1.055 L 101.513,52 H 108 l -0.046,-18 h -3.715 z M 82,44 82.333,39.683 82.556,35 h 0.888 L 83.667,39.683 84,44 Z M 79.605,34 77,52 h 3.866 l 0.427,-4.115 h 3.414 L 85.134,52 H 89 L 86.499,34 Z M 67.274,44.465 c 0.033,0.55 0.05,1.033 0.05,1.446 0,0.413 -0.017,0.88 -0.05,1.398 -0.017,0.616 -0.16,1.057 -0.432,1.324 -0.272,0.268 -0.72,0.401 -1.345,0.401 -0.609,0 -1.049,-0.133 -1.32,-0.4 -0.272,-0.268 -0.416,-0.71 -0.432,-1.325 -0.099,-3.517 -0.099,-7.041 0,-10.574 0.016,-0.616 0.16,-1.054 0.432,-1.313 0.271,-0.259 0.711,-0.389 1.32,-0.389 0.576,0 0.995,0.13 1.259,0.389 0.263,0.26 0.403,0.697 0.42,1.313 0.015,0.454 0.02,0.932 0.011,1.434 -0.008,0.502 -0.02,0.98 -0.037,1.434 h 3.702 c 0.016,-0.405 0.028,-0.85 0.037,-1.337 0.008,-0.486 0.004,-0.932 -0.012,-1.337 C 70.827,35.276 70.18,34 70.18,34 h -9.081 c 0,0 -1.023,1.22 -1.056,2.905 -0.016,1.215 -0.029,2.374 -0.037,3.476 -0.008,1.102 -0.008,2.196 0,3.281 0.008,1.086 0.02,2.237 0.037,3.452 0.033,1.75 0.473,3.002 1.32,3.756 0.848,0.753 2.225,1.13 4.134,1.13 1.908,0 3.286,-0.377 4.133,-1.13 0.848,-0.754 1.296,-2.006 1.345,-3.756 C 70.992,46.725 71,46.284 71,45.789 71,45.295 70.992,44.853 70.975,44.465 Z M 40.274,34 c 0.048,2.447 0.031,3.298 0.023,5.931 -0.009,2.634 -0.029,5.174 -0.062,7.62 0,0.99 -0.576,1.483 -1.729,1.483 -1.17,0 -1.754,-0.494 -1.754,-1.482 l -0.05,-7.62 C 36.686,37.298 36.696,36.447 36.746,34 h -3.663 c -0.083,4.927 -0.119,8.172 -0.036,13.114 0.033,1.75 0.47,3.002 1.31,3.756 0.839,0.753 2.222,1.13 4.149,1.13 1.91,0 3.29,-0.377 4.138,-1.13 0.848,-0.754 1.28,-2.006 1.296,-3.756 C 44.023,42.172 44.018,38.927 43.936,34 H 40.273 Z M 22.868,47.274 C 22.85,47.89 22.7,48.332 22.418,48.599 22.135,48.866 21.667,49 21.013,49 20.36,49 19.888,48.866 19.596,48.599 19.305,48.332 19.15,47.89 19.133,47.274 c -0.177,-3.532 -0.177,-7.056 0,-10.573 0.017,-0.615 0.172,-1.053 0.463,-1.312 C 19.888,35.129 20.36,35 21.013,35 c 0.654,0 1.122,0.13 1.404,0.389 0.283,0.26 0.433,0.697 0.45,1.312 0.177,3.517 0.177,7.041 0,10.573 z M 25.89,36.929 C 25.824,35.195 24.498,34 24.498,34 h -8.105 c 0,0 -1.317,1.195 -1.35,2.93 -0.016,1.214 -0.029,2.365 -0.037,3.45 -0.008,1.087 -0.008,2.176 0,3.27 0.008,1.094 0.02,2.249 0.037,3.464 0.033,1.75 0.471,3.002 1.316,3.756 0.844,0.753 2.217,1.13 4.12,1.13 1.869,0 3.222,-0.377 4.058,-1.13 0.836,-0.754 1.287,-2.006 1.353,-3.756 0.049,-1.215 0.081,-2.366 0.098,-3.452 0.016,-1.085 0.016,-2.175 0,-3.269 -0.017,-1.094 -0.05,-2.249 -0.098,-3.464 z M 6.209,38.312 5.842,43.534 H 5.158 L 4.791,38.312 3.74,34 H 0 L 3.606,46.425 V 52 H 7.342 V 46.475 H 7.355 L 11,34 H 7.26 Z"/>
    <path clip-path="url(#clip2)" opacity=".3" fill="#d8232a" fill-rule="evenodd" d="M 26.675,0 24.338,6.268 22.779,12.05 H 21.578 L 22.13,6.268 22.195,0 H 17 l 0.016,23 h 5.006 l -0.054,-2.97 2.337,-4.523 2.18,7.493 h 4.736 L 27.681,10.629 32,0 Z M 8.019,9 H 9.622 L 9.639,6.739 10.989,6.735 V 5.064 L 9.639,5.088 V 2.65 H 12 V 1 H 8 L 8.02,9 Z M 1.066,1.85 C 1.075,1.543 1.152,1.324 1.298,1.194 1.444,1.065 1.68,1 2.007,1 c 0.326,0 0.56,0.065 0.702,0.194 0.14,0.13 0.216,0.349 0.225,0.657 0.088,1.758 0.088,3.52 0,5.286 C 2.925,7.445 2.85,7.666 2.709,7.799 2.567,7.933 2.333,8 2.007,8 1.68,8 1.444,7.933 1.298,7.8 1.152,7.666 1.075,7.445 1.066,7.137 0.978,5.371 0.978,3.609 1.066,1.851 Z M 0.618,9.433 C 1.002,9.811 1.626,10 2.49,10 3.34,10 3.955,9.811 4.335,9.433 4.715,9.055 4.92,8.427 4.95,7.549 4.972,6.939 4.987,6.362 4.995,5.817 5.002,5.272 5.002,4.726 4.995,4.177 4.987,3.628 4.972,3.049 4.95,2.439 4.92,1.569 4.715,0.945 4.335,0.567 3.955,0.189 3.34,0 2.49,0 1.626,0 1.002,0.189 0.618,0.567 0.234,0.945 0.034,1.569 0.02,2.439 0.012,3.049 0.007,3.626 0.003,4.171 c -0.004,0.545 -0.004,1.091 0,1.64 0.004,0.549 0.01,1.128 0.017,1.738 0.014,0.878 0.214,1.506 0.598,1.884 z m 105.348,3.32 c 0.595,1.024 1.663,1.73 3.205,2.114 l 2.693,0.673 c 0.468,0.107 0.858,0.347 1.17,0.72 0.312,0.375 0.488,0.786 0.527,1.234 0.117,1.069 0.117,2.147 0,3.236 -0.117,1.09 -0.8,1.634 -2.049,1.634 -1.327,0 -2.039,-0.544 -2.136,-1.634 -0.059,-0.619 -0.083,-1.308 -0.073,-2.066 0.01,-0.758 0.033,-1.533 0.073,-2.323 h -4.127 c -0.078,0.512 -0.122,1.095 -0.132,1.746 -0.01,0.652 -0.005,1.233 0.015,1.746 0.097,2.307 1.936,4.167 1.936,4.167 h 8.204 c 0,0 2.601,-1.86 2.68,-4.167 0.019,-0.363 0.033,-0.753 0.043,-1.17 0.01,-0.416 0.005,-0.805 -0.014,-1.169 -0.059,-1.644 -0.444,-3 -1.156,-4.069 -0.713,-1.068 -1.898,-1.794 -3.557,-2.179 l -2.37,-0.544 c -0.488,-0.107 -0.85,-0.342 -1.083,-0.705 -0.234,-0.363 -0.371,-0.758 -0.41,-1.186 -0.117,-1.11 -0.117,-2.21 0,-3.3 0.117,-1.068 0.82,-1.602 2.107,-1.602 1.366,0 2.068,0.534 2.108,1.602 0.039,0.726 0.053,1.458 0.044,2.195 -0.01,0.737 -0.035,1.48 -0.074,2.227 h 4.215 c 0.039,-0.556 0.063,-1.164 0.073,-1.827 0.01,-0.662 0.005,-1.228 -0.014,-1.698 C 117.785,4.123 117.254,2.483 116.268,1.49 115.283,0.497 113.698,0 111.512,0 c -2.244,0 -3.863,0.497 -4.858,1.49 -0.995,0.993 -1.542,2.633 -1.64,4.918 -0.019,0.748 -0.019,1.55 0,2.403 0.04,1.602 0.357,2.916 0.952,3.941 z m -10.015,7.08 c 0.02,-0.363 0.034,-0.753 0.044,-1.17 0.01,-0.416 0.005,-0.805 -0.014,-1.169 -0.059,-1.644 -0.444,-3 -1.156,-4.069 -0.713,-1.068 -1.898,-1.794 -3.557,-2.179 l -2.37,-0.544 C 88.41,10.595 88.048,10.36 87.815,9.997 87.581,9.634 87.444,9.239 87.405,8.811 c -0.117,-1.11 -0.117,-2.21 0,-3.3 0.117,-1.068 0.82,-1.602 2.107,-1.602 1.366,0 2.068,0.534 2.108,1.602 0.039,0.726 0.053,1.458 0.044,2.195 -0.01,0.737 -0.035,1.48 -0.074,2.227 h 4.215 C 95.844,9.377 95.868,8.769 95.878,8.106 95.888,7.444 95.883,6.878 95.864,6.408 95.785,4.123 95.254,2.483 94.268,1.49 93.283,0.497 91.698,0 89.512,0 c -2.244,0 -3.863,0.497 -4.858,1.49 -0.995,0.993 -1.542,2.633 -1.64,4.918 -0.019,0.748 -0.019,1.55 0,2.403 0.04,1.602 0.357,2.916 0.952,3.941 0.595,1.025 1.663,1.73 3.205,2.115 l 2.693,0.673 c 0.468,0.107 0.858,0.347 1.17,0.72 0.312,0.375 0.488,0.786 0.527,1.234 0.117,1.069 0.117,2.147 0,3.236 -0.117,1.09 -0.8,1.634 -2.049,1.634 -1.327,0 -2.039,-0.544 -2.136,-1.634 -0.059,-0.619 -0.083,-1.308 -0.073,-2.066 0.01,-0.758 0.033,-1.533 0.073,-2.323 h -4.127 c -0.078,0.512 -0.122,1.095 -0.132,1.746 -0.01,0.652 -0.005,1.233 0.015,1.746 C 83.229,22.14 85.098,24 85.098,24 h 7.952 c 0,0 2.823,-1.86 2.901,-4.167 z M 69.835,19.781 c -0.023,0.792 -0.21,1.36 -0.563,1.703 C 68.918,21.828 68.333,22 67.517,22 66.7,22 66.109,21.828 65.745,21.484 c -0.364,-0.343 -0.558,-0.91 -0.58,-1.703 -0.22,-4.541 -0.22,-9.073 0,-13.593 C 65.187,5.396 65.381,4.833 65.745,4.5 66.109,4.167 66.7,4 67.517,4 c 0.816,0 1.401,0.167 1.755,0.5 0.353,0.333 0.54,0.896 0.563,1.688 0.22,4.52 0.22,9.052 0,13.593 z M 73.869,6.401 C 73.792,4.118 73.259,2.481 72.271,1.488 71.283,0.496 69.684,0 67.475,0 65.227,0 63.604,0.496 62.606,1.488 61.608,2.48 61.09,4.118 61.051,6.401 c -0.02,1.6 -0.034,3.116 -0.043,4.545 -0.01,1.43 -0.01,2.864 0,4.305 0.01,1.44 0.024,2.96 0.043,4.56 0.039,2.305 1.008,3.818 1.28,4.163 0.045,0.059 5.265,0 5.265,0 0,0 5.404,0.059 5.39,0 0.234,-0.281 0.806,-1.858 0.883,-4.163 0.059,-1.6 0.097,-3.115 0.117,-4.544 0.019,-1.43 0.019,-2.865 0,-4.305 -0.02,-1.44 -0.058,-2.96 -0.117,-4.56 z M 47.917,10.346 C 47.851,11.449 47.131,12 45.759,12 H 44 V 4 h 1.76 c 1.371,0 2.09,0.552 2.157,1.654 0.11,1.564 0.11,3.128 0,4.692 z m 5.03,-4.014 C 52.863,4.082 52.312,2.463 51.293,1.478 50.273,0.493 48.609,0 46.301,0 H 40.027 L 40,24 h 4.665 l -0.002,-6.789 h 1.36 L 47.864,24 h 4.799 l -2.282,-7.6 c 0.844,-0.477 1.473,-1.164 1.885,-2.063 0.412,-0.898 0.639,-2.05 0.68,-3.458 0.02,-0.606 0.036,-1.137 0.046,-1.591 0.01,-0.455 0.01,-0.91 0,-1.364 C 52.982,7.469 52.966,6.939 52.946,6.332 Z M 111.04,51 H 117 v -3 l -6,0.036 z m 6.92,-18 h -3.954 L 114,39.532 114.533,46 h 2.934 L 118,39.532 Z m -13.72,1 0.241,7.464 0.812,8.008 h -1.152 L 101.635,34 H 95.022 L 95,52 h 3.757 l -0.325,-7.565 -0.652,-8.92 h 1.055 L 101.513,52 H 108 l -0.046,-18 h -3.715 z M 82,44 82.333,39.683 82.556,35 h 0.888 L 83.667,39.683 84,44 Z M 79.605,34 77,52 h 3.866 l 0.427,-4.115 h 3.414 L 85.134,52 H 89 L 86.499,34 Z M 67.274,44.465 c 0.033,0.55 0.05,1.033 0.05,1.446 0,0.413 -0.017,0.88 -0.05,1.398 -0.017,0.616 -0.16,1.057 -0.432,1.324 -0.272,0.268 -0.72,0.401 -1.345,0.401 -0.609,0 -1.049,-0.133 -1.32,-0.4 -0.272,-0.268 -0.416,-0.71 -0.432,-1.325 -0.099,-3.517 -0.099,-7.041 0,-10.574 0.016,-0.616 0.16,-1.054 0.432,-1.313 0.271,-0.259 0.711,-0.389 1.32,-0.389 0.576,0 0.995,0.13 1.259,0.389 0.263,0.26 0.403,0.697 0.42,1.313 0.015,0.454 0.02,0.932 0.011,1.434 -0.008,0.502 -0.02,0.98 -0.037,1.434 h 3.702 c 0.016,-0.405 0.028,-0.85 0.037,-1.337 0.008,-0.486 0.004,-0.932 -0.012,-1.337 C 70.827,35.276 70.18,34 70.18,34 h -9.081 c 0,0 -1.023,1.22 -1.056,2.905 -0.016,1.215 -0.029,2.374 -0.037,3.476 -0.008,1.102 -0.008,2.196 0,3.281 0.008,1.086 0.02,2.237 0.037,3.452 0.033,1.75 0.473,3.002 1.32,3.756 0.848,0.753 2.225,1.13 4.134,1.13 1.908,0 3.286,-0.377 4.133,-1.13 0.848,-0.754 1.296,-2.006 1.345,-3.756 C 70.992,46.725 71,46.284 71,45.789 71,45.295 70.992,44.853 70.975,44.465 Z M 40.274,34 c 0.048,2.447 0.031,3.298 0.023,5.931 -0.009,2.634 -0.029,5.174 -0.062,7.62 0,0.99 -0.576,1.483 -1.729,1.483 -1.17,0 -1.754,-0.494 -1.754,-1.482 l -0.05,-7.62 C 36.686,37.298 36.696,36.447 36.746,34 h -3.663 c -0.083,4.927 -0.119,8.172 -0.036,13.114 0.033,1.75 0.47,3.002 1.31,3.756 0.839,0.753 2.222,1.13 4.149,1.13 1.91,0 3.29,-0.377 4.138,-1.13 0.848,-0.754 1.28,-2.006 1.296,-3.756 C 44.023,42.172 44.018,38.927 43.936,34 H 40.273 Z M 22.868,47.274 C 22.85,47.89 22.7,48.332 22.418,48.599 22.135,48.866 21.667,49 21.013,49 20.36,49 19.888,48.866 19.596,48.599 19.305,48.332 19.15,47.89 19.133,47.274 c -0.177,-3.532 -0.177,-7.056 0,-10.573 0.017,-0.615 0.172,-1.053 0.463,-1.312 C 19.888,35.129 20.36,35 21.013,35 c 0.654,0 1.122,0.13 1.404,0.389 0.283,0.26 0.433,0.697 0.45,1.312 0.177,3.517 0.177,7.041 0,10.573 z M 25.89,36.929 C 25.824,35.195 24.498,34 24.498,34 h -8.105 c 0,0 -1.317,1.195 -1.35,2.93 -0.016,1.214 -0.029,2.365 -0.037,3.45 -0.008,1.087 -0.008,2.176 0,3.27 0.008,1.094 0.02,2.249 0.037,3.464 0.033,1.75 0.471,3.002 1.316,3.756 0.844,0.753 2.217,1.13 4.12,1.13 1.869,0 3.222,-0.377 4.058,-1.13 0.836,-0.754 1.287,-2.006 1.353,-3.756 0.049,-1.215 0.081,-2.366 0.098,-3.452 0.016,-1.085 0.016,-2.175 0,-3.269 -0.017,-1.094 -0.05,-2.249 -0.098,-3.464 z M 6.209,38.312 5.842,43.534 H 5.158 L 4.791,38.312 3.74,34 H 0 L 3.606,46.425 V 52 H 7.342 V 46.475 H 7.355 L 11,34 H 7.26 Z"/>
</svg>`;

    const pathScaleY = 0.9 * (wh / ww / (896 / 414));
    const allLine = (ww / 780.5) * 1394.3299560546875;

    const linePath =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780.5 235" transform-origin="0 0" transform="translate(0 ' +
        getVerticalPx(100) +
        `)" >
<path transform="scale(1.02 ` +
        pathScaleY +
        `)" fill="none" stroke="#d8232a" stroke-width="1" stroke-linecap="round" stroke-linejoin="miter" stroke-miterlimit="4" stroke-dasharray="5 7" stroke-dashoffset="0"; vector-effect="non-scaling-stroke" d="m -0.33771156,111.59275 c 0,0 21.80715956,1.34357 31.19404956,-5.54053 9.38689,-6.884097 12.90885,-14.805211 27.57231,-12.645271 14.66347,2.159934 31.74926,28.636311 50.914372,41.705521 19.16511,13.06921 37.18624,3.73257 42.62949,-7.61718 5.44325,-11.34976 -4.13146,-26.68449 2.14808,-36.228223 8.89059,-13.512047 38.43884,-15.473638 50.50122,-13.597978 12.06239,1.87566 20.73793,16.629252 27.53576,25.941961 3.631,4.97429 11.99908,19.77635 31.36279,31.98726 19.68,12.41036 80.06309,16.79441 97.51342,-6.92495 15.08597,-20.50561 12.41098,-39.463919 5.61301,-49.829535 -9.97549,-15.210733 -20.36178,-27.497651 -5.26811,-46.392482 6.22047,-7.78702 15.6387,-13.665704 21.385,-15.737044 13.04064,-4.70069 24.22456,-6.170339 28.53102,22.11655 4.19803,27.57462 6.38261,62.033691 37.49889,81.147731 15.14441,9.30287 67.68357,18.45429 101.98675,4.84847 13.79925,-5.47326 14.79695,-25.106047 6.7201,-34.416765 -8.86927,-10.224199 -22.11358,-6.540667 -18.78248,-23.262518 1.32079,-6.630265 13.78401,-9.741677 26.33093,1.077352 15.65972,13.503153 29.10662,33.967711 35.6715,3.63802 4.72471,-21.82813 3.87426,-52.16072 18.9933,-62.7440592 15.1135,-10.5794497 28.11392,-1.2509792 34.33837,4.9734742 4.82012,4.820122 12.81219,8.656904 22.18483,1.249504 11.71726,-9.2604141 24.42293,-18.5464479 48.5062,-11.8494979 24.98971,6.9490099 33.88292,18.8353649 33.76262,37.6449349 -0.0953,14.903714 -4.90293,26.537929 -9.63055,36.542234 -7.42353,15.709226 -16.21486,19.117829 -15.7542,8.113608 0.46066,-11.004221 17.7787,3.950183 27.24713,15.150343 9.46843,11.20016 21.85651,28.69838 21.85651,28.69838">
<animate attributeName="stroke-dashoffset" dur="100s" repeatCount="indefinite" values="0 ; -700"/>
</path>
<path transform="scale(1.02 ` +
        pathScaleY +
        ')" stroke-dashoffset="0" stroke-dasharray="' +
        allLine +
        ' ' +
        allLine +
        `" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter" stroke-miterlimit="4" stroke="#fff"  vector-effect="non-scaling-stroke"  d="m -0.33771156,111.59275 c 0,0 21.80715956,1.34357 31.19404956,-5.54053 9.38689,-6.884097 12.90885,-14.805211 27.57231,-12.645271 14.66347,2.159934 31.74926,28.636311 50.914372,41.705521 19.16511,13.06921 37.18624,3.73257 42.62949,-7.61718 5.44325,-11.34976 -4.13146,-26.68449 2.14808,-36.228223 8.89059,-13.512047 38.43884,-15.473638 50.50122,-13.597978 12.06239,1.87566 20.73793,16.629252 27.53576,25.941961 3.631,4.97429 11.99908,19.77635 31.36279,31.98726 19.68,12.41036 80.06309,16.79441 97.51342,-6.92495 15.08597,-20.50561 12.41098,-39.463919 5.61301,-49.829535 -9.97549,-15.210733 -20.36178,-27.497651 -5.26811,-46.392482 6.22047,-7.78702 15.6387,-13.665704 21.385,-15.737044 13.04064,-4.70069 24.22456,-6.170339 28.53102,22.11655 4.19803,27.57462 6.38261,62.033691 37.49889,81.147731 15.14441,9.30287 67.68357,18.45429 101.98675,4.84847 13.79925,-5.47326 14.79695,-25.106047 6.7201,-34.416765 -8.86927,-10.224199 -22.11358,-6.540667 -18.78248,-23.262518 1.32079,-6.630265 13.78401,-9.741677 26.33093,1.077352 15.65972,13.503153 29.10662,33.967711 35.6715,3.63802 4.72471,-21.82813 3.87426,-52.16072 18.9933,-62.7440592 15.1135,-10.5794497 28.11392,-1.2509792 34.33837,4.9734742 4.82012,4.820122 12.81219,8.656904 22.18483,1.249504 11.71726,-9.2604141 24.42293,-18.5464479 48.5062,-11.8494979 24.98971,6.9490099 33.88292,18.8353649 33.76262,37.6449349 -0.0953,14.903714 -4.90293,26.537929 -9.63055,36.542234 -7.42353,15.709226 -16.21486,19.117829 -15.7542,8.113608 0.46066,-11.004221 17.7787,3.950183 27.24713,15.150343 9.46843,11.20016 21.85651,28.69838 21.85651,28.69838">
<animate attributeName="stroke-dashoffset" begin="0.7s" dur="3s" repeatCount="1" fill="freeze" values="0 ; -` +
        allLine +
        `"/>
<animate attributeName="stroke-width" begin="3.6s" dur="0.001s" repeatCount="1" fill="freeze" values="3 ; 0"/>
</path>
</svg>`;

    setObjSize(414 * 4, 0.3 * 414 * 4);
    const line: any = {
        position: 'absolute',
        width: getWidthPx(),
        height: getRelativeHeight(),
        left: -ww * 0.01,
        top: getVerticalPx(330),
        // backgroundColor: '#00ff9933',
    };

    const styles = StyleSheet.create({
        container: {
            width: ww,
            height: '100%',
            backgroundColor: 'white',
        },
        krossLogo: getStandardPx(242, 130, 226),
        krossYouCan: getStandardPx(118, 52, 767),
        line,
        khaki: {
            backgroundColor: 'khaki',
        },
    });

    return (
        <>
            <StatusBar hidden />
            <View style={styles.container}>
                <AnimSvg style={styles.krossLogo} source={krossLogo} />

                <AnimSvg style={styles.line} source={linePath} />

                <AnimSvg style={styles.krossYouCan} source={krossYouCan} />
            </View>
        </>
    );
};

export default SplashScreen;

import React, {useEffect} from 'react';
import Animated, {
    Easing,
    useAnimatedProps,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import Svg, {Path, G} from 'react-native-svg';
import {AnimatedPath} from './animated';

const AnimSvg = Animated.createAnimatedComponent(Svg);

interface IProps {
    width?: number;
    height?: number;
    animationDuration?: number;
}

const KrossLogoSvg: React.FC<IProps> = ({
    width = 179,
    height = 179,
    animationDuration = 1200,
}: IProps) => {
    const logoOpacity = useSharedValue(0);
    const logoAnimation = useAnimatedProps(() => ({
        opacity: logoOpacity.value,
    }));

    useEffect(() => {
        logoOpacity.value = withTiming(1, {
            duration: animationDuration,
            easing: Easing.linear,
        });
    }, [logoOpacity, animationDuration]);

    return (
        <AnimSvg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            animatedProps={logoAnimation}>
            <G>
                <Path
                    d="M108.27 103.994L140.732 62h-18.574c-2.987 0-5.44.27-7.364.807-1.919.538-3.55 1.219-4.883 2.027-1.336.807-2.48 1.703-3.444 2.694-.89.912-29.42 36.412-29.467 36.47l43.853 33.04c.957.53 1.918 1.096 2.878 1.681.963.587 2.105 1.122 3.446 1.599 1.334.48 2.961.883 4.883 1.202 1.92.32 4.377.48 7.366.48H158z"
                    fill="#e31f24"
                    fillRule="evenodd"
                />
                <Path
                    d="M61.92 104.211L112 39H90.665c-3.43 0-6.25.314-8.456.934-2.208.614-4.078 1.398-5.612 2.33-1.535.93-2.85 1.965-3.956 3.105-1.018 1.058-46.589 58.784-46.641 58.85l30.56 23.06a87.847 87.847 0 0 1 3.307 1.933c1.106.678 2.417 1.293 3.954 1.846 1.53.556 3.403 1.017 5.61 1.386 2.208.367 5.027.556 8.46.556h21.338z"
                    fill="#e31f24"
                    fillRule="evenodd"
                />
                <Path
                    d="M41 41V18.271c0-3.648-.588-5.383-1.824-6.819C37.765 9.778 36.176 9 33.294 9c-.941 0-2.353.299-3.294.837-1 .598-2 1.496-2.765 2.393C25.882 10.256 23.647 9 21.177 9c-1.118 0-2.236.299-3.118.837-.765.42-1.53 1.257-2.06 1.974V9.48H10V41h6.235V18.33c0-2.452 1.353-3.648 3.059-3.648 1.706 0 3.059 1.196 3.059 3.649V41h6.236V18.33c0-2.452 1.352-3.648 3.058-3.648 1.706 0 3.118 1.196 3.118 3.649V41zm25-31h-6.9l-4.07 21.177L50.9 10H44l7.727 31.028-.531 2.182c-.767 2.95-2.831 3.186-5.545 3.245V52c5.663 0 10.086-.708 11.62-6.96z"
                    fill="#e31f24"
                    fillRule="evenodd"
                />
                <AnimatedPath
                    d="M168.54 123.77c4.55-10.647 7.047-22.694 7.07-34.274-.001-47.555-38.548-86.106-86.098-86.105a86.086 86.086 0 0 0-8.318.436"
                    stroke="#e31f24"
                    strokeWidth="6.758"
                    strokeLength={250}
                    duration={1200}
                    withDelay={500}
                />

                <AnimatedPath
                    d="M 10.101156,56.451436 C 5.7174134,66.918159 3.5560676,78.148269 3.5267667,89.496088 3.5260092,137.0514 41.96192,175.60306 89.511783,175.60338 c 18.000667,-0.01 35.887747,-5.89484 50.509857,-16.39449"
                    stroke="#e31f24"
                    strokeWidth="6.758"
                    strokeLength={250}
                    duration={1200}
                    withDelay={1800}
                />
            </G>
        </AnimSvg>
    );
};

export default KrossLogoSvg;

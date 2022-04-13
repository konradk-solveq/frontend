import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';
import {getFHorizontalPx, getFVerticalPx} from '@helpers/appLayoutDimensions';

interface IProps {
    imageSize?: number;
}

const BikePin = ({imageSize = 144}: IProps) => {
    const width = getFHorizontalPx(imageSize);
    const height = getFVerticalPx(imageSize);
    return (
        <Svg
            width={width}
            height={height}
            viewBox={`0 0 ${imageSize} ${imageSize}`}
            fill="none">
            <G clipPath="url(#a)">
                <Path
                    d="M48.665 46.664c-9.008 0-16.335 7.327-16.335 16.334 0 9.008 7.327 16.335 16.335 16.335 9.007 0 16.334-7.327 16.334-16.334 0-9.008-7.327-16.335-16.334-16.335Zm0 25.668c-5.147 0-9.334-4.187-9.334-9.333 0-5.148 4.187-9.334 9.334-9.334 5.147 0 9.334 4.186 9.334 9.334 0 5.146-4.187 9.333-9.334 9.333ZM95.335 46.664C86.327 46.664 79 53.99 79 62.998c0 9.008 7.327 16.335 16.335 16.335 9.007 0 16.334-7.327 16.334-16.334 0-9.008-7.327-16.335-16.334-16.335Zm0 25.668C90.188 72.332 86 68.145 86 63c0-5.148 4.186-9.334 9.334-9.334 5.147 0 9.334 4.186 9.334 9.334 0 5.146-4.187 9.333-9.334 9.333Z"
                    fill="#ECEAEC"
                />
                <Path
                    d="M76.971.218a56.537 56.537 0 0 0-1.48-.113c-1.952-.124-3.863.09-5.741.17-28.173 1.199-47.72 24.514-47.72 53.39 0 44.141 41.048 81.45 49.689 88.648l3.783-.567c11.804-10.23 49.528-46.088 50.161-87.04.438-28.3-20.501-51.953-48.692-54.488Zm-4.97 95.45c-23.198 0-42.003-18.806-42.003-42.004 0-23.197 18.805-42.002 42.003-42.002 23.197 0 42.003 18.805 42.003 42.002 0 23.198-18.806 42.003-42.003 42.003Z"
                    fill="#FC8B4B"
                />
                <Path
                    d="M48.666 81.666c-10.293 0-18.668-8.374-18.668-18.667 0-10.294 8.375-18.668 18.668-18.668s18.668 8.374 18.668 18.667c0 10.294-8.375 18.668-18.668 18.668Zm0-32.668c-7.72 0-14.001 6.28-14.001 14C34.665 70.72 40.945 77 48.666 77c7.72 0 14-6.28 14-14 0-7.721-6.28-14.002-14-14.002ZM95.336 81.666c-10.293 0-18.668-8.374-18.668-18.667 0-10.294 8.374-18.668 18.668-18.668 10.293 0 18.668 8.374 18.668 18.667 0 10.294-8.375 18.668-18.668 18.668Zm0-32.668c-7.72 0-14.001 6.28-14.001 14 0 7.721 6.28 14.001 14 14.001 7.722 0 14.002-6.28 14.002-14 0-7.721-6.28-14.002-14.001-14.002Z"
                    fill="#5D5360"
                />
                <Path
                    d="m97.566 62.313-6.97-22.65-2.881-2.552-2.002 2.552H62.666c-.78 0-1.509.39-1.941 1.04L46.722 61.704a2.333 2.333 0 0 0 1.942 3.628h21.002v-4.667H53.025l10.89-16.335H87.15l5.954 19.354a2.337 2.337 0 0 0 2.231 1.649 2.332 2.332 0 0 0 2.23-3.02Z"
                    fill="#FC8B4B"
                />
                <Path
                    d="M65 34.997h-9.334a2.333 2.333 0 1 1 0-4.668H65a2.333 2.333 0 1 1 0 4.668Z"
                    fill="#5D5360"
                />
                <Path
                    d="M25.332 53.664c0-28.43 22.197-51.706 50.159-53.56-31.18-1.92-57.16 22.794-57.16 53.56 0 44.142 43.548 82.604 52.19 89.801.865.721 2.107.71 2.973-.011.54-.451 1.216-1.022 2.007-1.708-11.916-10.329-50.17-46.71-50.17-88.082Z"
                    fill="#E77D41"
                />
                <Path
                    d="M90.669 30.33H89.16a4.62 4.62 0 0 0-3.753 1.895 4.625 4.625 0 0 0-.707 4.144l1.014 3.295h4.882l-1.436-4.667h1.509l2.333-2.334-2.333-2.333Z"
                    fill="#ECEAEC"
                />
                <Path
                    d="M90.668 34.997h4.667a2.334 2.334 0 1 0 0-4.668h-4.667v4.668Z"
                    fill="#5D5360"
                />
                <Path
                    d="M69.668 65.332a2.334 2.334 0 1 0 0-4.667 2.334 2.334 0 0 0 0 4.667Z"
                    fill="#B6B1B7"
                />
            </G>
            <Defs>
                <ClipPath id="a">
                    <Path fill="#fff" d="M0 0h144v144H0z" />
                </ClipPath>
            </Defs>
        </Svg>
    );
};
export default BikePin;

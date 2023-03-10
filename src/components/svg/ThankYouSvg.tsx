import React from 'react';
import Svg, {
    Path,
    G,
    Defs,
    Stop,
    LinearGradient,
    ClipPath,
} from 'react-native-svg';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';

const ThankYouSvg: React.FC = () => {
    return (
        <Svg
            fill="none"
            viewBox="0 0 390 202"
            height={getFVerticalPx(202)}
            width={getFHorizontalPx(389)}>
            <G clipPath="url(#a)">
                <Path
                    d="M250.669 104.751h-3.677c-5.735 0-10.399-4.665-10.399-10.4 0-4.552 2.052-8.777 5.631-11.588l17.35-13.632c6.269-4.925 9.863-12.321 9.863-20.292v-7.432c0-7.762-6.314-14.076-14.076-14.076-7.762 0-14.076 6.314-14.076 14.076V46.1a2.345 2.345 0 1 1-4.692 0v-4.692c0-10.349 8.419-18.768 18.768-18.768s18.768 8.42 18.768 18.768v7.432c0 9.419-4.247 18.162-11.654 23.98l-17.35 13.633a9.987 9.987 0 0 0-3.84 7.9 5.712 5.712 0 0 0 5.707 5.706h3.677a2.345 2.345 0 0 1 2.346 2.347 2.345 2.345 0 0 1-2.346 2.346Z"
                    fill="#FFD064"
                />
                <Path
                    d="M151.12 104.751h-3.678a2.346 2.346 0 1 1 0-4.693h3.678a5.712 5.712 0 0 0 5.707-5.707c0-3.104-1.4-5.981-3.84-7.9l-17.35-13.631c-7.408-5.82-11.655-14.562-11.655-23.98v-7.433c0-10.349 8.42-18.768 18.768-18.768 10.349 0 18.769 8.42 18.769 18.768V46.1a2.344 2.344 0 0 1-2.346 2.346 2.344 2.344 0 0 1-2.346-2.346v-4.692c0-7.762-6.314-14.076-14.077-14.076-7.762 0-14.076 6.314-14.076 14.076v7.432c0 7.971 3.595 15.367 9.863 20.292l17.35 13.632a14.65 14.65 0 0 1 5.632 11.588c0 5.735-4.665 10.4-10.399 10.4Z"
                    fill="#FFC250"
                />
                <Path
                    d="M210.786 154.018h-21.212l4.692-39.883 12.656 7.038 3.864 32.845Z"
                    fill="#FFD064"
                />
                <Path
                    d="M202.968 121.173h3.954l-.828-7.038h-14.076l-4.693 39.883h5.521l3.133-26.629a7.036 7.036 0 0 1 6.989-6.216Z"
                    fill="#FFC250"
                />
                <Path
                    d="M234.246 41.407h-56.305a4.692 4.692 0 0 0-4.692 4.692V81.29c0 18.14 14.705 32.845 32.845 32.845l16.931-2.349c9.536-5.748 15.914-16.204 15.914-28.15V46.1a4.692 4.692 0 0 0-4.693-4.692Z"
                    fill="#FFE07D"
                />
                <Path
                    d="M210.786 111.789c-18.14 0-32.845-14.705-32.845-32.845V41.407h-14.076a4.692 4.692 0 0 0-4.692 4.692v37.537c0 18.14 14.705 32.845 32.845 32.845h14.076c6.17 0 12.001-1.733 16.933-4.692h-12.241Z"
                    fill="#FFD064"
                />
                <Path
                    d="M217.824 151.672h-37.537c-.822 0-1.611.141-2.345.4l-1.663 6.638v7.038a2.346 2.346 0 0 0 2.346 2.346h43.891a2.346 2.346 0 0 0 2.346-2.346v-7.038a7.038 7.038 0 0 0-7.038-7.038Z"
                    fill="#FFE07D"
                />
                <Path
                    d="M215.478 69.56c-.058 0-.115.008-.173.009l-1.708-9.394h1.881a2.344 2.344 0 0 0 2.346-2.345 2.344 2.344 0 0 0-2.346-2.347h-3.285c-1.047 0-2.03.46-2.701 1.265a3.5 3.5 0 0 0-.761 2.885l.525 2.889h-14.338a7.004 7.004 0 0 0-6.296 3.89l-1.882 3.763a14.004 14.004 0 0 0-4.107-.615c-1.646 0-3.222.282-4.692.803l-1.613 2.96 1.613 2.183a9.39 9.39 0 0 1 4.692-1.254c.674 0 1.329.078 1.962.214l-4.06 8.12a2.346 2.346 0 0 0 2.098 3.395h9.051c-1.049 4.038-4.69 7.04-9.051 7.04a9.358 9.358 0 0 1-1.599-.138l-.197 3.033 2.959 1.749c7.22-.593 12.914-6.658 12.914-14.029 0-4.658-2.284-8.783-5.78-11.346l1.89-3.78a2.33 2.33 0 0 1 2.098-1.296h15.191l.582 3.201c-5.408 1.966-9.289 7.142-9.289 13.221 0 7.762 6.314 14.076 14.076 14.076 7.762 0 14.076-6.314 14.076-14.076 0-7.762-6.314-14.076-14.076-14.076Zm-23.794 11.73h-5.254l2.346-4.692a9.336 9.336 0 0 1 2.908 4.692Zm23.794 11.73c-5.175 0-9.384-4.208-9.384-9.384 0-3.769 2.245-7.003 5.457-8.495l1.62 8.914a2.342 2.342 0 0 0 2.727 1.888 2.343 2.343 0 0 0 1.888-2.727l-1.617-8.895c4.848.361 8.693 4.376 8.693 9.315 0 5.176-4.208 9.384-9.384 9.384Zm-28.152-32.844h4.692a2.345 2.345 0 1 0 0-4.693h-4.692a2.345 2.345 0 1 0 0 4.693Z"
                    fill="#FFF5D7"
                />
                <Path
                    d="M184.979 165.747a7.038 7.038 0 0 1-7.038-7.038v-6.64c-2.727.97-4.692 3.58-4.692 6.64v9.384a2.346 2.346 0 0 0 2.346 2.346h46.921a2.346 2.346 0 0 0 2.346-2.346v-2.346h-39.883Z"
                    fill="#FFD064"
                />
                <Path
                    d="M182.633 97.711c.397 0 .774-.015 1.163-.047a32.771 32.771 0 0 1-2.762-4.782 9.37 9.37 0 0 1-7.785-9.247c0-3.459 1.901-6.502 4.692-8.13v-5.143c-5.458 1.939-9.384 7.158-9.384 13.273 0 7.762 6.314 14.076 14.076 14.076Z"
                    fill="#FFE07D"
                />
            </G>
            <Path
                d="m95.968 32.446-.28 12.474 11.777 4.12-11.949 3.589-.28 12.473-7.105-10.255-11.949 3.588 7.558-9.927-7.106-10.255 11.777 4.12 7.557-9.927Z"
                fill="#FFE07D"
            />
            <Path
                d="m121.618 81.696 3.321 6.476 7.185-1.158-5.133 5.16 3.322 6.476-6.494-3.287-5.132 5.16 1.119-7.191-6.493-3.287 7.185-1.158 1.12-7.191Z"
                fill="#FFD064"
            />
            <Path
                d="m273.739 5.136-1.618 7.096 6.248 3.731-7.248.654-1.618 7.096-2.862-6.692-7.249.654 5.48-4.79-2.862-6.69 6.249 3.73 5.48-4.789Z"
                fill="#FFE07D"
            />
            <G>
                <Path
                    d="m259.428 102.447-1.618 7.095 6.249 3.732-7.249.654-1.618 7.096-2.862-6.692-7.248.654 5.48-4.79-2.862-6.691 6.248 3.731 5.48-4.789Z"
                    fill="#FFE07D"
                />
            </G>
            <G>
                <Path
                    d="m340.425 23.119-.972 4.262 3.753 2.24-4.353.394-.972 4.261-1.719-4.019-4.354.393 3.292-2.877-1.719-4.019 3.753 2.241 3.291-2.876Z"
                    fill="#FFE07D"
                />
            </G>
            <G>
                <Path
                    d="m13.034 61.379-4.345.47-.896 4.279-1.79-3.988-4.346.47 3.24-2.935-1.79-3.987 3.792 2.173 3.239-2.934-.896 4.278 3.792 2.174Z"
                    fill="#FC8B4B"
                />
            </G>
            <Path
                d="m47.482 104.45 2.289 3.717 4.243-1.028-2.828 3.326 2.289 3.717-4.037-1.662-2.828 3.326.333-4.353-4.037-1.662 4.243-1.028.333-4.353Zm236.636-39.21 11.166 5.566 8.744-8.899-1.844 12.34 11.166 5.566-12.305 2.06-1.844 12.34-5.761-11.067-12.306 2.06 8.745-8.9-5.761-11.066Z"
                fill="#FFC250"
            />
            <Path
                d="m376.901 35.828 1.951 8.62 8.801.808-7.595 4.519 1.951 8.62-6.645-5.827-7.595 4.519 3.488-8.12-6.644-5.827 8.8.808 3.488-8.12Z"
                fill="#FFD064"
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M233.017 169.827h-66.136v10.725h-46.475v21.449h157.298v-21.449h-44.687v-10.725Z"
                fill="url(#e)"
            />
            <Defs>
                <LinearGradient
                    id="e"
                    x1={199.055}
                    y1={169.827}
                    x2={199.055}
                    y2={202.001}
                    gradientUnits="userSpaceOnUse">
                    <Stop stopColor="#ECEAEC" />
                    <Stop offset={1} stopColor="#fff" stopOpacity={0} />
                </LinearGradient>
                <ClipPath id="a">
                    <Path
                        fill="#fff"
                        transform="translate(123.982 21.466)"
                        d="M0 0h150.148v150.148H0z"
                    />
                </ClipPath>
            </Defs>
        </Svg>
    );
};

export default ThankYouSvg;

import React from 'react';
import Svg, {Path, G, Defs, Stop, LinearGradient} from 'react-native-svg';

import {getFHorizontalPx, getFVerticalPx} from '@theme/utils/appLayoutDimensions';

const ThankYouSvg: React.FC = () => {
    return (
        <Svg fill="none" viewBox="0 0 268 116" height={getFVerticalPx(202)} width={getFHorizontalPx(389)}>
        <Path d="M163.875 61.5938h-2.057c-3.208 0-5.818-2.6096-5.818-5.8179 0-2.5467 1.148-4.9104 3.15-6.4831l9.707-7.6262c3.507-2.7558 5.518-6.8933 5.518-11.3524v-4.158c0-4.3425-3.532-7.875-7.875-7.875s-7.875 3.5325-7.875 7.875v2.625c0 .7255-.587 1.3126-1.313 1.3126-.725 0-1.312-.5871-1.312-1.3126v-2.625c0-5.7896 4.71-10.5 10.5-10.5s10.5 4.7104 10.5 10.5v4.158c0 5.2692-2.376 10.1604-6.52 13.4159l-9.707 7.6263c-1.365 1.0728-2.148 2.6828-2.148 4.4195 0 1.7611 1.432 3.1929 3.193 3.1929h2.057c.725 0 1.313.587 1.313 1.3124 0 .7255-.588 1.3126-1.313 1.3126Z" fill="#FFD064"/>
        <Path d="M108.182 61.5938h-2.057c-.725 0-1.313-.5871-1.313-1.3126 0-.7254.588-1.3124 1.313-1.3124h2.057c1.761 0 3.193-1.4318 3.193-3.1929 0-1.7367-.783-3.3465-2.148-4.4195l-9.7068-7.6263C95.3763 40.4745 93 35.5834 93 30.3142v-4.158c0-5.7896 4.7104-10.5 10.5-10.5 5.79 0 10.5 4.7104 10.5 10.5v2.625c0 .7255-.587 1.3126-1.312 1.3126-.726 0-1.313-.5871-1.313-1.3126v-2.625c0-4.3425-3.532-7.875-7.875-7.875-4.3426 0-7.875 3.5325-7.875 7.875v4.158c0 4.4593 2.0111 8.5966 5.518 11.3524l9.707 7.6262c2.002 1.5727 3.15 3.9364 3.15 6.4831 0 3.2083-2.61 5.8179-5.818 5.8179Z" fill="#FFC250"/>
        <Path d="M141.562 89.1562h-11.867l2.625-22.3124 7.081 3.9374 2.161 18.375Z" fill="#FFD064"/>
        <Path d="M137.189 70.7812h2.212l-.463-3.9374h-7.875l-2.625 22.3124h3.088l1.752-14.8975c.234-1.983 1.914-3.4775 3.911-3.4775Z" fill="#FFC250"/>
        <Path d="M154.688 26.1562h-31.5c-1.45 0-2.626 1.1752-2.626 2.625v19.6876c0 10.1482 8.227 18.375 18.376 18.375l9.472-1.314c5.335-3.2157 8.902-9.0655 8.902-15.7486v-21c0-1.4498-1.175-2.625-2.624-2.625Z" fill="#FFE07D"/>
        <Path d="M141.562 65.5312c-10.148 0-18.374-8.2267-18.374-18.375v-21h-7.876c-1.449 0-2.624 1.1752-2.624 2.625v21c0 10.1483 8.226 18.375 18.374 18.375h7.876c3.452 0 6.713-.9694 9.473-2.625h-6.849Z" fill="#FFD064"/>
        <Path d="M145.5 87.8438h-21c-.46 0-.902.0789-1.312.2239l-.93 3.7135v3.9376c0 .7248.587 1.3124 1.312 1.3124h24.555c.725 0 1.313-.5876 1.313-1.3124v-3.9376c0-2.1746-1.763-3.9374-3.938-3.9374Z" fill="#FFE07D"/>
        <Path d="M144.188 41.9062c-.033 0-.065.0045-.098.005l-.955-5.255h1.053c.725 0 1.312-.587 1.312-1.3124 0-.7255-.587-1.3126-1.312-1.3126h-1.838c-.586 0-1.136.2576-1.512.7077-.375.4485-.53 1.0368-.425 1.6137l.294 1.6163h-8.022c-1.501 0-2.851.8344-3.522 2.1765l-1.053 2.1051c-.727-.2227-1.498-.3443-2.298-.3443-.921 0-1.802.1579-2.624.4497l-.903 1.6558.903 1.2214c.77-.4448 1.672-.7019 2.624-.7019.377 0 .744.0439 1.098.1197l-2.272 4.5433c-.203.4064-.182.8896.058 1.2766s.661.623 1.116.623h5.064c-.587 2.2581-2.624 3.9374-5.064 3.9374-.304 0-.604-.0264-.894-.0767l-.11 1.6969 1.655.9783c4.039-.3318 7.225-3.7249 7.225-7.8485 0-2.6059-1.278-4.9135-3.234-6.3475l1.057-2.1145c.223-.4474.673-.7254 1.174-.7254h8.499l.326 1.7912c-3.026 1.0994-5.198 3.9951-5.198 7.3962 0 4.3426 3.533 7.875 7.876 7.875 4.342 0 7.874-3.5324 7.874-7.875 0-4.3425-3.532-7.875-7.874-7.875Zm-13.312 6.5626h-2.94l1.313-2.6249c.783.6843 1.358 1.5885 1.627 2.6249Zm13.312 6.5624c-2.896 0-5.25-2.3546-5.25-5.25 0-2.1085 1.255-3.9178 3.052-4.7523l.907 4.9868c.114.6344.666 1.0779 1.289 1.0779.078 0 .157-.0064.236-.0218.714-.1295 1.187-.8126 1.056-1.5253l-.904-4.9765c2.712.2019 4.864 2.4481 4.864 5.2112 0 2.8954-2.355 5.25-5.25 5.25ZM128.438 36.6562h2.624c.726 0 1.313-.587 1.313-1.3124 0-.7255-.587-1.3126-1.313-1.3126h-2.624c-.726 0-1.313.5871-1.313 1.3126 0 .7254.587 1.3124 1.313 1.3124Z" fill="#FFF5D7"/>
        <Path d="M127.125 95.7184c-2.175 0-3.937-1.7628-3.937-3.9375v-3.7145c-1.526.5424-2.626 2.0027-2.626 3.7145v5.25c0 .7249.588 1.3125 1.313 1.3125h26.25c.725 0 1.313-.5876 1.313-1.3125v-1.3125h-22.313Z" fill="#FFD064"/>
        <Path d="M125.813 57.6558c.221 0 .433-.0086.65-.0266-.586-.8433-1.105-1.7371-1.545-2.6752-2.478-.4197-4.355-2.5776-4.355-5.1732 0-1.9348 1.063-3.6375 2.625-4.5482v-2.8771c-3.054 1.0844-5.25 4.0042-5.25 7.4253 0 4.3425 3.532 7.875 7.875 7.875ZM62.963 22.6728l-.1952 8.7163 8.2294 2.8792-8.3501 2.5078-.1952 8.7163-4.9654-7.1664-8.35 2.5078 5.2812-6.9369-4.9653-7.1664 8.2293 2.8792 5.2813-6.9369Z" fill="#FFE07D"/>
        <Path d="m80.8865 57.0888 2.3209 4.5253 5.021-.8089-3.5866 3.6058 2.3209 4.5253-4.5376-2.2969-3.5867 3.6057.7823-5.0252-4.5376-2.2969 5.0211-.8089.7823-5.0253Z" fill="#FFD064"/>
        <Path d="m187.188 3.58903-1.131 4.95852 4.367 2.60755-5.065.457-1.131 4.9585-2-4.6761-5.065.457 3.829-3.34699-2-4.67611 4.367 2.60758 3.829-3.34695Z" fill="#FFE07D"/>
        <G>
            <Path d="m177.188 71.589-1.131 4.9586 4.367 2.6075-5.065.457-1.131 4.9585-2-4.6761-5.065.457 3.829-3.347-2-4.6761 4.367 2.6076 3.829-3.347Z" fill="#FFE07D"/>
        </G>
        <G>
            <Path d="m233.788 16.1556-.679 2.9781 2.622 1.5661-3.042.2744-.679 2.9781-1.201-2.8085-3.042.2745 2.3-2.0102-1.202-2.8085 2.623 1.5661 2.3-2.0101Z" fill="#FFE07D"/>
        </G>
        <G>
            <Path d="m9.9207 38.1556-.67907 2.9781 2.62247 1.5661-3.04216.2744-.67907 2.9781-1.20109-2.8085-3.04218.2745 2.29986-2.0102-1.2011-2.8085 2.62248 1.5661 2.29986-2.0101Z" fill="#FC8B4B"/>
        </G>
        <Path d="m29.0809 72.9894 1.5996 2.5977 2.9649-.7186-1.9762 2.3241 1.5997 2.5977-2.8211-1.1613-1.9763 2.3241.2328-3.0419-2.8211-1.1613 2.9649-.7186.2328-3.0419ZM194.441 45.5891l7.803 3.89 6.11-6.2187-1.288 8.6228 7.802 3.8899-8.598 1.4392-1.289 8.6228-4.026-7.7332-8.599 1.4392 6.111-6.2187-4.026-7.7333Z" fill="#FFC250"/>
        <Path d="m259.277 25.0361 1.364 6.0232 6.149.5648-5.307 3.1578 1.363 6.0233-4.643-4.0716-5.307 3.1578 2.437-5.6742-4.643-4.0716 6.15.5647 2.437-5.6742Z" fill="#FFD064"/>
        <Path fill-rule="evenodd" clip-rule="evenodd" d="M154 98h-37v6H91v12h88v-12h-25v-6Z" fill="url(#d)"/>
        <Defs>
            {/* <filter in="SourceGraphic" id="a" x="164.163" y="68.5889" width="19.2607" height="18.9814" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood in="SourceGraphic" flood-opacity="0" result="BackgroundImageFix"/>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="effect1_foregroundBlur_3494_12109"/>
            </filter>
            <filter in="SourceGraphic" id="b" x="224.767" y="13.1553" width="13.9646" height="13.7969" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood in="SourceGraphic" flood-opacity="0" result="BackgroundImageFix"/>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="effect1_foregroundBlur_3494_12109"/>
            </filter>
            <filter in="SourceGraphic" id="c" x=".899658" y="35.1553" width="13.9645" height="13.7969" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood in="SourceGraphic" flood-opacity="0" result="BackgroundImageFix"/>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="effect1_foregroundBlur_3494_12109"/>
            </filter> */}
            <LinearGradient id="d" x1="135" y1="98" x2="135" y2="116" gradientUnits="userSpaceOnUse">
                <Stop stop-color="#ECEAEC"/>
                <Stop offset="1" stop-color="#fff" stop-opacity="0"/>
            </LinearGradient>
        </Defs>
        </Svg>
    );
};

export default ThankYouSvg;

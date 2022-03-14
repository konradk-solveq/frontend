import React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';

import {getFHorizontalPx} from '@theme/utils/appLayoutDimensions';

interface IProps {
    imageSize?: number;
    viewBox?: number;
}

const BikeSvg: React.FC<IProps> = ({
    imageSize = 105,
    viewBox = 512,
}: IProps) => {
    const size = getFHorizontalPx(imageSize);
    const box = getFHorizontalPx(viewBox);
    return (
        <Svg
            width={size}
            height={size}
            viewBox={`0 0 ${box} ${box}`}
            fill="none">
            <Path
                d="m162.631 110.372-15.79 4.863 16.838 54.695 14.731-8.304-15.779-51.254ZM99.097 342.709c13.682 0 24.774-11.092 24.774-24.774s-11.092-24.774-24.774-24.774-24.774 11.092-24.774 24.774 11.092 24.774 24.774 24.774Z"
                fill="#DAD8DB"
            />
            <Path
                d="M412.903 218.839c-54.73 0-99.097 44.367-99.097 99.097 0 54.729 44.367 99.097 99.097 99.097S512 372.665 512 317.935c0-54.729-44.367-99.096-99.097-99.096Zm0 173.419c-41.047 0-74.323-33.275-74.323-74.323 0-41.048 33.275-74.323 74.323-74.323 41.048 0 74.323 33.275 74.323 74.323 0 41.048-33.276 74.323-74.323 74.323Z"
                fill="#5D5360"
            />
            <Path
                d="M412.903 235.355c-45.608 0-82.581 36.972-82.581 82.581 0 45.608 36.973 82.581 82.581 82.581 45.608 0 82.581-36.973 82.581-82.581 0-45.609-36.973-82.581-82.581-82.581Zm0 148.645c-36.486 0-66.065-29.578-66.065-66.065 0-36.487 29.578-66.065 66.065-66.065 36.487 0 66.065 29.578 66.065 66.065 0 36.487-29.578 66.065-66.065 66.065Z"
                fill="#ECEAEC"
            />
            <Path
                d="M99.097 218.839C44.367 218.839 0 263.206 0 317.935c0 54.729 44.367 99.097 99.097 99.097s99.097-44.367 99.097-99.097c0-54.729-44.367-99.096-99.097-99.096Zm0 173.419c-41.047 0-74.323-33.275-74.323-74.323 0-41.048 33.276-74.323 74.323-74.323 41.047 0 74.323 33.275 74.323 74.323-.001 41.048-33.276 74.323-74.323 74.323Z"
                fill="#5D5360"
            />
            <Path
                d="M99.097 235.355c-45.608 0-82.58 36.972-82.58 82.581 0 45.608 36.972 82.581 82.58 82.581s82.581-36.973 82.581-82.581c-.001-45.609-36.973-82.581-82.58-82.581Zm0 148.645c-36.486 0-66.065-29.578-66.065-66.065 0-36.487 29.578-66.065 66.065-66.065 36.487 0 66.065 29.578 66.065 66.065C165.161 354.422 135.583 384 99.097 384Z"
                fill="#ECEAEC"
            />
            <Path
                d="M90.84 317.935h16.515v33.032H90.839v-33.032Z"
                fill="#B6B1B7"
            />
            <Path
                d="M52.992 290.419a8.221 8.221 0 0 1-5.073-1.746c-3.597-2.802-4.234-7.992-1.435-11.589 1.694-2.169 3.492-4.286 5.484-6.278s4.113-3.79 6.274-5.48c3.597-2.815 8.79-2.165 11.597 1.435 2.798 3.597 2.16 8.786-1.435 11.589-1.645 1.278-3.25 2.625-4.758 4.133s-2.855 3.117-4.13 4.754a8.252 8.252 0 0 1-6.524 3.182ZM134.879 372.29a8.254 8.254 0 0 1-6.524-3.181c-2.798-3.597-2.161-8.786 1.435-11.589 1.645-1.278 3.25-2.625 4.758-4.133s2.855-3.117 4.129-4.754c2.806-3.597 7.992-4.254 11.597-1.435 3.597 2.802 4.234 7.992 1.435 11.589-1.694 2.169-3.492 4.286-5.484 6.278s-4.113 3.79-6.274 5.48a8.215 8.215 0 0 1-5.072 1.745ZM459.008 290.419a8.254 8.254 0 0 1-6.524-3.181c-1.274-1.637-2.621-3.246-4.129-4.754-1.508-1.508-3.113-2.855-4.758-4.133-3.597-2.802-4.234-7.992-1.435-11.589 2.798-3.601 8-4.25 11.597-1.435 2.161 1.69 4.282 3.488 6.274 5.48 1.992 1.992 3.79 4.109 5.484 6.278 2.798 3.597 2.161 8.786-1.435 11.589a8.225 8.225 0 0 1-5.074 1.745ZM377.121 372.29a8.221 8.221 0 0 1-5.073-1.746c-2.161-1.69-4.282-3.488-6.274-5.48-1.992-1.992-3.79-4.109-5.484-6.278-2.798-3.597-2.161-8.786 1.435-11.589 3.589-2.819 8.79-2.161 11.597 1.435 1.274 1.637 2.621 3.246 4.129 4.754 1.508 1.508 3.113 2.855 4.758 4.133 3.597 2.802 4.234 7.992 1.435 11.589a8.246 8.246 0 0 1-6.523 3.182Z"
                fill="#FFC269"
            />
            <Path
                d="m419.355 321.036-21.484-26.855a90.865 90.865 0 0 1-15.697-29.408l-32.761-103.742-10.487-7.914-6.827 7.914H177.66a16.517 16.517 0 0 0-14.808 9.201L91.694 314.27l6.315 11.851 123.871 16.516c.349.046.697.068 1.046.07.015 0 .028.007.043.007.798 0 1.621-.121 2.427-.371.149-.046.25-.161.395-.214.504-.184.933-.477 1.394-.757.503-.306.996-.59 1.413-.988.116-.11.276-.154.387-.271l119.55-127.023 17.895 56.674a107.325 107.325 0 0 0 18.538 34.731l21.484 26.855a8.253 8.253 0 0 0 6.46 3.101 8.238 8.238 0 0 0 5.153-1.81c3.556-2.847 4.137-8.044 1.29-11.605Zm-307.742-9.762 58.943-118.991 40.724 132.28-99.667-13.289Zm115.072 7.175-43.378-140.9h154.006l5.523 17.491-116.151 123.409Z"
                fill="#FF8086"
            />
            <Path
                d="m363.355 128-8.255-8.258h-13.511a16.574 16.574 0 0 0-13.323 6.758c-3.097 4.23-4.008 9.742-2.419 14.734l6.251 19.798h17.315l-7.824-24.774h13.508l8.258-8.258Z"
                fill="#DAD8DB"
            />
            <Path
                d="M123.871 104.044c0 12.394 11.338 21.689 23.491 19.258l51.794-10.359a9.076 9.076 0 0 0-1.78-17.976h-64.429a9.077 9.077 0 0 0-9.076 9.077ZM222.968 359.226c13.682 0 24.774-11.092 24.774-24.774s-11.092-24.774-24.774-24.774-24.774 11.092-24.774 24.774 11.092 24.774 24.774 24.774Z"
                fill="#5D5360"
            />
            <Path
                d="M230.839 331.948c-1.387-4.343-6.016-6.738-10.379-5.367-4.339 1.383-6.742 6.028-5.363 10.375l18.395 57.806 15.742-5.008-18.395-57.806Z"
                fill="#4B3F4E"
            />
            <Path
                d="M256 400.516h-24.774a8.256 8.256 0 0 1-8.258-8.258 8.256 8.256 0 0 1 8.258-8.258H256a8.256 8.256 0 0 1 8.258 8.258 8.256 8.256 0 0 1-8.258 8.258ZM99.097 359.226a8.258 8.258 0 0 0 8.258-8.258 8.258 8.258 0 1 0-8.258 8.258ZM99.097 326.193a8.258 8.258 0 0 0 8.258-8.258 8.258 8.258 0 1 0-8.258 8.258Z"
                fill="#5D5360"
            />
            <Rect
                x="351"
                y="119"
                width={getFHorizontalPx(33)}
                height={getFHorizontalPx(18)}
                rx="9"
                fill="#5D5360"
            />
        </Svg>
    );
};

export default BikeSvg;

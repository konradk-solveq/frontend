import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';
import {getFHorizontalPx, getFVerticalPx} from '@helpers/appLayoutDimensions';

interface IProps {
    imageSize?: number;
}

const FinishLine = ({imageSize = 144}: IProps) => {
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
                    d="m143.459 125.493-42.395-82.557-29.063-4.844-26.97 4.844-42.394 82.557c-1.655 3.224 1.753 5.989 5.377 5.989h132.204l3.782-3.776a4.818 4.818 0 0 0-.541-2.213Z"
                    fill="#FF9A9F"
                />
                <Path
                    d="M24.676 127.706c-9.059 0-14.91-9.583-10.772-17.642l34.98-68.12-5.948.992L.541 125.494c-1.655 3.223.686 7.056 4.31 7.056h64.727l2.328-2.331 2.516 2.331h64.727c2.81 0 4.848-2.306 4.851-4.844H24.676Z"
                    fill="#FF8086"
                />
                <Path
                    d="M120.441 40.219h-96.88l5.55-18.14 6.56-3.363h12.11l5.938 5.33 6.172-5.33H72l6.468 4.487 5.642-4.487h12.11l5.874 4.206 6.236-4.206h12.11v21.503Z"
                    fill="#FAF5DC"
                />
                <Path
                    d="M30.827 33.248V18.716H23.56v24.22h12.11l5.956-2.717 6.155 2.717h12.11l5.641-2.155 6.469 2.155h12.11l5.608-2.014 6.502 2.014h12.11l12.11-4.844h-84.77a4.844 4.844 0 0 1-4.844-4.844Z"
                    fill="#F5EBCD"
                />
                <Path
                    d="M72 105.908a2.42 2.42 0 0 0-2.422 2.422v19.376l2.281 1.88 2.563-1.88V108.33A2.42 2.42 0 0 0 72 105.908ZM72 96.22a2.42 2.42 0 0 1-2.422-2.422v-12.11A2.42 2.42 0 0 1 72 79.266a2.42 2.42 0 0 1 2.422 2.422v12.11A2.42 2.42 0 0 1 72 96.22ZM72 72a2.42 2.42 0 0 1-2.422-2.422v-4.844A2.42 2.42 0 0 1 72 62.312a2.42 2.42 0 0 1 2.422 2.422v4.844A2.42 2.42 0 0 1 72 72ZM72 57.468a2.42 2.42 0 0 1-2.422-2.422v-2.422A2.42 2.42 0 0 1 72 50.2a2.42 2.42 0 0 1 2.422 2.422v2.423A2.42 2.42 0 0 1 72 57.468Z"
                    fill="#FAF5DC"
                />
                <Path
                    d="M35.67 30.826h-4.843l-2.823-7.405 2.823-4.705h4.844v12.11ZM47.781 18.716h12.11v12.11h-12.11v-12.11ZM47.78 38.092l-7.42 2.97-4.69-2.97v-7.266h12.11v7.266ZM72.001 38.092l-4.782 3.252-7.328-3.252v-7.266H72v7.266ZM72 18.716h12.11v12.11H72v-12.11ZM96.221 38.092l-4.673 2.83-7.437-2.83v-7.266h12.11v7.266ZM96.22 18.716h12.111v12.11h-12.11v-12.11ZM120.442 42.936l-12.11-4.844v-7.266h12.11v12.11Z"
                    fill="#5D5360"
                />
                <Path
                    d="M69.578 127.706h4.844v4.844h-4.844v-4.844Z"
                    fill="#F5EBCD"
                />
                <Path
                    d="M23.56 18.716h7.267v12.11H23.56v-12.11ZM35.67 38.092h12.11v4.844H35.67v-4.844ZM59.89 38.092H72v4.844H59.89v-4.844ZM84.11 38.092h12.11v4.844H84.11v-4.844ZM108.33 38.092h12.11v4.844h-12.11v-4.844Z"
                    fill="#4B3F4E"
                />
                <Path
                    d="M25.981 75.952v-62.08a2.42 2.42 0 0 0-2.422-2.422 2.42 2.42 0 0 0-2.422 2.422v71.513l4.844-9.433ZM118.018 75.952v-62.08a2.421 2.421 0 1 1 4.844 0v71.513l-4.844-9.433Z"
                    fill="#5D5360"
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
export default FinishLine;
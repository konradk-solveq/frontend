import React from 'react';
import Svg from 'react-native-svg';
import { AnimatedSVGPath } from 'react-native-svg-animations'


const DashLine = () => (
    <Svg viewBox="0 0 193.10223 65.190827" >
        <AnimatedSVGPath
            strokeColor={"#D8232A"}
            duration={30000}
            delay={0}
            loop={true}
            strokeWidth={0.6}
            strokeLinecap='round'
            strokeLinejoin='miter'
            strokeDashArray='2.6, 5'
            transform="translate(3.0735996,-105.39739)"
            d="m -6.2808338,139.84552 c 0,0 21.0387618,1.14312 30.4256518,-5.74098 9.38689,-6.8841 12.908848,-14.80521 27.572313,-12.64527 14.663465,2.15993 31.74926,28.63631 50.914369,41.70552 19.16511,13.06921 37.18624,3.73257 42.62949,-7.61718 5.44325,-11.34976 -2.87185,-29.0099 3.40768,-38.55363 6.27954,-9.54374 50.84803,-11.22532 50.84803,-11.22532"
        />
    </Svg>
)

export default DashLine;
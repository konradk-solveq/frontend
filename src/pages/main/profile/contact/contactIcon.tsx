import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {getFHorizontalPx, getFVerticalPx} from '@theme/utils/appLayoutDimensions';
import { StyleProp, ViewStyle } from 'react-native';
import { View } from 'react-native';

interface IconProps {
    type: "email" | "phone",
    style?: StyleProp<ViewStyle> 
}

const getPhoneIcon = () => (
    <Svg 
        width={getFHorizontalPx(20)}
        height={getFVerticalPx(16)}
        fill="none" viewBox="0 0 18 17"
    >
        <Path d="M5.37207 11.8906c2.54004 2.5313 5.59863 4.4824 8.09473 4.4824 1.1074 0 2.0918-.3867 2.8828-1.2656.457-.501.7207-1.081.7207-1.6611 0-.4834-.1933-.9492-.6504-1.2744l-2.5752-1.8281c-.4131-.2989-.7558-.43071-1.0722-.43071-.4043 0-.7559.22851-1.1514.61521l-.6152.6153c-.0967.0966-.211.1318-.3252.1318-.1319 0-.2637-.0527-.3604-.1055-.52733-.29-1.45018-1.081-2.29393-1.93357-.84375-.84375-1.63477-1.75781-1.9336-2.29395-.05273-.08789-.09668-.21972-.09668-.35156 0-.11426.03516-.22852.12305-.3252l.61524-.62402c.3955-.39551.62402-.74707.62402-1.15137 0-.30761-.14063-.65918-.43945-1.07226L5.1084.869141C4.77441.40332 4.2998.209961 3.79883.209961c-.58008 0-1.15137.237305-1.65235.711914C1.28516 1.72168.916016 2.71484.916016 3.82227c0 2.49609 1.924804 5.53711 4.456054 8.06833Z" fill="#333"/>
    </Svg>
)

const getEmailIcon = () => (
    <Svg 
        width={getFHorizontalPx(21)}
        height={getFVerticalPx(16)}
        fill="none"  viewBox="0 0 18 14"
    >
        <Path d="M9.00781 7.40625c.32031 0 .60938-.14844.94531-.48437L16.4062.507812C16.1172.25 15.6016.125 14.8828.125H2.95312c-.63281 0-1.09374.117188-1.36718.351562L8.07031 6.92188c.32813.32812.61719.48437.9375.48437ZM.84375 11.9453 6.19531 6.625.859375 1.36719c-.148437.24219-.226563.64843-.226563 1.21875v8.17186c0 .5547.070313.9453.210938 1.1875Zm16.32815-.0156c.125-.2344.1953-.625.1953-1.1719V2.58594c0-.55469-.0781-.96094-.2188-1.20313L11.8281 6.625l5.3438 5.3047ZM3.11719 13.2266H15.0469c.664 0 1.1328-.1328 1.414-.3828l-5.4531-5.41411-.4375.4375c-.5156.5-1.0078.73437-1.56249.73437-.54687 0-1.04687-.23437-1.5625-.73437l-.4375-.4375L1.5625 12.8359c.30469.2579.82812.3907 1.55469.3907Z" fill="#333"/>
    </Svg>
)


const ContactIcon = ({ type, style }: IconProps) => {
    return (
        <View style={style}>
            { type === "email" ? getEmailIcon() : getPhoneIcon() }
        </View>
    )
    
};

export default ContactIcon;

CheckBox


import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Dimensions, View, Animated, Easing, TouchableWithoutFeedback } from 'react-native';
import Svg, { G, Path, Circle, Defs, ClipPath } from 'react-native-svg';
import ImageSvg from 'react-native-remote-svg';



interface CheckBoxProps {
    checked: boolean,
    getCheck: Function,
    onpress: Function
};

const CheckBox: React.FC<CheckBoxProps> = (props: CheckBoxProps) => {

    const [checked, setChecked] = useState(props.checked);

    useEffect(() => {
        setChecked(props.checked);
        if (props.getCheck) props.getCheck(props.checked);
    }, [props.checked])

    return (
        <TouchableWithoutFeedback
            style={{ width: "100%", height: "100%" }}
            onPress={props.onpress}
        >
            {checked ?
                <ImageSvg>
                    source={require('./loader.svg')}
                    style={{ width: "100%", height: "100%" }}
                </ImageSvg>
                :
                <ImageSvg>
                    source={require('./loader.svg')}
                    style={{ width: "100%", height: "100%" }}
                </ImageSvg>
            }

        </TouchableWithoutFeedback>
    )
}


export default CheckBoxProps
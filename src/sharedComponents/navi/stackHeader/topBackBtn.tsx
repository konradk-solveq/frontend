import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import {
    getWidthPxOf,
} from '../../../helpers/layoutFoo';

interface Props {
    onpress: Function
}

const TopBackBtn: React.FC<Props> = (props: Props) => {

    let styles = StyleSheet.create({
        btn: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: '#d8232a',
            padding: 9,
            position: 'absolute',
            width: getWidthPxOf(40),
            height: getWidthPxOf(34),
            left: getWidthPxOf(30),
            top: getWidthPxOf(-2)
        },
    })

    return (
        <TouchableOpacity
            onPress={props.onpress}
            style={styles.btn}
        >
            <Svg viewBox="0 0 20 16">
                <Path
                    fill="#313131"
                    fillRule="nonzero"
                    transform="translate(-40 -70) translate(0 1) translate(40 65) translate(0 2) translate(0 2.85)"
                    d="M7.293 1.147c.36.342.388.881.083 1.254l-.083.09-3.879 3.684H19l.117.006c.497.055.883.457.883.944 0 .525-.448.95-1 .95H3.414l3.879 3.685.083.09c.305.372.277.91-.083 1.253-.39.371-1.024.371-1.414 0L.293 7.797l-.083-.09c-.305-.372-.278-.911.083-1.254l5.586-5.306c.39-.371 1.023-.371 1.414 0z"
                />
            </Svg>
        </TouchableOpacity>
    )
}

export default TopBackBtn;

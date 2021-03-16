import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

interface BtnProps {
    cheched: boolean
    onpress: Function
}


const RadioBtn: React.FC<BtnProps> = (props: BtnProps) => {

    let styles = StyleSheet.create({
        btn: {
            backgroundColor: 'white',
            borderRadius: 10,
            width: 13,
            height: 13,
        },
        btnOff: {

        }
    })

    return (
        <>
            <TouchableOpacity
                style={styles.btn}
                onPress={props.onpress}
            >
                {props.cheched ?
                    <Svg viewBox='0 0 13 13'>
                        <Path
                            height='100%'
                            width='100%'
                            y='0'
                            x='0'
                            fill='#d8232a'
                            fillRule='nonzer'
                            d='M 6.5,0 C 10.09,0 13,2.91 13,6.5 13,10.09 10.09,13 6.5,13 2.91,13 0,10.09 0,6.5 0,2.91 2.91,0 6.5,0 Z m 0,0.5 c -3.314,0 -6,2.686 -6,6 0,3.314 2.686,6 6,6 3.314,0 6,-2.686 6,-6 0,-3.314 -2.686,-6 -6,-6 z M 6.5,5 C 7.328,5 8,5.672 8,6.5 8,7.328 7.328,8 6.5,8 5.672,8 5,7.328 5,6.5 5,5.672 5.672,5 6.5,5 Z'
                        ></Path>
                    </Svg>
                    :
                    <Svg viewBox='0 0 13 13'>
                        <Circle
                            fill='#f0f0f0'
                            cx='6.5'
                            cy='6.5'
                            r='6.5'
                            fillRule='evenodd'
                        ></Circle>
                    </Svg>
                }
            </TouchableOpacity>
        </>
    )
}

export default RadioBtn;
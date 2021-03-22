import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from 'react-native';

import DinLight18 from '../text/dinLight18';
import I18n from 'react-native-i18n';

interface BtnProps {
    onChangeText: Function,
    validationOk: Function,
    validationWrong: Function,
    placeholder: string,
    value: string
}


const OneLineTekst: React.FC<BtnProps> = (props: BtnProps) => {

    const [borderColor, setBorderColor] = useState('#80555555');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (props.validationOk && props.validationOk(props.value)) {
            if (props.value == 'null' || props.value == 'NULL') {
                setBorderColor('#d8232a');
                setErrorMessage(I18n.t('OneLineTekst-error-null'));
            } else if (props.validationWrong && props.validationWrong(props.value)) {
                setBorderColor('#d8232a');
            } else {
                setBorderColor('#2cba3f');
                setErrorMessage('');
            }
        } else {
            setBorderColor('#80555555'),
                setErrorMessage('');
        }
    }, [props.value])


    let styles = StyleSheet.create({
        input: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            borderRadius: 150,
            fontFamily: "DIN2014Narrow-Regular",
            fontSize: 20,
            textAlign: 'left',
            color: 'black',
            borderWidth: 2,
            borderColor: borderColor,
            height: 50,
            marginTop: 6,
            paddingLeft: 30
        },
        error: {
            position: 'relative',
            marginTop: 6,
        }
    })

    return (
        <>
            <DinLight18
                algin='left'
                inner={props.placeholder}
            ></DinLight18>

            <TextInput
                style={styles.input}
                onChangeText={props.onChangeText}
                value={props.value}
            >
            </TextInput>

            <View style={styles.error}>
                <DinLight18

                    color='#d8232a'
                    algin='left'
                    inner={errorMessage}
                ></DinLight18>
            </View>
        </>
    )
}

export default OneLineTekst;

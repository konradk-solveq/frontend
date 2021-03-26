import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View, Text } from 'react-native';
import I18n from 'react-native-i18n';
import Svg, { Path } from "react-native-svg";

interface Props {
    validationOk: Function,
    validationWrong: Function,
    messageWrong: string,
    placeholder: string,
    value: string,
    valueName: string,
    onpress: Function
}

const ListInputBtn: React.FC<Props> = (props: Props) => {

    const [borderColor, setBorderColor] = useState('#80555555');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        let validation = '';
        let message = '';

        if (props.validationOk && props.validationOk(props.value)) {
            validation = 'ok';
        }

        if (props.value == 'null' || props.value == 'NULL') {
            validation = 'bad';
            message = I18n.t('OneLineTekst-error-null')
        }

        if (props.validationWrong && props.validationWrong(props.value)) {
            validation = 'bad';
            message = props.messageWrong ? props.messageWrong : ''
        }

        switch (validation) {
            case 'ok': setBorderColor('#2cba3f');
                break;
            case 'bad': setBorderColor('#d8232a');
                break;
            default:
                setBorderColor('#80555555');
                break;
        }

        setErrorMessage(message);
    }, [props.value])

    let styles = StyleSheet.create({
        light18: {
            fontFamily: "DIN2014Narrow-Light",
            fontSize: 18,
            textAlign: 'left',
            color: '#555555'
        },
        input: {
            width: '100%',
            borderRadius: 150,
            borderWidth: 2,
            borderColor: borderColor,
            height: 50,
            marginTop: 6,
        },
        title: {
            fontFamily: "DIN2014Narrow-Regular",
            fontSize: 20,
            textAlign: 'left',
            color: '#555555',
            position: 'absolute',
            top: 8,
            left: 30
        },
        arrow: {
            position: 'absolute',
            right: 30,
            top: 15,
            width: 20,
            height: 15
        },
        error: {
            fontFamily: "DIN2014Narrow-Light",
            fontSize: 18,
            textAlign: 'left',
            color: '#d8232a',
            position: 'relative',
            marginTop: 6,
            height: 23
        }
    })

    return (
        <>
            <Text style={styles.light18}>
                {props.placeholder}
            </Text>

            <TouchableWithoutFeedback
                onPress={() => props.onpress()}
            >
                <View style={styles.input}>
                    <Text style={styles.title}>
                        {props.value == '' ? props.valueName : props.value}
                    </Text>

                    <View style={styles.arrow}>
                        <Svg viewBox="0 0 20 15">
                            <Path fill="#313131" fillRule="nonzero"
                                d="M7.293 1.207c.36.36.388.928.083 1.32l-.083.094L3.414 6.5 19 6.5l.117.007c.497.057.883.48.883.993 0 .552-.448 1-1 1H3.414l3.879 3.879.083.094c.305.392.277.96-.083 1.32-.39.39-1.024.39-1.414 0L.293 8.207.21 8.113c-.305-.392-.278-.96.083-1.32l5.586-5.586c.39-.39 1.023-.39 1.414 0z"
                                transform="translate(-324 -450) translate(40 403) translate(284 44) translate(0 3) matrix(-1 0 0 1 20 0)"
                            />
                        </Svg>
                    </View>
                </View>

            </TouchableWithoutFeedback>

            <Text style={styles.error}>
                {errorMessage}
            </Text>
        </>
    )
}

export default ListInputBtn;

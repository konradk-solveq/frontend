import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback, View, Text} from 'react-native';
import I18n from 'react-native-i18n';
import Svg, {Path} from 'react-native-svg';

import {getHorizontalPx, getVerticalPx} from '../../helpers/layoutFoo';

interface Props {
    // * wartości wymagane
    style?: any;
    validationOk: Function; // funkcja validujaca popraność value w inpucie, zwraca true/false, zmienia border na zielono przy true
    validationWrong: Function; // waliująca błędny value w inpucie (bo to nie zawsze jest owrotność warunku popraności), ture/false, zmienia border na czerwno przy true
    messageWrong: string; // * informacja pod imputem jeśli validationWrong zwraca true
    placeholder: string; // * npis na inputem
    value: string; // * zmienia value w inpucie
    valueName: string; // * pokazuje się gdy props.value = '', jakby dodatkowy placeholder tyle, że w polu imputa
    onpress: Function; // * wykonywane po kliknięciu imputa
    validationStatus: Function; // zwrotka dla obiektu rodzica: poprawna gdy validationOk zwraca true, inaczej false
    forceMessageWrong: string; // informacja o błędnej validacji przez rodica, wg validationStatus, nadrzędna nad messageWrong
}

const ListInputBtn: React.FC<Props> = (props: Props) => {
    const [borderColor, setBorderColor] = useState('#80555555');
    const [borderWidth, setBorderrWidth] = useState(1);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        let validation = '';
        let message = '';

        if (props.validationOk && props.validationOk(props.value)) {
            validation = 'ok';
        }

        if (props.value == 'null' || props.value == 'NULL') {
            validation = 'bad';
            message = I18n.t('OneLineTekst-error-null');
        }

        if (props.validationWrong && props.validationWrong(props.value)) {
            validation = 'bad';
            message = props.messageWrong ? props.messageWrong : '';
        }

        if (props.forceMessageWrong && props.forceMessageWrong != '') {
            validation = 'bad';
            message = props.forceMessageWrong;
        }

        switch (validation) {
            case 'ok':
                {
                    setBorderColor('#2cba3f');
                    setBorderrWidth(2);
                    if (props.validationStatus) {
                        props.validationStatus(true);
                    }
                }
                break;
            case 'bad':
                {
                    setBorderColor('#d8232a');
                    setBorderrWidth(2);
                    if (props.validationStatus) {
                        props.validationStatus(false);
                    }
                }
                break;
            default:
                {
                    setBorderColor('#80555555');
                    setBorderrWidth(1);
                    if (props.validationStatus) {
                        props.validationStatus(false);
                    }
                }
                break;
        }

        setErrorMessage(message);
    }, [props.value, props.forceMessageWrong]);

    let styles = StyleSheet.create({
        light18: {
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: getHorizontalPx(18),
            textAlign: 'left',
            color: '#555555',
        },
        input: {
            width: '100%',
            borderRadius: getHorizontalPx(150),
            borderWidth: borderWidth,
            borderColor: borderColor,
            height: 50,
            marginTop: getHorizontalPx(6),
        },
        title: {
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: 20,
            textAlign: 'left',
            color: '#555555',
            // position: 'absolute',
            // marginTop: getHorizontalPx(10),
            left: getHorizontalPx(30),
            paddingTop: 11,
        },
        arrow: {
            position: 'absolute',
            right: getHorizontalPx(30),
            top: 17,
            width: getHorizontalPx(20),
            height: getHorizontalPx(15),
        },
        error: {
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: getHorizontalPx(18),
            textAlign: 'left',
            color: '#d8232a',
            position: 'relative',
            marginTop: getHorizontalPx(6),
            height: getHorizontalPx(23),
        },
    });

    return (
        <View style={props.style}>
            <Text style={styles.light18}>{props.placeholder}</Text>

            <TouchableWithoutFeedback onPress={() => props.onpress()}>
                <View style={styles.input}>
                    <Text style={styles.title}>
                        {props.value == '' ? props.valueName : props.value}
                    </Text>

                    <View style={styles.arrow}>
                        <Svg viewBox="0 0 20 15">
                            <Path
                                fill="#313131"
                                fillRule="nonzero"
                                d="M7.293 1.207c.36.36.388.928.083 1.32l-.083.094L3.414 6.5 19 6.5l.117.007c.497.057.883.48.883.993 0 .552-.448 1-1 1H3.414l3.879 3.879.083.094c.305.392.277.96-.083 1.32-.39.39-1.024.39-1.414 0L.293 8.207.21 8.113c-.305-.392-.278-.96.083-1.32l5.586-5.586c.39-.39 1.023-.39 1.414 0z"
                                transform="translate(-324 -450) translate(40 403) translate(284 44) translate(0 3) matrix(-1 0 0 1 20 0)"
                            />
                        </Svg>
                    </View>
                </View>
            </TouchableWithoutFeedback>

            <Text style={styles.error}>{errorMessage}</Text>
        </View>
    );
};

export default ListInputBtn;

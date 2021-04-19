import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, Text, View} from 'react-native';
import I18n from 'react-native-i18n';

import {getHorizontalPx, getVerticalPx} from '../../helpers/layoutFoo';

interface Props {
    // * wartości wymagane
    style?: any;
    onChangeText: Function; // * zrtorka do rodzica wartości inputu
    validationOk: Function; // funkcja validujaca popraność value w inpucie, zwraca true/false, zmienia border na zielono przy true
    validationWrong: Function; // waliująca błędny value w inpucie (bo to nie zawsze jest owrotność warunku popraności), ture/false, zmienia border na czerwno przy true
    messageWrong: string; // * informacja pod imputem jeśli validationWrong zwraca true
    placeholder: string; // * npis na inputem
    value: string; // * zmienia value w inpucie
    validationStatus: Function; // zwrotka dla obiektu rodzica: poprawna gdy validationOk zwraca true, inaczej false
    forceMessageWrong: string; // informacja o błędnej validacji przez rodica, wg validationStatus, nadrzędna nad messageWrong
    maxLength?: number;
    keyboardType?: string;
}

const OneLineTekst: React.FC<Props> = (props: Props) => {
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
        placeholder: {
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: 18,
            textAlign: 'left',
            color: '#555555',
        },
        input: {
            display: 'flex',
            // alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            borderRadius: 25,
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: 20,
            textAlign: 'left',
            color: 'black',
            borderWidth: borderWidth,
            borderColor: borderColor,
            height: 50,
            marginTop: 6,
            paddingLeft: 30,
            paddingTop: 10,
            paddingBottom: 10,
        },
        error: {
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: 18,
            textAlign: 'left',
            color: '#d8232a',
            position: 'relative',
            marginTop: 6,
            height: 23,
        },
    });

    return (
        <View style={props.style}>
            <Text style={styles.placeholder}>{props.placeholder}</Text>

            <TextInput
                style={styles.input}
                onChangeText={props.onChangeText}
                value={props.value}
                maxLength={props.maxLength ? props.maxLength : 20}
                keyboardType={props.keyboardType}
            />

            <Text style={styles.error}>{errorMessage}</Text>
        </View>
    );
};

export default OneLineTekst;

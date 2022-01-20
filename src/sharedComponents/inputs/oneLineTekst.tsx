import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    TextInput,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

import {getFontSize, getHorizontalPx} from '../../helpers/layoutFoo';
import IconHide from '@sharedComponents/icons/IconHide';
import IconShow from '@sharedComponents/icons/IconShow';

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
    secureTextEntry?: boolean;
    textContentType?: string;
    testId?: string;
}

const OneLineTekst: React.FC<Props> = (props: Props) => {
    const [borderColor, setBorderColor] = useState('#80555555');
    const [borderWidth, setBorderrWidth] = useState(1);
    const [errorMessage, setErrorMessage] = useState('');

    const [isSecure, setIsSecure] = useState(true);

    const onEyePress = () => {
        setIsSecure(!isSecure);
    };

    useEffect(() => {
        let validation = '';
        let message = '';

        if (props.validationOk && props.validationOk(props.value)) {
            validation = 'ok';
        }

        if (props.value == 'null' || props.value == 'NULL') {
            validation = 'bad';
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const {t} = useMergedTranslation('');
            message = t('OneLineText-error-null');
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
            fontSize: getFontSize(18),
            textAlign: 'left',
            color: '#555555',
        },
        input: {
            display: 'flex',
            // alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            borderRadius: getHorizontalPx(50),
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getFontSize(20),
            textAlign: 'left',
            color: 'black',
            borderWidth: borderWidth,
            borderColor: borderColor,
            height: getHorizontalPx(50),
            marginTop: getHorizontalPx(6),
            paddingLeft: getHorizontalPx(30),
            paddingRight: getHorizontalPx(30),
            paddingTop: getHorizontalPx(10),
            paddingBottom: getHorizontalPx(10),
        },
        error: {
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: getFontSize(18),
            textAlign: 'left',
            color: '#d8232a',
            position: 'relative',
            marginTop: getHorizontalPx(6),
            height: getHorizontalPx(23),
        },
        eyeWrapper: {
            position: 'absolute',
            right: getHorizontalPx(15),
            top: 3,
            height: '100%',
            justifyContent: 'center',
        },
    });

    return (
        <View style={props.style}>
            <Text style={styles.placeholder}>{props.placeholder}</Text>
            <View>
                <TextInput
                    testID={props.testId || 'one-line-tekst'}
                    style={styles.input}
                    onChangeText={props.onChangeText}
                    value={props.value}
                    maxLength={props.maxLength ? props.maxLength : 20}
                    keyboardType={props.keyboardType}
                    secureTextEntry={props.secureTextEntry && isSecure}
                    textContentType={props.textContentType}
                />
                {props.secureTextEntry && (
                    <View style={styles.eyeWrapper}>
                        <TouchableOpacity onPress={() => onEyePress()}>
                            {isSecure ? <IconShow /> : <IconHide />}
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            <Text style={styles.error}>{errorMessage}</Text>
        </View>
    );
};

export default OneLineTekst;

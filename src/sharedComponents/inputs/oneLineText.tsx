import { getFontSize, getHorizontalPx } from '@src/helpers/layoutFoo';
import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    TextInput,
    Text,
    View,
    KeyboardTypeOptions,
    ViewStyle,
} from 'react-native';
import I18n from 'react-native-i18n';

interface IProps {
    onChangeText: (value: string) => void;
    validationOk: boolean;
    validationWrong: boolean;
    messageWrong: string;
    placeholder: string;
    value: string;
    forceMessageWrong?: string;
    maxLength?: number;
    keyboardType?: KeyboardTypeOptions;
    secureTextEntry?: boolean;
    isMultiline?: boolean;
    Icon?: Element;
    style?: ViewStyle;
}

const OneLineText: React.FC<IProps> = ({
    style,
    onChangeText,
    validationOk,
    validationWrong,
    messageWrong,
    placeholder,
    value,
    forceMessageWrong,
    maxLength,
    keyboardType,
    isMultiline,
    secureTextEntry,
    Icon,
}: IProps) => {
    const [borderColor, setBorderColor] = useState('#80555555');
    const [borderWidth, setBorderrWidth] = useState(1);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        let validation = '';
        let message = '';

        if (validationOk) {
            validation = 'ok';
        }

        if (value == 'null' || value == 'NULL') {
            validation = 'bad';
            message = I18n.t('OneLineTekst-error-null');
        }

        if (validationWrong) {
            validation = 'bad';
            message = messageWrong ? messageWrong : '';
        }

        if (forceMessageWrong && forceMessageWrong !== '') {
            validation = 'bad';
            message = forceMessageWrong;
        }

        switch (validation) {
            case 'ok':
                setBorderColor('#2cba3f');
                setBorderrWidth(2);

                break;
            case 'bad':
                setBorderColor('#d8232a');
                setBorderrWidth(2);

                break;
            default:
                setBorderColor('#80555555');
                setBorderrWidth(1);

                break;
        }

        setErrorMessage(message);
    }, [value, forceMessageWrong, messageWrong, validationOk, validationWrong]);

    const dynamicStyles = {
        borderWidth: borderWidth,
        borderColor: borderColor,
        paddingRight: getHorizontalPx(Icon ? 40 : 30),
    };

    return (
        <View style={style}>
            <Text style={styles.placeholder}>{placeholder}</Text>

            <View>
                <TextInput
                    style={[styles.input, dynamicStyles]}
                    onChangeText={onChangeText}
                    value={value}
                    maxLength={maxLength ? maxLength : 20}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    multiline={isMultiline}
                />

                {Icon ? <View style={styles.iconContainer}>{Icon}</View> : null}
            </View>

            <Text style={styles.error}>{errorMessage}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    placeholder: {
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: getFontSize(18),
        textAlign: 'left',
        color: '#555555',
    },
    input: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        borderRadius: getHorizontalPx(50),
        fontFamily: 'DIN2014Narrow-Regular',
        fontSize: getFontSize(20),
        textAlign: 'left',
        color: 'black',
        minHeight: getHorizontalPx(50),
        height: getHorizontalPx(50),
        marginTop: getHorizontalPx(6),
        paddingLeft: getHorizontalPx(30),
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
        marginBottom: getHorizontalPx(10),
    },
    iconContainer: {
        position: 'absolute',
        right: 0,
        top: getHorizontalPx(6),
    },
});

export default OneLineText;

import React, {useMemo} from 'react';
import {
    View,
    TextInput as TI,
    StyleSheet,
    KeyboardTypeOptions,
} from 'react-native';

import {
    getFFontSize,
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';
import colors from '@theme/colors';

import {AutoCapitalizeT, TextContentT} from '@components/types/textInput';
import {Subtitle} from '@components/texts/texts';

interface IProps {
    multiline?: boolean;
    numberOfLines?: number;
    placeholder?: string;
    inputName?: string;
    hint?: string;
    value?: string;
    maxLength?: number;
    keyboardType?: KeyboardTypeOptions;
    textContentType?: TextContentT;
    onChangeValue: (value?: string) => void;
    autoCapitalize?: AutoCapitalizeT;
    isValid?: boolean;
    testID?: string;
}

const TextInput: React.FC<IProps> = ({
    multiline = false,
    numberOfLines = 1,
    placeholder = '',
    inputName = '',
    hint = '',
    value = '',
    maxLength,
    keyboardType = 'default',
    textContentType,
    onChangeValue,
    autoCapitalize,
    isValid = true,
    testID = 'text-input-test-id',
}: IProps) => {
    const validationStyle = useMemo(() => (!isValid ? styles.invalid : {}), [
        isValid,
    ]);

    return (
        <View testID={testID}>
            <View
                style={styles.inputNameContianer}
                testID={`${testID}-input-name`}>
                <Subtitle>{inputName}</Subtitle>
            </View>
            <TI
                onChangeText={onChangeValue}
                value={value}
                multiline={multiline}
                numberOfLines={numberOfLines}
                placeholder={placeholder}
                {...(maxLength && {
                    maxLength: maxLength,
                })}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                textContentType={textContentType}
                style={[styles.input, validationStyle]}
                selectionColor={colors.darkGrey}
                testID={`${testID}-input-value`}
            />
            <View style={styles.inputHint} testID={`${testID}-input-hint`}>
                <Subtitle color={colors.darkGrey}>{hint}</Subtitle>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inputNameContianer: {
        marginBottom: getFVerticalPx(4),
    },
    inputHint: {
        marginTop: getFVerticalPx(8),
    },
    input: {
        fontFamily: 'DIN2014-Demi',
        fontSize: getFFontSize(16),
        color: colors.black,
        backgroundColor: colors.whiteGrey,
        paddingHorizontal: getFHorizontalPx(16),
        paddingVertical: 0,
        height: getFVerticalPx(48),
        borderRadius: getFHorizontalPx(16),
    } /* BodyPrimary component equivalent */,
    invalid: {
        borderColor: colors.red,
        borderWidth: 0.1,
    },
});

export default React.memo(TextInput);

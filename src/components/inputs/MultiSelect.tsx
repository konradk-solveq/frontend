import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, Text, TextStyle, ViewStyle} from 'react-native';

import {SelectOptionType} from '@models/map.model';
import {
    getFVerticalPx,
    getFHorizontalPx,
    getFFontSize,
} from '@theme/utils/appLayoutDimensions';
import colors from '@theme/colors';
import {IProps as ButtonIProps} from '@components/buttons/Button';
import {Button} from '@components/buttons';

interface ActiveButtonIProps extends ButtonIProps {
    active: boolean;
    textColor?: string;
    activeTextColor?: string;
    backgroundColor?: string;
    activeBackgroundColor?: string;
    style?: ViewStyle | ViewStyle[];
}

const ActiveButton: React.FC<ActiveButtonIProps> = ({
    active,
    textColor = colors.black,
    activeTextColor = colors.white,
    backgroundColor = colors.white,
    activeBackgroundColor = colors.black,
    style = {},
    ...props
}: ActiveButtonIProps) => {
    return (
        <Button
            color={active ? activeBackgroundColor : backgroundColor}
            textColor={active ? activeTextColor : textColor}
            disabledTextColor={colors.lightRed}
            loaderColor={colors.red}
            withoutShadow={true}
            style={{...styles.activeButton, ...style}}
            containerStyle={styles.innerButton}
            {...props}
        />
    );
};

interface IProps {
    predefined: any[];
    options: SelectOptionType[] | undefined;
    optionsTransName: string;
    onSave: (filters: string[]) => void;
    errorMessage?: string;
    isRadioType?: boolean;
    withEmptyRadio?: boolean;
    titleStyle?: TextStyle;
    buttonStyle?: ViewStyle;
}

const MultiSelect: React.FC<IProps> = ({
    predefined,
    options,
    optionsTransName,
    onSave,
    errorMessage,
    isRadioType,
    withEmptyRadio,
    titleStyle,
    buttonStyle = {},
}: IProps) => {
    const [active, setActive] = useState<string[]>([]);

    useEffect(() => {
        if (predefined) {
            setActive(predefined);
        }
    }, [predefined]);

    const onPressHanlder = useCallback(
        (idx: string) => {
            if (active.includes(idx) && (!isRadioType || withEmptyRadio)) {
                const newNumbers = [...active].filter(nr => nr !== idx);
                setActive(newNumbers);
                onSave(newNumbers);
                return;
            }
            const newNumbers = isRadioType ? [idx] : [...active, idx];
            setActive(newNumbers);
            onSave(newNumbers);
        },
        [active, onSave, isRadioType, withEmptyRadio],
    );

    const renderOptions = useMemo(
        () =>
            options?.map(o => {
                if (!o?.i18nValue) {
                    return null;
                }

                return (
                    <ActiveButton
                        key={`${o.enumValue}_${o}`}
                        text={o.i18nValue}
                        onPress={() => onPressHanlder(o.enumValue)}
                        style={[buttonStyle]}
                        active={active.includes(o.enumValue)}
                        testID={`multiselect-button-${o.enumValue}`}
                    />
                );
            }),
        [options, buttonStyle, active, onPressHanlder],
    );

    return (
        <View style={styles.container}>
            <Text style={[styles.name, titleStyle]}>{optionsTransName}</Text>
            {options?.length ? (
                <View style={styles.list}>{renderOptions}</View>
            ) : null}
            {errorMessage ? (
                <Text style={styles.error}>{errorMessage}</Text>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    activeButton: {
        width: 'auto',
        height: getFVerticalPx(44),
        marginBottom: getFVerticalPx(8),
        marginRight: getFHorizontalPx(8),
    },
    innerButton: {
        width: 'auto',
        paddingHorizontal: getFHorizontalPx(16),
    },
    container: {
        width: '100%',
    },
    name: {
        fontFamily: 'DIN2014-Demi',
        fontSize: getFFontSize(18),
        letterSpacing: 0.5,
        color: '#555555',
        textAlign: 'left',
        marginBottom: getFVerticalPx(5),
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    error: {
        fontFamily: 'DIN2014-Demi',
        fontSize: getFFontSize(18),
        textAlign: 'left',
        color: colors.red,
        position: 'relative',
        marginTop: getFVerticalPx(6),
        height: getFVerticalPx(23),
    },
});

export default MultiSelect;

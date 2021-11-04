import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, Text, TextStyle} from 'react-native';

import {SelectOptionType} from '../../models/map.model';
import {getFontSize, getVerticalPx} from '../../helpers/layoutFoo';

import TypicalRedBtn from '../../sharedComponents/buttons/typicalRed';

interface IProps {
    predefined: any[];
    options: SelectOptionType[] | undefined;
    optionsTransName: string;
    onSave: (filters: string[]) => void;
    errorMessage?: string;
    isRadioType?: boolean;
    withEmptyRadio?: boolean;
    titleStyle?: TextStyle;
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
                    <TypicalRedBtn
                        key={`${o.enumValue}_${o}`}
                        title={o.i18nValue}
                        onpress={() => onPressHanlder(o.enumValue)}
                        active={active.includes(o.enumValue)}
                        height={41}
                    />
                );
            }),
        [active, options, onPressHanlder],
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
    container: {
        width: '100%',
    },
    name: {
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: getFontSize(18),
        letterSpacing: 0.5,
        color: '#555555',
        textAlign: 'left',
        marginBottom: getVerticalPx(5),
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    error: {
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: getFontSize(18),
        textAlign: 'left',
        color: '#d8232a',
        position: 'relative',
        marginTop: getVerticalPx(6),
        height: getVerticalPx(23),
    },
});

export default MultiSelect;

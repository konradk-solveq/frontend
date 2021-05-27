import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {SelectOptionType} from '../../models/map.model';
import {firstLetterToUpperCase} from '../../utils/strings';
import {getVerticalPx} from '../../helpers/layoutFoo';

import TypicalRedBtn from '../../sharedComponents/buttons/typicalRed';

interface OptionsTransI {
    name: string;
    options: string[];
}

interface IProps {
    predefined: any[];
    options: SelectOptionType[] | undefined;
    optionsTrans: OptionsTransI;
    onSave: (filters: string[]) => void;
    errorMessage?: string;
    isRadioType?: boolean;
}

const MultiSelect: React.FC<IProps> = ({
    predefined,
    options,
    optionsTrans,
    onSave,
    errorMessage,
    isRadioType,
}: IProps) => {
    const [active, setActive] = useState<string[]>([]);

    useEffect(() => {
        if (predefined) {
            setActive(predefined);
        }
    }, [predefined]);

    const onPressHanlder = useCallback(
        (idx: string) => {
            if (active.includes(idx) && !isRadioType) {
                const newNumbers = [...active].filter(nr => nr !== idx);
                setActive(newNumbers);
                onSave(newNumbers);
                return;
            }
            const newNumbers = isRadioType ? [idx] : [...active, idx];
            setActive(newNumbers);
            onSave(newNumbers);
        },
        [active, onSave, isRadioType],
    );

    const renderOptions = useMemo(
        () =>
            options?.map(o => {
                const option = firstLetterToUpperCase(o?.i18nValue);
                if (!option) {
                    return null;
                }

                return (
                    <TypicalRedBtn
                        key={`${option}_${o}`}
                        title={option}
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
            <Text style={styles.name}>{optionsTrans.name}</Text>
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
        fontSize: 18,
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
        fontSize: 18,
        textAlign: 'left',
        color: '#d8232a',
        position: 'relative',
        marginTop: 6,
        height: 23,
    },
});

export default MultiSelect;

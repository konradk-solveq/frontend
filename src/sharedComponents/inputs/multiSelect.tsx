import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {getVerticalPx} from '../../helpers/layoutFoo';

import TypicalRedBtn from '../../sharedComponents/buttons/typicalRed';

interface OptionsTransI {
    name: string;
    options: string[];
}

interface IProps {
    predefined: any[];
    options: any[];
    optionsTrans: OptionsTransI;
    onSave: (filters: number[]) => void;
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
    const [active, setActive] = useState<number[]>([]);

    useEffect(() => {
        setActive(predefined);
    }, [predefined]);

    const onPressHanlder = useCallback(
        (idx: number) => {
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
            options.map(o => {
                const option = optionsTrans.options[o];
                return (
                    <TypicalRedBtn
                        key={`${option}_${o}`}
                        title={option}
                        onpress={() => onPressHanlder(o)}
                        active={active.includes(o)}
                        height={41}
                    />
                );
            }),
        [active, options, optionsTrans.options, onPressHanlder],
    );

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{optionsTrans.name}</Text>
            <View style={styles.list}>{renderOptions}</View>
            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    name: {
        fontFamily: 'DIN2014Narrow-Regular',
        fontSize: 18,
        letterSpacing: 0.5,
        color: '#313131',
        textAlign: 'left',
        marginTop: getVerticalPx(20),
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

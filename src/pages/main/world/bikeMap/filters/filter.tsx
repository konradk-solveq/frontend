import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {I18n} from '../../../../../../I18n/I18n';
import {getVerticalPx} from '../../../../../helpers/layoutFoo';
import {OptionType} from './filtersData';

import TypicalRedBtn from '../../../../../sharedComponents/buttons/typicalRed';

interface FilterTransI {
    name: string;
    options: string[];
}

interface IProps {
    name: string;
    predefined: OptionType[];
    options: OptionType[];
    onSave: (name: string, filters: number[]) => void;
}

const Filter: React.FC<IProps> = ({
    name,
    predefined,
    options,
    onSave,
}: IProps) => {
    const trans: any = I18n.t('MainWorld.maps.filters');
    const filters: FilterTransI = trans?.[name];
    const [active, setActive] = useState<number[]>([]);

    useEffect(() => {
        setActive(predefined);
    }, [predefined]);

    const onPressHanlder = useCallback(
        (idx: number) => {
            if (active.includes(idx)) {
                const newNumbers = [...active].filter(nr => nr !== idx);
                setActive(newNumbers);
                onSave(name, newNumbers);
                return;
            }
            const newNumbers = [...active, idx];
            setActive(newNumbers);
            onSave(name, newNumbers);
        },
        [active, name, onSave],
    );

    const renderOptions = useMemo(
        () =>
            options.map(o => {
                const option = filters.options[o];
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
        [active, options, filters.options, onPressHanlder],
    );

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{filters.name}</Text>
            <View style={styles.list}>{renderOptions}</View>
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
});

export default Filter;

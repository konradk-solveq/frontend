import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';

import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {getFontSize, getVerticalPx} from '@helpers/layoutFoo';
import {SelectOptionType} from '@models/map.model';

import {MultiSelect} from '@sharedComponents/inputs';
import {firstLetterToUpperCase} from '@utils/strings';

interface IProps {
    name: string;
    predefined: string[];
    options: SelectOptionType[];
    isRadioType: boolean;
    onSave: (name: string, filters: string[]) => void;
}

const Filter: React.FC<IProps> = ({
    name,
    predefined,
    options,
    isRadioType,
    onSave,
}: IProps) => {
    const {t} = useMergedTranslation('MainWorld.maps.filters');

    const filterName = t(`${name}.name`) || firstLetterToUpperCase(name);

    const onPressHanlder = useCallback(
        (values: string[]) => {
            onSave(name, values);
        },
        [name, onSave],
    );

    return (
        <View style={styles.container}>
            <View style={styles.list}>
                <MultiSelect
                    key={name}
                    options={options}
                    optionsTransName={filterName}
                    predefined={predefined}
                    errorMessage={''}
                    onSave={onPressHanlder}
                    isRadioType={isRadioType}
                    titleStyle={styles.name}
                    withEmptyRadio={isRadioType}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    name: {
        fontFamily: 'DIN2014Narrow-Regular',
        fontSize: getFontSize(18),
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

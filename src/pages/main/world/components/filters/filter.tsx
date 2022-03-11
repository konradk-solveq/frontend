import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';

import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {SelectOptionType} from '@models/map.model';

import {MultiSelect} from '@components/inputs';
import {firstLetterToUpperCase} from '@utils/strings';
import {getFFontSize} from '@theme/utils/appLayoutDimensions';
import colors from '@theme/colors';
import {getFVerticalPx} from '@helpers/appLayoutDimensions';

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
        fontFamily: 'DIN2014-Demi',
        fontSize: getFFontSize(18),
        color: colors.black,
        textAlign: 'left',
        marginTop: getFVerticalPx(32),
        marginBottom: getFVerticalPx(16),
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

export default Filter;

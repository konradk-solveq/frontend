import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {getFontSize, getHorizontalPx, getVerticalPx} from '@helpers/layoutFoo';
import CheckBoxx from '@sharedComponents/checkBox/checkBox';
import {useFormContext} from 'react-hook-form';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

interface Props {}

const SelectAllCheckbox: React.FC<Props> = () => {
    const {t} = useMergedTranslation('Login');
    const {watch, setValue} = useFormContext();

    const formData = watch();

    const [allChecked, setAllChecked] = useState(false);

    useEffect(() => {
        const consentsTab = Object.values(formData);
        const newAllChecked = consentsTab.every((val: boolean) => val);
        if (consentsTab.length && newAllChecked !== allChecked) {
            setAllChecked(newAllChecked);
        }
    }, [allChecked, formData]);

    const handleAllCheckedPress = (val: boolean) => {
        Object.keys(formData).forEach(key => {
            setValue(key, val);
        });
    };

    const CHECKBOX_SIZE = getHorizontalPx(26);

    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'row',
            position: 'relative',
            marginBottom: getVerticalPx(44),
        },
        checkbox: {
            position: 'relative',
            width: CHECKBOX_SIZE,
            height: CHECKBOX_SIZE,
            // marginLeft: getHorizontalPx(40),
        },
        text: {
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: getFontSize(18),
            lineHeight: getFontSize(24),
            textAlign: 'left',
            color: '#555555',
        },
        info: {
            paddingHorizontal: 10,
            paddingTop: getVerticalPx(3),
            // screen width without the margins and checkbox
            maxWidth: getHorizontalPx(414 - 80 - 26),
        },
        wrong: {
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getFontSize(18),
            lineHeight: getFontSize(24),
            textAlign: 'left',
            color: '#d8232a',
            marginTop: getVerticalPx(11),
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.checkbox}>
                <CheckBoxx
                    checked={allChecked}
                    wrong={false}
                    getCheck={handleAllCheckedPress}
                />
            </View>
            <View style={styles.info}>
                <Text>{t('selectAll')}</Text>
            </View>
        </View>
    );
};

export default SelectAllCheckbox;

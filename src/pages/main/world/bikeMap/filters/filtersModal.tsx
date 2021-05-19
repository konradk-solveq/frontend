import React, {useState} from 'react';

import {View, Text, Modal, ScrollView, StyleSheet} from 'react-native';
import {I18n} from '../../../../../../I18n/I18n';
import {getVerticalPx} from '../../../../../helpers/layoutFoo';

import {
    BigRedBtn,
    BigWhiteBtn,
    CloseBtn,
} from '../../../../../sharedComponents/buttons';
import Filter from './filter';

import {filters, OptionType} from './filtersData';

type PickedFilters = {
    [key: string]: OptionType[];
};

interface IProps {
    onSave: (picked: PickedFilters) => void;
    onClose: () => void;
    definedFilters: PickedFilters;
    showModal?: boolean;
}

const FiltersModal: React.FC<IProps> = ({
    onSave,
    onClose,
    definedFilters,
    showModal,
}: IProps) => {
    const trans: any = I18n.t('MainWorld.maps');
    const [pickedFilters, setPickedFilters] = useState<PickedFilters>({});

    const onSaveFiltersHanlder = (
        filterName: string,
        filtersArr: OptionType[],
    ) => {
        setPickedFilters(prev => ({
            ...prev,
            ...{[filterName]: filtersArr},
        }));
    };

    const onSaveHandler = () => {
        onSave(pickedFilters);
    };

    const onResetHandler = () => {
        setPickedFilters(definedFilters);
    };

    return (
        <Modal
            animationType="slide"
            visible={showModal}
            onRequestClose={onClose}>
            <View style={styles.container}>
                <CloseBtn
                    onPress={onClose}
                    containerStyle={styles.buttonContainer}
                />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.wrap}>
                        <View style={styles.headerWrapper}>
                            <Text style={styles.header}>
                                {trans.filtersTitle}
                            </Text>
                            <Text style={styles.description}>
                                {trans.filtersDescription}
                            </Text>

                            {Object.keys(filters).map(f => (
                                <Filter
                                    key={filters[f].name}
                                    name={filters[f].name}
                                    options={filters[f].options}
                                    predefined={pickedFilters?.[f] || []}
                                    onSave={onSaveFiltersHanlder}
                                />
                            ))}

                            <View style={styles.buttonsWrapper}>
                                <View style={styles.button}>
                                    <BigWhiteBtn
                                        title={trans.filtersBackBtn}
                                        onpress={onResetHandler}
                                    />
                                </View>
                                <View style={styles.button}>
                                    <BigRedBtn
                                        title={trans.filtersSaveBtn}
                                        onpress={onSaveHandler}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    wrap: {
        flex: 1,
        marginHorizontal: getVerticalPx(40),
        marginBottom: getVerticalPx(65),
        justifyContent: 'space-between',
    },
    headerWrapper: {
        marginBottom: 8,
    },
    header: {
        fontFamily: 'DIN2014Narrow-Regular',
        fontSize: 23,
        color: '#313131',
    },
    description: {
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: 18,
        letterSpacing: 0.5,
        color: '#313131',
        marginTop: getVerticalPx(8),
        marginBottom: getVerticalPx(10),
    },
    buttonContainer: {
        alignItems: 'flex-end',
    },
    buttonsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: getVerticalPx(91),
    },
    button: {
        width: '46%',
        height: 50,
    },
});

export default FiltersModal;

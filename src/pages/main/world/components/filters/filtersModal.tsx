import React, {useState} from 'react';
import {
    View,
    Text,
    Modal,
    ScrollView,
    StyleSheet,
    SafeAreaView,
} from 'react-native';

import {I18n} from '../../../../../../I18n/I18n';
import {
    getFontSize,
    getHorizontalPx,
    getVerticalPx,
    mainButtonsHeight,
} from '../../../../../helpers/layoutFoo';
import {useAppSelector} from '../../../../../hooks/redux';
import {PickedFilters} from '../../../../../interfaces/form';

import {
    BigRedBtn,
    BigWhiteBtn,
    CloseBtn,
} from '../../../../../sharedComponents/buttons';
import {mapOptionsAndTagsSelector} from '../../../../../storage/selectors/app';
import Filter from './filter';

import {getFitlers, updateFilters} from './filtersData';

interface IProps {
    onSave: (picked: PickedFilters) => void;
    onClose: () => void;
    definedFilters: PickedFilters;
    showModal?: boolean;
    allowedFilters?: string[];
}

const FiltersModal: React.FC<IProps> = ({
    onSave,
    onClose,
    definedFilters,
    showModal,
    allowedFilters,
}: IProps) => {
    const trans: any = I18n.t('MainWorld.maps');
    const mapOptions = useAppSelector(mapOptionsAndTagsSelector);
    const filters = getFitlers(mapOptions, trans?.filters?.order?.options);
    const contentStyle = allowedFilters ? {minHeight: '90%'} : undefined;

    const [pickedFilters, setPickedFilters] = useState<PickedFilters>({});

    const onSaveFiltersHanlder = (filterName: string, filtersArr: string[]) => {
        setPickedFilters(prev => updateFilters(prev, filterName, filtersArr));
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
            <SafeAreaView>
                <View style={styles.container}>
                    <CloseBtn
                        onPress={onClose}
                        containerStyle={styles.buttonContainer}
                    />
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={contentStyle}>
                        <View style={styles.wrap}>
                            <View style={styles.headerWrapper}>
                                <Text style={styles.header}>
                                    {trans.filtersTitle}
                                </Text>
                                <Text style={styles.description}>
                                    {trans.filtersDescription}
                                </Text>

                                {Object.keys(filters).map(f => {
                                    if (
                                        allowedFilters &&
                                        !allowedFilters.includes(f)
                                    ) {
                                        return null;
                                    }

                                    if (f === 'reactions') {
                                        return;
                                    }

                                    return (
                                        <Filter
                                            key={filters[f]?.name}
                                            name={filters?.[f]?.name}
                                            options={filters[f]?.options}
                                            predefined={
                                                pickedFilters?.[f] || []
                                            }
                                            isRadioType={filters[f].radioType}
                                            onSave={onSaveFiltersHanlder}
                                        />
                                    );
                                })}
                            </View>
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
                    </ScrollView>
                </View>
            </SafeAreaView>
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
        marginHorizontal: getHorizontalPx(40),
        marginBottom: getVerticalPx(65),
        justifyContent: 'space-between',
    },
    headerWrapper: {
        marginBottom: getVerticalPx(8),
    },
    header: {
        fontFamily: 'DIN2014Narrow-Regular',
        fontSize: getFontSize(23),
        color: '#313131',
    },
    description: {
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: getFontSize(18),
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
        height: mainButtonsHeight(50),
    },
});

export default FiltersModal;

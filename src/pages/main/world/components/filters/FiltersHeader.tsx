import CollapsibleStickyHeader from '@components/headers/CollapsibleStickyHeader';
import {
    getFVerticalPx,
    getFHorizontalPx,
} from '@theme/utils/appLayoutDimensions';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolateColor,
} from 'react-native-reanimated';
import {View, StyleSheet, Dimensions} from 'react-native';
import SortButton from '../buttons/SortButton';
import {FiltersButton} from '@pages/main/world/components/buttons';
import {Dropdown} from '@components/dropdown';
import React, {useCallback, useEffect} from 'react';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import colors from '@theme/colors';
import {appContainerHorizontalMargin} from '@theme/commonStyle';
import {DropdownItemT} from '@components/types/dropdown';
import {useAppSelector} from '@src/hooks/redux';
import {mapsActiveFiltersSelector} from '@src/storage/selectors/map';

interface IProps {
    shouldHide: boolean;
    sortButtonName: string;
    setShowDropdown: (val: boolean) => void;
    onFiltersModalOpenHandler: () => void;
    showDropdown: boolean;
    toggleDropdown: (val: boolean) => void;
    onSortByHandler: (val: string | undefined) => void;
    dropdownList: DropdownItemT[];
    mapMode?: string;
}

const FiltersHeader = ({
    shouldHide,
    sortButtonName,
    setShowDropdown,
    onFiltersModalOpenHandler,
    showDropdown,
    toggleDropdown,
    onSortByHandler,
    dropdownList,
    mapMode = '',
}: IProps) => {
    const {t} = useMergedTranslation('MainWorld');
    const filtersActive = useAppSelector(mapsActiveFiltersSelector);
    const backgroundColorProgress = useSharedValue(0);
    const backgroundColorAnimation = useAnimatedStyle(() => ({
        backgroundColor: withTiming(
            interpolateColor(
                backgroundColorProgress.value,
                [0, 1],
                [colors.whiteGrey, colors.white],
            ),
            {duration: 350},
        ),
    }));
    useEffect(() => {
        backgroundColorProgress.value = showDropdown ? 1 : 0;
    }, [showDropdown, backgroundColorProgress]);

    const toggleDropdownHandler = useCallback(
        (state: boolean) => {
            toggleDropdown(state);
        },
        [toggleDropdown],
    );

    return (
        <>
            <CollapsibleStickyHeader
                height={getFVerticalPx(52)}
                shouldHide={shouldHide}>
                <Animated.View
                    style={[styles.filtersWrapper, backgroundColorAnimation]}>
                    <View style={styles.topButtons}>
                        <SortButton
                            title={sortButtonName}
                            onPress={() => setShowDropdown(!showDropdown)}
                            style={styles.topButton}
                        />
                        <FiltersButton
                            onPress={onFiltersModalOpenHandler}
                            style={{
                                ...styles.topButton,
                                ...styles.topButtonRight,
                            }}
                            isFiltersActive={filtersActive[mapMode]}
                        />
                    </View>
                </Animated.View>
            </CollapsibleStickyHeader>
            <View style={styles.topButtonsContainer}>
                <View style={styles.topButtons}>
                    <Dropdown
                        openOnStart={showDropdown}
                        list={dropdownList}
                        onPress={toggleDropdownHandler}
                        onPressItem={onSortByHandler}
                        buttonText={t('btnSort')}
                        buttonContainerStyle={
                            styles.dropdownButtonContainerStyle
                        }
                        boxStyle={styles.dropdownBox}
                        hideButton
                    />
                </View>
            </View>
        </>
    );
};

export default FiltersHeader;

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
    topButtonsContainer: {
        position: 'absolute',
        width: '100%',
        zIndex: 10,
    },
    topButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: appContainerHorizontalMargin,
    },
    topButton: {
        height: getFVerticalPx(48),
        zIndex: 10,
    },
    topButtonLeft: {},
    topButtonRight: {
        position: 'absolute',
        right: 0,
        width: getFHorizontalPx(70),
    },
    dropdownButtonContainerStyle: {
        justifyContent: 'flex-start',
    },
    dropdownBox: {
        width: width,
        marginHorizontal: 0,
        position: 'absolute',
        top: getFVerticalPx(42),
        left: -appContainerHorizontalMargin,
    },
    filtersWrapper: {
        width: '100%',
        height: '100%',
    },
});

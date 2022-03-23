import React, {Ref, useMemo} from 'react';
import {
    View,
    Pressable,
    ScrollView,
    StyleSheet,
    Dimensions,
} from 'react-native';
import colors from '@theme/colors';
import {Demi18h28} from '@components/texts/texts';
import {IconButton, PrimaryButton, SecondaryButton} from '@components/buttons';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import RangePicker, {RangePickerRef} from '@components/slider/RangePicker';
import {Switch} from '@components/inputs';
import Filter from '@pages/main/world/components/filters/filter';
import LinearGradient from 'react-native-linear-gradient';
import {
    getFVerticalPx,
    getFHorizontalPx,
} from '@theme/utils/appLayoutDimensions';
import {getHorizontalPx, getVerticalPx} from '@helpers/layoutFoo';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {FiltersI} from '@pages/main/world/components/filters/filtersData';
import {PickedFilters} from '@interfaces/form';
import {BackdropModal} from '@components/modals';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface IProps {
    showModal: boolean;
    onClose: () => void;
    onResetHandler: () => void;
    lengthOptions: string[];
    minLength: string;
    maxLength: string;
    handleRangeChange: (low: string, high: string) => void;
    isLoop: boolean;
    setIsLoop: (val: boolean) => void;
    isMyPublic: boolean;
    setIsMyPublic: (val: boolean) => void;
    rangePickerRef?: Ref<RangePickerRef | undefined>;
    allowMyPublic: boolean;
    onSaveHandler: () => void;
    isDirty: boolean;
    itemsCount?: number;
    filters: FiltersI;
    allowedFilters?: string[];
    pickedFilters: PickedFilters;
    onSaveFiltersHandler: (filterName: string, filtersArr: string[]) => void;
}

const {height: screenHeight} = Dimensions.get('window');

const FiltersContainer: React.FC<IProps> = ({
    showModal,
    onClose,
    onResetHandler,
    lengthOptions,
    minLength,
    maxLength,
    handleRangeChange,
    isLoop,
    setIsLoop,
    isMyPublic,
    setIsMyPublic,
    rangePickerRef,
    allowMyPublic,
    onSaveHandler,
    isDirty,
    filters,
    itemsCount,
    allowedFilters,
    pickedFilters,
    onSaveFiltersHandler,
}) => {
    const {t} = useMergedTranslation('MainWorld.maps');
    const {top} = useSafeAreaInsets();
    const itemsCountText = useMemo(
        () =>
            itemsCount !== undefined
                ? ` (${itemsCount} ${t('filtersItemCount', {
                      count: itemsCount,
                  })})`
                : '',
        [t, itemsCount],
    );
    return (
        <>
            <BackdropModal
                animationType={'fade'}
                visible={showModal}
                onRequestClose={onClose}
                transparent
                testID={'filters-container-modal'}>
                <View style={styles.header}>
                    <View style={styles.spacedRow}>
                        <View style={styles.headerText}>
                            <Demi18h28>{t('filtersTitle')}</Demi18h28>
                        </View>
                        <IconButton
                            icon={MykrossIconFont.MYKROSS_ICON_EXIT}
                            onPress={onClose}
                            iconColor={colors.black}
                            style={styles.closeButton}
                            testID={'filters-container-close-button'}
                        />
                        <Pressable
                            onPress={onResetHandler}
                            testID={'filters-container-clear-button'}>
                            <Demi18h28 style={styles.clearText}>
                                {t('filtersClear')}
                            </Demi18h28>
                        </Pressable>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={true}>
                    <View style={styles.wrap}>
                        <View style={styles.spacedRow}>
                            <Demi18h28>{t('length')}</Demi18h28>
                            <Demi18h28>{`${minLength} - ${maxLength} km`}</Demi18h28>
                        </View>
                        <RangePicker
                            options={lengthOptions}
                            onValueChange={handleRangeChange}
                            ref={rangePickerRef}
                            initLow={minLength}
                            initHigh={maxLength}
                        />
                        <View style={[styles.spacedRow, styles.loop]}>
                            <Demi18h28>{t('loop')}</Demi18h28>
                            <Switch
                                value={isLoop}
                                onValueChange={setIsLoop}
                                testID={'filters-container-loop-switch'}
                            />
                        </View>
                        {allowMyPublic && (
                            <View style={[styles.spacedRow, styles.myPublic]}>
                                <Demi18h28>{t('myPublic')}</Demi18h28>
                                <Switch
                                    value={isMyPublic}
                                    onValueChange={setIsMyPublic}
                                    testID={
                                        'filters-container-my-public-switch'
                                    }
                                />
                            </View>
                        )}
                        <View style={styles.headerWrapper}>
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
                                        predefined={pickedFilters?.[f] || []}
                                        isRadioType={filters[f].radioType}
                                        onSave={onSaveFiltersHandler}
                                    />
                                );
                            })}
                        </View>
                    </View>
                </ScrollView>
                <LinearGradient
                    colors={[`${colors.white}00`, colors.white]}
                    style={[
                        styles.buttonWrapper,
                        {top: screenHeight - top - getFVerticalPx(128)},
                    ]}>
                    {isDirty ? (
                        <PrimaryButton
                            text={`${t('filtersSaveBtn')}` + itemsCountText}
                            onPress={onSaveHandler}
                            testID={'filters-container-save-button'}
                        />
                    ) : (
                        <SecondaryButton
                            text={t('filtersShowAllBtn')}
                            onPress={onSaveHandler}
                            testID={'filters-container-show-all-button'}
                        />
                    )}
                </LinearGradient>
            </BackdropModal>
        </>
    );
};

export default FiltersContainer;

const styles = StyleSheet.create({
    spacedRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    closeButton: {
        backgroundColor: 'transparent',
    },
    header: {
        paddingTop: getFVerticalPx(18),
        position: 'relative',
    },
    headerText: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    clearText: {
        color: colors.red,
        paddingRight: getHorizontalPx(14),
    },
    wrap: {
        flex: 1,
        marginHorizontal: getHorizontalPx(14),
        marginBottom: getFVerticalPx(150),
        marginTop: getFVerticalPx(20),
        justifyContent: 'space-between',
    },
    headerWrapper: {
        marginBottom: getVerticalPx(8),
    },
    loop: {
        marginTop: getFVerticalPx(32),
    },
    myPublic: {
        marginTop: getFVerticalPx(32),
    },
    buttonWrapper: {
        height: getFVerticalPx(128),
        width: '100%',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    filterButton: {
        width: getFHorizontalPx(302),
        height: getFVerticalPx(48),
        left: getFHorizontalPx(44),
    },
});

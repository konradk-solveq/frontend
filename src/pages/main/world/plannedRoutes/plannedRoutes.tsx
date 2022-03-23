import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, FlatList} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {
    userNameSelector,
    favouritesMapsSelector,
    loadingMapsSelector,
    refreshMapsSelector,
    selectorMapTypeEnum,
} from '@storage/selectors';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {Map} from '@models/map.model';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {getVerticalPx} from '@helpers/layoutFoo';
import {getImagesThumbs} from '@utils/transformData';
import useInfiniteScrollLoadMore from '@hooks/useInfiniteScrollLoadMore';

import Loader from '@pages/onboarding/bikeAdding/loader/loader';
import {Loader as NativeLoader} from '@components/loader';
import ShowMoreModal from '../components/showMoreModal/showMoreModal';
import EmptyList from './emptyList';
import {Dropdown} from '@components/dropdown';
import {Backdrop} from '@components/backdrop';
import SortButton from '../components/buttons/SortButton';
import {RoutesMapButton} from '@pages/main/world/components/buttons';
import {useAppNavigation} from '@navigation/hooks/useAppNavigation';

import styles from './style';
import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';
import {
    nextPlannedPaginationCoursor,
    mapsCountSelector,
} from '@storage/selectors/map';
import {fetchPlannedMapsList, fetchPlannedMapsCount} from '@storage/actions';
import {
    checkIfContainsFitlers,
    getSorByFilters,
} from '@utils/apiDataTransform/filters';
import {PickedFilters} from '@interfaces/form';
import FiltersModal from '@pages/main/world/components/filters/filtersModal';
import {FiltersButton} from '@pages/main/world/components/buttons';
import {plannedRoutesDropdownList} from '../utils/dropdownLists';
import ListTile from '@pages/main/world/components/listTile';
import {resetMapsCount} from '@storage/actions/maps';
import {Header2} from '@components/texts/texts';

const getItemLayout = (_: any, index: number) => ({
    length: getVerticalPx(175),
    offset: getVerticalPx(175) * index,
    index,
});

interface RenderItem {
    item: Map;
    index: number;
}

interface IProps {}
const PlannedRoutes: React.FC<IProps> = ({}: IProps) => {
    const {t} = useMergedTranslation('MainWorld.PlannedRoutes');
    const {t: mwt} = useMergedTranslation('MainWorld');
    const navigation = useAppNavigation();
    const nextCoursor = useAppSelector(nextPlannedPaginationCoursor);
    const dispatch = useAppDispatch();
    const userName = useAppSelector(userNameSelector);
    const favouriteMaps = useAppSelector(favouritesMapsSelector);
    const isLoading = useAppSelector(loadingMapsSelector);
    const isRefreshing = useAppSelector(refreshMapsSelector);
    const {planned: plannedMapsCount} = useAppSelector(mapsCountSelector);

    const {bottom} = useSafeAreaInsets();
    /**
     * Navigate to map button bottom position modifier
     */
    const bottomPosition = useMemo(
        () => ({bottom: getFVerticalPx(129) - bottom}),
        [bottom],
    );

    const [showModal, setShowModal] = useState(false);
    const [activeMapID, setActiveMapID] = useState<string>('');

    const {onLoadMoreHandler} = useInfiniteScrollLoadMore(
        favouriteMaps?.length,
    );

    const [showFiltersModal, setShowFiltersModal] = useState(false);
    const [savedMapFilters, setSavedMapFilters] = useState<PickedFilters>({});

    /**
     * Shows list loader when filters changed.
     */
    const [showListLoader, setShowListLoader] = useState(false);
    const onRefresh = useCallback(
        () => dispatch(fetchPlannedMapsList(undefined, savedMapFilters)),
        [dispatch, savedMapFilters],
    );
    const onLoadMore = useCallback(
        () => dispatch(fetchPlannedMapsList(nextCoursor, savedMapFilters)),
        [dispatch, nextCoursor, savedMapFilters],
    );
    const onGetFiltersCount = useCallback(
        filters => dispatch(fetchPlannedMapsCount(filters)),
        [dispatch],
    );
    const onResetFiltersCount = useCallback(() => dispatch(resetMapsCount()), [
        dispatch,
    ]);

    useEffect(() => {
        const isValid = checkIfContainsFitlers(savedMapFilters);
        if (isValid) {
            const fetch = async () => {
                await dispatch(
                    fetchPlannedMapsList(undefined, savedMapFilters),
                );
                setShowListLoader(false);
            };
            fetch();
            return;
        }
    }, [dispatch, savedMapFilters]);

    const onFiltersModalOpenHandler = () => {
        setShowFiltersModal(true);
    };
    const onFiltersModalCloseHandler = () => {
        setShowFiltersModal(false);
    };

    const onFiltersSaveHandler = (picked: PickedFilters) => {
        setShowFiltersModal(false);
        setShowListLoader(true);
        setSavedMapFilters({...picked});
    };

    const onPressHandler = (state: boolean, mapID?: string) => {
        setShowModal(state);
        if (mapID) {
            setActiveMapID(mapID);
        }
    };

    const emptyListButtonHandler = () => {
        navigation.navigate('WorldBikeMap');
    };

    const onPressTileHandler = (mapID?: string) => {
        /**
         * Nearest point to user's position
         */
        const nearestPoint = favouriteMaps.find(md => md.id === mapID)
            ?.nearestPoint;

        navigation.navigate('RoutesMap', {
            mapID: mapID,
            nearestPoint: nearestPoint,
            private: false,
            favourite: true,
        });
    };

    const onEndReachedHandler = useCallback(() => {
        if (!isLoading && !isRefreshing) {
            onLoadMoreHandler(onLoadMore);
        }
    }, [isLoading, isRefreshing, onLoadMoreHandler, onLoadMore]);

    const renderItem = ({item, index}: RenderItem) => {
        const lastItemStyle =
            index === favouriteMaps?.length - 1 ? styles.lastTile : undefined;
        const images = getImagesThumbs(item?.pictures);
        return (
            <View key={item.id} style={lastItemStyle}>
                <ListTile
                    mapData={item}
                    images={images}
                    onPress={onPressHandler}
                    onPressTile={onPressTileHandler}
                    mode={'saved'}
                    tilePressable
                />
            </View>
        );
    };

    const [showBackdrop, setShowBackdrop] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [sortButtonName, setSortButtonName] = useState<string>(
        mwt('btnSort'),
    );

    const toggleDropdown = useCallback((state: boolean) => {
        setShowBackdrop(state);
        setShowDropdown(state);
    }, []);

    const changeSortButtonName = useCallback((buttoName?: string) => {
        if (buttoName) {
            setSortButtonName(buttoName);
        }
    }, []);

    const onSortByHandler = useCallback(
        (sortTypeId?: string) => {
            const firstEl = plannedRoutesDropdownList[0];
            const sortBy =
                plannedRoutesDropdownList.find(el => el.id === sortTypeId) ||
                firstEl;
            changeSortButtonName(sortTypeId ? sortBy?.text : mwt('btnSort'));
            setShowListLoader(true);

            setSavedMapFilters(prev => getSorByFilters(prev, sortBy));
        },
        [changeSortButtonName, mwt],
    );

    if (!favouriteMaps?.length) {
        return <EmptyList onPress={emptyListButtonHandler} />;
    }

    const renderListLoader = () => {
        if (!showListLoader && isLoading && favouriteMaps.length > 3) {
            return (
                <View style={styles.loaderContainer}>
                    <Loader />
                </View>
            );
        }

        if (isLoading && showListLoader) {
            return (
                <View style={styles.listBodyLoader}>
                    <NativeLoader />
                </View>
            );
        }

        return null;
    };

    return (
        <View style={styles.background}>
            <ShowMoreModal
                showModal={showModal}
                removeFav
                mapID={activeMapID}
                onPressCancel={() => onPressHandler(false)}
                backdropStyle={styles.backdrop}
                isPublished /* Planned maps can be picked from [published only (by default) */
                mapType={selectorMapTypeEnum.favourite}
            />
            <FiltersModal
                onClose={onFiltersModalCloseHandler}
                definedFilters={savedMapFilters}
                onSave={onFiltersSaveHandler}
                showModal={showFiltersModal}
                onGetFiltersCount={onGetFiltersCount}
                onResetFiltersCount={onResetFiltersCount}
                itemsCount={plannedMapsCount}
            />
            <View style={styles.topButtonsContainer}>
                <Dropdown
                    openOnStart={showDropdown}
                    list={plannedRoutesDropdownList}
                    onPress={toggleDropdown}
                    onPressItem={onSortByHandler}
                    buttonText={mwt('btnSort')}
                    buttonContainerStyle={styles.dropdownButtonContainerStyle}
                    boxStyle={styles.dropdownBox}
                    resetButtonText={mwt('resetFilters')}
                    hideButton
                />
            </View>
            <View>
                <FlatList
                    keyExtractor={item => item.id}
                    ListHeaderComponent={
                        <>
                            <View style={styles.topButtonsContainer}>
                                <SortButton
                                    title={sortButtonName}
                                    onPress={() => setShowDropdown(true)}
                                    style={styles.topButton}
                                />
                                <FiltersButton
                                    onPress={onFiltersModalOpenHandler}
                                    style={{
                                        ...styles.topButton,
                                        ...styles.topButtonRight,
                                    }}
                                />
                            </View>
                            <Header2 style={styles.header}>
                                {userName || t('defaultUserName')}
                                {t('title')}
                            </Header2>
                        </>
                    }
                    data={!showListLoader ? favouriteMaps : []}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    getItemLayout={getItemLayout}
                    initialNumToRender={10}
                    removeClippedSubviews
                    onEndReached={onEndReachedHandler}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={renderListLoader}
                    refreshing={isLoading && isRefreshing}
                    onRefresh={onRefresh}
                />
            </View>

            <Backdrop
                isVisible={showBackdrop}
                style={styles.fullscreenBackdrop}
            />
            <RoutesMapButton
                onPress={() => navigation.navigate('RoutesMap')}
                style={{...styles.mapBtn, ...bottomPosition}}
            />
        </View>
    );
};

export default PlannedRoutes;

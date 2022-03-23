import React, {useCallback, useEffect, useState, useMemo} from 'react';
import {View, FlatList, Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Map} from '@models/map.model';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {getVerticalPx} from '@helpers/layoutFoo';
import {getImagesThumbs} from '@utils/transformData';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {
    featuredMapsLengthSelector,
    loadingMapsSelector,
    mapsListSelector,
    nextPaginationCoursor,
    refreshMapsSelector,
    selectorMapTypeEnum,
    mapsCountSelector,
} from '@storage/selectors/map';
import useInfiniteScrollLoadMore from '@hooks/useInfiniteScrollLoadMore';

import Loader from '@sharedComponents/loader/loader';
import {Loader as NativeLoader} from '@components/loader';

import ShowMoreModal from '../components/showMoreModal/showMoreModal';
import {Dropdown} from '@components/dropdown';
import {Backdrop} from '@components/backdrop';
import SortButton from '../components/buttons/SortButton';
import {RoutesMapButton} from '@pages/main/world/components/buttons';
import {useAppNavigation} from '@navigation/hooks/useAppNavigation';

import styles from './style';
import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';
import ListTile from '@pages/main/world/components/listTile';
import {fetchMapsList} from '@storage/actions';
import FiltersModal from '@pages/main/world/components/filters/filtersModal';
import {PickedFilters} from '@interfaces/form';
import {
    checkIfContainsFitlers,
    getSorByFilters,
} from '@utils/apiDataTransform/filters';
import {FiltersButton} from '@pages/main/world/components/buttons';
import FeaturedRoutes from '@pages/main/world/featuredRoutes/FeaturedRoutesList/FeaturedRoutes';
import {publicRoutesDropdownList} from '@pages/main/world/utils/dropdownLists';
import {fetchMapsCount} from '@storage/actions';
import {resetMapsCount} from '@storage/actions/maps';
import {Header2} from '@components/texts/texts';

const isIOS = Platform.OS === 'ios';

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
const BikeMap: React.FC<IProps> = ({}: IProps) => {
    const {t} = useMergedTranslation('MainWorld');
    const navigation = useAppNavigation();
    const nextCoursor = useAppSelector(nextPaginationCoursor);
    const dispatch = useAppDispatch();
    const mapsData = useAppSelector(mapsListSelector);
    const {public: publicMapsCount} = useAppSelector(mapsCountSelector);
    const isLoading = useAppSelector(loadingMapsSelector);
    const isRefreshing = useAppSelector(refreshMapsSelector);
    const containsFeaturedMaps = useAppSelector(featuredMapsLengthSelector);

    const {bottom} = useSafeAreaInsets();
    /**
     * Navigate to map button bottom position modifier
     */
    const bottomPosition = useMemo(
        () => ({bottom: getFVerticalPx(129) - bottom}),
        [bottom],
    );

    const [showModal, setShowModal] = useState(false);
    const [showFiltersModal, setShowFiltersModal] = useState(false);
    const [savedMapFilters, setSavedMapFilters] = useState<PickedFilters>({});
    const [activeMapID, setActiveMapID] = useState<string>('');
    const {onLoadMoreHandler} = useInfiniteScrollLoadMore(mapsData?.length);

    /**
     * Shows list loader when filters changed.
     */
    const [showListLoader, setShowListLoader] = useState(false);
    const listBodyLoaderStyle = useMemo(
        () => (containsFeaturedMaps > 0 ? '25%' : '75%'),
        [containsFeaturedMaps],
    );
    const onRefresh = useCallback(
        () => dispatch(fetchMapsList(undefined, savedMapFilters)),
        [dispatch, savedMapFilters],
    );
    const onLoadMore = useCallback(
        () => dispatch(fetchMapsList(nextCoursor, savedMapFilters)),
        [dispatch, nextCoursor, savedMapFilters],
    );
    const onGetFiltersCount = useCallback(
        filters => dispatch(fetchMapsCount(filters)),
        [dispatch],
    );
    const onResetFiltersCount = useCallback(() => dispatch(resetMapsCount()), [
        dispatch,
    ]);

    useEffect(() => {
        const isValid = checkIfContainsFitlers(savedMapFilters);
        if (isValid) {
            const fetch = async () => {
                await dispatch(fetchMapsList(undefined, savedMapFilters));
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

    const onPressTileHandler = useCallback(
        (mapID?: string) => {
            /**
             * Nearest point to user's position
             */
            const nearestPoint = mapsData.find(md => md.id === mapID)
                ?.nearestPoint;

            navigation.navigate('RoutesMap', {
                mapID: mapID,
                nearestPoint: nearestPoint,
                private: false,
            });
        },
        [navigation, mapsData],
    );

    const onEndReachedHandler = useCallback(() => {
        if (!isLoading && !isRefreshing) {
            onLoadMoreHandler(onLoadMore);
        }
    }, [isLoading, isRefreshing, onLoadMoreHandler, onLoadMore]);

    const onRefreshHandler = useCallback(() => {
        if (!isLoading && !isRefreshing && mapsData?.length > 1) {
            onRefresh();
        }
    }, [isLoading, isRefreshing, mapsData?.length, onRefresh]);

    const renderItem = useCallback(
        ({item, index}: RenderItem) => {
            const lastItemStyle =
                index === mapsData?.length - 1 ? styles.lastTile : undefined;
            const images = getImagesThumbs(item?.pictures);
            return (
                <View key={item.id} style={lastItemStyle}>
                    <ListTile
                        mapData={item}
                        images={images}
                        onPress={onPressHandler}
                        onPressTile={onPressTileHandler}
                        mode={'public'}
                        tilePressable
                    />
                </View>
            );
        },
        [mapsData?.length, onPressTileHandler],
    );

    const renderListLoader = useCallback(() => {
        if (!showListLoader && isLoading && mapsData.length > 3) {
            return (
                <View style={styles.loaderContainer}>
                    <Loader />
                </View>
            );
        }

        if (isLoading && showListLoader) {
            return (
                <View style={{marginTop: listBodyLoaderStyle}}>
                    <NativeLoader />
                </View>
            );
        }

        return null;
    }, [isLoading, mapsData?.length, showListLoader, listBodyLoaderStyle]);

    const [showBackdrop, setShowBackdrop] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [sortButtonName, setSortButtonName] = useState<string>(t('btnSort'));

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
            const firstEl = publicRoutesDropdownList[0];
            const sortBy =
                publicRoutesDropdownList.find(el => el.id === sortTypeId) ||
                firstEl;

            changeSortButtonName(sortTypeId ? sortBy?.text : t('btnSort'));
            setShowListLoader(true);

            setSavedMapFilters(prev => getSorByFilters(prev, sortBy));
        },
        [changeSortButtonName, t],
    );

    return (
        <View style={styles.background}>
            <ShowMoreModal
                showModal={showModal}
                mapID={activeMapID}
                onPressCancel={() => onPressHandler(false)}
                backdropStyle={styles.backdrop}
                isPublished
                mapType={selectorMapTypeEnum.regular}
            />
            <FiltersModal
                onClose={onFiltersModalCloseHandler}
                definedFilters={savedMapFilters}
                onSave={onFiltersSaveHandler}
                showModal={showFiltersModal}
                onGetFiltersCount={onGetFiltersCount}
                onResetFiltersCount={onResetFiltersCount}
                itemsCount={publicMapsCount}
            />
            <View style={styles.topButtonsContainer}>
                <Dropdown
                    openOnStart={showDropdown}
                    list={publicRoutesDropdownList}
                    onPress={toggleDropdown}
                    onPressItem={onSortByHandler}
                    buttonText={t('btnSort')}
                    buttonContainerStyle={styles.dropdownButtonContainerStyle}
                    boxStyle={styles.dropdownBox}
                    hideButton
                />
            </View>
            {mapsData?.length ? (
                <FlatList
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
                            <FeaturedRoutes key={mapsData?.length} />
                            <Header2 style={styles.header}>
                                {t('BikeMap.title')}
                            </Header2>
                        </>
                    }
                    keyExtractor={item => item.id}
                    data={!showListLoader ? mapsData : []}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    getItemLayout={getItemLayout}
                    initialNumToRender={mapsData?.length || 10}
                    removeClippedSubviews={!isIOS}
                    onEndReached={onEndReachedHandler}
                    onEndReachedThreshold={0.2}
                    ListFooterComponent={renderListLoader}
                    refreshing={isLoading && isRefreshing}
                    onRefresh={onRefreshHandler}
                />
            ) : null}

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

export default React.memo(BikeMap);

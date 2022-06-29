import React, {useCallback, useEffect, useState, useMemo} from 'react';
import {
    View,
    FlatList,
    NativeSyntheticEvent,
    NativeScrollEvent,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';

import {Map} from '@models/map.model';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
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
    publicMapsListErrorSelector,
} from '@storage/selectors/map';
import useInfiniteScrollLoadMore from '@hooks/useInfiniteScrollLoadMore';

import {Loader as NativeLoader} from '@components/loader';

import ShowMoreModal from '../components/showMoreModal/showMoreModal';
import {Backdrop} from '@components/backdrop';
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
import FeaturedRoutes from '@pages/main/world/featuredRoutes/FeaturedRoutesList/FeaturedRoutes';
import {
    getPublicRoutesDropdownList,
    getPublicRoutesNoLocationDropdownList,
} from '@pages/main/world/utils/dropdownLists';
import {fetchMapsCount} from '@storage/actions';
import {resetMapsCount} from '@storage/actions/maps';
import {Header2} from '@components/texts/texts';
import {useHideOnScrollDirection} from '@hooks/useHideOnScrollDirection';
import FiltersHeader from '@pages/main/world/components/filters/FiltersHeader';
import InfiniteScrollError from '@components/error/InfiniteScrollError';

import {isIOS} from '@utils/platform';
import {globalLocationSelector} from '@storage/selectors/app';
import useCheckLocationType from '@hooks/staticLocationProvider/useCheckLocationType';
import UnifiedLocationNotification from '../../../../notifications/UnifiedLocationNotification';
import useForegroundLocationMapRefresh from '@hooks/useForegroundLocationMapRefresh';

const length = getFVerticalPx(311);
const getItemLayout = (_: any, index: number) => ({
    length: length,
    offset: length * index,
    index,
});

interface RenderItem {
    item: Map;
    index: number;
}

interface IProps {}
const BikeMap: React.FC<IProps> = ({}: IProps) => {
    const {t} = useMergedTranslation('MainWorld');
    const isTabFocused = useIsFocused();

    const navigation = useAppNavigation();
    const nextCoursor = useAppSelector(nextPaginationCoursor);
    const dispatch = useAppDispatch();
    const mapsData = useAppSelector(mapsListSelector);
    const {public: publicMapsCount} = useAppSelector(mapsCountSelector);
    const isLoading = useAppSelector(loadingMapsSelector);
    const isRefreshing = useAppSelector(refreshMapsSelector);
    const containsFeaturedMaps = useAppSelector(featuredMapsLengthSelector);
    const {permissionGranted, permissionResult} = useCheckLocationType();
    const location = useAppSelector(globalLocationSelector);
    const publicRoutesDropdownList = useMemo(
        () =>
            (permissionGranted || !permissionResult) && location
                ? getPublicRoutesDropdownList(t)
                : getPublicRoutesNoLocationDropdownList(t),
        [permissionGranted, permissionResult, location, t],
    );
    const listError = useAppSelector(publicMapsListErrorSelector)?.error;

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
     * Render FlatList after other components have been renderedl
     */
    const [renderIsFinished, setRenderIsFinished] = useState(false);

    /**
     * Shows list loader when filters changed.
     */
    const [showListLoader, setShowListLoader] = useState(false);
    const {onScroll, shouldHide} = useHideOnScrollDirection();

    const [showBackdrop, setShowBackdrop] = useState(false);

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

    useForegroundLocationMapRefresh(setShowListLoader, onRefresh);

    const onErrorScrollHandler = useCallback(
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            if (
                listError &&
                !isLoading &&
                event.nativeEvent.contentOffset.y >
                    getItemLayout(undefined, mapsData.length - 1).offset
            ) {
                onLoadMore();
            }
        },
        [mapsData.length, isLoading, listError, onLoadMore],
    );

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
        if (!isLoading && !isRefreshing && nextCoursor) {
            onLoadMoreHandler(onLoadMore);
        }
    }, [isLoading, isRefreshing, onLoadMoreHandler, onLoadMore, nextCoursor]);

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
                        hideDistanceToStart={!location || !permissionGranted}
                    />
                </View>
            );
        },
        [location, mapsData?.length, onPressTileHandler, permissionGranted],
    );

    const renderListFooter = useCallback(() => {
        if (!showListLoader && mapsData.length > 3) {
            if (isLoading) {
                return (
                    <View style={styles.loaderContainer}>
                        <NativeLoader />
                    </View>
                );
            }
            if (listError) {
                return (
                    <View style={styles.loaderContainer}>
                        <InfiniteScrollError />
                    </View>
                );
            }
        }

        if (isLoading && showListLoader) {
            return (
                <View style={{marginTop: listBodyLoaderStyle}}>
                    <NativeLoader />
                </View>
            );
        }

        return null;
    }, [
        showListLoader,
        mapsData.length,
        isLoading,
        listError,
        listBodyLoaderStyle,
    ]);

    const [showDropdown, setShowDropdown] = useState(false);
    const [sortButtonName, setSortButtonName] = useState<string>('');
    const sButtonName = useMemo(() => sortButtonName || t('btnSort'), [
        sortButtonName,
        t,
    ]);

    const toggleDropdown = useCallback((state: boolean) => {
        setShowBackdrop(state);
        setShowDropdown(state);
    }, []);

    /**
     * Dismiss sort dropdown when user navigates to other tab.
     */
    useEffect(() => {
        if (!isTabFocused) {
            toggleDropdown(false);
        }
    }, [isTabFocused, toggleDropdown]);

    const onSortByHandler = useCallback(
        (sortTypeId?: string) => {
            const firstEl = publicRoutesDropdownList[0];
            const sortBy =
                publicRoutesDropdownList.find(el => el.id === sortTypeId) ||
                firstEl;

            setSortButtonName(sortTypeId ? sortBy?.text : '');
            setShowListLoader(true);

            setSavedMapFilters(prev => getSorByFilters(prev, sortBy));
        },
        [publicRoutesDropdownList],
    );
    return (
        <View
            style={styles.background}
            onLayout={() => setRenderIsFinished(true)}>
            <FiltersHeader
                shouldHide={shouldHide}
                sortButtonName={sButtonName}
                setShowDropdown={toggleDropdown}
                onFiltersModalOpenHandler={onFiltersModalOpenHandler}
                showDropdown={showDropdown}
                toggleDropdown={toggleDropdown}
                onSortByHandler={onSortByHandler}
                dropdownList={publicRoutesDropdownList}
                mapMode={'public'}
            />
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
                mapMode={'public'}
            />
            {mapsData?.length && renderIsFinished ? (
                <FlatList
                    onScroll={onScroll}
                    onMomentumScrollEnd={onErrorScrollHandler}
                    ListHeaderComponent={
                        <View style={styles.listHeader}>
                            <UnifiedLocationNotification
                                style={styles.notification}
                            />
                            <FeaturedRoutes />
                            <Header2 style={styles.header}>
                                {t('BikeMap.title')}
                            </Header2>
                        </View>
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
                    ListFooterComponent={renderListFooter}
                    refreshing={isLoading && isRefreshing}
                    onRefresh={onRefreshHandler}
                />
            ) : null}

            <Backdrop
                isVisible={showBackdrop}
                onPress={() => toggleDropdown(false)}
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

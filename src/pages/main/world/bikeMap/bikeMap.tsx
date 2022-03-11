import React, {useCallback, useEffect, useState, useMemo} from 'react';
import {View, Text, FlatList, Platform} from 'react-native';

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
} from '@storage/selectors/map';
import useInfiniteScrollLoadMore from '@hooks/useInfiniteScrollLoadMore';

import Loader from '@sharedComponents/loader/loader';
import {Loader as NativeLoader} from '@components/loader';

import FirstTile from '../components/tiles/firstTile';
import NextTile from '../components/tiles/nextTile';
import ShowMoreModal from '../components/showMoreModal/showMoreModal';
import {Dropdown} from '@components/dropdown';
import {Backdrop} from '@components/backdrop';
import SortButton from '../components/buttons/SortButton';
import {RoutesMapButton} from '@pages/main/world/components/buttons';
import {useAppNavigation} from '@navigation/hooks/useAppNavigation';

import styles from './style';
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
    const isLoading = useAppSelector(loadingMapsSelector);
    const isRefreshing = useAppSelector(refreshMapsSelector);
    const containsFeaturedMaps = useAppSelector(featuredMapsLengthSelector);

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
        () => (containsFeaturedMaps > 0 ? '25%' : '50%'),
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
        setSavedMapFilters(picked);
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
            const images = getImagesThumbs(item?.images || []);
            if (index === 0) {
                return (
                    <View style={styles.tileWrapper}>
                        <FirstTile
                            mapData={item}
                            images={images}
                            onPress={onPressHandler}
                            onPressTile={onPressTileHandler}
                            tilePressable
                        />
                    </View>
                );
            }
            return (
                <View key={item.id} style={[styles.tileWrapper, lastItemStyle]}>
                    <NextTile
                        mapData={item}
                        images={images}
                        onPress={onPressHandler}
                        onPressTile={onPressTileHandler}
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
        <>
            {mapsData?.length ? (
                <>
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
                    />
                    <View style={styles.topButtonsContainer}>
                        <Dropdown
                            openOnStart={showDropdown}
                            list={publicRoutesDropdownList}
                            onPress={toggleDropdown}
                            onPressItem={onSortByHandler}
                            buttonText={t('btnSort')}
                            buttonContainerStyle={
                                styles.dropdownButtonContainerStyle
                            }
                            boxStyle={styles.dropdownBox}
                            hideButton
                        />
                    </View>
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
                                <Text style={styles.header}>
                                    {t('BikeMap.title')}
                                </Text>
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
                </>
            ) : null}

            <Backdrop
                isVisible={showBackdrop}
                style={styles.fullscreenBackdrop}
            />

            <RoutesMapButton
                onPress={() => navigation.navigate('RoutesMap')}
                style={styles.mapBtn}
            />
        </>
    );
};

export default React.memo(BikeMap);

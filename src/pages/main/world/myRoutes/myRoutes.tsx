import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
    View,
    FlatList,
    NativeSyntheticEvent,
    NativeScrollEvent,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {
    userNameSelector,
    loadingMapsSelector,
    privateMapsListSelector,
    privateTotalMapsNumberSelector,
    refreshMapsSelector,
    privateMapsListErrorSelector,
} from '@storage/selectors';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {Map} from '@models/map.model';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import useInfiniteScrollLoadMore from '@hooks/useInfiniteScrollLoadMore';
import {getImagesThumbs} from '@utils/transformData';

import {Loader as NativeLoader} from '@components/loader';
import {useAppNavigation} from '@navigation/hooks/useAppNavigation';
import {RouteDetailsActionT} from '@type/screens/routesMap';

import {getFVerticalPx, getFFontSize} from '@theme/utils/appLayoutDimensions';
import {Backdrop} from '@components/backdrop';
import styles from './style';
import {
    nextPrivatePaginationCoursor,
    mapsCountSelector,
} from '@storage/selectors/map';
import {fetchPrivateMapsList, fetchPrivateMapsCount} from '@storage/actions';
import {
    checkIfContainsFitlers,
    getSorByFilters,
} from '@utils/apiDataTransform/filters';
import {PickedFilters} from '@interfaces/form';
import FiltersModal from '@pages/main/world/components/filters/filtersModal';
import {RoutesMapButton} from '@pages/main/world/components/buttons';
import {getPrivateRoutesDropdownList} from '../utils/dropdownLists';
import ListTile from '@pages/main/world/components/listTile';
import {removePrivateMapMetaData, resetMapsCount} from '@storage/actions/maps';
import {Header2} from '@components/texts/texts';
import {MoreActionsModal} from '@pages/main/world/components/modals';
import FiltersHeader from '@pages/main/world/components/filters/FiltersHeader';
import {useHideOnScrollDirection} from '@hooks/useHideOnScrollDirection';
import EmptyStateContainer from '@containers/World/EmptyStateContainer';
import {FinishLine} from '@components/svg';
import InfiniteScrollError from '@components/error/InfiniteScrollError';

/**
 * My route tiles have additional text with date above the tile
 */

const length = getFVerticalPx(311) + getFFontSize(48);
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
const MyRoutes: React.FC<IProps> = ({}: IProps) => {
    const {t} = useMergedTranslation('MainWorld.MyRoutes');
    const {t: mwt} = useMergedTranslation('MainWorld');
    const navigation = useAppNavigation();
    const nextCoursor = useAppSelector(nextPrivatePaginationCoursor);
    const dispatch = useAppDispatch();
    const userName = useAppSelector(userNameSelector);
    const privateMaps = useAppSelector<Map[]>(privateMapsListSelector);
    const totalNumberOfPrivateMaps = useAppSelector(
        privateTotalMapsNumberSelector,
    );
    const privateRoutesDropdownList = useMemo(
        () => getPrivateRoutesDropdownList(t),
        [t],
    );
    const listError = useAppSelector(privateMapsListErrorSelector)?.error;
    const {bottom} = useSafeAreaInsets();
    /**
     * Navigate to map button bottom position modifier
     */
    const bottomPosition = useMemo(
        () => ({bottom: getFVerticalPx(129) - bottom}),
        [bottom],
    );

    const isLoading = useAppSelector(loadingMapsSelector);
    const isRefreshing = useAppSelector(refreshMapsSelector);
    const {private: privateMapsCount} = useAppSelector(mapsCountSelector);
    const [activeMapID, setActiveMapID] = useState<string>('');
    const [showFiltersModal, setShowFiltersModal] = useState(false);
    const [savedMapFilters, setSavedMapFilters] = useState<PickedFilters>({});
    const sortedByDate = !!savedMapFilters.order || true;
    const {onLoadMoreHandler} = useInfiniteScrollLoadMore(privateMaps?.length);

    /**
     * Shows list loader when filters changed.
     */
    const [showListLoader, setShowListLoader] = useState(false);
    const onRefresh = useCallback(
        () => dispatch(fetchPrivateMapsList(undefined, savedMapFilters)),
        [dispatch, savedMapFilters],
    );
    const onLoadMore = useCallback(
        () => dispatch(fetchPrivateMapsList(nextCoursor, savedMapFilters)),
        [dispatch, nextCoursor, savedMapFilters],
    );
    const onGetFiltersCount = useCallback(
        filters => dispatch(fetchPrivateMapsCount(filters)),
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
                    fetchPrivateMapsList(undefined, savedMapFilters),
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

    const emptyListButtonHandler = () => {
        navigation.navigate('Counter', {});
    };

    const onPressHandler = (state: boolean, mapID?: string) => {
        if (mapID) {
            setActiveMapID(mapID);
        }
        setBottomSheetWithMoreActions(true);
    };

    const onPressTileHandler = useCallback(
        (mapID?: string) => {
            /**
             * Nearest point to user's position
             */
            const nearestPoint = privateMaps.find(md => md.id === mapID)
                ?.nearestPoint;

            navigation.navigate('RoutesMap', {
                mapID: mapID,
                nearestPoint: nearestPoint,
                private: true,
                favourite: false,
            });
        },
        [navigation, privateMaps],
    );

    const shouldShowDate = useCallback(
        (date: string, index: number) => {
            const m = privateMaps?.[index];
            return date !== m?.createdAtDateString;
        },
        [privateMaps],
    );

    const renderItem = useCallback(
        ({item, index}: RenderItem) => {
            const lastItemStyle =
                index === privateMaps?.length - 1 ? styles.lastTile : undefined;
            const images = getImagesThumbs(item?.pictures);

            return (
                <View key={item.id} style={lastItemStyle}>
                    <ListTile
                        mapData={item}
                        images={images}
                        onPress={onPressHandler}
                        onPressTile={onPressTileHandler}
                        mode={'my'}
                        tilePressable
                    />
                </View>
            );
        },
        [privateMaps?.length, shouldShowDate, sortedByDate, onPressTileHandler],
    );

    const onEndReachedHandler = useCallback(() => {
        if (!isLoading && !isRefreshing && nextCoursor) {
            onLoadMoreHandler(onLoadMore);
        }
    }, [isLoading, isRefreshing, onLoadMoreHandler, onLoadMore, nextCoursor]);

    const [showBackdrop, setShowBackdrop] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [sortButtonName, setSortButtonName] = useState<string>('');
    const sButtonName = useMemo(() => sortButtonName || mwt('btnSort'), [
        sortButtonName,
        mwt,
    ]);

    const toggleDropdown = useCallback((state: boolean) => {
        setShowBackdrop(state);
        setShowDropdown(state);
    }, []);

    const onSortByHandler = useCallback(
        (sortTypeId?: string) => {
            const firstEl = privateRoutesDropdownList[0];
            const sortBy =
                privateRoutesDropdownList.find(el => el.id === sortTypeId) ||
                firstEl;

            setSortButtonName(sortTypeId ? sortBy?.text : '');
            setShowListLoader(true);

            setSavedMapFilters(prev => getSorByFilters(prev, sortBy));
        },
        [privateRoutesDropdownList],
    );

    /**
     * Shows modal with more action butons
     */
    const [
        bottomSheetWithMoreActions,
        setBottomSheetWithMoreActions,
    ] = useState(false);

    const onPressMoreHandler = useCallback(
        (actionType: RouteDetailsActionT) => {
            const mapId = activeMapID;
            if (!mapId) {
                setBottomSheetWithMoreActions(false);
                return;
            }

            switch (actionType) {
                case 'record':
                    setBottomSheetWithMoreActions(false);
                    navigation.navigate('Counter', {mapID: mapId});
                    break;
                case 'remove':
                    dispatch(removePrivateMapMetaData(mapId));
                    break;
                default:
                    break;
            }
        },
        [dispatch, navigation, activeMapID],
    );

    const {onScroll, shouldHide} = useHideOnScrollDirection();

    const onErrorScrollHandler = useCallback(
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            if (
                listError &&
                !isLoading &&
                event.nativeEvent.contentOffset.y >
                    getItemLayout(undefined, privateMaps.length - 1).offset
            ) {
                onLoadMore();
            }
        },
        [privateMaps.length, isLoading, listError, onLoadMore],
    );

    const renderListFooter = useCallback(() => {
        if (!showListLoader && privateMaps.length > 3) {
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
                <View style={styles.listBodyLoader}>
                    <NativeLoader />
                </View>
            );
        }

        return null;
    }, [privateMaps.length, isLoading, listError, showListLoader]);

    const basicTitle = `${userName || t('defaultUserName')} ${t('title')}`;
    const secondTitle = `${t('routesNumberTitle')} ${totalNumberOfPrivateMaps}`;

    return (
        <View style={styles.background}>
            <FiltersHeader
                shouldHide={shouldHide}
                sortButtonName={sButtonName}
                setShowDropdown={setShowDropdown}
                onFiltersModalOpenHandler={onFiltersModalOpenHandler}
                showDropdown={showDropdown}
                toggleDropdown={toggleDropdown}
                onSortByHandler={onSortByHandler}
                dropdownList={privateRoutesDropdownList}
            />
            <FiltersModal
                onClose={onFiltersModalCloseHandler}
                definedFilters={savedMapFilters}
                onSave={onFiltersSaveHandler}
                showModal={showFiltersModal}
                onGetFiltersCount={onGetFiltersCount}
                onResetFiltersCount={onResetFiltersCount}
                itemsCount={privateMapsCount}
                allowMyPublic
            />

            {!privateMaps?.length ? (
                <EmptyStateContainer
                    onPress={emptyListButtonHandler}
                    buttonText={t('emptyState.action')}
                    title={t('emptyState.header')}
                    description={t('emptyState.info')}
                    image={<FinishLine />}
                />
            ) : (
                <View>
                    <FlatList
                        keyExtractor={item => item.id}
                        onScroll={onScroll}
                        onMomentumScrollEnd={onErrorScrollHandler}
                        ListHeaderComponent={
                            <Header2 style={styles.header}>
                                {totalNumberOfPrivateMaps &&
                                totalNumberOfPrivateMaps > 0
                                    ? secondTitle
                                    : basicTitle}
                            </Header2>
                        }
                        data={!showListLoader ? privateMaps : []}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        getItemLayout={getItemLayout}
                        initialNumToRender={10}
                        removeClippedSubviews
                        onEndReached={onEndReachedHandler}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={renderListFooter}
                        refreshing={isLoading && isRefreshing}
                        onRefresh={onRefresh}
                    />
                </View>
            )}

            <Backdrop
                isVisible={showBackdrop}
                style={styles.fullscreenBackdrop}
            />

            {!!privateMaps?.length && (
                <RoutesMapButton
                    onPress={() => navigation.navigate('RoutesMap')}
                    style={{...styles.mapBtn, ...bottomPosition}}
                />
            )}

            <MoreActionsModal
                show={bottomSheetWithMoreActions}
                onPressAction={onPressMoreHandler}
                onClose={() => setBottomSheetWithMoreActions(false)}
            />
        </View>
    );
};

export default MyRoutes;

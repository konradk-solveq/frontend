import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
    View,
    FlatList,
    NativeSyntheticEvent,
    NativeScrollEvent,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';

import {
    userNameSelector,
    favouritesMapsSelector,
    loadingMapsSelector,
    refreshMapsSelector,
} from '@storage/selectors';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {Map} from '@models/map.model';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {mapKeyExtractor} from '@utils/transformData';
import useInfiniteScrollLoadMore from '@hooks/useInfiniteScrollLoadMore';

import {Loader as NativeLoader} from '@components/loader';
import {Backdrop} from '@components/backdrop';
import {RoutesMapButton} from '@pages/main/world/components/buttons';
import {useAppNavigation} from '@navigation/hooks/useAppNavigation';
import {RouteDetailsActionT} from '@type/screens/routesMap';

import styles from './style';
import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';
import {
    nextPlannedPaginationCoursor,
    mapsCountSelector,
    plannedMapsListErrorSelector,
} from '@storage/selectors/map';
import {fetchPlannedMapsList, fetchPlannedMapsCount} from '@storage/actions';
import {
    checkIfContainsFitlers,
    getSorByFilters,
} from '@utils/apiDataTransform/filters';
import {PickedFilters} from '@interfaces/form';
import FiltersModal from '@pages/main/world/components/filters/filtersModal';
import {
    getPlannedRoutesDropdownList,
    getPlannedRoutesNoLocationDropdownList,
} from '../utils/dropdownLists';
import ListTile from '@pages/main/world/components/listTile';
import {removePlannedMap, resetMapsCount} from '@storage/actions/maps';
import {Header2} from '@components/texts/texts';
import {MoreActionsModal} from '@pages/main/world/components/modals';
import {useHideOnScrollDirection} from '@hooks/useHideOnScrollDirection';
import FiltersHeader from '@pages/main/world/components/filters/FiltersHeader';
import EmptyStateContainer from '@containers/World/EmptyStateContainer';
import {BikePin} from '@components/svg';
import {isIOS} from '@utils/platform';
import InfiniteScrollError from '@components/error/InfiniteScrollError';
import Bookmark from '@src/components/icons/Bookmark';
import {useToastContext} from '@src/providers/ToastProvider/ToastProvider';
import useCheckLocationType from '@hooks/staticLocationProvider/useCheckLocationType';
import {globalLocationSelector} from '@storage/selectors/app';
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
const PlannedRoutes: React.FC<IProps> = ({}: IProps) => {
    const {t} = useMergedTranslation('MainWorld.PlannedRoutes');
    const {t: toastsT} = useMergedTranslation('Toasts');
    const {t: mwt} = useMergedTranslation('MainWorld');
    const navigation = useAppNavigation();
    const isTabFocused = useIsFocused();
    const nextCoursor = useAppSelector(nextPlannedPaginationCoursor);
    const dispatch = useAppDispatch();
    const userName = useAppSelector(userNameSelector);
    const favouriteMaps = useAppSelector(favouritesMapsSelector);
    const isLoading = useAppSelector(loadingMapsSelector);
    const isRefreshing = useAppSelector(refreshMapsSelector);
    const {planned: plannedMapsCount} = useAppSelector(mapsCountSelector);
    const {permissionGranted, permissionResult} = useCheckLocationType();
    const location = useAppSelector(globalLocationSelector);
    const plannedRoutesDropdownList = useMemo(
        () =>
            (permissionGranted || !permissionResult) && location
                ? getPlannedRoutesDropdownList(t)
                : getPlannedRoutesNoLocationDropdownList(t),
        [t, permissionGranted, permissionResult, location],
    );
    const listError = useAppSelector(plannedMapsListErrorSelector)?.error;
    const {bottom} = useSafeAreaInsets();
    const {addToast} = useToastContext();
    /**
     * Navigate to map button bottom position modifier
     */
    const bottomPosition = useMemo(
        () => ({bottom: getFVerticalPx(129) - bottom}),
        [bottom],
    );

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

    useForegroundLocationMapRefresh(setShowListLoader, onRefresh);

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
        setBottomSheetWithMoreActions(true);
        if (mapID) {
            setActiveMapID(mapID);
        }
    };

    const emptyListButtonHandler = () => {
        navigation.navigate('WorldBikeMap');
    };

    const onPressTileHandler = useCallback(
        (mapID?: string) => {
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
        },
        [favouriteMaps, navigation],
    );

    const onEndReachedHandler = useCallback(() => {
        if (!isLoading && !isRefreshing && nextCoursor) {
            onLoadMoreHandler(onLoadMore);
        }
    }, [isLoading, isRefreshing, nextCoursor, onLoadMoreHandler, onLoadMore]);

    const renderItem = useCallback(
        ({item}: RenderItem) => {
            return (
                <View key={item.id}>
                    <ListTile
                        mapData={item}
                        onPress={onPressHandler}
                        onPressTile={onPressTileHandler}
                        mode={'saved'}
                        tilePressable
                        hideDistanceToStart={!location || !permissionGranted}
                    />
                </View>
            );
        },
        [location, onPressTileHandler, permissionGranted],
    );

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

    /**
     * Dismiss sort dropdown when user navigates to other tab.
     */
    useEffect(() => {
        if (!isTabFocused) {
            toggleDropdown(false);
        }
    }, [isTabFocused, toggleDropdown]);

    const {onScroll, shouldHide} = useHideOnScrollDirection();

    const onErrorScrollHandler = useCallback(
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            if (
                listError &&
                !isLoading &&
                event.nativeEvent.contentOffset.y >
                    getItemLayout(undefined, favouriteMaps.length - 1).offset
            ) {
                onLoadMore();
            }
        },
        [favouriteMaps.length, isLoading, listError, onLoadMore],
    );
    const onSortByHandler = useCallback(
        (sortTypeId?: string) => {
            const firstEl = plannedRoutesDropdownList[0];
            const sortBy =
                plannedRoutesDropdownList.find(el => el.id === sortTypeId) ||
                firstEl;

            setSortButtonName(sortTypeId ? sortBy?.text : '');
            setShowListLoader(true);

            setSavedMapFilters(prev => getSorByFilters(prev, sortBy));
        },
        [plannedRoutesDropdownList],
    );

    /**
     * Shows modal with more action buttons
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
                    navigation.navigate('RecordTab', {
                        mapID: mapId,
                    });
                    break;
                case 'remove':
                    dispatch(removePlannedMap(mapId));
                    addToast({
                        key: 'toast-route-removed-from-favorites',
                        title: toastsT('removeRouteFromPlanned'),
                        icon: <Bookmark />,
                    });
                    break;
                default:
                    break;
            }
        },
        [activeMapID, navigation, dispatch, addToast, toastsT],
    );

    const renderListFooter = useCallback(() => {
        if (!showListLoader && favouriteMaps.length > 3) {
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
    }, [favouriteMaps.length, isLoading, listError, showListLoader]);

    const mapHeaderComponent = useMemo(
        () => (
            <View style={styles.listHeaderContainer}>
                <UnifiedLocationNotification style={styles.notification} />
                <Header2 style={styles.header}>
                    {userName || t('defaultUserName')}
                    {t('title')}
                </Header2>
            </View>
        ),
        [t, userName],
    );

    const onShowMoreHandler = useCallback(
        () => setBottomSheetWithMoreActions(false),
        [],
    );

    const closeDropdownHandler = useCallback(() => toggleDropdown(false), [
        toggleDropdown,
    ]);

    const onRouteMapButtonPress = useCallback(
        () => navigation.navigate('RoutesMap'),
        [navigation],
    );

    return (
        <View style={styles.background}>
            <FiltersHeader
                shouldHide={shouldHide}
                sortButtonName={sButtonName}
                setShowDropdown={toggleDropdown}
                onFiltersModalOpenHandler={onFiltersModalOpenHandler}
                showDropdown={showDropdown}
                toggleDropdown={toggleDropdown}
                onSortByHandler={onSortByHandler}
                dropdownList={plannedRoutesDropdownList}
                mapMode={'planned'}
            />
            <FiltersModal
                onClose={onFiltersModalCloseHandler}
                definedFilters={savedMapFilters}
                onSave={onFiltersSaveHandler}
                showModal={showFiltersModal}
                onGetFiltersCount={onGetFiltersCount}
                onResetFiltersCount={onResetFiltersCount}
                itemsCount={plannedMapsCount}
                mapMode={'planned'}
            />
            {!favouriteMaps?.length ? (
                <EmptyStateContainer
                    onPress={emptyListButtonHandler}
                    buttonText={t('emptyState.action')}
                    title={t('emptyState.header')}
                    description={t('emptyState.info')}
                    image={<BikePin />}
                />
            ) : (
                <FlatList
                    keyExtractor={mapKeyExtractor}
                    onScroll={onScroll}
                    onMomentumScrollEnd={onErrorScrollHandler}
                    ListHeaderComponent={mapHeaderComponent}
                    data={!showListLoader ? favouriteMaps : []}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    getItemLayout={getItemLayout}
                    initialNumToRender={10}
                    removeClippedSubviews={!isIOS}
                    onEndReached={onEndReachedHandler}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={renderListFooter}
                    refreshing={isLoading && isRefreshing}
                    onRefresh={onRefresh}
                    maxToRenderPerBatch={5}
                    windowSize={11}
                    contentContainerStyle={styles.listContent}
                />
            )}

            <Backdrop
                isVisible={showBackdrop}
                onPress={closeDropdownHandler}
                style={styles.fullscreenBackdrop}
            />

            {!!favouriteMaps?.length && (
                <RoutesMapButton
                    onPress={onRouteMapButtonPress}
                    style={{...styles.mapBtn, ...bottomPosition}}
                />
            )}

            <MoreActionsModal
                show={bottomSheetWithMoreActions}
                onPressAction={onPressMoreHandler}
                onClose={onShowMoreHandler}
                mapType="favourite"
            />
        </View>
    );
};

export default PlannedRoutes;

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
    View,
    FlatList,
    NativeSyntheticEvent,
    NativeScrollEvent,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useIsFocused, useRoute} from '@react-navigation/native';

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
import {
    getPrivateRoutesDropdownList,
    getPrivateRoutesNoLocationDropdownList,
} from '../utils/dropdownLists';
import ListTile from '@pages/main/world/components/listTile';
import {removePrivateMapMetaData, resetMapsCount} from '@storage/actions/maps';
import {Header2} from '@components/texts/texts';
import {MoreActionsModal} from '@pages/main/world/components/modals';
import FiltersHeader from '@pages/main/world/components/filters/FiltersHeader';
import {useHideOnScrollDirection} from '@hooks/useHideOnScrollDirection';
import EmptyStateContainer from '@containers/World/EmptyStateContainer';
import {FinishLine} from '@components/svg';
import InfiniteScrollError from '@components/error/InfiniteScrollError';
import useCheckLocationType from '@hooks/staticLocationProvider/useCheckLocationType';
import {globalLocationSelector} from '@storage/selectors/app';
import UnifiedLocationNotification from '../../../../notifications/UnifiedLocationNotification';
import useForegroundLocationMapRefresh from '@hooks/useForegroundLocationMapRefresh';
import {mapKeyExtractor} from '@utils/transformData';
import {RoutesMapRouteT} from '@src/type/rootStack';
import useOpenGPSSettings from '@hooks/useOpenGPSSettings';

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
    const isTabFocused = useIsFocused();
    const nextCoursor = useAppSelector(nextPrivatePaginationCoursor);
    const dispatch = useAppDispatch();
    const userName = useAppSelector(userNameSelector);
    const privateMaps = useAppSelector<Map[]>(privateMapsListSelector);
    const totalNumberOfPrivateMaps = useAppSelector(
        privateTotalMapsNumberSelector,
    );
    const route = useRoute<RoutesMapRouteT>();
    const navigateAfterSave = route.params?.navigateAfterSave;
    const {permissionGranted, permissionResult} = useCheckLocationType();
    const {isGPSEnabled, isGPSStatusRead} = useOpenGPSSettings();
    const location = useAppSelector(globalLocationSelector);
    const privateRoutesDropdownList = useMemo(
        () =>
            (permissionGranted || !permissionResult) && location
                ? getPrivateRoutesDropdownList(t)
                : getPrivateRoutesNoLocationDropdownList(t),
        [t, permissionGranted, permissionResult, location],
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

    const newestRouteId = useMemo(() => {
        if (privateMaps.length) {
            const newestMap = privateMaps.reduce((prev, next) =>
                prev.createdAt > next.createdAt ? prev : next,
            );
            return newestMap.id;
        }
    }, [privateMaps]);

    const isLoading = useAppSelector(loadingMapsSelector);
    const isRefreshing = useAppSelector(refreshMapsSelector);
    const {private: privateMapsCount} = useAppSelector(mapsCountSelector);
    const [activeMapID, setActiveMapID] = useState<string>('');
    const [showFiltersModal, setShowFiltersModal] = useState(false);
    const [savedMapFilters, setSavedMapFilters] = useState<PickedFilters>({});
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

    useForegroundLocationMapRefresh(setShowListLoader, onRefresh);

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

    useEffect(() => {
        if (navigateAfterSave && isTabFocused) {
            onRefresh();
        }
        if (!isTabFocused) {
            navigation.setParams({navigateAfterSave: false});
        }
    }, [navigateAfterSave, onRefresh, navigation, isTabFocused]);

    const onFiltersModalOpenHandler = () => {
        setShowFiltersModal(true);
    };
    const onFiltersModalCloseHandler = () => {
        setShowFiltersModal(false);
    };

    const onFiltersSaveHandler = (picked: PickedFilters) => {
        setShowFiltersModal(false);
        setShowListLoader(true);
        setSavedMapFilters(prev => ({
            created: prev.created,
            distance: prev.distance,
            ...picked,
        }));
    };

    const emptyListButtonHandler = () => {
        navigation.navigate('RecordTab', {});
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

    const renderItem = useCallback(
        ({item}: RenderItem) => {
            return (
                <View key={item.id}>
                    <ListTile
                        mapData={item}
                        onPress={onPressHandler}
                        onPressTile={onPressTileHandler}
                        mode={'my'}
                        tilePressable
                        hideDistanceToStart={
                            !location ||
                            !permissionGranted ||
                            (!isGPSEnabled && isGPSStatusRead)
                        }
                        isRouteNewest={
                            newestRouteId === item.id && navigateAfterSave
                        }
                    />
                </View>
            );
        },
        [
            onPressTileHandler,
            location,
            permissionGranted,
            isGPSEnabled,
            isGPSStatusRead,
            newestRouteId,
            navigateAfterSave,
        ],
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
                    navigation.navigate('RecordTab', {
                        mapID: mapId,
                    });
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

    const basicTitle = useMemo(
        () => `${userName || t('defaultUserName')} ${t('title')}`,
        [t, userName],
    );
    const secondTitle = useMemo(
        () => `${t('routesNumberTitle')} ${totalNumberOfPrivateMaps}`,
        [t, totalNumberOfPrivateMaps],
    );

    const mapHeaderComponent = useMemo(
        () => (
            <View style={styles.listHeaderContainer}>
                <UnifiedLocationNotification
                    style={styles.notification}
                    showGPSStatus
                    hideSearchSignal
                />
                <Header2 style={styles.header}>
                    {totalNumberOfPrivateMaps && totalNumberOfPrivateMaps > 0
                        ? secondTitle
                        : basicTitle}
                </Header2>
            </View>
        ),
        [basicTitle, secondTitle, totalNumberOfPrivateMaps],
    );

    const closeDropdownHandler = useCallback(() => toggleDropdown(false), [
        toggleDropdown,
    ]);

    const closeBottomSheetHandler = useCallback(
        () => setBottomSheetWithMoreActions(false),
        [],
    );

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
                dropdownList={privateRoutesDropdownList}
                mapMode={'private'}
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
                mapMode={'private'}
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
                        keyExtractor={mapKeyExtractor}
                        onScroll={onScroll}
                        onMomentumScrollEnd={onErrorScrollHandler}
                        ListHeaderComponent={mapHeaderComponent}
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
                        maxToRenderPerBatch={5}
                        windowSize={11}
                        contentContainerStyle={styles.listContent}
                    />
                </View>
            )}

            <Backdrop
                isVisible={showBackdrop}
                onPress={closeDropdownHandler}
                style={styles.fullscreenBackdrop}
            />

            {!!privateMaps?.length && (
                <RoutesMapButton
                    onPress={onRouteMapButtonPress}
                    style={{...styles.mapBtn, ...bottomPosition}}
                />
            )}

            <MoreActionsModal
                show={bottomSheetWithMoreActions}
                onPressAction={onPressMoreHandler}
                onClose={closeBottomSheetHandler}
            />
        </View>
    );
};

export default MyRoutes;

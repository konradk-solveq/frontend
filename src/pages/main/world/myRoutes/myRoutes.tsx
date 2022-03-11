import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';

import {
    userNameSelector,
    loadingMapsSelector,
    privateMapsListSelector,
    privateTotalMapsNumberSelector,
    refreshMapsSelector,
    selectorMapTypeEnum,
} from '@storage/selectors';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {Map} from '@models/map.model';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import useInfiniteScrollLoadMore from '@hooks/useInfiniteScrollLoadMore';
import {getVerticalPx} from '@helpers/layoutFoo';
import {getImagesThumbs} from '@utils/transformData';
import {translateDateToTodayAndYesterdayString} from '@utils/dateTime';
import Loader from '@sharedComponents/loader/loader';
import {Loader as NativeLoader} from '@components/loader';
import {useAppNavigation} from '@navigation/hooks/useAppNavigation';

import FirstTile from '../components/tiles/firstTile';
import NextTile from '../components/tiles/nextTile';
import EmptyList from './emptyList';
import ShowMoreModal from '../components/showMoreModal/showMoreModal';
import {Dropdown} from '@components/dropdown';
import {Backdrop} from '@components/backdrop';
import SortButton from '../components/buttons/SortButton';
import styles from './style';
import {nextPrivatePaginationCoursor} from '@storage/selectors/map';
import {fetchPrivateMapsList} from '@storage/actions';
import {
    checkIfContainsFitlers,
    getSorByFilters,
} from '@utils/apiDataTransform/filters';
import {PickedFilters} from '@interfaces/form';
import FiltersModal from '@pages/main/world/components/filters/filtersModal';
import {FiltersButton} from '@pages/main/world/components/buttons';
import {RoutesMapButton} from '@pages/main/world/components/buttons';
import {privateRoutesDropdownList} from '../utils/dropdownLists';

const length = getVerticalPx(175);
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
    const isLoading = useAppSelector(loadingMapsSelector);
    const isRefreshing = useAppSelector(refreshMapsSelector);

    const [showModal, setShowModal] = useState(false);
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
        setSavedMapFilters(picked);
    };

    const emptyListButtonHandler = () => {
        navigation.navigate('WorldBikeMap');
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
            const images = getImagesThumbs(item?.images || []);

            if (index === 0) {
                return (
                    <View style={[styles.tileWrapper, lastItemStyle]}>
                        {sortedByDate && (
                            <Text style={styles.separatorHeader}>
                                {translateDateToTodayAndYesterdayString(
                                    item.createdAtDate,
                                )}
                            </Text>
                        )}
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

            const showDate = shouldShowDate(
                item.createdAtDateString,
                index - 1,
            );
            return (
                <View key={item.id} style={[styles.tileWrapper, lastItemStyle]}>
                    {sortedByDate && showDate && (
                        <Text style={styles.separatorHeader}>
                            {translateDateToTodayAndYesterdayString(
                                item.createdAtDate,
                            )}
                        </Text>
                    )}
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
        [privateMaps?.length, shouldShowDate, sortedByDate, onPressTileHandler],
    );

    const onEndReachedHandler = useCallback(() => {
        if (!isLoading && !isRefreshing) {
            onLoadMoreHandler(onLoadMore);
        }
    }, [isLoading, isRefreshing, onLoadMoreHandler, onLoadMore]);

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
            const firstEl = privateRoutesDropdownList[0];
            const sortBy =
                privateRoutesDropdownList.find(el => el.id === sortTypeId) ||
                firstEl;
            changeSortButtonName(sortTypeId ? sortBy?.text : mwt('btnSort'));
            setShowListLoader(true);

            setSavedMapFilters(prev => getSorByFilters(prev, sortBy));
        },
        [changeSortButtonName, mwt],
    );

    if (!privateMaps?.length) {
        return <EmptyList onPress={emptyListButtonHandler} />;
    }

    const renderListLoader = () => {
        if (!showListLoader && isLoading && privateMaps.length > 3) {
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

    const basicTitle = `${userName || t('defaultUserName')} ${t('title')}`;
    const secondTitle = `${t('routesNumberTitle')} ${totalNumberOfPrivateMaps}`;

    const rednerModal = () => {
        const itemIsPublic = privateMaps.find(e => {
            if (e.id === activeMapID) {
                return e.isPublic;
            }
        });
        let isPublic = false;
        if (itemIsPublic) {
            isPublic = !!itemIsPublic.isPublic;
        }

        return (
            <ShowMoreModal
                showModal={showModal}
                removeFav
                mapID={activeMapID}
                onPressCancel={() => onPressHandler(false)}
                backdropStyle={styles.backdrop}
                isPublished={isPublic}
                mapType={selectorMapTypeEnum.private}
            />
        );
    };

    return (
        <>
            {rednerModal()}
            <FiltersModal
                onClose={onFiltersModalCloseHandler}
                definedFilters={savedMapFilters}
                onSave={onFiltersSaveHandler}
                showModal={showFiltersModal}
                allowMyPublic
            />
            <View style={styles.topButtonsContainer}>
                <Dropdown
                    openOnStart={showDropdown}
                    list={privateRoutesDropdownList}
                    onPress={toggleDropdown}
                    onPressItem={onSortByHandler}
                    buttonText={mwt('btnSort')}
                    buttonContainerStyle={styles.dropdownButtonContainerStyle}
                    boxStyle={styles.dropdownBox}
                    hideButton
                />
            </View>

            <View style={styles.horizontalSpace}>
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
                            <Text style={styles.header}>
                                {totalNumberOfPrivateMaps &&
                                totalNumberOfPrivateMaps > 0
                                    ? secondTitle
                                    : basicTitle}
                            </Text>
                        </>
                    }
                    data={!showListLoader ? privateMaps : []}
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
                style={styles.mapBtn}
            />
        </>
    );
};

export default MyRoutes;

import React, {useCallback, useState} from 'react';
import {View, FlatList} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';

import {BothStackRoute, RegularStackRoute} from '@navigation/route';
import {Map} from '@models/map.model';
import {getVerticalPx} from '@helpers/layoutFoo';
import {getImagesThumbs} from '@utils/transformData';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {FeaturedMapsScreenRouteT, RootStackType} from '@type/rootStack';
import {fetchFeaturedMapsList} from '@storage/actions/maps';
import {
    featuredMapDataBySectionIdSelector,
    loadingMapsSelector,
    nextFeaturedPaginationCoursor,
    refreshMapsSelector,
    selectorMapTypeEnum,
} from '@storage/selectors/map';

import {NavigationHeader} from '@components/navigation';
import Loader from '@sharedComponents/loader/loader';

import ShowMoreModal from '../components/showMoreModal/showMoreModal';

import styles from './style';
import ListTile from '@pages/main/world/components/listTile';

const getItemLayout = (_: any, index: number) => ({
    length: getVerticalPx(175),
    offset: getVerticalPx(175) * index,
    index,
});

interface RenderItem {
    item: Map;
    index: number;
}

const FeaturedRoutesScreen: React.FC = () => {
    const dispatch = useAppDispatch();

    const navigation = useNavigation<StackNavigationProp<RootStackType>>();
    const route = useRoute<FeaturedMapsScreenRouteT>();
    const sectionID = route.params.sectionID;
    const sectionName = route.params.sectionName;

    const nextFeaturedCoursor = useAppSelector(
        nextFeaturedPaginationCoursor(sectionID),
    );

    const mapsData =
        useAppSelector(featuredMapDataBySectionIdSelector(sectionID))?.routes
            ?.elements || [];

    const isLoading = useAppSelector(loadingMapsSelector);

    const isRefreshing = useAppSelector(refreshMapsSelector);

    const [showModal, setShowModal] = useState(false);
    const [activeMapID, setActiveMapID] = useState<string>('');

    const onPressHandler = (state: boolean, mapID?: string) => {
        setShowModal(state);
        if (mapID) {
            setActiveMapID(mapID);
        }
    };

    const onPressTileHandler = useCallback(
        (mapID?: string) => {
            if (!mapID) {
                return;
            }
            navigation.navigate({
                name: RegularStackRoute.ROUTE_DETAILS_SCREEN as keyof RootStackType,
                params: {
                    mapID: mapID,
                    private: false,
                    favourite: false,
                    featured: true,
                },
            });
        },
        [navigation],
    );

    const onLoadMoreHandler = useCallback(() => {
        if (!isLoading && nextFeaturedCoursor) {
            dispatch(fetchFeaturedMapsList(nextFeaturedCoursor));
        }
    }, [dispatch, isLoading, nextFeaturedCoursor]);

    const onEndReachedHandler = useCallback(() => {
        if (!isLoading && !isRefreshing && mapsData?.length > 1) {
            onLoadMoreHandler();
        }
    }, [isLoading, isRefreshing, mapsData?.length, onLoadMoreHandler]);

    const onRefreshHandler = useCallback(() => {
        if (!isLoading && !isRefreshing && mapsData?.length > 1) {
            dispatch(fetchFeaturedMapsList());
        }
    }, [dispatch, isLoading, isRefreshing, mapsData?.length]);

    const renderItem = useCallback(
        ({item, index}: RenderItem) => {
            const lastItemStyle =
                index === mapsData?.length - 1 ? styles.lastTile : undefined;
            const images = getImagesThumbs(item?.pictures);

            return (
                <View key={item.id} style={[styles.tileWrapper, lastItemStyle]}>
                    <ListTile
                        mapData={item}
                        images={images}
                        onPress={onPressHandler}
                        onPressTile={onPressTileHandler}
                        mode={'featured'}
                        tilePressable
                        sectionID={sectionID}
                    />
                </View>
            );
        },
        [mapsData?.length, onPressTileHandler, sectionID],
    );

    const renderListLoader = useCallback(() => {
        if (isLoading && mapsData.length > 3) {
            return (
                <View style={styles.loaderContainer}>
                    <Loader />
                </View>
            );
        }
        return null;
    }, [isLoading, mapsData?.length]);

    const returnToPreviousScreen = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
            return;
        }
        navigation?.replace(
            BothStackRoute.TAB_MENU_SCREEN as keyof RootStackType,
        );
    };

    return (
        <>
            <NavigationHeader
                title={sectionName}
                onPress={returnToPreviousScreen}
                style={styles.navHeader}
            />

            {mapsData?.length ? (
                <>
                    <ShowMoreModal
                        showModal={showModal}
                        mapID={activeMapID}
                        onPressCancel={() => onPressHandler(false)}
                        backdropStyle={styles.backdrop}
                        isPublished
                        mapType={selectorMapTypeEnum.featured}
                    />
                    <FlatList
                        keyExtractor={item => item.id}
                        data={mapsData}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        getItemLayout={getItemLayout}
                        initialNumToRender={10}
                        removeClippedSubviews
                        onEndReached={onEndReachedHandler}
                        onEndReachedThreshold={0}
                        ListFooterComponent={renderListLoader}
                        refreshing={isLoading && isRefreshing}
                        onRefresh={onRefreshHandler}
                        style={styles.list}
                    />
                </>
            ) : null}
        </>
    );
};

export default FeaturedRoutesScreen;

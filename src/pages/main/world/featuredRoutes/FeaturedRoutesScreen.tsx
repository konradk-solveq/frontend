import React, {useCallback, useState} from 'react';
import {View, FlatList} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/core';

import {BothStackRoute, RegularStackRoute} from '@navigation/route';
import {Map} from '../../../../models/map.model';
import {getVerticalPx} from '../../../../helpers/layoutFoo';
import {getImagesThumbs} from '../../../../utils/transformData';
import {useAppDispatch, useAppSelector} from '../../../../hooks/redux';
import {
    featuredMapDataBySectionIdSelector,
    loadingMapsSelector,
    nextFeaturedPaginationCoursor,
    refreshMapsSelector,
} from '../../../../storage/selectors/map';

import NextTile from '../components/tiles/nextTile';
import ShowMoreModal from '../components/showMoreModal/showMoreModal';
import Loader from '../../../../sharedComponents/loader/loader';

import styles from './style';
import {FeaturedMapsScreenRouteType} from '@type/rootStack';
import {fetchFeaturedMapsList} from '@storage/actions/maps';
import StackHeader from '@sharedComponents/navi/stackHeader/stackHeader';

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

    const navigation = useNavigation();
    const route = useRoute<FeaturedMapsScreenRouteType>();
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
            navigation.navigate({
                name: RegularStackRoute.ROUTE_DETAILS_SCREEN,
                params: {mapID: mapID, private: false},
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
            const images = getImagesThumbs(item?.images || []);

            return (
                <View key={item.id} style={[styles.tileWrapper, lastItemStyle]}>
                    <NextTile
                        mapData={item}
                        images={images}
                        onPress={onPressHandler}
                        onPressTile={onPressTileHandler}
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
        navigation?.replace(BothStackRoute.MAIN_MENU_SCREEN);
    };

    return (
        <>
            <StackHeader
                inner={sectionName}
                onpress={returnToPreviousScreen}
                style={styles.navHeader}
            />

            {mapsData?.length ? (
                <>
                    <ShowMoreModal
                        showModal={showModal}
                        mapID={activeMapID}
                        onPressCancel={() => onPressHandler(false)}
                        backdropStyle={styles.backdrop}
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

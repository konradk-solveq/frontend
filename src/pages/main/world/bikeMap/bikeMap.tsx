import React, {useCallback, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {Map} from '../../../../models/map.model';
import {I18n} from '../../../../../I18n/I18n';
import {getVerticalPx} from '../../../../helpers/layoutFoo';
import {getImagesThumbs} from '../../../../utils/transformData';
import {useAppSelector} from '../../../../hooks/redux';
import {
    loadingMapsSelector,
    mapsListSelector,
    refreshMapsSelector,
} from '../../../../storage/selectors/map';

import FirstTile from '../components/tiles/firstTile';
import SecondTile from '../components/tiles/secondTile';
import NextTile from '../components/tiles/nextTile';
import ShowMoreModal from '../components/showMoreModal/showMoreModal';
import Loader from '../../../../sharedComponents/loader/loader';

import styles from './style';

const getItemLayout = (_: any, index: number) => ({
    length: getVerticalPx(175),
    offset: getVerticalPx(175) * index,
    index,
});

interface RenderItem {
    item: Map;
    index: number;
}

interface IProps {
    onRefresh: () => void;
    onLoadMore: () => void;
}

const BikeMap: React.FC<IProps> = ({onRefresh, onLoadMore}: IProps) => {
    const trans: any = I18n.t('MainWorld.BikeMap');
    const navigation = useNavigation();

    const mapsData = useAppSelector(mapsListSelector);
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
                name: 'RouteDetailsScreen',
                params: {mapID: mapID, private: false},
            });
        },
        [navigation],
    );

    const onEndReachedHandler = () => {
        if (!isLoading && !isRefreshing) {
            onLoadMore();
        }
    };

    const onRefreshHandler = () => {
        if (!isLoading && !isRefreshing) {
            onRefresh();
        }
    };

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
            if (index === 1) {
                return (
                    <View style={[styles.tileWrapper, lastItemStyle]}>
                        <SecondTile
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

    const renderListLoader = () => {
        if (isLoading && mapsData.length > 3) {
            return (
                <View style={styles.loaderContainer}>
                    <Loader />
                </View>
            );
        }
        return null;
    };

    return (
        <>
            {mapsData?.length ? (
                <>
                    <ShowMoreModal
                        showModal={showModal}
                        mapID={activeMapID}
                        onPressCancel={() => onPressHandler(false)}
                        backdropStyle={styles.backdrop}
                    />
                    <FlatList
                        ListHeaderComponent={
                            <Text style={styles.header}>{trans.title}</Text>
                        }
                        keyExtractor={item => item.id}
                        data={mapsData}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        getItemLayout={getItemLayout}
                        initialNumToRender={10}
                        removeClippedSubviews
                        onEndReached={onEndReachedHandler}
                        onEndReachedThreshold={0.2}
                        ListFooterComponent={renderListLoader}
                        refreshing={isLoading && isRefreshing}
                        onRefresh={onRefreshHandler}
                    />
                </>
            ) : null}
        </>
    );
};

export default BikeMap;
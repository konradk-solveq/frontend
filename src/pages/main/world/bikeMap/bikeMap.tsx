import React, {useCallback, useState} from 'react';
import {View, Text, FlatList} from 'react-native';

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
                        />
                    </View>
                );
            }
            if (index === 1) {
                return (
                    <View style={styles.tileWrapper}>
                        <SecondTile
                            mapData={item}
                            images={images}
                            onPress={onPressHandler}
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
                    />
                </View>
            );
        },
        [mapsData?.length],
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
            <View style={styles.horizontalSpace}>
                <Text style={styles.header}>{trans.title}</Text>
            </View>
            {mapsData?.length ? (
                <>
                    <ShowMoreModal
                        showModal={showModal}
                        mapID={activeMapID}
                        onPressCancel={() => onPressHandler(false)}
                    />
                    <FlatList
                        keyExtractor={item => item.id}
                        data={mapsData}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        getItemLayout={getItemLayout}
                        initialNumToRender={10}
                        removeClippedSubviews
                        onEndReached={onLoadMore}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={renderListLoader}
                        refreshing={isLoading && isRefreshing}
                        onRefresh={onRefresh}
                    />
                </>
            ) : null}
        </>
    );
};

export default BikeMap;

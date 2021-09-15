import React from 'react';
import {View, FlatList} from 'react-native';

import {Map, MapType} from '@models/map.model';
import {getVerticalPx} from '@helpers/layoutFoo';
import {getImagesThumbs} from '@utils/transformData';
import {I18n} from '@translations/I18n';

import {TextBtn} from '@sharedComponents/buttons';

import NextTile from '../../components/tiles/nextTile';

import styles, {horizontalStyles} from './style';

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
    data: MapType[];
    sectionID?: string;
    onPressMore: (state: boolean, mapID: string) => void;
    onPressElement: (mapID?: string) => void;
    onShowMore: (sectionID: string) => void;
    sectionHeader?: string;
}

const FeaturedRoutesHorizontalList: React.FC<IProps> = ({
    data,
    sectionID,
    onPressMore,
    onPressElement,
    onShowMore,
    sectionHeader,
}: IProps) => {
    const trans: any = I18n.t('MainWorld.FeaturedRoutes');

    const onPressHandler = (state: boolean, mapID?: string) => {
        if (onPressMore && mapID) {
            onPressMore(state, mapID);
        }
    };

    const onShowMoreHandler = () => {
        if (sectionID) {
            onShowMore(sectionID);
        }
    };

    const renderItem = ({item, index}: RenderItem) => {
        if (index > 2) {
            return null;
        }

        const middleTiles =
            index !== 2 ? horizontalStyles.middleTile : undefined;
        const images = getImagesThumbs(item?.images || []);

        return (
            <View key={item.id} style={[styles.tileWrapper, middleTiles]}>
                <NextTile
                    mapData={item}
                    images={images}
                    onPress={onPressHandler}
                    onPressTile={onPressElement}
                    tilePressable
                    headerTitle={sectionHeader}
                />
            </View>
        );
    };

    if (!data?.length) {
        return null;
    }

    return (
        <>
            <View>
                <FlatList
                    keyExtractor={item => item.id}
                    data={data}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    getItemLayout={getItemLayout}
                    initialNumToRender={3}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
                <TextBtn text={trans.showMoreBtn} onPress={onShowMoreHandler} />
            </View>
        </>
    );
};

export default React.memo(FeaturedRoutesHorizontalList);

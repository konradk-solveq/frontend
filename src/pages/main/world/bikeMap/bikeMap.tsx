import React, {useState} from 'react';
import {View, Text, FlatList} from 'react-native';

import {MapType} from '../../../../models/map.model';
import {I18n} from '../../../../../I18n/I18n';
import {getVerticalPx} from '../../../../helpers/layoutFoo';

import FirstTile from '../components/tiles/firstTile';
import SecondTile from '../components/tiles/secondTile';
import NextTile from '../components/tiles/nextTile';

import styles from './style';
import ShowMoreModal from '../components/showMoreModal/showMoreModal';
import {useAppSelector} from '../../../../hooks/redux';
import {mapsListSelector} from '../../../../storage/selectors/map';

const getItemLayout = (_: any, index: number) => ({
    length: getVerticalPx(175),
    offset: getVerticalPx(175) * index,
    index,
});

interface RenderItem {
    item: MapType;
    index: number;
}

const BikeMap: React.FC = () => {
    const trans: any = I18n.t('MainWorld.BikeMap');
    const mapsData = useAppSelector(mapsListSelector);

    const [showModal, setShowModal] = useState(false);
    const [activeMapID, setActiveMapID] = useState<string>('');

    const onPressHandler = (state: boolean, mapID?: string) => {
        setShowModal(state);
        if (mapID) {
            setActiveMapID(mapID);
        }
    };

    const renderItem = ({item, index}: RenderItem) => {
        const lastItemStyle =
            index === mapsData?.length - 1 ? styles.lastTile : undefined;
        if (index === 0) {
            return (
                <View style={styles.tileWrapper}>
                    <FirstTile mapData={item} onPress={onPressHandler} />
                </View>
            );
        }
        if (index === 1) {
            return (
                <View style={styles.tileWrapper}>
                    <SecondTile mapData={item} onPress={onPressHandler} />
                </View>
            );
        }
        return (
            <View key={item.id} style={[styles.tileWrapper, lastItemStyle]}>
                <NextTile mapData={item} onPress={onPressHandler} />
            </View>
        );
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
                    />
                </>
            ) : null}
        </>
    );
};

export default BikeMap;

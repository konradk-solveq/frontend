import React, {useRef} from 'react';
import {useState} from 'react';
import {Pressable, StyleSheet, View, Text} from 'react-native';
import {Animated} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {getHorizontalPx, getVerticalPx} from '../../../../../helpers/layoutFoo';
import {useAppSelector} from '../../../../../hooks/redux';
import {Map} from '../../../../../models/map.model';
import Swipe from '../../../../../sharedComponents/navi/swipe/swipe';
import CurvedShape from '../../../../../sharedComponents/svg/curvedShape';
import {mapsListSelector} from '../../../../../storage/selectors';

const minContainerHeight = getVerticalPx(248);
const maxContainerHeight = getVerticalPx(582);

interface RenderItem {
    item: Map;
    index: number;
}

const BottomList: React.FC = () => {
    const containerHeight = useRef(new Animated.Value(minContainerHeight))
        .current;
    const [isUp, setIsUp] = useState(false);

    const d = useAppSelector(mapsListSelector);

    const startAnimation = (revert?: boolean) => {
        Animated.timing(containerHeight, {
            toValue: !revert ? maxContainerHeight : minContainerHeight,
            duration: 800,
            useNativeDriver: false,
        }).start(() => {
            setIsUp(revert ? false : true);
        });
    };

    const onSwipeFlatButton = () => {
        console.log('[ON SWIPE]', isUp);
        startAnimation(isUp);
    };

    const renderItem = ({item, index}: RenderItem) => {
        return (
            <View>
                <Text style={{color: 'black'}}>{item.name}</Text>
                <Text style={{color: 'black'}}>
                    {item.distanceInKilometers}
                </Text>
                <Text style={{color: 'black'}}>{item.totalTime}</Text>
                <Text style={{color: 'black'}}>
                    {item.distanceToRouteInKilometers}
                </Text>
            </View>
        );
    };

    return (
        <Animated.View style={[styles.container, {height: containerHeight}]}>
            <Swipe direction={!isUp ? 4 : 8} onSwipeAction={onSwipeFlatButton}>
                <View style={styles.flatButtonContainer}>
                    <View style={styles.flatButton} />
                </View>
            </Swipe>
            <CurvedShape />
            <View style={styles.listContainer}>
                <FlatList
                    data={d}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={isUp}
                />
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    flatButtonContainer: {
        position: 'absolute',
        top: 1,
        // backgroundColor: 'red',
        paddingVertical: 20,
        zIndex: 1,
    },
    flatButton: {
        height: 4,
        width: getHorizontalPx(153),
        borderRadius: 3.5,
        backgroundColor: '#555555',
    },
    listContainer: {
        marginTop: getVerticalPx(60),
        width: '100%',
        paddingHorizontal: 40,
        backgroundColor: 'lightgrey',
    },
});

export default BottomList;

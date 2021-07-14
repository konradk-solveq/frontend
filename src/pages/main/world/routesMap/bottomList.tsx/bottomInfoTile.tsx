import React, {useRef, useState} from 'react';
import {useEffect} from 'react';
import {Animated, View} from 'react-native';

import {getVerticalPx} from '../../../../../helpers/layoutFoo';
import {Map} from '../../../../../models/map.model';

import {ImageBtn} from '../../../../../sharedComponents/buttons';
import Tile from './tile/tile';
import Swipe from '../../../../../sharedComponents/navi/swipe/swipe';
import CurvedShape from '../../../../../sharedComponents/svg/curvedShape';

import styles from './style';

const zeroContainerHeight = 0;
const minContainerHeight = getVerticalPx(148);
const maxContainerHeight = getVerticalPx(400);

interface IProps {
    data: Map;
    onPress: (mapID: string) => void;
    onHidePress: () => void;
    show: boolean;
}

const BottomInfoTile: React.FC<IProps> = ({
    data,
    onPress,
    show,
    onHidePress,
}: IProps) => {
    const containerHeight = useRef(new Animated.Value(zeroContainerHeight))
        .current;
    const [isVisible, setIsVisible] = useState(false);
    const [isUp, setIsUp] = useState(false);

    useEffect(() => {
        Animated.timing(containerHeight, {
            toValue: show ? minContainerHeight : zeroContainerHeight,
            duration: 800,
            useNativeDriver: false,
        }).start(() => {
            setIsVisible(show);
        });
    }, [show, containerHeight]);

    const topPositionInterpolation = containerHeight.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    useEffect(() => {
        if (isVisible) {
            const shoudlMaximize =
                containerHeight?.__getValue() < minContainerHeight;
            if (shoudlMaximize) {
                const heigh = !isUp ? minContainerHeight : maxContainerHeight;
                Animated.timing(containerHeight, {
                    toValue: heigh,
                    duration: 800,
                    useNativeDriver: false,
                }).start();
            }
        }
    }, [data, containerHeight, isUp, isVisible]);

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
        onHidePress();
        if (!data) {
            return;
        }

        startAnimation(isUp);
    };

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    height: containerHeight,
                    opacity: topPositionInterpolation,
                },
            ]}>
            <Swipe direction={!isUp ? 4 : 8} onSwipeAction={onSwipeFlatButton}>
                <View style={styles.flatButtonContainer}>
                    <View style={styles.flatButton} />
                </View>
            </Swipe>
            <CurvedShape />
            {data && (
                <View style={styles.listContainer}>
                    <Tile
                        data={data}
                        onPressTile={onPress}
                        onPressButton={onPress}
                    />
                    <View style={styles.imageWrapper}>
                        <View style={styles.imageContainer}>
                            {data?.url ? (
                                <ImageBtn
                                    imgUrl={data?.url}
                                    onPress={onPress}
                                />
                            ) : (
                                <View style={styles.imagePlaceholder} />
                            )}
                        </View>
                    </View>
                </View>
            )}
        </Animated.View>
    );
};

export default BottomInfoTile;

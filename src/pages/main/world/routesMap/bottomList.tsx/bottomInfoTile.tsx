import React, {useRef, useState, useEffect} from 'react';
import {Animated, View, Text, Platform, Dimensions} from 'react-native';

import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {getVerticalPx} from '@helpers/layoutFoo';
import {MarkerDetailsType} from '@models/map.model';

import {ImageBtn} from '@sharedComponents/buttons';
import Tile from './tile/tile';
import Swipe from '@sharedComponents/navi/swipe/swipe';
import CurvedShape from '@sharedComponents/svg/curvedShape';

import styles from './style';

const isIOS = Platform.OS === 'ios';
const {height} = Dimensions.get('window');

const IOSHeight = height > 680 ? 148 : 168;
const zeroContainerHeight = 0;
const minContainerHeight = getVerticalPx(isIOS ? IOSHeight : 148);
const maxContainerHeight = getVerticalPx(600);

interface IProps {
    data: MarkerDetailsType | null;
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
    const {t} = useMergedTranslation('MainRoutesMap.bottomTile');

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
            if (!show) {
                setIsUp(false);
            }
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
                    // opacity: topPositionInterpolation,
                },
            ]}>
            <Swipe direction={!isUp ? 4 : 8} onSwipeAction={onSwipeFlatButton}>
                <View style={styles.innerContainer}>
                    <View style={styles.flatButtonContainer}>
                        <View style={styles.flatButton} />
                    </View>
                    {data && (
                        <>
                            <CurvedShape />
                            <View style={styles.listContainer}>
                                <Tile
                                    data={data}
                                    onPressTile={onPress}
                                    onPressButton={onPress}
                                />
                                <View style={styles.imageWrapper}>
                                    <Text style={styles.imageHeader}>
                                        {t('finMoreInfo')}
                                    </Text>
                                    <View style={styles.imageContainer}>
                                        {data?.mapImageUrl ? (
                                            <ImageBtn
                                                imgUrl={data.mapImageUrl}
                                                onPress={() => onPress(data.id)}
                                            />
                                        ) : (
                                            <View
                                                style={styles.imagePlaceholder}
                                            />
                                        )}
                                    </View>
                                </View>
                            </View>
                        </>
                    )}
                </View>
            </Swipe>
        </Animated.View>
    );
};

export default React.memo(BottomInfoTile);

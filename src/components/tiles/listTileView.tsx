import React from 'react';
import {View, Image, Pressable} from 'react-native';
import {
    Demi14h48,
    Demi16h36,
    Demi18h28,
    Demi18h28crop,
} from '@components/texts/texts';
import RouteImagePlaceholder from '@sharedComponents/images/routeListImagePlaceholder';
import {
    LikeIcon,
    MoreIcon,
    SaveIcon,
    ShareIcon,
    EditIcon,
} from '../icons/reactionIcons';
import {styles} from './style';
interface PropsI {
    tilePressOn: () => void;
    fullDate: string;
    imagesToDisplay: string;
    name: string;
    distanceAndTime: string;
    distanceToStart: string;
    difficultyAndSurface: string;
    checkLike: boolean;
    numberOfLikes: number;
    likePressOn: (state: boolean) => void;
    addToFavoritesPressOn: () => void;
    editPressOn: () => void;
    detailsPressOn: () => void;
    mode: 'public' | 'my' | 'saved' | 'featured';
    testID?: string;
}

const ListTileView: React.FC<PropsI> = ({
    tilePressOn,
    fullDate,
    imagesToDisplay,
    name,
    distanceAndTime,
    distanceToStart,
    difficultyAndSurface,
    checkLike,
    numberOfLikes,
    likePressOn,
    addToFavoritesPressOn,
    editPressOn,
    detailsPressOn,
    mode,
    testID,
}) => {
    return (
        <Pressable onPress={tilePressOn} testID={testID || 'list-tile'}>
            <View
                style={mode === 'featured' ? styles.wrapFeatured : styles.wrap}>
                <Demi14h48>{fullDate}</Demi14h48>
                <View style={styles.area}>
                    <View style={styles.tile}>
                        <View style={styles.imageWrapper}>
                            {imagesToDisplay ? (
                                <Image
                                    source={{
                                        uri: imagesToDisplay,
                                    }}
                                    style={styles.image}
                                    resizeMode="cover"
                                />
                            ) : (
                                <View style={[styles.image, styles.noImage]}>
                                    <RouteImagePlaceholder />
                                </View>
                            )}
                        </View>
                        <View style={styles.description}>
                            <Demi18h28crop>{name}</Demi18h28crop>
                            <Demi18h28>{distanceAndTime}</Demi18h28>
                            <View style={styles.row}>
                                <Demi16h36>{distanceToStart}</Demi16h36>
                                <Demi16h36>{difficultyAndSurface}</Demi16h36>
                            </View>

                            <View style={styles.reactions}>
                                {mode !== 'my' && (
                                    <LikeIcon
                                        check={checkLike}
                                        value={numberOfLikes}
                                        onPress={likePressOn}
                                    />
                                )}

                                {(mode === 'public' || mode === 'featured') && (
                                    <View style={styles.iconWrap}>
                                        <SaveIcon
                                            check={false}
                                            onPress={addToFavoritesPressOn}
                                        />
                                    </View>
                                )}

                                {mode !== 'my' && (
                                    <ShareIcon onPress={() => {}} />
                                )}

                                {mode === 'my' && (
                                    <EditIcon onPress={editPressOn} />
                                )}
                            </View>

                            <View style={styles.edit}>
                                <MoreIcon onPress={detailsPressOn} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

export default ListTileView;

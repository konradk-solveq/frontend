import React, {useState} from 'react';
import {View, Image, Pressable} from 'react-native';
import {
    BodySecondary,
    Demi14h48,
    Demi16h36,
    Demi18h28,
    Demi18h28crop,
    Header2,
} from '@components/texts/texts';
import RouteImagePlaceholder from '@sharedComponents/images/routeListImagePlaceholder';
import {styles} from './style';
import {TextIcon} from '../icons';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
interface PropsI {
    tilePressOn: () => void;
    fullDate: string;
    imagesToDisplay: string;
    name: string;
    distanceAndTime: string;
    distanceToStart: string;
    difficultyAndSurface: string;
    checkPublic?: boolean;
    checkUserFavorite?: boolean;
    checkLike: boolean;
    numberOfLikes: number;
    likePressOn: (state: boolean) => void;
    addToFavoritesPressOn: () => void;
    editPressOn: () => void;
    detailsPressOn: () => void;
    onPressShare?: () => void;
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
    checkPublic,
    checkUserFavorite,
    checkLike,
    numberOfLikes,
    likePressOn,
    addToFavoritesPressOn,
    editPressOn,
    detailsPressOn,
    onPressShare,
    mode,
    testID,
}) => {
    const {t} = useMergedTranslation('MainWorld.Tile');
    const [likeChecked, setLikeChecked] = useState(checkLike);
    const [saveChecked, setSaveChecked] = useState(checkUserFavorite);

    const handleLikeOnPress = () => {
        const state = !likeChecked;
        if (likePressOn) {
            likePressOn(state);
        }
        setLikeChecked(state);
    };

    const handleSaveOnPress = () => {
        const state = !saveChecked;
        if (addToFavoritesPressOn) {
            addToFavoritesPressOn();
        }
        setSaveChecked(state);
    };

    const onPressShareHandler = () => {
        if (onPressShare) {
            onPressShare();
        }
    };

    return (
        <Pressable onPress={tilePressOn} testID={testID || 'list-tile'}>
            <View
                style={mode === 'featured' ? styles.wrapFeatured : styles.wrap}>
                {mode === 'my' && <Demi14h48>{fullDate}</Demi14h48>}
                <View style={mode === 'my' ? styles.areaMy : styles.area}>
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
                            {mode === 'my' && checkPublic && (
                                <View style={styles.publicWrap}>
                                    <BodySecondary style={styles.public}>
                                        {t('public')}
                                    </BodySecondary>
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
                                    <Pressable onPress={handleLikeOnPress}>
                                        <View style={styles.iconWrap}>
                                            <TextIcon
                                                icon={
                                                    likeChecked
                                                        ? MykrossIconFont.MYKROSS_ICON_LIKE_ON
                                                        : MykrossIconFont.MYKROSS_ICON_LIKE_OFF
                                                }
                                                style={styles.icon}
                                            />
                                            <Header2 style={styles.iconNumber}>
                                                {numberOfLikes}
                                            </Header2>
                                        </View>
                                    </Pressable>
                                )}

                                {(mode === 'public' || mode === 'featured') && (
                                    <View style={styles.reactionWrap}>
                                        <Pressable onPress={handleSaveOnPress}>
                                            <TextIcon
                                                icon={
                                                    saveChecked
                                                        ? MykrossIconFont.MYKROSS_ICON_SAVE_ON
                                                        : MykrossIconFont.MYKROSS_ICON_SAVE_OFF
                                                }
                                                style={styles.icon}
                                            />
                                        </Pressable>
                                    </View>
                                )}

                                {mode !== 'my' && (
                                    <Pressable onPress={onPressShareHandler}>
                                        <TextIcon
                                            icon={
                                                MykrossIconFont.MYKROSS_ICON_ALT_SHARE
                                            }
                                            style={styles.icon}
                                        />
                                    </Pressable>
                                )}

                                {mode === 'my' && (
                                    <Pressable onPress={editPressOn}>
                                        <TextIcon
                                            icon={
                                                MykrossIconFont.MYKROSS_ICON_EDIT
                                            }
                                            style={styles.icon}
                                        />
                                    </Pressable>
                                )}
                            </View>

                            {mode !== 'public' && (
                                <View style={styles.edit}>
                                    <Pressable onPress={detailsPressOn}>
                                        <TextIcon
                                            icon={
                                                MykrossIconFont.MYKROSS_ICON_MORE
                                            }
                                            style={styles.icon}
                                        />
                                    </Pressable>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

export default ListTileView;

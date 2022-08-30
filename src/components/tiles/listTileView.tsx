import React, {useCallback, useEffect, useState} from 'react';
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
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {isIOS} from '@utils/platform';
import {MYKROSS_ICON_NATIVE_SHARE_ICON} from '@theme/utils/getNativeShareIcon';
import colors from '@theme/colors';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';

const ICON_SIZE = 24;
const VERTICAL_INSET = getFVerticalPx(15);
const HORIZONTAL_INSET = getFHorizontalPx(10);
const INSETS = {
    top: VERTICAL_INSET,
    bottom: VERTICAL_INSET,
    left: HORIZONTAL_INSET,
    right: HORIZONTAL_INSET,
};

interface PropsI {
    tilePressOn: () => void;
    fullDate: string;
    imageToDisplay?: string;
    name: string;
    distanceAndTime: string;
    distanceToStart: string;
    difficultyAndSurface: string;
    checkPublic?: boolean;
    checkUserFavorite?: boolean;
    checkLike: boolean;
    numberOfLikes: number;
    likePressOn: (state: boolean) => void;
    toggleFavoritePressOn: (state: boolean) => void;
    editPressOn: () => void;
    detailsPressOn: () => void;
    onPressShare?: () => void;
    hideDistanceToStart?: boolean;
    mode: 'public' | 'my' | 'saved' | 'featured';
    testID?: string;
}

const ListTileView: React.FC<PropsI> = ({
    tilePressOn,
    fullDate,
    imageToDisplay,
    name,
    distanceAndTime,
    distanceToStart,
    difficultyAndSurface,
    checkPublic,
    checkUserFavorite,
    checkLike,
    numberOfLikes,
    likePressOn,
    toggleFavoritePressOn,
    editPressOn,
    detailsPressOn,
    onPressShare,
    mode,
    hideDistanceToStart,
    testID,
}) => {
    const {t} = useMergedTranslation('MainWorld.Tile');
    const [saveChecked, setSaveChecked] = useState(checkUserFavorite);

    const handleLikeOnPress = useCallback(() => {
        likePressOn(!checkLike);
    }, [likePressOn, checkLike]);

    useEffect(() => {
        setSaveChecked(checkUserFavorite);
    }, [checkUserFavorite]);

    const handleSaveOnPress = () => {
        setSaveChecked(prev => {
            if (toggleFavoritePressOn) {
                toggleFavoritePressOn(!prev);
            }

            return !prev;
        });
    };

    const onPressShareHandler = () => {
        if (onPressShare) {
            onPressShare();
        }
    };

    const PressableComponent = isIOS ? TouchableWithoutFeedback : Pressable;

    return (
        <PressableComponent
            onPress={tilePressOn}
            testID={testID || 'list-tile'}>
            <View
                style={mode === 'featured' ? styles.wrapFeatured : styles.wrap}>
                {mode === 'my' && <Demi14h48>{fullDate}</Demi14h48>}
                <View style={mode === 'my' ? styles.areaMy : styles.area}>
                    <View style={styles.tile}>
                        <View style={styles.imageWrapper}>
                            {imageToDisplay ? (
                                <Image
                                    source={{
                                        uri: imageToDisplay,
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
                                <Demi16h36>
                                    {!hideDistanceToStart &&
                                        `${distanceToStart} ${t(
                                            'distanceToStart',
                                        )}`}
                                </Demi16h36>
                                <Demi16h36>{difficultyAndSurface}</Demi16h36>
                            </View>

                            <View style={styles.reactions}>
                                {((mode === 'my' && checkPublic) ||
                                    mode !== 'my') && (
                                    <PressableComponent
                                        hitSlop={INSETS}
                                        onPress={handleLikeOnPress}>
                                        <View style={styles.iconWrap}>
                                            <TextIcon
                                                icon={
                                                    checkLike
                                                        ? MykrossIconFont.MYKROSS_ICON_LIKE_ON
                                                        : MykrossIconFont.MYKROSS_ICON_LIKE_OFF
                                                }
                                                iconColor={colors.black}
                                                iconSize={ICON_SIZE}
                                            />
                                            <Header2 style={styles.iconNumber}>
                                                {numberOfLikes}
                                            </Header2>
                                        </View>
                                    </PressableComponent>
                                )}
                                {mode !== 'my' && (
                                    <View style={styles.reactionWrap}>
                                        <PressableComponent
                                            hitSlop={INSETS}
                                            onPress={handleSaveOnPress}>
                                            <TextIcon
                                                icon={
                                                    saveChecked
                                                        ? MykrossIconFont.MYKROSS_ICON_SAVE_ON
                                                        : MykrossIconFont.MYKROSS_ICON_SAVE_OFF
                                                }
                                                iconColor={colors.black}
                                                iconSize={ICON_SIZE}
                                            />
                                        </PressableComponent>
                                    </View>
                                )}

                                {((mode === 'my' && checkPublic) ||
                                    mode !== 'my') && (
                                    <PressableComponent
                                        hitSlop={INSETS}
                                        onPress={onPressShareHandler}>
                                        <TextIcon
                                            icon={
                                                MYKROSS_ICON_NATIVE_SHARE_ICON
                                            }
                                            iconColor={colors.black}
                                            iconSize={ICON_SIZE}
                                        />
                                    </PressableComponent>
                                )}

                                {mode === 'my' && !checkPublic && (
                                    <PressableComponent
                                        hitSlop={INSETS}
                                        onPress={editPressOn}>
                                        <TextIcon
                                            icon={
                                                MykrossIconFont.MYKROSS_ICON_EDIT
                                            }
                                            iconColor={colors.black}
                                            iconSize={ICON_SIZE}
                                        />
                                    </PressableComponent>
                                )}
                            </View>

                            {mode !== 'public' && (
                                <View style={styles.edit}>
                                    <PressableComponent
                                        hitSlop={INSETS}
                                        onPress={detailsPressOn}>
                                        <TextIcon
                                            icon={
                                                MykrossIconFont.MYKROSS_ICON_MORE
                                            }
                                            iconColor={colors.black}
                                            iconSize={ICON_SIZE}
                                        />
                                    </PressableComponent>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </View>
        </PressableComponent>
    );
};

export default React.memo(ListTileView);

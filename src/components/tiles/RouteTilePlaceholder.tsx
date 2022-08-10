import React from 'react';
import {View, Image, Pressable} from 'react-native';
import {
    Demi14h48,
    Demi16h36,
    Demi18h28,
    Demi18h28crop,
    Header3,
} from '@components/texts/texts';
import {styles} from './style';
import {TextIcon} from '../icons';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {isIOS} from '@src/utils/platform';
import RouteImagePlaceholderIcon from '../svg/RouteImagePlaceholderIcon';
import colors from '@src/theme/colors';
import {AnimatedPlaceholder} from '../placeholders';
import {getFVerticalPx} from '@src/helpers/appLayoutDimensions';
import {getFHorizontalPx} from '@src/theme/utils/appLayoutDimensions';

const BORDER_RADIUS = getFHorizontalPx(6);

interface IProps {
    tilePressOn: () => void;
    fullDate: string;
    imageUrl?: string;
    name: string;
    distanceAndTime?: string;
    distanceToStart?: string;
    difficultyAndSurface?: string;
    editPressOn: () => void;
    testID?: string;
    detailsPressOn: () => void;
    isDataNotComplete: boolean;
}

const RouteTilePlaceholder: React.FC<IProps> = ({
    detailsPressOn,
    name,
    imageUrl,
    fullDate,
    editPressOn,
    testID,
    tilePressOn,
    distanceAndTime,
    distanceToStart,
    difficultyAndSurface,
    isDataNotComplete,
}) => {
    const {t} = useMergedTranslation('MainWorld.Tile');

    const PressableComponent = isIOS ? TouchableWithoutFeedback : Pressable;

    return (
        <PressableComponent
            onPress={tilePressOn}
            testID={testID || 'placeholder-list-tile'}>
            <View style={styles.wrap}>
                <Demi14h48>{fullDate}</Demi14h48>
                <View style={styles.area}>
                    <View style={styles.tile}>
                        <View style={styles.imageWrapper}>
                            {imageUrl ? (
                                <Image
                                    source={{
                                        uri: imageUrl,
                                    }}
                                    style={styles.image}
                                    resizeMode="cover"
                                />
                            ) : (
                                <View style={styles.imagePlaceholder}>
                                    <RouteImagePlaceholderIcon />
                                    <Header3
                                        style={styles.placeholderText}
                                        color={colors.red}>
                                        {`${t('routePlaceholderTitle')}...`}
                                    </Header3>
                                </View>
                            )}
                        </View>
                        <View style={styles.description}>
                            <Demi18h28crop>{name}</Demi18h28crop>
                            {!isDataNotComplete ? (
                                <Demi18h28>{distanceAndTime}</Demi18h28>
                            ) : (
                                <AnimatedPlaceholder
                                    layout={{
                                        width: getFHorizontalPx(130),
                                        height: getFVerticalPx(20),
                                    }}
                                    showPlaceholder
                                    containerStyle={{
                                        backgroundColor: colors.darkGrey,
                                        borderRadius: BORDER_RADIUS,
                                    }}>
                                    <View style={{height: '100%'}} />
                                </AnimatedPlaceholder>
                            )}

                            <View style={styles.row}>
                                {!isDataNotComplete ? (
                                    <Demi16h36>
                                        {distanceToStart} {t('distanceToStart')}
                                    </Demi16h36>
                                ) : (
                                    <View style={styles.placeholderRow}>
                                        <AnimatedPlaceholder
                                            layout={{
                                                width: getFHorizontalPx(70),
                                                height: getFVerticalPx(20),
                                            }}
                                            showPlaceholder
                                            containerStyle={{
                                                backgroundColor:
                                                    colors.darkGrey,
                                                borderRadius: BORDER_RADIUS,
                                            }}>
                                            <View style={{height: '100%'}} />
                                        </AnimatedPlaceholder>
                                    </View>
                                )}
                                {!isDataNotComplete ? (
                                    <Demi16h36>
                                        {difficultyAndSurface}
                                    </Demi16h36>
                                ) : (
                                    <View style={styles.placeholderRow}>
                                        <AnimatedPlaceholder
                                            layout={{
                                                width: getFHorizontalPx(100),
                                                height: getFVerticalPx(20),
                                            }}
                                            showPlaceholder
                                            containerStyle={{
                                                backgroundColor:
                                                    colors.darkGrey,
                                                borderRadius: BORDER_RADIUS,
                                            }}>
                                            <View
                                                style={{
                                                    height: '100%',
                                                    borderRadius: getFVerticalPx(
                                                        10,
                                                    ),
                                                }}
                                            />
                                        </AnimatedPlaceholder>
                                    </View>
                                )}
                            </View>

                            <View style={styles.reactions}>
                                <PressableComponent onPress={editPressOn}>
                                    <TextIcon
                                        icon={MykrossIconFont.MYKROSS_ICON_EDIT}
                                        style={styles.icon}
                                    />
                                </PressableComponent>
                            </View>

                            <View style={styles.edit}>
                                <PressableComponent onPress={detailsPressOn}>
                                    <TextIcon
                                        icon={MykrossIconFont.MYKROSS_ICON_MORE}
                                        style={styles.icon}
                                    />
                                </PressableComponent>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </PressableComponent>
    );
};

export default React.memo(RouteTilePlaceholder);

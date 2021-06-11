import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';

import {I18n} from '../../../../../../I18n/I18n';
import {Map} from '../../../../../models/map.model';

import {
    BikeIcon,
    ClockIcon,
    MoreIcon,
    MountainIcon,
    WayIcon,
    DownloadIcon,
} from '../../../../../sharedComponents/svg/icons';
import TileBackground from './tileBackground';
import RouteImagePlaceholder from '../../../../../sharedComponents/images/routeListImagePlaceholder';

import styles from './style';

interface IProps {
    mapData: Map;
    images: {images: string[]; mapImg: string};
    onPress: (state: boolean, mapID: string) => void;
    onPressTile?: (mapID: string) => void;
    tilePressable?: boolean;
}

const FirstTile: React.FC<IProps> = ({
    mapData,
    images,
    onPress,
    onPressTile,
    tilePressable,
}: IProps) => {
    const trans: any = I18n.t('MainWorld.BikeMap');

    const onTilePressedHandler = () => {
        if (!tilePressable || !onPressTile) {
            return;
        }
        onPressTile(mapData.id);
    };

    const onDetailsButtonPressedHandler = () => {
        onPress(true, mapData.id);
    };

    return (
        <Pressable onPress={onTilePressedHandler}>
            <TileBackground>
                <View style={styles.container}>
                    <View style={styles.imageWrapper}>
                        {images?.images?.length && images.images?.[0] ? (
                            <Image
                                source={{
                                    uri: images.images[0],
                                }}
                                style={styles.image}
                                resizeMode="cover"
                            />
                        ) : (
                            <RouteImagePlaceholder />
                        )}
                    </View>
                    <View style={styles.sectionsContainer}>
                        <View style={styles.firstSection}>
                            <Text
                                numberOfLines={1}
                                style={styles.tileSectionTitle}>
                                {mapData?.name || trans.noTitle}
                            </Text>
                            <View style={styles.firstSectionContent}>
                                <Text style={styles.distanceToStart}>
                                    {mapData.distanceToRouteInKilometers}
                                    {trans.distanceToStart}
                                </Text>
                                <View style={styles.raitingContainer}>
                                    <View style={styles.borderVerticalLine} />
                                    <Text style={styles.ratingValue}>
                                        <DownloadIcon
                                            iconStyle={styles.raitingIcon}
                                        />
                                        {mapData?.rating || '-'}
                                    </Text>
                                </View>
                            </View>
                            <Text
                                numberOfLines={1}
                                style={styles.localizationDescription}>
                                {mapData?.description?.short || ''}
                            </Text>
                        </View>
                        <View style={styles.borderLine} />
                        <View style={styles.secondtSection}>
                            <View style={styles.sectionContentRow}>
                                <View style={styles.sectionTextRow}>
                                    <BikeIcon
                                        iconStyle={styles.secondSectionIcon}
                                    />
                                    <Text style={styles.secondSectionText}>
                                        {mapData.distanceInKilometers || '-'}{' '}
                                        <Text
                                            style={styles.secondSectionSuffix}>
                                            {trans.distanceUnit}
                                        </Text>
                                    </Text>
                                </View>
                                <View style={styles.sectionTextRow}>
                                    <ClockIcon
                                        iconStyle={styles.secondSectionIcon}
                                    />
                                    <Text style={styles.secondSectionText}>
                                        {mapData?.formattedTimeString || '-:--'}{' '}
                                        <Text
                                            style={styles.secondSectionSuffix}>
                                            {trans.timeUnit}
                                        </Text>
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.borderLine} />
                        <View style={styles.thirdSection}>
                            <View style={styles.sectionContentRow}>
                                <View style={styles.thirdSectionFirstColumn}>
                                    <View
                                        style={[
                                            styles.sectionTextRow,
                                            styles.thirdSectionFirstColumnLeftValue,
                                        ]}>
                                        <MountainIcon
                                            iconStyle={styles.mountainIcon}
                                        />
                                        <Text style={styles.thirdSectionText}>
                                            {mapData?.firstPickedDifficulty ||
                                                ''}
                                        </Text>
                                    </View>
                                    <View
                                        style={[
                                            styles.sectionTextRow,
                                            styles.thirdSectionFirstColumnRightValue,
                                        ]}>
                                        <WayIcon iconStyle={styles.wayIcon} />
                                        <Text style={styles.thirdSectionText}>
                                            {mapData?.firstPickedSurface || ''}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.thirdSectionSecondColumn}>
                                    <Pressable
                                        onPress={onDetailsButtonPressedHandler}
                                        hitSlop={20}>
                                        <MoreIcon />
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </TileBackground>
        </Pressable>
    );
};

export default FirstTile;

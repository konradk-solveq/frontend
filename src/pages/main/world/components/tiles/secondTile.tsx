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
import {getImageToDisplay} from '@utils/transformData';

import styles, {secondTileStyles} from './style';

interface IProps {
    mapData: Map;
    images: {images: string[]; mapImg: string};
    onPress: (state: boolean, mapID: string) => void;
    onPressTile?: (mapID: string) => void;
    tilePressable?: boolean;
}

const SecondTile: React.FC<IProps> = ({
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

    const imagesToDisplay = getImageToDisplay(images);

    return (
        <Pressable onPress={onTilePressedHandler}>
            <TileBackground>
                <View style={secondTileStyles.container}>
                    <View style={secondTileStyles.sectionsContainer}>
                        <View style={secondTileStyles.firstSection}>
                            <View
                                style={secondTileStyles.firstSectionLeftColumn}>
                                <View style={secondTileStyles.imageWrapper}>
                                    <View style={secondTileStyles.imageWrapper}>
                                        {imagesToDisplay ? (
                                            <Image
                                                source={{
                                                    uri: imagesToDisplay,
                                                }}
                                                style={secondTileStyles.image}
                                                resizeMode="cover"
                                            />
                                        ) : (
                                            <RouteImagePlaceholder
                                                noBackgroundImage
                                                containerStyles={
                                                    styles.placeholderLogo
                                                }
                                                logoSize={{
                                                    height: 22,
                                                    width: 28,
                                                }}
                                            />
                                        )}
                                    </View>
                                </View>
                            </View>
                            <View
                                style={
                                    secondTileStyles.firstSectionRightColumn
                                }>
                                <Text
                                    style={styles.tileSectionTitle}
                                    numberOfLines={1}>
                                    {mapData?.name || trans.noTitle}
                                </Text>
                                <View style={styles.firstSectionContent}>
                                    <Text
                                        style={[
                                            styles.distanceToStart,
                                            styles.column,
                                        ]}>
                                        {mapData.distanceToRouteInKilometers}
                                        {trans.distanceToStart}
                                    </Text>
                                    <View
                                        style={[
                                            styles.raitingContainer,
                                            styles.column,
                                        ]}>
                                        <View
                                            style={styles.borderVerticalLine}
                                        />
                                        <Text style={styles.ratingValue}>
                                            <DownloadIcon
                                                iconStyle={styles.raitingIcon}
                                            />
                                            {mapData?.downloads || '-'}
                                        </Text>
                                    </View>
                                </View>
                                <Text
                                    numberOfLines={2}
                                    style={styles.localizationDescription}>
                                    {mapData?.description?.short || ''}
                                </Text>
                            </View>
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
                        <View style={secondTileStyles.thirdSection}>
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

export default SecondTile;

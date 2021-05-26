import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';

import {
    BikeIcon,
    ClockIcon,
    MoreIcon,
    MountainIcon,
    WayIcon,
    DownloadIcon,
} from '../../../../../sharedComponents/svg/icons';
import {I18n} from '../../../../../../I18n/I18n';
import {MapType} from '../../../../../models/map.model';

import TileBackground from './tileBackground';
import RouteImagePlaceholder from '../../../../../sharedComponents/images/routeListImagePlaceholder';

import styles, {nextTileStyles} from './style';

interface IProps {
    mapData: MapType;
    onPress: (state: boolean, mapID: string) => void;
}

const NextTile: React.FC<IProps> = ({mapData, onPress}: IProps) => {
    const trans: any = I18n.t('MainWorld.BikeMap');

    const onDetailsButtonPressedHandler = () => {
        onPress(true, mapData.id);
    };

    return (
        <TileBackground>
            <View style={nextTileStyles.container}>
                <View style={nextTileStyles.sectionsContainer}>
                    <View style={nextTileStyles.firstSection}>
                        <View style={nextTileStyles.firstSectionLeftColumn}>
                            <View style={nextTileStyles.imageWrapper}>
                                {mapData?.details?.images?.length ? (
                                    <Image
                                        source={{
                                            uri: mapData.details.images[0],
                                        }}
                                        style={nextTileStyles.image}
                                        resizeMode="cover"
                                    />
                                ) : (
                                    <RouteImagePlaceholder
                                        noBackgroundImage
                                        containerStyles={styles.placeholderLogo}
                                        logoSize={{height: 22, width: 28}}
                                    />
                                )}
                            </View>
                        </View>
                        <View style={nextTileStyles.firstSectionRightColumn}>
                            <Text
                                style={styles.tileSectionTitle}
                                numberOfLines={1}>
                                {mapData?.name || trans.noTitle}
                            </Text>
                            <View style={nextTileStyles.firstSectionContent}>
                                <Text
                                    style={[
                                        styles.distanceToStart,
                                        styles.column,
                                    ]}>
                                    1,2{trans.distanceToStart}
                                </Text>
                                <View
                                    style={[
                                        styles.raitingContainer,
                                        styles.column,
                                    ]}>
                                    <View style={styles.borderVerticalLine} />
                                    <Text style={styles.ratingValue}>
                                        <DownloadIcon
                                            iconStyle={styles.raitingIcon}
                                        />
                                        {mapData?.rating || '-'}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.borderLine} />
                            <View style={nextTileStyles.secondtSection}>
                                <View style={styles.sectionContentRow}>
                                    <View style={styles.sectionTextRow}>
                                        <BikeIcon
                                            iconStyle={styles.secondSectionIcon}
                                        />
                                        <Text style={styles.secondSectionText}>
                                            {mapData?.totalDistance || '-'}{' '}
                                            <Text
                                                style={
                                                    styles.secondSectionSuffix
                                                }>
                                                {trans.distanceUnit}
                                            </Text>
                                        </Text>
                                    </View>
                                    <View style={styles.sectionTextRow}>
                                        <ClockIcon
                                            iconStyle={styles.secondSectionIcon}
                                        />
                                        <Text style={styles.secondSectionText}>
                                            {mapData?.totalTime || '-:--'}{' '}
                                            <Text
                                                style={
                                                    styles.secondSectionSuffix
                                                }>
                                                {trans.timeUnit}
                                            </Text>
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.borderLine} />
                        </View>
                    </View>
                    <View style={nextTileStyles.thirdSection}>
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
                                        {mapData?.details?.level || ''}
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        styles.sectionTextRow,
                                        styles.thirdSectionFirstColumnRightValue,
                                    ]}>
                                    <WayIcon iconStyle={styles.wayIcon} />
                                    <Text style={styles.thirdSectionText}>
                                        {mapData?.details?.pavement?.[0] || ''}
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
    );
};

export default NextTile;

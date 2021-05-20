import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/core';

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

import styles, {nextTileStyles} from './style';

interface IProps {
    mapData: MapType;
}

const NextTile: React.FC<IProps> = ({mapData}: IProps) => {
    const trans: any = I18n.t('MainWorld.BikeMap');
    const navigation = useNavigation();

    const onDetailsButtonPressedHandler = () => {
        navigation.navigate({
            name: 'RouteDetailsScreen',
            params: {mapID: mapData.id},
        });
    };

    return (
        <TileBackground>
            <View style={nextTileStyles.container}>
                <View style={nextTileStyles.sectionsContainer}>
                    <View style={nextTileStyles.firstSection}>
                        <View style={nextTileStyles.firstSectionLeftColumn}>
                            <View style={nextTileStyles.imageWrapper}>
                                {mapData?.details?.mapUrl ? (
                                    <Image
                                        source={{uri: mapData.details.mapUrl}}
                                        style={nextTileStyles.image}
                                        resizeMode="cover"
                                    />
                                ) : (
                                    <View style={styles.mImg} />
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
                            <View style={styles.secondtSection}>
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

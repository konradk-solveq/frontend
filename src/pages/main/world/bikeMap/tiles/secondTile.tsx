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

import styles, {secondTileStyles} from './style';
interface IProps {
    mapData: MapType;
}

const SecondTile: React.FC<IProps> = ({mapData}: IProps) => {
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
            <View style={secondTileStyles.container}>
                <View style={secondTileStyles.sectionsContainer}>
                    <View style={secondTileStyles.firstSection}>
                        <View style={secondTileStyles.firstSectionLeftColumn}>
                            <View style={secondTileStyles.imageWrapper}>
                                {mapData?.details?.mapUrl ? (
                                    <Image
                                        source={{uri: mapData.details.mapUrl}}
                                        style={secondTileStyles.image}
                                        resizeMode="cover"
                                    />
                                ) : (
                                    <View style={styles.mImg} />
                                )}
                            </View>
                        </View>
                        <View style={secondTileStyles.firstSectionRightColumn}>
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
                                    1 000{trans.distanceToStart}
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
                            <Text
                                numberOfLines={2}
                                style={styles.localizationDescription}>
                                {mapData?.details?.intro || ''}
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
                                    <Text style={styles.secondSectionSuffix}>
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
                                    <Text style={styles.secondSectionSuffix}>
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

export default SecondTile;

import React from 'react';
import {View, Text, Image} from 'react-native';

import {I18n} from '../../../../../../I18n/I18n';
import {getVerticalPx} from '../../../../../helpers/layoutFoo';
import {MapType} from '../../../../../models/map.model';

import ImageSwiper from '../../../../../sharedComponents/imageSwiper/imageSwiper';

import RideTile from './rideTile';

import styles from './styles';

interface IProps {
    mapData: MapType | undefined;
}

const Description: React.FC<IProps> = ({mapData}: IProps) => {
    const trans: any = I18n.t('RoutesDetails.details');

    return (
        <View style={styles.container}>
            <View>
                <Text
                    style={[
                        styles.textStyle,
                        styles.smallText,
                        styles.color555555,
                    ]}>
                    {`${trans.author}: ${mapData?.author || trans.noInfo}`}
                </Text>
                <Text style={[styles.textStyle, styles.title]}>
                    {mapData?.name || trans.noTitle}
                </Text>
                <Text
                    style={[
                        styles.textStyle,
                        styles.smallText,
                        styles.lightFont,
                        styles.color555555,
                    ]}>
                    1,2{trans.distanceToStart}
                </Text>
            </View>
            <View style={styles.tileWrapper}>
                <Text
                    style={[
                        styles.textStyle,
                        styles.lightFont,
                        styles.color555555,
                        {marginBottom: getVerticalPx(16)},
                    ]}>
                    {mapData?.details.localization || ''}
                </Text>
                <RideTile
                    distance={mapData?.totalDistance}
                    level={mapData?.details?.level}
                    type={mapData?.details?.pavement?.[0]}
                />
            </View>
            <View>
                <Text
                    style={[
                        styles.textStyle,
                        styles.smallText,
                        styles.color555555,
                    ]}>
                    {trans.descriptionTitle}
                </Text>
                <View style={[styles.descriptionContainer]}>
                    <Text
                        style={[
                            styles.textStyle,
                            styles.lightFont,
                            styles.descriptionTitle,
                        ]}>
                        {mapData?.details?.intro
                            ? `„${mapData.details.intro}”`
                            : ''}
                    </Text>
                    <Text style={[styles.textStyle, styles.lightFont]}>
                        {mapData?.details?.description || trans.noDescription}
                    </Text>
                </View>
            </View>
            <View style={styles.imagesContainer}>
                <Text
                    style={[
                        styles.textStyle,
                        styles.lightFont,
                        styles.color555555,
                        styles.imagesTitle,
                    ]}>
                    {trans.imagesTitle}
                </Text>
                {mapData && mapData?.details?.images?.length > 0 && (
                    <ImageSwiper images={mapData.details.images} />
                )}
            </View>
            <View style={styles.mapContainer}>
                <Text
                    style={[
                        styles.textStyle,
                        styles.lightFont,
                        styles.color555555,
                        styles.mapTitle,
                    ]}>
                    {trans.mapTitle}
                </Text>
                <View style={styles.mapImage}>
                    {mapData?.details?.mapUrl ? (
                        <Image
                            style={styles.mImg}
                            resizeMode="cover"
                            source={{uri: mapData.details.mapUrl}}
                        />
                    ) : (
                        <View style={styles.mImg} />
                    )}
                </View>
            </View>
            <View style={styles.tagsContainer}>
                <Text style={[styles.textStyle, styles.lightFont]}>
                    {trans.tagsTitle}
                </Text>
                <View style={styles.tagsWrapper}>
                    {mapData?.tags &&
                        mapData.tags.map(t => {
                            return (
                                <View key={t} style={styles.tag}>
                                    <Text
                                        style={[
                                            styles.textStyle,
                                            styles.color555555,
                                        ]}>
                                        {t}
                                    </Text>
                                </View>
                            );
                        })}
                </View>
            </View>
            <Text
                style={[
                    styles.textStyle,
                    styles.smallText,
                    styles.lightFont,
                    styles.color555555,
                ]}>
                {trans.creationPrefix}: {mapData?.date?.toLocaleString()}
            </Text>
        </View>
    );
};

export default Description;

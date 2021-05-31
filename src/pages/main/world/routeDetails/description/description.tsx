import React from 'react';
import {View, Text, Image} from 'react-native';

import {I18n} from '../../../../../../I18n/I18n';
import {getVerticalPx} from '../../../../../helpers/layoutFoo';
import {Map} from '../../../../../models/map.model';

import ImageSwiper from '../../../../../sharedComponents/imageSwiper/imageSwiper';
import RideTile from './rideTile';

import styles from './styles';

interface IProps {
    mapData: Map | undefined;
    images: {images: string[]; mapImg: string};
}

const Description: React.FC<IProps> = ({mapData, images}: IProps) => {
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
                    {mapData?.distanceToRouteInKilometers}
                    {trans.distanceToStart}
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
                    {mapData?.location || ''}
                </Text>
                <RideTile
                    distance={mapData?.distanceInKilometers}
                    level={mapData?.firstDifficulty}
                    type={mapData?.firstSurface}
                    time={mapData?.formattedTimeString}
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
                        {mapData?.description?.short
                            ? `„${mapData.description.short}”`
                            : ''}
                    </Text>
                    <Text style={[styles.textStyle, styles.lightFont]}>
                        {mapData?.description?.long || trans.noDescription}
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
                {mapData && images?.images?.length > 0 && (
                    <ImageSwiper images={images?.images} />
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
                    {images?.mapImg ? (
                        <Image
                            style={styles.mImg}
                            resizeMode="cover"
                            source={{uri: images?.mapImg}}
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
                    {mapData?.tags?.options &&
                        mapData.tags?.options.map(t => {
                            if (!t?.enumValue) {
                                return null;
                            }
                            if (!mapData.tags?.values.includes(t.enumValue)) {
                                return null;
                            }

                            return (
                                <View key={t?.enumValue} style={styles.tag}>
                                    <Text
                                        style={[
                                            styles.textStyle,
                                            styles.color555555,
                                        ]}>
                                        {t?.i18nValue}
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

import React from 'react';
import {View, Text, Image} from 'react-native';

import {I18n} from '../../../../../../I18n/I18n';
import {getVerticalPx} from '../../../../../helpers/layoutFoo';
import {MapType} from '../../../../../models/map.model';
import ImageSwiper from '../../../../../sharedComponents/imageSwiper/imageSwiper';

import RideTile from './rideTile';

import styles from './styles';

/* TODO: remove after selector added */
const example: MapType = {
    id: 'random-id-123',
    name: 'Przykładowy tytuł',
    coords: [],
    date: new Date(),
    details: {
        intro: 'Przykładowe intro',
        description: 'Przykładowy opis trasy.',
        localization: 'Miasto, województwo, Kraj',
        level: 'łatwa',
        pavement: ['ścieżka rowerowa'],
        images: [
            'https://kross.eu/media/cache/gallery/images/34/34231/hexagon_1_0_black_red_white_matte.png',
            'https://kross.eu/media/cache/gallery/images/36/36853/2021_KR Trans 5.0 D 28 M rub_cza p.jpg',
            'https://kross.eu/media/cache/gallery/images/31/31551/level_6_0_black_white_red_matte.png',
        ],
        mapUrl: '',
    },
    author: 'Jan Kowalski',
    totalDistance: 100,
    tags: ['widokowa', 'mały ruch'],
};

interface IProps {
    mapID: string;
}

const Description: React.FC<IProps> = ({mapID}: IProps) => {
    const trans: any = I18n.t('RoutesDetails.details');
    /* TODO: add selector for route details */
    return (
        <View style={styles.container}>
            <View>
                <Text
                    style={[
                        styles.textStyle,
                        styles.smallText,
                        styles.color555555,
                    ]}>
                    {`${trans.author}: ${example?.author || trans.noInfo}`}
                </Text>
                <Text style={[styles.textStyle, styles.title]}>
                    {example.name || trans.noTitle}
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
                    {example?.details.localization || ''}
                </Text>
                <RideTile
                    distance={example?.totalDistance}
                    level={example?.details?.level}
                    type={example?.details?.pavement?.[0]}
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
                        {example?.details?.intro
                            ? `„${example.details.intro}”`
                            : ''}
                    </Text>
                    <Text style={[styles.textStyle, styles.lightFont]}>
                        {example?.details?.description || trans.noDescription}
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
                {example?.details?.images?.length > 0 && (
                    <ImageSwiper images={example.details.images} />
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
                    {example?.details?.mapUrl ? (
                        <Image
                            style={styles.mImg}
                            resizeMode="cover"
                            source={{uri: example.details.mapUrl}}
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
                    {example.tags &&
                        example.tags.map(t => {
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
                {trans.creationPrefix}: {example.date.toLocaleString()}
            </Text>
        </View>
    );
};

export default Description;

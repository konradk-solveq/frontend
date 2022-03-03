import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text} from 'react-native';

import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {getVerticalPx} from '@helpers/layoutFoo';
import {useAppSelector} from '@hooks/redux';
import {Map} from '@models/map.model';
import {RegularStackRoute} from '@navigation/route';
import {ImageBtn} from '@sharedComponents/buttons';

import ImageSwiper from '@sharedComponents/imageSwiper/imageSwiper';
import {userNameSelector} from '@storage/selectors';
import {convertToDateWithTime} from '@utils/dateTime';
import FullScreenGallery from '../fullScreenGallery/FullScreenGallery';
import RideTile from './rideTile';

import styles from './styles';

interface IProps {
    mapData: Map | undefined;
    images: {images: string[]; mapImg: string; fullSizeImages: string[]};
    isPrivateView?: boolean;
    isFavView?: boolean;
    isFeaturedView?: boolean;
}

const Description: React.FC<IProps> = ({
    mapData,
    images,
    isPrivateView,
    isFavView,
    isFeaturedView,
}: IProps) => {
    const {t} = useMergedTranslation('RoutesDetails.details');
    const navigation = useNavigation();
    const userName = useAppSelector(userNameSelector);
    const privateName = isPrivateView ? userName : t('defaultAuthor');
    const authorName = mapData?.author || privateName;
    const [showImgPreview, setShowImgPreview] = useState(false);

    const onNavigateToMapPreview = () => {
        navigation.navigate({
            name: RegularStackRoute.MAP_PREVIEW_SCREEN,
            params: {
                mapId: mapData?.id,
                private: isPrivateView,
                favourite: isFavView,
                featured: isFeaturedView,
            },
        });
    };

    return (
        <View style={styles.container}>
            <View>
                <Text
                    style={[
                        styles.textStyle,
                        styles.smallText,
                        styles.color555555,
                    ]}>
                    {`${t('author')}: ${authorName}`}
                </Text>
                <Text style={[styles.textStyle, styles.title]}>
                    {mapData?.name || t('noTitle')}
                </Text>
                {mapData?.distanceToRouteInKilometers !== '-' ? (
                    <Text
                        style={[
                            styles.textStyle,
                            styles.smallText,
                            styles.lightFont,
                            styles.color555555,
                        ]}>
                        {mapData?.distanceToRouteInKilometers}
                        {t('distanceToStart')}
                    </Text>
                ) : null}
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
                    mapId={mapData?.id}
                    distance={mapData?.distanceInKilometers}
                    level={mapData?.firstPickedDifficulty}
                    type={mapData?.firstPickedSurface}
                    time={mapData?.formattedTimeString}
                    reactions={mapData?.reactions}
                    reaction={mapData?.reaction}
                />
            </View>
            {mapData?.description ? (
                <View>
                    <Text
                        style={[
                            styles.textStyle,
                            styles.smallText,
                            styles.color555555,
                        ]}>
                        {t('descriptionTitle')}
                    </Text>
                    <View style={[styles.descriptionContainer]}>
                        <Text
                            style={[
                                styles.textStyle,
                                styles.lightFont,
                                styles.descriptionTitle,
                            ]}>
                            {mapData?.description ? mapData.description : ''}
                        </Text>
                        {/* <Text style={[styles.textStyle, styles.lightFont]}>
                            {mapData?.description || t('noDescription')}
                        </Text> */}
                    </View>
                </View>
            ) : null}
            {images?.images?.length ? (
                <View style={styles.imagesContainer}>
                    <Text
                        style={[
                            styles.textStyle,
                            styles.lightFont,
                            styles.color555555,
                            styles.imagesTitle,
                        ]}>
                        {t('imagesTitle')}
                    </Text>
                    {mapData && images?.images?.length > 0 && (
                        <ImageSwiper
                            images={images?.images}
                            onPress={() => setShowImgPreview(true)}
                        />
                    )}
                </View>
            ) : null}
            <View style={styles.mapContainer}>
                <Text
                    style={[
                        styles.textStyle,
                        styles.lightFont,
                        styles.color555555,
                        styles.mapTitle,
                    ]}>
                    {t('mapTitle')}
                </Text>
                <View style={styles.mapImage}>
                    {images?.mapImg ? (
                        <ImageBtn
                            imgUrl={images.mapImg}
                            onPress={onNavigateToMapPreview}
                        />
                    ) : (
                        <View style={styles.mImg} />
                    )}
                </View>
            </View>
            {mapData?.tags?.length ? (
                <View style={styles.tagsContainer}>
                    <Text style={[styles.textStyle, styles.lightFont]}>
                        {t('tagsTitle')}
                    </Text>
                    <View style={styles.tagsWrapper}>
                        {mapData?.optionsEnumsValues?.tagsOptions &&
                            mapData.optionsEnumsValues?.tagsOptions?.map(t => {
                                if (!t?.enumValue) {
                                    return null;
                                }
                                if (!mapData.tags?.includes(t.enumValue)) {
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
            ) : null}
            <Text
                style={[
                    styles.textStyle,
                    styles.smallText,
                    styles.lightFont,
                    styles.color555555,
                ]}>
                {t('creationPrefix')}:{' '}
                {convertToDateWithTime(mapData?.createdAt)}
            </Text>
            {mapData?.publishedAt && (
                <Text
                    style={[
                        styles.textStyle,
                        styles.smallText,
                        styles.lightFont,
                        styles.color555555,
                    ]}>
                    {t('publishPrefix')}:{' '}
                    {convertToDateWithTime(mapData?.publishedAt)}
                </Text>
            )}
            {images?.fullSizeImages && (
                <FullScreenGallery
                    show={showImgPreview}
                    onClose={() => setShowImgPreview(false)}
                    author={mapData?.author}
                    imagesUrls={images.fullSizeImages}
                />
            )}
        </View>
    );
};

export default Description;

import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, Modal, Platform} from 'react-native';

import {I18n} from '../../../../../../I18n/I18n';
import {getVerticalPx} from '../../../../../helpers/layoutFoo';
import {useAppSelector} from '../../../../../hooks/redux';
import useStatusBarHeight from '../../../../../hooks/statusBarHeight';
import {Map} from '../../../../../models/map.model';
import {RegularStackRoute} from '../../../../../navigation/route';
import {CloseBtn, ImageBtn} from '../../../../../sharedComponents/buttons';
import ImageGallery from '../../../../../sharedComponents/imageGallery/imageGallery';

import ImageSwiper from '../../../../../sharedComponents/imageSwiper/imageSwiper';
import {userNameSelector} from '../../../../../storage/selectors';
import {convertToDateWithTime} from '../../../../../utils/dateTime';
import RideTile from './rideTile';

import styles from './styles';

interface IProps {
    mapData: Map | undefined;
    images: {images: string[]; mapImg: string; fullSizeImages: string[]};
    isPrivateView?: boolean;
}

const Description: React.FC<IProps> = ({
    mapData,
    images,
    isPrivateView,
}: IProps) => {
    const trans: any = I18n.t('RoutesDetails.details');
    const navigation = useNavigation();
    const statusBarHeight = useStatusBarHeight();
    const userName = useAppSelector(userNameSelector);
    const authorName =
        mapData?.author || isPrivateView ? userName : trans.defaultAuthor;
    const [showImgPreview, setShowImgPreview] = useState(false);

    const onNavigateToMapPreview = () => {
        navigation.navigate({
            name: RegularStackRoute.MAP_PREVIEW_SCREEN,
            params: {
                mapId: mapData?.id,
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
                    {`${trans.author}: ${authorName}`}
                </Text>
                <Text style={[styles.textStyle, styles.title]}>
                    {mapData?.name || trans.noTitle}
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
                        {trans.distanceToStart}
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
                    distance={mapData?.distanceInKilometers}
                    level={mapData?.firstPickedDifficulty}
                    type={mapData?.firstPickedSurface}
                    time={mapData?.formattedTimeString}
                />
            </View>
            {mapData?.description?.short ? (
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
                        {trans.imagesTitle}
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
                    {trans.mapTitle}
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
            {mapData?.tags?.values?.length ? (
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
                                if (
                                    !mapData.tags?.values.includes(t.enumValue)
                                ) {
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
                {trans.creationPrefix}:{' '}
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
                    {trans.publishPrefix}:{' '}
                    {convertToDateWithTime(mapData?.publishedAt)}
                </Text>
            )}
            {images?.fullSizeImages && (
                <Modal
                    animationType="slide"
                    statusBarTranslucent
                    hardwareAccelerated={Platform.OS === 'android'}
                    visible={showImgPreview}
                    onRequestClose={() => setShowImgPreview(false)}>
                    <View
                        style={[
                            styles.galleryWrapper,
                            {
                                paddingTop: getVerticalPx(67) - statusBarHeight,
                            },
                        ]}>
                        <View
                            style={[
                                styles.closeGalleryBtnContainer,
                                {
                                    top: getVerticalPx(67) - statusBarHeight,
                                },
                            ]}>
                            <CloseBtn
                                onPress={() => setShowImgPreview(false)}
                                iconColor="#ffffff"
                            />
                        </View>
                        <View style={styles.swiperContainer}>
                            <ImageGallery images={images.fullSizeImages} />
                            {mapData?.author && (
                                <Text style={styles.authorText}>
                                    {trans.author}: {mapData?.author}
                                </Text>
                            )}
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

export default Description;

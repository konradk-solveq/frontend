import React, {useMemo, useState} from 'react';
import {View, StyleSheet} from 'react-native';

import {Map} from '@models/map.model';
import {ImagesUrlsToDisplay} from '@utils/transformData';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {convertToDateWithTime} from '@utils/dateTime';
import {firstLetterToUpperCase} from '@utils/strings';

import FullScreenGallery from '@pages/main/world/routeDetails/fullScreenGallery/FullScreenGallery';
import ImageSwiper from '@sharedComponents/imageSwiper/imageSwiper';
import {Header3, Paragraf, Subtitle} from '@components/texts/texts';
import {Tags} from '@containers/World/components';

const getSurfaceString = (
    surfaces?: string[],
    connector = '-',
    placeholder = '-',
) => {
    if (!surfaces?.length) {
        return placeholder;
    }

    const prefix = surfaces.length > 1 ? ` ${connector} ` : '';
    const string = surfaces.map((s, i) => {
        const transformed = firstLetterToUpperCase(s);
        if (i === 0) {
            return transformed;
        }
        return `${prefix}${transformed}`;
    });

    return string;
};

interface IProps {
    mapData: Map | undefined;
    images?: ImagesUrlsToDisplay;
}

const FullDescription: React.FC<IProps> = ({mapData, images}: IProps) => {
    const {t} = useMergedTranslation('RoutesDetails.details');
    const [showImgPreview, setShowImgPreview] = useState(false);

    const surfacesString = useMemo(
        () => getSurfaceString(mapData?.pickedSurfaces),
        [mapData?.pickedSurfaces],
    );

    return (
        <View style={[styles.container, styles.bottomPadding]}>
            {mapData?.description ? (
                <View style={styles.bottomPadding}>
                    <View style={styles.bottomPadding}>
                        <Header3>{t('descriptionTitle')}</Header3>
                        <Paragraf>
                            {mapData?.description ? mapData.description : ''}
                        </Paragraf>
                    </View>
                    <Paragraf>{surfacesString}</Paragraf>
                </View>
            ) : null}
            {images?.images?.length ? (
                <View style={styles.bottomPadding}>
                    <Header3 style={styles.headerSpace}>
                        {t('imagesTitle')}
                    </Header3>
                    <ImageSwiper
                        images={images?.images}
                        onPress={() => setShowImgPreview(true)}
                        imageStyle={styles.imagesStyle}
                        containerStyle={styles.imagesCarouselContainer}
                    />
                </View>
            ) : null}
            {mapData?.tags?.length ? (
                <View style={styles.bottomPadding}>
                    <Header3 style={styles.headerSpace}>
                        {t('tagsTitle')}
                    </Header3>
                    <Tags
                        tags={mapData.tags}
                        options={mapData.optionsEnumsValues}
                    />
                </View>
            ) : null}
            <View style={styles.authorContainer}>
                <Subtitle>
                    {t('author')}: {mapData?.author}, {t('creationPrefix')}:{' '}
                    {convertToDateWithTime(mapData?.createdAt)}
                </Subtitle>
            </View>
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

const styles = StyleSheet.create({
    container: {
        marginTop: getFVerticalPx(24),
    },
    bottomPadding: {
        paddingBottom: getFVerticalPx(24),
    },
    headerSpace: {
        paddingBottom: getFVerticalPx(16),
    },
    imagesCarouselContainer: {
        height: getFVerticalPx(80),
    },
    imagesStyle: {
        width: getFHorizontalPx(110),
        height: getFVerticalPx(80),
        borderRadius: getFHorizontalPx(8),
    },
    authorContainer: {
        width: '100%',
        alignItems: 'center',
    },
});

export default FullDescription;

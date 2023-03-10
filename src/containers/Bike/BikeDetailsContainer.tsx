import {ScrollView} from 'react-native-gesture-handler';
import {
    Pressable,
    View,
    StyleSheet,
    Image,
    GestureResponderEvent,
} from 'react-native';
import {BodyPrimary, Header1, Subtitle} from '@components/texts/texts';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Warranty from '@pages/main/bike/components/warranty';
import Reviews from '@pages/main/bike/components/reviews';
import ServicePointsTile from '@pages/main/bike/components/tiles/ServicePointsTile';
import {SecondaryButton} from '@components/buttons';
import React, {useRef, useCallback, useMemo, useState} from 'react';
import colors from '@theme/colors';
import {getFHorizontalPx, getFVerticalPx} from '@helpers/appLayoutDimensions';
import {UserBike} from '@models/userBike.model';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {Warranty as WarrantyI, Overview} from '@models/bike.model';
import BikeChangeButton from '@pages/main/bike/components/buttons/BikeChangeButton';
import BlueBikeSvg from '@components/svg/BlueBikeSvg';

interface IProps {
    bike: UserBike | null;
    onAddKrossBike: () => void;
    handleParams: () => void;
    warrantyData: WarrantyI | undefined;
    handleServicesMap: () => void;
    onRemoveBikeHandler: () => void;
    onChangeBikeHandler: () => void;
    showBikeChangeButton: boolean;
    onReviewPress: (e: Overview) => void;
    onContactPress: (e: GestureResponderEvent) => void;
    bikeType?: string;
}

const BikeDetailsContainer = ({
    bike,
    onAddKrossBike,
    handleParams,
    warrantyData,
    handleServicesMap,
    onRemoveBikeHandler,
    onChangeBikeHandler,
    showBikeChangeButton,
    onReviewPress,
    onContactPress,
    bikeType,
}: IProps) => {
    const {t} = useMergedTranslation('MainBike');
    const carouselRef = useRef<Carousel<string>>(null);
    const [paginationIndex, setPaginationIndex] = useState(0);
    const renderCarouselImage = useCallback(
        ({item}) => (
            <Image
                style={styles.image}
                resizeMode="contain"
                source={typeof item === 'string' ? {uri: item} : item}
            />
        ),
        [],
    );

    /**
     * Only the first url returns a valid image
     */
    const imageData = useMemo(
        () => (bike?.images?.length ? [bike?.images?.[0]] : []),
        [bike?.images],
    );
    const isKross = useMemo(
        () => bike && bike.description.producer === 'Kross',
        [bike],
    );

    const carouselWidth = useMemo(() => getFHorizontalPx(390), []);
    const handleCarouselScroll = useCallback(index => {
        setPaginationIndex(index);
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.scrollBounceBackground} />
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}>
                <View style={styles.imageContainer}>
                    {showBikeChangeButton ? (
                        <View style={styles.headerButtonContainer}>
                            <BikeChangeButton
                                text={bike?.description?.name || ''}
                                onPress={onChangeBikeHandler}
                            />
                        </View>
                    ) : (
                        <Pressable onPress={onAddKrossBike}>
                            <BodyPrimary style={styles.headerButton}>
                                {t('addBike')}
                            </BodyPrimary>
                        </Pressable>
                    )}
                    {imageData?.length ? (
                        <>
                            <Carousel
                                ref={carouselRef}
                                data={imageData}
                                renderItem={renderCarouselImage}
                                sliderWidth={carouselWidth}
                                itemWidth={carouselWidth}
                                containerCustomStyle={styles.carousel}
                                onSnapToItem={handleCarouselScroll}
                                loop={true}
                            />
                            <Pagination
                                dotsLength={imageData.length}
                                activeDotIndex={paginationIndex}
                                dotStyle={styles.carouselDot}
                                inactiveDotStyle={styles.inactiveCarouselDot}
                                inactiveDotOpacity={1}
                                inactiveDotScale={1}
                            />
                        </>
                    ) : (
                        <View style={styles.bikeImage}>
                            <BlueBikeSvg imageSize={250} />
                        </View>
                    )}
                </View>
                {bike?.description && (
                    <>
                        <View style={styles.description}>
                            <Header1 style={styles.bikeName}>
                                {bike?.description.name}
                            </Header1>
                            {isKross ? (
                                <Subtitle style={styles.bikeDetails}>
                                    {t('details', {
                                        name: bike?.description.producer,
                                        number: bike?.description.serial_number,
                                    })}{' '}
                                </Subtitle>
                            ) : (
                                <>
                                    <Subtitle
                                        style={[
                                            styles.bikeDetails,
                                            styles.bottomMargin,
                                        ]}>
                                        {t('detailsProducer')}
                                        {': '}
                                        {bike?.description.producer}
                                    </Subtitle>
                                    {!!bikeType && (
                                        <Subtitle style={styles.bikeDetails}>
                                            {t('detailsType')}
                                            {': '}
                                            {bikeType}
                                        </Subtitle>
                                    )}
                                </>
                            )}

                            {!!bike?.params && (
                                <Pressable onPress={handleParams}>
                                    <BodyPrimary style={styles.detailsText}>
                                        {t('bikeDetails')}
                                    </BodyPrimary>
                                </Pressable>
                            )}
                        </View>

                        <Warranty
                            info={warrantyData?.info || ''}
                            type={warrantyData?.type || ''}
                            endDate={warrantyData?.end}
                            onPress={onContactPress}
                        />

                        {warrantyData?.overviews && (
                            <Reviews
                                style={styles.reviews}
                                list={warrantyData.overviews}
                                description={t('warranty.reviews', {
                                    returnObjects: true,
                                })}
                                onReviewPress={onReviewPress}
                            />
                        )}
                        <View style={styles.servicesTile}>
                            <ServicePointsTile
                                showImage
                                onPressTile={handleServicesMap}
                            />
                        </View>
                        <SecondaryButton
                            onPress={onRemoveBikeHandler}
                            text={t('btn')}
                            style={styles.deleteButton}
                            withoutShadow
                        />
                    </>
                )}
            </ScrollView>
        </View>
    );
};

export default BikeDetailsContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.whiteGrey,
    },
    imageContainer: {
        backgroundColor: colors.white,
    },
    headerButton: {
        paddingTop: getFVerticalPx(26),
        paddingRight: getFHorizontalPx(9),
        paddingBottom: getFVerticalPx(13),
        width: '100%',
        textAlign: 'right',
        color: colors.red,
    },
    headerButtonContainer: {
        marginBottom: getFVerticalPx(32),
        marginTop: getFVerticalPx(16),
        width: '100%',
        alignItems: 'center',
    },
    carousel: {
        height: getFVerticalPx(250),
    },
    image: {
        height: '100%',
        width: '100%',
    },
    carouselDot: {
        width: getFHorizontalPx(8),
        height: getFHorizontalPx(8),
        borderRadius: getFHorizontalPx(4),
        marginHorizontal: -getFHorizontalPx(8),
        backgroundColor: colors.red,
    },
    inactiveCarouselDot: {
        backgroundColor: colors.grey,
    },
    scrollContent: {
        paddingBottom: getFVerticalPx(120),
        backgroundColor: colors.whiteGrey,
    },
    detailsText: {
        width: '100%',
        textAlign: 'center',
        color: colors.red,
    },
    description: {
        backgroundColor: colors.white,
        paddingBottom: getFVerticalPx(24),
        borderBottomLeftRadius: getFVerticalPx(12),
        borderBottomRightRadius: getFVerticalPx(12),
    },
    header: {
        backgroundColor: colors.white,
        zIndex: 5,
    },
    bikeName: {
        width: '100%',
        color: colors.black,
        textAlign: 'center',
    },
    bikeDetails: {
        width: '100%',
        textAlign: 'center',
    },
    bottomMargin: {
        marginBottom: getFVerticalPx(8),
    },
    bikeImage: {
        width: '100%',
        alignItems: 'center',
    },
    reviews: {
        marginTop: getFVerticalPx(40),
        marginBottom: getFVerticalPx(24),
    },
    servicesTile: {
        paddingHorizontal: getFHorizontalPx(16),
    },
    complaintsRepairs: {
        marginTop: getFVerticalPx(30),
    },
    map: {
        width: '100%',
    },
    deleteButton: {
        marginHorizontal: getFHorizontalPx(48),
    },
    scrollBounceBackground: {
        position: 'absolute',
        height: getFVerticalPx(350),
        width: '100%',
        backgroundColor: colors.white,
        top: 0,
    },
});

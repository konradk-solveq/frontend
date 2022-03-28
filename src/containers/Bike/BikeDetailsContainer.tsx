import {ScrollView} from 'react-native-gesture-handler';
import {Pressable, View, StyleSheet, Image} from 'react-native';
import {BodyPrimary, Header1, Subtitle} from '@components/texts/texts';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import defaultBike from '@pages/main/bike/components/images/default.png';
import Warranty from '@pages/main/bike/components/warranty';
import {countDaysToEnd} from '@helpers/warranty';
import Reviews from '@pages/main/bike/components/reviews';
import ServicePointsTile from '@pages/main/bike/components/tiles/ServicePointsTile';
import {SecondaryButton} from '@components/buttons';
import React, {useRef, useCallback, useMemo, useState} from 'react';
import colors from '@theme/colors';
import {getFHorizontalPx, getFVerticalPx} from '@helpers/appLayoutDimensions';
import {UserBike} from '@models/userBike.model';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {Warranty as WarrantyI, Overview} from '@models/bike.model';

interface IProps {
    bike: UserBike | null;
    onAddKrossBike: () => void;
    handleParams: () => void;
    warrantyData: WarrantyI | undefined;
    handleServicesMap: () => void;
    onRemoveBikeHandler: () => void;
    onReviewPress: (e: Overview) => void;
}

const BikeDetailsContainer = ({
    bike,
    onAddKrossBike,
    handleParams,
    warrantyData,
    handleServicesMap,
    onRemoveBikeHandler,
    onReviewPress,
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

    const carouselWidth = useMemo(() => getFHorizontalPx(390), []);
    const handleCarouselScroll = useCallback(index => {
        setPaginationIndex(index);
    }, []);
    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}>
                <Pressable onPress={onAddKrossBike}>
                    <BodyPrimary style={styles.headerButton}>
                        {t('addBike')}
                    </BodyPrimary>
                </Pressable>
                <Carousel
                    ref={carouselRef}
                    data={bike?.images?.length ? bike?.images : [defaultBike]}
                    renderItem={renderCarouselImage}
                    sliderWidth={carouselWidth}
                    itemWidth={carouselWidth}
                    containerCustomStyle={styles.carousel}
                    onSnapToItem={handleCarouselScroll}
                    loop={true}
                />
                <Pagination
                    dotsLength={bike?.images?.length || 0}
                    activeDotIndex={paginationIndex}
                    dotStyle={styles.carouselDot}
                    inactiveDotStyle={styles.inactiveCarouselDot}
                    inactiveDotOpacity={1}
                    inactiveDotScale={1}
                />
                {bike?.description && (
                    <>
                        <Header1 style={styles.bikeName}>
                            {bike?.description.name}
                        </Header1>

                        <Subtitle style={styles.bikeDetails}>
                            {t('details', {
                                name: bike?.description.producer,
                                number: bike?.description.serial_number,
                            })}
                        </Subtitle>

                        {!!bike?.params && (
                            <Pressable onPress={handleParams}>
                                <BodyPrimary style={styles.detailsText}>
                                    {t('bikeDetails')}
                                </BodyPrimary>
                            </Pressable>
                        )}

                        {bike?.warranty && (
                            <Warranty
                                style={styles.warranty}
                                type={warrantyData?.info || ''}
                                nextOverview={
                                    bike?.warranty
                                        ? warrantyData?.overviews[0]?.date
                                            ? countDaysToEnd(
                                                  warrantyData.overviews[0]
                                                      .date,
                                              )
                                            : null
                                        : undefined
                                }
                                warranty={t('warranty', {
                                    returnObjects: true,
                                })}
                                details={{
                                    description: bike?.description,
                                    warranty: warrantyData,
                                }}
                            />
                        )}

                        {warrantyData?.overviews && (
                            <Reviews
                                style={styles.reviews}
                                list={warrantyData.overviews}
                                details={{
                                    description: bike?.description,
                                    warranty: warrantyData,
                                }}
                                description={t('warranty.reviews', {
                                    returnObjects: true,
                                })}
                                onReviewPress={onReviewPress}
                            />
                        )}
                        <View style={styles.servicesTile}>
                            <ServicePointsTile
                                onPressTile={handleServicesMap}
                            />
                        </View>
                        <SecondaryButton
                            onPress={onRemoveBikeHandler}
                            text={t('btn')}
                            style={styles.deleteButton}
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
    headerButton: {
        paddingTop: getFVerticalPx(32),
        paddingRight: getFHorizontalPx(9),
        paddingBottom: getFVerticalPx(13),
        width: '100%',
        textAlign: 'right',
        color: colors.red,
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
    scroll: {
        backgroundColor: '#ffffff',
    },
    scrollContent: {
        paddingBottom: getFVerticalPx(120),
    },
    detailsText: {
        width: '100%',
        textAlign: 'center',
        color: colors.red,
    },
    header: {
        backgroundColor: '#ffffff',
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
    warranty: {
        marginTop: getFVerticalPx(24),
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
});

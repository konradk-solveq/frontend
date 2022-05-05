import React, {useState, useEffect} from 'react';
import {ImageURISource, StyleSheet, View, Pressable} from 'react-native';
import {languageT} from '@models/uiTranslation.models';
import OnboardingTile from '@components/tiles/OnboardingTile';
import {getFHorizontalPx, getFVerticalPx} from '@helpers/appLayoutDimensions';
import colors from '@theme/colors';
import {PrimaryButton} from '@components/buttons';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import {Header3} from '@components/texts/texts';
import {SvgXml} from 'react-native-svg';
import {TextIcon} from '@components/icons';
import BidirectionalSwipe from '@sharedComponents/navi/swipe/bidirectionalSwipe';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import {Pagination} from '@components/pagination';

type TileT = {
    title: string;
    description: string;
    imgSource: ImageURISource;
};

interface IProps {
    onBeginPress: () => void;
    tiles: TileT[];
    language?: languageT;
    onLanguageChange: () => void;
    showLanguageButton: boolean;
}

/**
 * 318 - tile width, 16 - padding
 */
const TILE_WIDTH = getFHorizontalPx(318 + 2 * 12);

const OnboardingContainer = ({
    onBeginPress,
    tiles,
    language,
    onLanguageChange,
    showLanguageButton,
}: IProps) => {
    const {t} = useMergedTranslation('Onboarding');
    const scrollPosition = useSharedValue(TILE_WIDTH + TILE_WIDTH / 2);
    const animatedWrapStyle = useAnimatedStyle(() => ({
        transform: [
            {translateX: withTiming(scrollPosition.value, {duration: 500})},
        ],
    }));

    const [image, setImage] = useState(0);
    useEffect(() => {
        scrollPosition.value = -((image - 1) * TILE_WIDTH - TILE_WIDTH / 2);
    }, [image, scrollPosition]);

    const handleSwipe = (dir: 'left' | 'right') => () => {
        if (dir === 'right') {
            if (image > 0) {
                setImage(val => val - 1);
            }
        } else {
            if (image < tiles.length - 1) {
                setImage(val => val + 1);
            }
        }
    };

    const wrapWidth = tiles.length * TILE_WIDTH;
    return (
        <View style={styles.container}>
            <BidirectionalSwipe
                onFirstSwipeAction={handleSwipe('right')}
                onSecondSwipeAction={handleSwipe('left')}
                firstDirection={1}
                secondDirection={2}>
                <Animated.View
                    style={[
                        styles.wrap,
                        {
                            width: wrapWidth,
                        },
                        animatedWrapStyle,
                    ]}>
                    {tiles.map(item => (
                        <View style={styles.itemWrapper} key={item.title}>
                            <OnboardingTile
                                title={item.title}
                                description={item.description}
                                imgSource={item.imgSource}
                            />
                        </View>
                    ))}
                    <View />
                </Animated.View>
            </BidirectionalSwipe>
            <Pagination
                maxIndex={tiles.length}
                activeIndex={image}
                style={
                    !(language && showLanguageButton) && styles.paginationMargin
                }
            />
            {language && showLanguageButton && (
                <Pressable onPress={onLanguageChange} style={styles.lngButton}>
                    <Header3>{t('language')}:</Header3>
                    <SvgXml xml={language.icon} height={getFVerticalPx(16)} />
                    <Header3>{language.name}</Header3>
                    <TextIcon
                        icon={MykrossIconFont.MYKROSS_ICON_CHEVRON_DOWN}
                        iconColor={colors.darkGrey}
                    />
                </Pressable>
            )}
            <PrimaryButton text={t('start')} onPress={onBeginPress} />
        </View>
    );
};

export default OnboardingContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: getFVerticalPx(20),
        alignItems: 'center',
    },
    itemWrapper: {
        paddingHorizontal: getFHorizontalPx(12),
    },
    carouselDot: {
        width: getFHorizontalPx(8),
        height: getFHorizontalPx(8),
        borderRadius: getFHorizontalPx(4),
        marginHorizontal: -getFHorizontalPx(8),
        backgroundColor: colors.red,
    },
    lngButton: {
        padding: getFVerticalPx(24),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inactiveCarouselDot: {
        backgroundColor: colors.grey,
    },
    wrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginBottom: getFVerticalPx(16),
    },
    paginationMargin: {
        marginBottom: getFVerticalPx(16),
    },
});

import React from 'react';
import {
    View,
    StyleSheet,
    GestureResponderEvent,
    Image,
    ImageSourcePropType,
    Pressable,
    ScrollView,
} from 'react-native';
import {Header1} from '@components/texts/texts';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {getFVerticalPx, getFHorizontalPx} from '@helpers/appLayoutDimensions';
import {AddBikeTile} from '@components/tiles';
import colors from '@theme/colors';
import {appContainerHorizontalMargin} from '@theme/commonStyle';

interface IProps {
    userName?: string;
    onAddBikePressPrimary: (e: GestureResponderEvent) => void;
    onAddBikePressSecondary: (e: GestureResponderEvent) => void;
    storeImageSource?: ImageSourcePropType;
    onStoreTilePress?: (e: GestureResponderEvent) => void;
}

const HomeContainer = ({
    userName,
    onAddBikePressPrimary,
    onAddBikePressSecondary,
    onStoreTilePress,
}: IProps) => {
    const {t} = useMergedTranslation('MainHome');
    return (
        <View style={styles.container}>
            <ScrollView>
                <Header1 style={styles.header}>
                    {`${t('hi')}`}
                    {userName ? ` ${userName}` : ''}!
                </Header1>
                <AddBikeTile
                    onPressPrimary={onAddBikePressPrimary}
                    onPressSecondary={onAddBikePressSecondary}
                />
                <Pressable style={styles.storeTile} onPress={onStoreTilePress}>
                    <Image
                        source={require('@assets/images/homeStore/storeTile.png')}
                        resizeMode={'contain'}
                        style={styles.image}
                    />
                </Pressable>
            </ScrollView>
        </View>
    );
};

export default HomeContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.whiteGrey,
        paddingHorizontal: appContainerHorizontalMargin,
    },
    header: {
        textAlign: 'left',
        width: '100%',
        marginVertical: getFVerticalPx(24),
    },
    storeTile: {
        height: getFVerticalPx(180),
        width: getFHorizontalPx(358),
        borderRadius: getFHorizontalPx(12),
    },
    image: {
        height: '100%',
        width: '100%',
    },
});

import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

import {MapType} from '@models/map.model';
import {ImagesUrlsToDisplay} from '@utils/transformData';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import {appContainerHorizontalMargin} from '@theme/commonStyle';
import colors from '@theme/colors';

import {IconButton, PrimaryButton, SecondaryButton} from '@components/buttons';
import {ButtonsGroup, FullDescription, PrologDescription} from './components';

interface IProps {
    mapData?: MapType;
    mapImages?: ImagesUrlsToDisplay;
    style?: ViewStyle;
}

const RouteMapDetailsContainer: React.FC<IProps> = ({
    mapData,
    mapImages,
    style,
}: IProps) => {
    const {t} = useMergedTranslation('RoutesDetails.details.actionButtons');

    return (
        <View style={[styles.container, style]}>
            <>
                <PrologDescription
                    name={mapData?.name}
                    distance={mapData?.distanceInKilometers}
                    time={mapData?.timeFormatedToString}
                    distanceToRoute={mapData?.distanceToRouteInKilometers}
                    difficultiesLevels={mapData?.pickedDifficulties}
                    reactions={mapData?.reactions}
                />
                <ButtonsGroup>
                    <PrimaryButton
                        onPress={() => {}}
                        text={t('published.primaryAction')}
                        icon={MykrossIconFont.MYKROSS_ICON_NAVIGATE}
                        style={{
                            width: getFHorizontalPx(151),
                            height: getFVerticalPx(48),
                        }}
                    />
                    <SecondaryButton
                        onPress={() => {}}
                        text={t('published.secondaryAction')}
                        icon={MykrossIconFont.MYKROSS_ICON_SAVE_OFF}
                        style={{
                            width: getFHorizontalPx(143),
                            height: getFVerticalPx(48),
                        }}
                    />
                    <IconButton
                        onPress={() => {}}
                        icon={MykrossIconFont.MYKROSS_ICON_SHARE}
                        style={{
                            width: getFHorizontalPx(48),
                            height: getFVerticalPx(48),
                        }}
                    />
                </ButtonsGroup>
            </>
            <FullDescription mapData={mapData} images={mapImages} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingHorizontal: appContainerHorizontalMargin,
        backgroundColor: colors.whiteGrey,
    },
});

export default RouteMapDetailsContainer;

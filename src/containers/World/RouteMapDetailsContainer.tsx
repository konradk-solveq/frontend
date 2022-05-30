import React, {useCallback} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

import {MapType} from '@models/map.model';
import {ImagesUrlsToDisplay} from '@utils/transformData';
import {RouteDetailsActionT} from '@type/screens/routesMap';

import {appContainerHorizontalMargin} from '@theme/commonStyle';
import colors from '@theme/colors';

import {
    CommonActionButtons,
    FullDescription,
    PrivateActionButtons,
    PrologDescription,
} from '@containers/World/components';

interface IProps {
    onPressAction: (actionType: RouteDetailsActionT) => void;
    mapData?: MapType;
    isPrivate?: boolean;
    isPublished?: boolean;
    isFavourited?: boolean;
    isFetching?: boolean;
    mapImages?: ImagesUrlsToDisplay;
    style?: ViewStyle;
    testID?: string;
}

const RouteMapDetailsContainer: React.FC<IProps> = ({
    onPressAction,
    mapData,
    isPrivate = false,
    isPublished = false,
    isFavourited = false,
    isFetching = false,
    mapImages,
    style,
    testID = 'route-map-details-container',
}: IProps) => {
    const omPressSecondaryButton = useCallback(() => {
        onPressAction(isFavourited ? 'remove_from_planned' : 'add_to_planned');
    }, [isFavourited, onPressAction]);

    return (
        <View style={[styles.container, style]} testID={testID}>
            <>
                <PrologDescription
                    name={mapData?.name}
                    distance={mapData?.distanceInKilometers}
                    time={mapData?.timeFormatedToString}
                    distanceToRoute={mapData?.distanceToRouteInKilometers}
                    difficultiesLevels={mapData?.pickedDifficulties}
                    reactions={mapData?.reactions}
                    testID={`${testID}-prolog-description`}
                />
                {!isPrivate ? (
                    <CommonActionButtons
                        onPressPrimary={() => onPressAction('record')}
                        onPressSecondary={omPressSecondaryButton}
                        onPressIcon={() => onPressAction('share')}
                        testID={`${testID}-common-action-buttons`}
                        isSecondaryButtonActive={isFavourited}
                        secondaryButtonWithLoader={isFetching}
                    />
                ) : (
                    <PrivateActionButtons
                        onPressPrimary={() =>
                            onPressAction(isPublished ? 'share' : 'publish')
                        } /* Now we can piublish only from edit page */
                        onPressSecondary={() => onPressAction('edit')}
                        onPressIcon={() => onPressAction('do_more')}
                        isPublished={isPublished}
                        testID={`${testID}-private-action-buttons`}
                    />
                )}
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

export default React.memo(RouteMapDetailsContainer);

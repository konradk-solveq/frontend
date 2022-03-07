import React from 'react';
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
    mapImages?: ImagesUrlsToDisplay;
    style?: ViewStyle;
    testID?: string;
}

const RouteMapDetailsContainer: React.FC<IProps> = ({
    onPressAction,
    mapData,
    isPrivate = false,
    isPublished = false,
    mapImages,
    style,
    testID = 'route-map-details-container',
}: IProps) => {
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
                        onPressSecondary={() => onPressAction('add_to_planned')}
                        onPressIcon={() => onPressAction('share')}
                        testID={`${testID}-common-action-buttons`}
                    />
                ) : (
                    <PrivateActionButtons
                        onPressPrimary={() => onPressAction('share')}
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

export default RouteMapDetailsContainer;

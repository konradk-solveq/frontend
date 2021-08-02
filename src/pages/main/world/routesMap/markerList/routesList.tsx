import React, {useCallback} from 'react';
import {View, ViewStyle} from 'react-native';

import {
    markerTypes,
    Place,
    PointDetails,
} from '../../../../../models/places.model';
import CustomMarker from '../customMarker/customMarker';

interface IProps {
    places: Place[];
    onPress: (details: PointDetails | null) => void;
    containerStyle?: ViewStyle;
    filterMarkers?: markerTypes[];
}

const RoutesList = ({
    onPress,
    containerStyle,
    places,
    filterMarkers,
}: IProps) => {
    const onPressMarkerHanlder = useCallback(
        (details: PointDetails | null) => {
            onPress(details);
        },
        [onPress],
    );

    return (
        <View style={containerStyle}>
            {places.map(e => {
                if (e.type === 'group') {
                    return null;
                }

                let isHidden = true;
                if (filterMarkers) {
                    filterMarkers.map(m => {
                        const visibility = e?.markerTypes?.includes(m);

                        if (!isHidden) {
                            return;
                        }

                        isHidden = !visibility;
                    });
                }

                return (
                    <CustomMarker
                        key={`marker_${e.lat}_${e.lng}`}
                        lat={e.lat}
                        lng={e.lng}
                        showMarker={!isHidden}
                        onPressMarker={() =>
                            !isHidden ? onPressMarkerHanlder(e.details) : null
                        }
                    />
                );
            })}
        </View>
    );
};

export default React.memo(RoutesList);

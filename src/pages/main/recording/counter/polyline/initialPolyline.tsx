import React, {useEffect, useRef} from 'react';
import {Polyline as MapPolyline} from 'react-native-maps';
import {useAppSelector} from '../../../../../hooks/redux';
import useAppState from '../../../../../hooks/useAppState';
import {trackerRouteIdSelector} from '../../../../../storage/selectors/routes';
import {getCurrentRoutePathById} from '../../../../../utils/routePath';

interface IProps {
    mapReady: boolean;
    onRestore: (restored: boolean) => void;
    onRouteRestored: (
        routes: {latitude: number; longitude: number; timestamp: number}[],
    ) => void;
}

const InitialPolyline: React.FC<IProps> = ({
    mapReady,
    onRestore,
    onRouteRestored,
}: IProps) => {
    const polylineRef = useRef<MapPolyline>(null);

    const currentRouteId = useAppSelector(trackerRouteIdSelector);

    const {appIsActive} = useAppState();

    useEffect(() => {
        if (appIsActive && currentRouteId && mapReady) {
            console.log('[setRoute]');

            // const t = setTimeout(async () => {
            onRestore(false);
            const doIt = async () => {
                const newRoute = await getCurrentRoutePathById(currentRouteId);

                onRouteRestored(newRoute);
                if (polylineRef.current) {
                    polylineRef.current.setNativeProps({
                        coordinates: newRoute[0],
                    });
                }
                onRestore(true);
            };
            doIt();
            // }, 1000);
        }
    }, [appIsActive, currentRouteId, mapReady]);

    return (
        <MapPolyline
            ref={polylineRef}
            coordinates={[]}
            strokeColor="#d8232a"
            strokeColors={['#d8232a']}
            lineCap={'round'}
            lineJoin={'round'}
            strokeWidth={8}
            tappable={false}
        />
    );
};

export default InitialPolyline;

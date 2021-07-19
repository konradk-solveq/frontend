import React, {useEffect, useState} from 'react';
import deepCopy from '../../../../../helpers/deepCopy';
import {useAppSelector} from '../../../../../hooks/redux';
import useAppState from '../../../../../hooks/useAppState';
import {trackerRouteIdSelector} from '../../../../../storage/selectors/routes';
import {getCurrentRoutePathById} from '../../../../../utils/routePath';
import Polyline from './polyline';

type ShortCoordsType = {
    latitude: number;
    longitude: number;
    timestamp: number;
};

interface IProps {
    routeSectionNumber: number;
    active: boolean;
    coords: ShortCoordsType;
}

const MultiPolyline: React.FC<IProps> = ({
    active,
    routeSectionNumber,
    coords,
}: IProps) => {
    const currentRouteId = useAppSelector(trackerRouteIdSelector);

    const [myRoute, setMyRoute] = useState<ShortCoordsType[][]>([]);
    const {appIsActive, appStateVisible} = useAppState();

    useEffect(() => {
        if (appIsActive && appStateVisible === 'active' && currentRouteId) {
            console.log('[SET ROUTE STATE]');

            const doIt = async () => {
                const oldRoute = myRoute?.[routeSectionNumber] || [];
                const newRoute = await getCurrentRoutePathById(
                    currentRouteId,
                    oldRoute,
                );

                setMyRoute(prevRoute => {
                    let currRouteArr = deepCopy(prevRoute);
                    if (!currRouteArr?.[routeSectionNumber]) {
                        currRouteArr[routeSectionNumber] = [];
                    }
                    currRouteArr[routeSectionNumber] = newRoute;

                    return [...currRouteArr];
                });
            };
            doIt();
        }
    }, [appIsActive, appStateVisible, currentRouteId, routeSectionNumber]);

    useEffect(() => {
        if (coords && active) {
            // console.log('[WHAT TO SET]', coords)
            const pos = {
                latitude: coords.latitude,
                longitude: coords.longitude,
                timestamp: coords.timestamp,
            };
            // zapisywanie trasy do vizualizacji
            const newRure: ShortCoordsType[][] = deepCopy(myRoute);
            if (typeof myRoute[routeSectionNumber] === 'undefined') {
                newRure[routeSectionNumber] = [];
            }

            newRure[routeSectionNumber].push(pos);
            setMyRoute(newRure);
        }
    }, [coords, active, routeSectionNumber]);

    if (!active || !myRoute?.length) {
        return null;
    }

    return myRoute.map((e, i) => {
        if (!e || !e?.length) {
            return null;
        }
        return (
            <Polyline
                key={`route_${i}`}
                coords={e}
                active={active}
                routeSectionNumber={i}
            />
        );
    });
};

export default MultiPolyline;

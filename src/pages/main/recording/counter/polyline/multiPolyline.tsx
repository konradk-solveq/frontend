import React, {useEffect, useState, useCallback} from 'react';
import {useRef} from 'react';
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
    pauses: {start: number; end: number | null}[];
}

const MultiPolyline: React.FC<IProps> = ({
    active,
    routeSectionNumber,
    coords,
    pauses,
}: IProps) => {
    const restoreRef = useRef(false);
    const routeRef = useRef<ShortCoordsType[][]>([]);
    const currentRouteId = useAppSelector(trackerRouteIdSelector);

    // const [myRoute, setMyRoute] = useState<ShortCoordsType[][]>([]);
    const {appIsActive, appPrevStateVisible, appStateVisible} = useAppState();
    const [previousState, setPrevoiusState] = useState(appPrevStateVisible);

    useEffect(() => {
        setPrevoiusState(appStateVisible);
    }, [appStateVisible]);

    const doSomeCrazyStuff = useCallback(async () => {
        restoreRef.current = false;
        const doIt = async () => {
            try {
                const bigDo = async () => {
                    const result: ShortCoordsType[][] = [];
                    pauses?.forEach((p, i) => {
                        if (!result?.[i]) {
                            result[i] = [];
                        }
                        const oldRoute = routeRef.current?.[i]
                            ? deepCopy(routeRef.current[i])
                            : [];
                        result[i] = oldRoute;
                    });

                    if (
                        !pauses?.length ||
                        pauses?.length === routeSectionNumber
                    ) {
                        const lastPause = pauses?.[routeSectionNumber - 1];

                        const oldRoute = routeRef.current?.[routeSectionNumber]
                            ? deepCopy(routeRef.current[routeSectionNumber])
                            : [];

                        const newRoute = getCurrentRoutePathById(
                            currentRouteId,
                            lastPause,
                            // undefined,
                            oldRoute,
                        );

                        const nn = await Promise.resolve(newRoute);

                        result[routeSectionNumber] = nn;
                    }

                    routeRef.current = result;
                };

                bigDo();
                setTimeout(() => {
                    restoreRef.current = true;
                }, 500);
                // return pS;
            } catch (error) {
                console.log('[ERROR]', error);
                // return pS;
            }
        };
        doIt();
    }, [currentRouteId, pauses, routeSectionNumber]);

    useEffect(() => {
        if (appIsActive && previousState === 'background' && currentRouteId) {
            doSomeCrazyStuff();

            setPrevoiusState('active');
        }

        setTimeout(() => {
            restoreRef.current = true;
        }, 500);

        return () => {
            restoreRef.current = false;
        };
    }, [appIsActive, previousState, currentRouteId, doSomeCrazyStuff]);

    useEffect(() => {
        if (coords?.coords && restoreRef.current) {
            const pos = {
                latitude: coords.coords.lat,
                longitude: coords.coords.lon,
                timestamp: coords.timestamp,
            };

            const newRure = deepCopy(routeRef.current);
            if (typeof routeRef.current[routeSectionNumber] === 'undefined') {
                newRure[routeSectionNumber] = [];
            }
            newRure[routeSectionNumber].push(pos);

            routeRef.current = newRure;
        }
    }, [coords, pauses, routeSectionNumber]);

    const renderItem = (e: ShortCoordsType[], i: number) => {
        if (!e) {
            return null;
        }
        return <Polyline key={`polyline_${i}`} coords={e} />;
    };

    if (!routeRef?.current?.length) {
        return null;
    }

    return (
        <>
            {routeRef.current.map((e, i) => {
                return renderItem(e, i);
            })}
        </>
    );
};

export default React.memo(MultiPolyline);

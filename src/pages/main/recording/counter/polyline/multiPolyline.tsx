import React, {useRef, useEffect, useState, useCallback} from 'react';

import {useAppSelector} from '../../../../../hooks/redux';
import useAppState from '../../../../../hooks/useAppState';
import {DataI} from '../../../../../hooks/useLocalizationTracker';
import {trackerRouteIdSelector} from '../../../../../storage/selectors/routes';
import deepCopy from '../../../../../helpers/deepCopy';
import {restoreRouteDataFromSQL} from '../../../../../utils/routePath';

import Polyline from './polyline';

type ShortCoordsType = {
    latitude: number;
    longitude: number;
    timestamp: number;
};

interface IProps {
    routeSectionNumber: number;
    coords: DataI;
    pauses: {start: number; end: number | null}[];
}

const MultiPolyline: React.FC<IProps> = ({
    routeSectionNumber,
    coords,
    pauses,
}: IProps) => {
    const mountRef = useRef(false);
    /**
     * Helper to prevent render current polyline faster then restored data from SQL.
     */
    const restoreRef = useRef(false);
    /**
     * Routes can be separate with pause. Every pasue event creates new array.
     */
    const routeRef = useRef<ShortCoordsType[][]>([]);
    const currentRouteId = useAppSelector(trackerRouteIdSelector);

    const {appIsActive, appPrevStateVisible, appStateVisible} = useAppState();
    const [previousState, setPrevoiusState] = useState(appPrevStateVisible);

    useEffect(() => {
        setPrevoiusState(appStateVisible);
    }, [appStateVisible]);

    const doSomeCrazyStuff = useCallback(async () => {
        restoreRef.current = false;

        if (!currentRouteId) {
            restoreRef.current = true;
            return;
        }

        const result: ShortCoordsType[][] = deepCopy(routeRef.current);

        if (!pauses?.length || pauses?.length === routeSectionNumber) {
            const newRoute = await restoreRouteDataFromSQL(
                currentRouteId,
                routeSectionNumber,
                routeRef.current,
                pauses,
            );
            if (!newRoute.length) {
                restoreRef.current = true;
                return;
            }

            result[routeSectionNumber] = newRoute;
        }

        routeRef.current = result;
        restoreRef.current = true;
    }, [currentRouteId, pauses, routeSectionNumber]);

    /**
     * Restore path from SQL after re-launch.
     */
    useEffect(() => {
        if (!mountRef.current) {
            doSomeCrazyStuff();

            setPrevoiusState('active');

            mountRef.current = true;
        }

        return () => {
            mountRef.current = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Restore path from SQL only when app came from background.
     */
    useEffect(() => {
        if (appIsActive && previousState === 'background' && currentRouteId) {
            doSomeCrazyStuff();

            setPrevoiusState('active');
        } else {
            setTimeout(() => {
                restoreRef.current = true;
            }, 200);
        }

        return () => {
            restoreRef.current = false;
        };
    }, [appIsActive, previousState, currentRouteId, doSomeCrazyStuff]);

    /**
     * Render path after SQL data has been restored.
     */
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
        if (!e || !e?.length) {
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

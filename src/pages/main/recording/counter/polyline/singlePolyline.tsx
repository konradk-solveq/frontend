/**
 * This component can draw polykline as a single line.
 *
 * @author Sebastian Kasiński
 */

import React, {useRef, useEffect, useCallback, useState} from 'react';
import {InteractionManager} from 'react-native';

import useAppState from '@hooks/useAppState';
import {useAppSelector} from '@hooks/redux';
import {DataI} from '@hooks/useLocalizationTracker';
import {trackerRouteIdSelector} from '@storage/selectors/routes';
import {restoreRouteDataFromSQL} from '@utils/routePath';
import {getShorterRoute} from '@utils/polyline';

import Polyline from './polyline';

type ShortCoordsType = {
    latitude: number;
    longitude: number;
    timestamp: number;
};

interface IProps {
    coords: DataI;
    renderPath?: boolean;
    restoredPath?: ShortCoordsType[];
}

const SinglePolyline: React.FC<IProps> = ({
    coords,
    renderPath,
    restoredPath,
}: IProps) => {
    const mountRef = useRef(false);
    /**
     * Helper to prevent render current polyline faster then restored data from SQL.
     */
    const restoreRef = useRef(false);
    const currentRouteId = useAppSelector(trackerRouteIdSelector);
    /**
     * Route simplified when app returnes from background
     */
    const restoredAfterBackground = useRef(true);

    /**
     * Routes can be separate with pause. Every pasue event creates new array.
     */
    const [route, setRoute] = useState<ShortCoordsType[]>([]);

    const redrawPolyline = useCallback(
        async (skipSorting?: boolean, resPath?: ShortCoordsType[]) => {
            restoreRef.current = false;

            let newRoute = resPath || [];
            if (!currentRouteId) {
                restoreRef.current = true;
                return;
            }

            let result: ShortCoordsType[] = route;
            if (!resPath?.length) {
                newRoute = await restoreRouteDataFromSQL(
                    currentRouteId,
                    result,
                    skipSorting,
                );
            }

            if (!newRoute.length) {
                restoreRef.current = true;
                return;
            }

            result = newRoute;

            restoreRef.current = true;

            setRoute(result);
        },
        [currentRouteId, route],
    );

    /**
     * Restore path from SQL after re-launch.
     */
    useEffect(() => {
        let task: any;
        let t: NodeJS.Timeout;
        if (!mountRef.current && restoredPath?.length) {
            task = InteractionManager.runAfterInteractions(() => {
                t = setTimeout(async () => {
                    await redrawPolyline(true, restoredPath);
                    mountRef.current = true;
                }, 500);
            });
            return;
        }

        mountRef.current = true;
        restoreRef.current = true;

        return () => {
            task?.cancel();
            clearTimeout(t);
            mountRef.current = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [restoredPath]);

    const {appIsActive, appPrevStateVisible, appStateVisible} = useAppState();
    /**
     * Simplify route only when app came from background.
     */
    useEffect(() => {
        let t: NodeJS.Timeout;
        let task: any;
        if (
            appIsActive &&
            appPrevStateVisible === 'background' &&
            currentRouteId &&
            mountRef.current &&
            restoreRef.current &&
            !restoredAfterBackground.current
        ) {
            task = InteractionManager.runAfterInteractions(() => {
                const shorterPath = getShorterRoute(route);

                restoredAfterBackground.current = true;

                setRoute(shorterPath);
            });
        } else {
            t = setTimeout(() => {
                restoredAfterBackground.current = true;
            }, 200);
        }

        return () => {
            clearTimeout(t);
            task?.cancel();
        };
    }, [
        appIsActive,
        appPrevStateVisible,
        currentRouteId,
        redrawPolyline,
        route,
    ]);

    useEffect(() => {
        if (appStateVisible === 'background') {
            restoredAfterBackground.current = false;
        }
    });

    /**
     * Render path after SQL data has been restored.
     */
    useEffect(() => {
        if (coords?.coords && restoreRef.current) {
            if (!coords.coords?.lat || !coords.coords?.lon) {
                return;
            }
            const pos = {
                latitude: coords.coords.lat,
                longitude: coords.coords.lon,
                timestamp: coords.timestamp,
            };

            setRoute(prev => [...prev, pos]);
        }
    }, [coords?.coords, coords?.timestamp]);

    if (!route.length || !renderPath) {
        return null;
    }

    return <Polyline coords={route} />;
};

export default React.memo(SinglePolyline);

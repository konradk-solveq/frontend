/**
 * This component can draw polykline as a single line.
 *
 * @author Sebastian Kasiński
 */

import React, {useRef, useEffect, useState, useCallback} from 'react';
import {InteractionManager} from 'react-native';

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
    coords: DataI;
    renderPath?: boolean;
}

const SinglePolyline: React.FC<IProps> = ({coords, renderPath}: IProps) => {
    const mountRef = useRef(false);
    /**
     * Helper to prevent render current polyline faster then restored data from SQL.
     */
    const restoreRef = useRef(false);
    const currentRouteId = useAppSelector(trackerRouteIdSelector);

    /**
     * Routes can be separate with pause. Every pasue event creates new array.
     */
    const [route, setRoute] = useState<ShortCoordsType[]>([]);

    const {appIsActive, appPrevStateVisible} = useAppState();

    const redrawPolyline = useCallback(async () => {
        restoreRef.current = false;

        if (!currentRouteId) {
            restoreRef.current = true;
            return;
        }

        let result: ShortCoordsType[] = deepCopy(route);

        const newRoute = await restoreRouteDataFromSQL(currentRouteId, result);
        if (!newRoute.length) {
            restoreRef.current = true;
            return;
        }

        result = newRoute;

        setRoute(result);
        restoreRef.current = true;
    }, [currentRouteId, route]);

    /**
     * Restore path from SQL after re-launch.
     */
    useEffect(() => {
        if (!mountRef.current) {
            InteractionManager.runAfterInteractions(() => {
                setTimeout(() => {
                    redrawPolyline();
                }, 1000);
            });

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
        let t: NodeJS.Timeout;
        if (
            appIsActive &&
            appPrevStateVisible === 'background' &&
            currentRouteId &&
            mountRef.current
        ) {
            redrawPolyline();
        } else {
            t = setTimeout(() => {
                restoreRef.current = true;
            }, 200);
        }

        return () => {
            restoreRef.current = false;
            clearTimeout(t);
        };
    }, [appIsActive, appPrevStateVisible, currentRouteId, redrawPolyline]);

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

            const newRure = route.length ? deepCopy(route) : [];
            newRure.push(pos);

            setRoute(newRure);
        }
    }, [coords, route]);

    if (!route.length || !renderPath) {
        return null;
    }

    return <Polyline coords={route} />;
};

export default React.memo(SinglePolyline);

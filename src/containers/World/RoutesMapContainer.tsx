import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {WebView, WebViewMessageEvent} from 'react-native-webview';

import {BasicCoordsType} from '@type/coords';
import {MapMarkerType} from '@models/map.model';

import {isIOS} from '@utils/platform';
import {getMapInitLocation} from '@utils/webView';
import {jsonStringify} from '@utils/transformJson';
import {getFHorizontalPx} from '@theme/utils/appLayoutDimensions';

import {
    appBottomMargin,
    appContainerHorizontalMargin,
} from '@theme/commonStyle';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import colors from '@theme/colors';

import mapSource from '@pages/main/world/routesMap/routesMapHtml';
import {IconButton, SecondaryButton} from '@components/buttons';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import useCompassHook from '@src/hooks/useCompassHook';

interface IProps {
    onWebViewMessage: (e: WebViewMessageEvent) => void;
    onPressClose: () => void;
    onMapLoadEnd?: () => void;
    location?: BasicCoordsType;
    routesMarkers?: MapMarkerType[];
}

const RoutesMapContainer: React.FC<IProps> = ({
    onWebViewMessage,
    onPressClose,
    onMapLoadEnd,
    location,
    routesMarkers,
}: IProps) => {
    const mapRef = useRef(null);
    const posRef = useRef(false);

    /* TODO: temp solution for not working tests - storyshots */
    const setJsWV = (data: string) =>
        !process.env.JEST_WORKER_ID
            ? mapRef.current?.injectJavaScript(data)
            : '';
    const {t} = useMergedTranslation('MainRoutesMap');

    /**
     * Set it only once to avoid changes in map string
     * which causes rerenders.
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const loc = useMemo(() => getMapInitLocation(location), []);

    const markersExists = useMemo(
        () => routesMarkers && routesMarkers.length > 0,
        [routesMarkers],
    );

    const [mapLoaded, setMapLoaded] = useState(false);

    /**
     * Set user marker position
     */
    useEffect(() => {
        if (location && mapLoaded) {
            const pos = {
                latitude: location.latitude,
                longitude: location.longitude,
            };
            const p = jsonStringify(pos);
            if (!p) {
                return;
            }

            /**
             * Initially set map and user position.
             * Follow only user position.
             * */
            if (!posRef.current) {
                setJsWV(`setMyLocation(${p});true;`);
                setJsWV(`setPosOnMap(${p});true;`);
                posRef.current = true;
            } else {
                setJsWV(`setMyLocation(${p});true;`);
            }
        }
    }, [location, mapLoaded]);

    /**
     * Set markers on the map
     */
    useEffect(() => {
        if (mapLoaded && markersExists && posRef.current) {
            const p = jsonStringify(routesMarkers);
            if (p) {
                setJsWV(`setMarks(${p});true;`);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [routesMarkers, mapLoaded]);

    const onMapLoadEndHandler = useCallback(() => {
        if (onMapLoadEnd) {
            onMapLoadEnd();
        }
        setMapLoaded(true);
    }, [onMapLoadEnd]);

    const onWebViewMessageHandler = (e: WebViewMessageEvent) => {
        onWebViewMessage(e);
    };

    const onPressCloseHandler = useCallback(() => {
        onPressClose();
    }, [onPressClose]);

    const onPressFindLocationHandler = useCallback(() => {
        if (location && mapLoaded) {
            const pos = {
                latitude: location.latitude,
                longitude: location.longitude,
            };
            const p = jsonStringify(pos);
            if (p) {
                setJsWV(`setPosOnMap(${p});true;`);
                /**
                 * Fetch should reassign region to fetch markers if not exists
                 */
                setJsWV('getRgion();true;');
            }
        }
    }, [location, mapLoaded]);

    const heading = useCompassHook();

    useEffect(() => {
        if (heading !== undefined && heading !== null && mapRef.current) {
            setJsWV(`rotateUserLocationMarker(${heading});true;`);
        }
    }, [heading]);

    return (
        <View style={styles.container}>
            <WebView
                style={styles.webView}
                originWhitelist={['*']}
                scalesPageToFit={true}
                useWebKit={isIOS}
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                onLoadEnd={onMapLoadEndHandler}
                source={{
                    html:
                        '<!DOCTYPE html><html lang="pl-PL"><head><meta http-equiv="Content-Type" content="text/html;  charset=utf-8"><meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" /><style>html,body {margin:0;padding:0;height:100%;width:100%;overflow:hidden;background-color:transparent}</style></head><body>' +
                        loc +
                        mapSource +
                        '</body></html>',
                    baseUrl: isIOS ? '' : 'file:///android_asset/',
                }}
                javaScriptEnabled={true}
                ref={mapRef}
                onMessage={onWebViewMessageHandler}
            />
            <View style={styles.buttonRow}>
                <SecondaryButton
                    text={t('container.closeButton')}
                    icon={MykrossIconFont.MYKROSS_ICON_EXIT}
                    textColor={colors.black}
                    onPress={onPressCloseHandler}
                    style={{
                        width: getFHorizontalPx(115),
                        height: getFHorizontalPx(44),
                    }}
                />
                <IconButton
                    icon={MykrossIconFont.MYKROSS_ICON_USER}
                    onPress={onPressFindLocationHandler}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    webView: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
    },
    buttonRow: {
        position: 'absolute',
        width: '100%',
        bottom: appBottomMargin,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: appContainerHorizontalMargin,
        zIndex: 1,
    },
});

export default RoutesMapContainer;

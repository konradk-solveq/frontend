import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';

import {ROUTE_DEBUG_MODE} from '@env';
import {useAppSelector, useAppDispatch} from '@hooks/redux';
import {routeDebugModeSelector} from '@storage/selectors/app';
import {setRouteDebugMode} from '@storage/actions/app';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {askFilePermissionsOnAndroid} from '@utils/writeFilePermission';

import {BigRedBtn, BigWhiteBtn} from '@sharedComponents/buttons';
import {getFontSize} from '@helpers/layoutFoo';
import {showRemoveFileAlert} from '@utils/debugging/routeData';
import {setDebugLogLevel, setErrorLogLevel} from '@utils/geolocation';

interface IProps {
    onPress?: () => void;
}

const RouteDebugBtn: React.FC<IProps> = ({onPress}: IProps) => {
    const {t} = useMergedTranslation('DebugRoute');
    const dispatch = useAppDispatch();
    const routeDebugMode = useAppSelector(routeDebugModeSelector);

    const onPressHandler = async () => {
        if (onPress) {
            onPress();
        }

        if (Platform.OS === 'android') {
            const res = await askFilePermissionsOnAndroid();
            if (!res) {
                return;
            }
        }

        if (!routeDebugMode) {
            await setDebugLogLevel();
        } else {
            await setErrorLogLevel();
        }
        dispatch(setRouteDebugMode(!routeDebugMode));
    };

    const onDeleteHandler = async () => {
        await showRemoveFileAlert();
    };

    if (ROUTE_DEBUG_MODE !== 'true') {
        return null;
    }

    return (
        <View style={styles.container}>
            <BigRedBtn
                testID="route-debug-btn"
                onpress={onPressHandler}
                title={
                    routeDebugMode
                        ? t('disableDebugging')
                        : t('enableDebugging')
                }
                style={styles.btn}
                textStyle={styles.btnText}
            />
            <BigWhiteBtn
                title="x"
                onpress={onDeleteHandler}
                style={styles.removeBtn}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btn: {
        marginTop: 50,
        height: 50,
    },
    btnText: {
        fontSize: getFontSize(16),
        paddingHorizontal: 20,
    },
    removeBtn: {
        width: 50,
        height: 50,
        marginTop: 50,
        marginLeft: 10,
    },
});

export default RouteDebugBtn;

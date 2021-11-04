import React from 'react';
import {StyleSheet} from 'react-native';

import {ROUTE_DEBUG_MODE} from '@env';
import {useAppSelector, useAppDispatch} from '@hooks/redux';
import {routeDebugModeSelector} from '@storage/selectors/app';
import {setRouteDebugMode} from '@storage/actions/app';
import {I18n} from '@translations/I18n';
import {askFilePermissionsOnAndroid} from '@utils/writeFilePermission';

import {BigRedBtn} from '@sharedComponents/buttons';

interface IProps {
    onPress?: () => void;
}

const RouteDebugBtn: React.FC<IProps> = ({onPress}: IProps) => {
    const trans: any = I18n.t('DebugRoute');
    const dispatch = useAppDispatch();
    const routeDebugMode = useAppSelector(routeDebugModeSelector);

    const onPressHandler = async () => {
        if (onPress) {
            onPress();
        }

        const res = await askFilePermissionsOnAndroid();
        if (!res) {
            return;
        }

        dispatch(setRouteDebugMode(!routeDebugMode));
    };

    if (ROUTE_DEBUG_MODE !== 'true') {
        return null;
    }

    return (
        <BigRedBtn
            testID="route-debug-btn"
            onpress={onPressHandler}
            title={
                routeDebugMode ? trans.disableDebugging : trans.enableDebugging
            }
            style={styles.btn}
        />
    );
};

const styles = StyleSheet.create({
    btn: {
        marginTop: 50,
        height: 50,
    },
});

export default RouteDebugBtn;

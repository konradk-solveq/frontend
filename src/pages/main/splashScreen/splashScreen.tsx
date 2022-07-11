import React, {useEffect, useState} from 'react';
import {StatusBar, Image, View, StyleSheet} from 'react-native';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ENVIRONMENT_TYPE} from '@env';
import {setNewAppVersion} from '@storage/actions';
import {RegularStackRoute, BothStackRoute} from '@navigation/route';
import {getIsNewVersion} from '@helpers/appVersion';
import NewAppVersionModal from '../newAppVersion/newAppVersionModal';
import {SplashScreenRouteT} from '@type/rootStack';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';
import colors from '@theme/colors';

import {AnimatedKrossLogoContainer} from '@containers/Splash';
import {OpacityAnimation} from '@components/animations';
import {Subtitle} from '@components/texts/texts';
import {getAppVersion} from '@utils/system/appVersion';
import {appContainerHorizontalMargin} from '@theme/commonStyle';

import KROOS_LOGO from '@assets/images/logo/kross_logo_horizontal.png';
import {notificationDataSelector} from '@storage/selectors/app';
import customInteractionManager from '@utils/customInteractionManager/customInteractionManager';

interface Props {
    navigation: any;
    route: SplashScreenRouteT;
}

const time = __DEV__ ? 100 : 3000;

const SplashScreen: React.FC<Props> = (props: Props) => {
    const isLoading = useAppSelector<boolean>(state => state.app.sync);
    const appVersion = useAppSelector(state => state.app.appVersion);
    const dispatch = useAppDispatch();
    const showedNewAppVersion = useAppSelector<string>(
        state => state.app.showedNewAppVersion,
    );
    const [showNewAppVersion, setShowNewAppVersion] = useState<boolean>(false);

    const notifications = useAppSelector(notificationDataSelector);

    const shouldShowRegulations = notifications.length;

    const handleGoForward = () => {
        dispatch(setNewAppVersion(appVersion.latest));
        setShowNewAppVersion(false);
        props.navigation.replace(RegularStackRoute.TAB_MENU_SCREEN);
    };

    useEffect(() => {
        if (!isLoading) {
            const getPage = () => {
                if (shouldShowRegulations) {
                    return RegularStackRoute.NOTIFICATIONS_SCREEN;
                }

                if (props.route.params?.redirectToScreen) {
                    return props.route.params?.redirectToScreen;
                }

                return BothStackRoute.TAB_MENU_SCREEN;
            };

            const t = setTimeout(() => {
                customInteractionManager.runAfterInteractions(() => {
                    if (
                        appVersion.forceUpdate ||
                        (showedNewAppVersion < appVersion.latest &&
                            getIsNewVersion(appVersion.latest))
                    ) {
                        setShowNewAppVersion(true);
                    } else {
                        props.navigation.replace(getPage());
                    }
                });
            }, time);
            return () => {
                clearTimeout(t);
            };
        }
    }, [
        isLoading,
        props.navigation,
        showedNewAppVersion,
        props.route.params?.redirectToScreen,
        shouldShowRegulations,
        showNewAppVersion,
        appVersion,
    ]);

    return (
        <>
            <StatusBar
                backgroundColor={colors.backgroundPrimary}
                barStyle="light-content"
            />
            <AnimatedKrossLogoContainer />
            <OpacityAnimation>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={KROOS_LOGO} />
                </View>
            </OpacityAnimation>
            {ENVIRONMENT_TYPE !== 'production' && <AppVersion />}
            <NewAppVersionModal
                showModal={showNewAppVersion}
                forceUpdate={appVersion.forceUpdate}
                handleGoForward={handleGoForward}
                shopAppVersion={appVersion.latest}
            />
        </>
    );
};

const AppVersion: React.FC = () => {
    const {bottom} = useSafeAreaInsets();
    return (
        <View style={[styles.appVersionContainer, {marginBottom: bottom / 2}]}>
            <Subtitle>{`v${getAppVersion()}`}</Subtitle>
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: getFVerticalPx(48),
    },
    image: {
        width: getFHorizontalPx(282),
        height: getFVerticalPx(44),
    },
    appVersionContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'flex-end',
        paddingRight: appContainerHorizontalMargin,
    },
});

export default SplashScreen;

import React, {useEffect, useState} from 'react';
import {StatusBar, Image, View, StyleSheet} from 'react-native';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ENVIRONMENT_TYPE} from '@env';

import {TermsAndConditionsType} from '@models/regulations.model';
import {setAppCurrentTerms, setNewAppVersion} from '@storage/actions';
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

interface Props {
    navigation: any;
    route: SplashScreenRouteT;
}

const time = __DEV__ ? 100 : 3000;

const SplashScreen: React.FC<Props> = (props: Props) => {
    const data = useAppSelector<TermsAndConditionsType>(
        state => state.app.terms?.[state.app?.terms?.length - 1],
    );
    const currentVersion = useAppSelector<string>(
        state => state.app.currentTerms.version,
    );
    const isLoading = useAppSelector<boolean>(state => state.app.sync);
    const showed = useAppSelector<number>(state => state.app.showedRegulations);
    const appVersion = useAppSelector(state => state.app.appVersion);
    const [showNewRegulations, setShowNewRegulations] = useState<boolean>();
    const [showNewAppVersion, setShowNewAppVersion] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const shopAppVersion = useAppSelector<string>(
        state => state.app.config.version,
    );
    const showedNewAppVersion = useAppSelector<string>(
        state => state.app.showedNewAppVersion,
    );

    useEffect(() => {
        if (data) {
            const now = Date.now();
            const showDate = data.showDate ? Date.parse(data.showDate) : 0;
            const publishDate = data?.publishDate
                ? Date.parse(data.publishDate)
                : 0;

            const condition1: boolean =
                currentVersion &&
                Number(currentVersion) != Number(data.version);

            const condition2: boolean =
                currentVersion &&
                Number(showed) < Number(currentVersion) + 0.5 &&
                showDate <= now &&
                publishDate > now;

            const condition3: boolean =
                Number(showed) < Number(data.version) && publishDate <= now;

            const allCondition: boolean =
                condition1 && (condition2 || condition3);

            setShowNewRegulations(allCondition);

            if (!allCondition) {
                dispatch(
                    setAppCurrentTerms({
                        version: data.version, // do testów -> jak zmienisz na wersję niższ to mozna sprwdzić czy się wyświetli dla update-u
                        showDate: data.showDate,
                        publishDate: data.publishDate,
                        title: data.title,
                        text: data.text,
                    }),
                );
            }
        }
    }, [currentVersion, shopAppVersion, showedNewAppVersion, showed, data]);

    const handleGoForward = () => {
        dispatch(setNewAppVersion(shopAppVersion));
        setShowNewAppVersion(false);
        props.navigation.replace(RegularStackRoute.TAB_MENU_SCREEN);
    };

    useEffect(() => {
        if (!isLoading) {
            const getPage = () => {
                if (showNewRegulations) {
                    return RegularStackRoute.NEW_REGULATIONS_SCREEN;
                }

                if (props.route.params?.redirectToScreen) {
                    return props.route.params.redirectToScreen;
                }

                return BothStackRoute.TAB_MENU_SCREEN;
            };

            const t = setTimeout(() => {
                if (
                    showedNewAppVersion < shopAppVersion &&
                    getIsNewVersion(shopAppVersion)
                ) {
                    setShowNewAppVersion(true);
                } else {
                    props.navigation.replace(getPage());
                }
            }, time);
            return () => {
                clearTimeout(t);
            };
        }
    }, [
        isLoading,
        props.navigation,
        shopAppVersion,
        showNewRegulations,
        showedNewAppVersion,
        props.route.params?.redirectToScreen,
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

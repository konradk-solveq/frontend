import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {TermsAndConditionsType} from '@models/regulations.model';
import {setAppCurrentTerms} from '@storage/actions';
import {RegularStackRoute, BothStackRoute} from '@navigation/route';
import {getIsNewVersion} from '@helpers/appVersion';
import {SplashScreenRouteT} from '@type/rootStack';
import {AnimatedKrossLogoContainer} from '@containers/Splash';

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

            // show New App Version
            if (
                showedNewAppVersion < shopAppVersion &&
                getIsNewVersion(shopAppVersion)
            ) {
                setShowNewAppVersion(true);
            }
        }
    }, [currentVersion, shopAppVersion, showedNewAppVersion, showed, data]);

    useEffect(() => {
        if (!isLoading) {
            const getPage = () => {
                if (showNewRegulations) {
                    return RegularStackRoute.NEW_REGULATIONS_SCREEN;
                }

                if (showNewAppVersion) {
                    return RegularStackRoute.NEW_APP_VERSION_SCREEN;
                }

                if (props.route.params?.redirectToScreen) {
                    return props.route.params.redirectToScreen;
                }

                return BothStackRoute.TAB_MENU_SCREEN;
            };

            const t = setTimeout(() => {
                props.navigation.replace(getPage());
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
        props.route.params?.redirectToScreen,
    ]);

    return (
        <>
            <StatusBar hidden />
            <AnimatedKrossLogoContainer />
        </>
    );
};

export default SplashScreen;

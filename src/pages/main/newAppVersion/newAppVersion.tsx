import React, {useState, useCallback, useEffect} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    ScrollView,
    Platform,
    Linking,
} from 'react-native';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

import BigRedBtn from '@sharedComponents/buttons/bigRedBtn';
import BigWhiteBtn from '@sharedComponents/buttons/bigWhiteBtn';

import {getStatusBarHeight} from '@utils/detectIOSDevice';
import {
    setObjSize,
    getHorizontalPx,
    getVerticalPx,
    getWidthPx,
} from '@helpers/layoutFoo';
import {BothStackRoute} from '@navigation/route';

import SvgVersion from './svgVersion';
import {setNewAppVersion} from '@src/storage/actions';
import {useAppDispatch, useAppSelector} from '@hooks/redux';

interface Props {
    navigation: any;
    route: any;
}

const NewAppVersion: React.FC<Props> = (props: Props) => {
    const {t} = useMergedTranslation('newAppVersion');

    const dispatch = useAppDispatch();
    const shopAppVersion = useAppSelector<string>(
        state => state.app.config.version,
    );

    const [headHeight, setHeadHeight] = useState<number>(0);

    const handleGoForward = () => {
        dispatch(setNewAppVersion(shopAppVersion));
        props.navigation.navigate(BothStackRoute.TAB_MENU_SCREEN);
    };

    const handleLinkToShop = () => {
        dispatch(setNewAppVersion(shopAppVersion));
        if (Platform.OS === 'android') {
            Linking.openURL('market://details?id=pl.kross.mykross');
        } else {
            Linking.openURL(
                'itms-apps://apps.apple.com/id/app/mykross/id1561981216?l=pl',
            );
        }
    };

    const getHeight = useCallback(async () => {
        const statusBarHeight = await getStatusBarHeight(
            Platform.OS === 'android',
        );
        setHeadHeight(getVerticalPx(100) - statusBarHeight);
    }, []);

    useEffect(() => {
        getHeight();
    }, [getHeight]);

    const arrowsW = getHorizontalPx(90);
    const arrowsH = getHorizontalPx(92.68);

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
        },
        scroll: {
            width: '100%',
            height: getVerticalPx(896 - 65 - 20) - headHeight - 50,
            top: headHeight,
        },
        wrap: {
            width: getWidthPx(),
            left: getHorizontalPx(40),
        },
        title: {
            fontFamily: 'DIN2014Narrow-Regular',
            textAlign: 'center',
            marginTop: getVerticalPx(38),
            fontSize: 40,
            lineHeight: 52,
            color: '#313131',
        },
        svgWrap: {
            marginTop: getVerticalPx(30),
            marginBottom: getVerticalPx(20),
            position: 'relative',
            width: getHorizontalPx(296),
            height: getHorizontalPx(296),
            left: getHorizontalPx(19),
        },
        svgBack: {
            width: getHorizontalPx(296),
            height: getHorizontalPx(296),
        },
        svgArrows: {
            position: 'absolute',
            left: (getHorizontalPx(296) - arrowsW) / 2,
            top: (getHorizontalPx(296) - arrowsH) / 2,
            width: arrowsW,
            height: arrowsH,
        },
        text: {
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'left',
            fontSize: 23,
            lineHeight: 30,
            color: '#313131',
        },
        bold: {
            fontFamily: 'DIN2014Narrow-Regular',
        },
        header: {
            position: 'absolute',
            width: '100%',
            height: headHeight,
            opacity: 0.5,
        },
        headerText: {
            width: '100%',
            textAlign: 'center',
            top: getVerticalPx(65),
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: 18,
            color: '#313131',
        },
        bottons: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: getHorizontalPx(334),
            left: getHorizontalPx(40),
            position: 'absolute',
            bottom: getVerticalPx(65),
            height: 50,
            zIndex: 10,
        },
        btn: {
            width: getHorizontalPx(157),
        },
        rightBtn: {
            marginLeft: 20,
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.scroll}>
                <ScrollView>
                    <View style={styles.wrap}>
                        <Text style={styles.title}>{t('title')}</Text>

                        <SvgVersion />

                        <Text style={styles.text}>
                            {t('text_1')}
                            <Text style={[styles.text, styles.bold]}>
                                {t('text_2')}
                            </Text>
                            <Text style={styles.text}>{t('text_3')}</Text>
                        </Text>
                    </View>
                </ScrollView>
            </View>

            <View style={styles.header}>
                <Text style={styles.headerText}>{t('header')}</Text>
            </View>

            <View style={styles.bottons}>
                <View style={styles.btn}>
                    <BigWhiteBtn
                        title={t('btnLeft')}
                        onpress={handleGoForward}
                    />
                </View>
                <View style={[styles.btn, styles.rightBtn]}>
                    <BigRedBtn
                        title={t('btnRight')}
                        onpress={handleLinkToShop}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default NewAppVersion;

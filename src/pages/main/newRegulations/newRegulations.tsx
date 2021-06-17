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
import Svg, {Path, Circle} from 'react-native-svg';
import Hyperlink from 'react-native-hyperlink';
import I18n from 'react-native-i18n';

import BigRedBtn from '../../../sharedComponents/buttons/bigRedBtn';
import BigWhiteBtn from '../../../sharedComponents/buttons/bigWhiteBtn';

import {getStatusBarHeight} from '../../../utils/detectIOSDevice';
import {
    setObjSize,
    getHorizontalPx,
    getVerticalPx,
    getWidthPx,
} from '../../../helpers/layoutFoo';
import Loader from '../../onboarding/bikeAdding/loader/loader';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {TermsAndConditionsType} from '../../../models/regulations.model';
import {setAppShowedRegulationsNumber} from '../../../storage/actions';

interface Props {
    navigation: any;
    route: any;
}

const NewRegulations: React.FC<Props> = (props: Props) => {
    const trans: any = I18n.t('newRegulations');
    const dispatch = useAppDispatch();
    const currentVersion = useAppSelector<string>(
        state => state.app.currentTerms?.version,
    );
    const data = useAppSelector<TermsAndConditionsType>(
        state => state.app.terms?.[state.app?.terms?.length - 1],
    );
    const content = useAppSelector<TermsAndConditionsType>(
        state => state.app.terms?.[Number(currentVersion) - 1],
    );
    const showed = useAppSelector<number>(state => state.app.showedRegulations);

    const [headHeight, setHeadHeight] = useState<number>(0);
    const [pageType, setPageType] = useState<string | null>(null);
    const [shovedToSave, setShovedToSave] = useState<number>(0);

    useEffect(() => {
        if (data) {
            const now = Date.now();
            const showDate = data.showDate ? Date.parse(data.showDate) : 0;
            const publishDate = data?.publishDate
                ? Date.parse(data.publishDate)
                : 0;

            if (
                Number(currentVersion) != Number(data.version) ||
                !currentVersion
            ) {
                if (
                    (!currentVersion ||
                        Number(showed) < Number(currentVersion) + 0.5) &&
                    showDate <= now &&
                    publishDate > now
                ) {
                    setPageType('info');
                    setShovedToSave(Number(currentVersion) + 0.5);
                } else if (
                    Number(showed) < Number(data.version) &&
                    publishDate <= now
                ) {
                    setPageType('change');
                    setShovedToSave(Number(data.version));
                }
            }
        }
    }, [pageType, currentVersion, data, showed]);

    const handleGoForward = () => {
        dispatch(setAppShowedRegulationsNumber(shovedToSave));
        props.navigation.navigate('MineMenu');
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

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
        },
        scroll: {
            width: '100%',
            height: getVerticalPx(896 - 65 - 10) - headHeight - 50,
            top: headHeight,
        },
        wrap: {
            width: getWidthPx(),
            left: getHorizontalPx(40),
        },
        title: {
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'left',
            marginTop: getVerticalPx(38),
            fontSize: 30,
            lineHeight: 40,
            color: '#313131',
        },
        svg: {
            marginTop: getVerticalPx(37),
            width: getWidthPx() / 2,
            height: getWidthPx() / 2,
            left: getWidthPx() / 4,
        },
        text: {
            marginTop: getVerticalPx(37),
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'left',
            fontSize: 23,
            lineHeight: 30,
            color: '#313131',
            marginBottom: getVerticalPx(60),
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
        btns: {
            position: 'absolute',
            bottom: 0,
            width: getWidthPx(),
            left: getHorizontalPx(40),
            height: getVerticalPx(65 + 10) + 50,
            backgroundColor: '#fff',
        },
        oneBtn: {
            marginTop: getVerticalPx(10),
            height: 50,
        },
        twoBtnsWrap: {
            marginTop: getVerticalPx(10),
            height: 50,
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
        },
        oneOfTwoBtns: {
            width: getHorizontalPx(157),
        },
    });

    if (!pageType) {
        return (
            <SafeAreaView style={styles.container}>
                <Loader />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.scroll}>
                <ScrollView>
                    {content && (
                        <View style={styles.wrap}>
                            <Text style={styles.title}>{content.title}</Text>

                            {/* <Svg style={styles.svg} viewBox="0 0 296 296">
                            <Circle cx="148" cy="148" r="148" fill="#F0F0F0" />
                            <Path
                                fill="#FFF"
                                fill-rule="nonzero"
                                d="M97.422 46.614L50.02 225.054 174.763 261.762 223.377 114.934 184.799 57.251z"
                                transform="translate(-62 -253) translate(3) translate(59 253)"
                            />
                            <Path
                                fill="#313131"
                                fill-rule="nonzero"
                                d="M111.687 122.496L110.148 128.29 177.012 142.072 179.404 134.848zM103.687 148.496L102.148 154.29 169.012 168.072 171.404 160.848zM95.687 174.496L94.148 180.29 161.012 194.072 163.404 186.848z"
                                transform="translate(-62 -253) translate(3) translate(59 253)"
                            />
                            <Path
                                fill="#DEDEDE"
                                d="M185.087 57.5L223.377 114.934 172.22 105.225z"
                                transform="translate(-62 -253) translate(3) translate(59 253)"
                            />
                            <Path
                                fill="#555"
                                d="M172.22 104.954L223.377 114.934 222.423 117.899z"
                                transform="translate(-62 -253) translate(3) translate(59 253)"
                            />
                        </Svg> */}

                            <Hyperlink
                                linkStyle={{color: '#3587ea'}}
                                linkText={(url: string) => {
                                    let link = trans.urls.find(
                                        e => e.url == url,
                                    );
                                    if (link) {
                                        return link.hyper;
                                    } else {
                                        return url;
                                    }
                                }}
                                onPress={(url: string) => {
                                    if (url == 'http://regulations.eu') {
                                        props.navigation.navigate(
                                            'Regulations',
                                        );
                                    } else if (
                                        url == 'http://privacyPolicy.eu'
                                    ) {
                                        props.navigation.navigate(
                                            'PrivacyPolicy',
                                        );
                                    } else if (url == 'http://informUs.eu') {
                                        props.navigation.navigate('Contact');
                                    } else {
                                        Linking.openURL(url);
                                    }
                                }}>
                                <Text style={styles.text}>{content.text}</Text>
                            </Hyperlink>
                        </View>
                    )}
                </ScrollView>
            </View>

            <View style={styles.header}>
                <Text style={styles.headerText}>
                    {pageType === 'info' ? trans.header[0] : trans.header[1]}
                </Text>
            </View>

            <View style={styles.btns}>
                {pageType === 'info' && (
                    <BigRedBtn
                        style={styles.oneBtn}
                        title={trans.btnOk}
                        onpress={handleGoForward}
                    />
                )}
                {pageType === 'change' && (
                    <View style={styles.twoBtnsWrap}>
                        <BigWhiteBtn
                            style={styles.oneOfTwoBtns}
                            title={trans.btnDontAccept}
                            onpress={() => {}}
                        />
                        <BigRedBtn
                            style={styles.oneOfTwoBtns}
                            title={trans.btnAccept}
                            onpress={handleGoForward}
                        />
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default NewRegulations;

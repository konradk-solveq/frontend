import React, { useState, useCallback, useEffect } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    ScrollView,
    Platform,
    Linking,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import Hyperlink from 'react-native-hyperlink';
import I18n from 'react-native-i18n';

import BigRedBtn from '../../../sharedComponents/buttons/bigRedBtn';
import BigWhiteBtn from '../../../sharedComponents/buttons/bigWhiteBtn';

import { getStatusBarHeight } from '../../../utils/detectIOSDevice';
import {
    setObjSize,
    getHorizontalPx,
    getVerticalPx,
    getWidthPx,
} from '../../../helpers/layoutFoo';

interface Props {
    navigation: any;
    route: any;
}

const newRegulations: React.FC<Props> = (props: Props) => {
    const trans: any = I18n.t('newRegulations');
    // TODO
    // data = {
    //     version: string, // 1.0.0
    //     type: string, // info | change
    //     title: string, // Od 1 czerwca 2021 zmieniamy regulamin aplikacji.
    //     text: string, //Sprawdź zmiany i nowości, które wprowadzamy w http://kross.eu.
    //     urls: [{
    //         url: string, // http://kross.eu
    //         hyper: string // Regulaminem Aplikacji Mobilnej
    //     }],
    // }
    
    const [headHeight, setHeadHeight] = useState(0);

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
            width: getWidthPx(),
            height: getWidthPx(),
        },
        text: {
            marginTop: getVerticalPx(20),
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
        }
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.scroll}>
                <ScrollView>
                    <View style={styles.wrap}>
                        <Text style={styles.title}>{trans.title}</Text>

                        <Svg style={styles.svg} viewBox="0 0 296 296">
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
                        </Svg>

                        <Hyperlink
                            linkStyle={{ color: '#3587ea' }}
                            linkText={(url: string) => {
                                let link = trans.urls.find(e => e.url == url);
                                if (link) {
                                    return link.hyper;
                                } else {
                                    return url;
                                }
                            }}
                            onPress={(url: string) => {
                                Linking.openURL(url);
                            }}>
                            <Text style={styles.text}>{trans.text}</Text>
                        </Hyperlink>
                    </View>
                </ScrollView>
            </View>

            <View style={styles.header}>
                <Text style={styles.headerText}>{trans.header}</Text>
            </View>

            <View style={styles.btns}>
                {trans.type == 'info' && (
                    <BigRedBtn
                        style={styles.oneBtn}
                        title={trans.btnOk}
                        onpress={() => props.navigation.navigate('MineMenu')}
                    />
                )}
                {trans.type == 'change' && (
                    <View style={styles.twoBtnsWrap}>

                        <BigWhiteBtn
                            style={styles.oneOfTwoBtns}
                            title={trans.btnDontAccept}
                            onpress={() => { }}
                        />
                        <BigRedBtn
                            style={styles.oneOfTwoBtns}
                            title={trans.btnAccept}
                            onpress={() => { }}
                        />

                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default newRegulations;

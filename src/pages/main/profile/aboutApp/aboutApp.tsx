import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, View, Text, ScrollView} from 'react-native';
import I18n from 'react-native-i18n';
import DeviceInfo from 'react-native-device-info';

import StackHeader from '../../../../sharedComponents/navi/stackHeader/stackHeader';
import Bike_0 from './bike_0';
import Bike_1 from '../../../onboarding/newBeginning/bike_4';
import Bike_2 from '../../../onboarding/newBeginning/bike_5';
import Bike_3 from '../../../onboarding/newBeginning/bike_2';

import {
    setObjSize,
    getHorizontalPx,
    getVerticalPx,
    getWidthPx,
} from '../../../../helpers/layoutFoo';
import {version} from '../../../../../package.json';
import {API_URL} from '@env';

interface Props {
    navigation: any;
    route: any;
}

const getAppVersion = () => {
    const appBuildNumber = DeviceInfo.getBuildNumber();
    const serverVersion = API_URL.includes('.pre.') ? ' - serwer testowy' : '';

    return `${version} (${appBuildNumber}) ${serverVersion}`;
};

const AboutApp: React.FC<Props> = (props: Props) => {
    const trans: any = I18n.t('AboutApp');

    const [headHeight, setHeadHeightt] = useState(0);

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
        },
        scroll: {
            width: '100%',
            height: '100%',
            top: headHeight,
            backgroundColor: 'white',
        },
        wrap: {
            width: getWidthPx(),
            left: getHorizontalPx(40),
            marginBottom: getVerticalPx(65) + headHeight,
        },
        title: {
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'left',
            marginTop: getVerticalPx(30),
            fontSize: 30,
            lineHeight: 40,
            color: '#313131',
        },
        bike: {
            marginTop: getVerticalPx(31),
            width: getHorizontalPx(296),
            height: getHorizontalPx(296),
            left: getHorizontalPx(19),
        },

        text: {
            marginTop: getVerticalPx(30),
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'left',
            fontSize: 18,
            lineHeight: 24,
            color: '#555555',
        },
        nextLineText: {
            marginTop: getVerticalPx(15),
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'left',
            fontSize: 18,
            lineHeight: 24,
            color: '#555555',
        },
        signature: {
            marginTop: getVerticalPx(45),
            fontFamily: 'DIN2014Narrow-Regular',
            textAlign: 'left',
            fontSize: 18,
            lineHeight: 24,
            color: '#555555',
        },
        nextLineSignature: {
            marginTop: getVerticalPx(15),
            fontFamily: 'DIN2014Narrow-Regular',
            textAlign: 'left',
            fontSize: 18,
            lineHeight: 24,
            color: '#555555',
        },
        version: {
            marginTop: getVerticalPx(80),
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: 14,
            textAlign: 'left',
            color: '#555555',
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.scroll}>
                <ScrollView>
                    <View style={styles.wrap}>
                        <Text style={styles.title}>{trans.title}</Text>

                        <Bike_0 style={styles.bike} />

                        <Text style={styles.text}>{trans.text_1}</Text>
                        <Text style={styles.nextLineText}>{trans.text_1b}</Text>

                        <Bike_1 style={styles.bike} />

                        <Text style={styles.text}>{trans.text_2}</Text>

                        <Bike_2 style={styles.bike} />

                        <Text style={styles.text}>{trans.text_3}</Text>

                        <Bike_3 style={styles.bike} />

                        <Text style={styles.text}>{trans.text_4}</Text>
                        <Text style={styles.nextLineText}>{trans.text_4b}</Text>

                        <Text style={styles.signature}>
                            {trans.signature_1}
                        </Text>
                        <Text style={styles.nextLineSignature}>
                            {trans.signature_2}
                        </Text>

                        <Text
                            style={
                                styles.version
                            }>{`v. ${getAppVersion()}`}</Text>
                    </View>
                </ScrollView>
            </View>

            <StackHeader
                onpress={() => props.navigation.goBack()}
                inner={trans.header}
                getHeight={setHeadHeightt}
                style={{backgroundColor: '#fff'}}
            />
        </SafeAreaView>
    );
};

export default AboutApp;

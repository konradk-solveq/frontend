import React from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {
    StyleSheet,
    Dimensions,
    SafeAreaView,
    Text,
    View,
    Platform,
} from 'react-native';
import I18n from 'react-native-i18n';
import StackHeader from '../../../../sharedComponents/navi/stackHeader/stackHeader';

import {
    setObjSize,
    getCenterLeftPx,
    getHorizontalPx,
    getVerticalPx,
    getWidthPx,
} from '../../../../helpers/layoutFoo';

interface Props {
    navigation: any;
    route: any;
}

const ww = Dimensions.get('window').width;
const wh = Dimensions.get('window').height;

const ServicesMap: React.FC<Props> = (props: Props) => {
    const trans: any = I18n.t('MainWorld');
    const param = props.route.params;

    setObjSize(350, 23);
    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
        },
        wrap: {
            ...StyleSheet.absoluteFillObject,
            justifyContent: 'flex-end',
            alignItems: 'center',
            position: 'absolute',
            width: ww,
            height: wh,
        },
        title: {
            marginTop: getVerticalPx(55),
            marginBottom: getVerticalPx(15),
            position: 'relative',
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'left',
            fontSize: 18,
            color: '#555555',
        },

        map: {
            ...StyleSheet.absoluteFillObject,
        },
        click: {
            width: '100%',
            height: '100%',
            backgroundColor: 'red',
            position: 'absolute',
            left: 0,
            top: 0,
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrap}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={param.region}
                />
            </View>

            <StackHeader onpress={() => props.navigation.goBack()} inner={''} />
        </SafeAreaView>
    );
};

export default ServicesMap;

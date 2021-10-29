import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableWithoutFeedback,
    Linking,
} from 'react-native';
import I18n from 'react-native-i18n';
import { useAppSelector } from '../../../../hooks/redux';

import StackHeader from '../../../../sharedComponents/navi/stackHeader/stackHeader';
import BigRedBtn from '../../../../sharedComponents/buttons/bigRedBtn';

import {
    setObjSize,
    getCenterLeftPx,
    getVerticalPx,
    getWidthPx,
    getFontSize,
    getHorizontalPx,
} from '../../../../helpers/layoutFoo';

interface Props {
    navigation: any;
    route: any;
}

const Contact: React.FC<Props> = (props: Props) => {
    const trans = I18n.t('Contact');
    const userName =
        useAppSelector<string>(state => state.user.userName) || trans.anonim;

    // const [headHeight, setheadHeight] = useState(0);

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
        },
        wrap: {
            position: 'absolute',
            width: getWidthPx(),
            height: getVerticalPx(896 - 100),
            left: getCenterLeftPx(),
            marginBottom: getVerticalPx(65),
            marginTop: getVerticalPx(100),
        },
        title: {
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: getFontSize(30),
            color: '#555555',
            textAlign: 'left',
            position: 'absolute',
            top: getVerticalPx(138 - 100),
        },
        poneEmail: {
            position: 'absolute',
            top: getVerticalPx(347 - 100),
        },
        phone: {
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getFontSize(40),
            color: '#313131',
            textAlign: 'left',
            marginBottom: getVerticalPx(16),
        },
        email: {
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getFontSize(40),
            color: '#3587ea',
            textAlign: 'left',
        },
        adress: {
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: getFontSize(24),
            lineHeight: getFontSize(30),
            color: '#313131',
            textAlign: 'left',
            position: 'absolute',
            top: getVerticalPx(568 - 100),
        },
        btn: {
            position: 'absolute',
            bottom: getVerticalPx(65),
            height: getHorizontalPx(50),
            width: '100%',
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrap}>
                <Text style={styles.title}>{userName + trans.title}</Text>
                <View style={styles.poneEmail}>
                    <TouchableWithoutFeedback
                        onPress={() => Linking.openURL(`tel:${trans.phone}`)}>
                        <Text style={styles.phone}>{trans.phone}</Text>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                        onPress={() =>
                            Linking.openURL('mailto:kross@kross.pl')
                        }>
                        <Text style={styles.email}>{trans.email}</Text>
                    </TouchableWithoutFeedback>
                </View>
                <Text style={styles.adress}>{trans.adress}</Text>

                <BigRedBtn
                    style={styles.btn}
                    title={trans.btn}
                    onpress={() => Linking.openURL('http://kross.eu')}
                />
            </View>

            <StackHeader
                onpress={() => props.navigation.goBack()}
                inner={trans.header}
            // getHeight={setheadHeight}
            />
        </SafeAreaView>
    );
};

export default Contact;

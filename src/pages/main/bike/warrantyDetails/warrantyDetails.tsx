import React, {useState} from 'react';
import {StyleSheet, View, Text, ScrollView, SafeAreaView} from 'react-native';
import I18n from 'react-native-i18n';

import {
    setObjSize,
    getVerticalPx,
    getHeightPx,
    getHorizontalPx,
    getWidthPx,
    getCenterLeftPx,
} from '../../../../helpers/layoutFoo';

import StackHeader from '../../../../sharedComponents/navi/stackHeader/stackHeader';
import BigRedBtn from '../../../../sharedComponents/buttons/bigRedBtn';
import AnimSvg from '../../../../helpers/animSvg';
import {countDaysToEnd} from '../../../../helpers/warranty';

interface Props {
    navigation: any;
    route: any;
}

const WarrantyDetails: React.FC<Props> = (props: Props) => {
    const trans = I18n.t('WarrantyDetails');
    const details = props.route.params.details;

    const placeIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
    <path
    fill="#d8232a" stroke="none"
       d="M 17.500434,0 A 17.500033,17.500033 0 0 0 0,17.499565 17.500033,17.500033 0 0 0 17.500434,35 17.500033,17.500033 0 0 0 34.999998,17.499565 17.500033,17.500033 0 0 0 17.500434,0 Z m 0,7.284816 a 7.5885871,7.5885871 0 0 1 7.588423,7.589293 7.5885871,7.5885871 0 0 1 -1.508464,4.524519 l 0.01216,-8.91e-4 -0.08787,0.101782 a 7.5885871,7.5885871 0 0 1 -0.626352,0.720305 l -4.171325,4.797678 v 8.91e-4 l -1.206599,1.387543 -1.205726,-1.387543 -4.161757,-4.78637 a 7.5885871,7.5885871 0 0 1 -0.666369,-0.76641 l -0.05916,-0.06785 0.01131,8.91e-4 A 7.5885871,7.5885871 0 0 1 9.912004,14.874113 7.5885871,7.5885871 0 0 1 17.500426,7.28482 Z m 0,4.704596 a 3.2906114,3.2906114 0 0 0 -3.290954,3.290955 3.2906114,3.2906114 0 0 0 3.290954,3.290085 3.2906114,3.2906114 0 0 0 3.290086,-3.290085 3.2906114,3.2906114 0 0 0 -3.290086,-3.290955 z"
        />
  </svg>`;

    const [headHeight, setHeadHeightt] = useState(0);

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        scroll: {
            width: '100%',
            height: '100%', // wh - headHeight,
            top: headHeight,
        },
        area: {
            width: getWidthPx(),
            left: getCenterLeftPx(),
        },
        titleBox: {
            marginTop: getVerticalPx(40),
            paddingTop: getVerticalPx(20),
            paddingRight: getHorizontalPx(10),
            paddingBottom: getVerticalPx(20),
            paddingLeft: getHorizontalPx(10),
            backgroundColor: 'khaki',
            borderRadius: getHorizontalPx(20),
        },
        title: {
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: 40,
            color: '#313131',
            textAlign: 'center',
        },
        details: {
            marginTop: getVerticalPx(5),
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'center',
            fontSize: getHorizontalPx(15),
            color: '#555555',
        },
        place: {
            width: getHorizontalPx(36),
            height: getHorizontalPx(36),
            position: 'absolute',
            right: 0,
        },
        name: {
            marginTop: getVerticalPx(30),
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'left',
            fontSize: getHorizontalPx(15),
            color: '#555555',
        },
        value: {
            marginTop: getVerticalPx(6),
            fontFamily: 'DIN2014Narrow-Regular',
            textAlign: 'left',
            fontSize: getHorizontalPx(18),
            color: '#555555',
        },
        shopName: {
            marginTop: getVerticalPx(6),
            fontFamily: 'DIN2014Narrow-Regular',
            textAlign: 'left',
            fontSize: getHorizontalPx(23),
            color: '#313131',
        },
        adress: {
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'left',
            fontSize: getHorizontalPx(15),
            color: '#555555',
        },
        contact: {
            marginTop: getVerticalPx(12),
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            // justifyContent: 'center',
            alignItems: 'flex-start',
        },
        constactBox: {
            width: '50%',
            fontFamily: 'DIN2014Narrow-Regular',
            textAlign: 'left',
            fontSize: getHorizontalPx(15),
            color: '#555555',
        },
        btn: {
            marginTop: getVerticalPx(92),
            height: getHeightPx(),
            marginBottom: headHeight,
        },
        spaceOnEnd: {
            width: '100%',
            height: getVerticalPx(69),
        },
    });

    const hendleDay = (d: string) => {
        const getDate = (dd: string) => {
            let values = dd
                .replace('Z', '')
                .replace(/-|\s|T|:/g, '#')
                .split('#')
                .map(e => Number(e));
            console.log(
                '%c values:',
                'background: #ffcc00; color: #003300',
                values,
            );
            return new Date(...values);
        };

        let date = getDate(d);
        return (
            '' +
            date.getDate() +
            '.' +
            date.getMonth() +
            '.' +
            date.getFullYear()
        );
    };

    const heandlerGetWaranty = () => {};

    return (
        <SafeAreaView style={{backgroundColor: 'white'}}>
            <View style={styles.scroll}>
                <ScrollView>
                    <View style={styles.area}>
                        <View style={styles.titleBox}>
                            <Text style={styles.title}>
                                {trans.title +
                                    (details.warranty &&
                                        (details.warranty.id
                                            ? details.warranty.id
                                            : 'no number'))}
                            </Text>
                            <Text style={styles.details}>
                                {trans.details[0] +
                                    ' ' +
                                    hendleDay(details.warranty.end) +
                                    ' ' +
                                    trans.details[1] +
                                    ' ' +
                                    countDaysToEnd(details.warranty.end) +
                                    ' ' +
                                    trans.details[2]}
                            </Text>
                        </View>

                        <Text style={styles.name}>{trans.bike}</Text>
                        <Text style={styles.value}>
                            {details.description.name +
                                ' ' +
                                trans.bikeDescription +
                                ' ' +
                                details.description.serial_number}
                        </Text>

                        <Text style={styles.name}>{trans.id}</Text>
                        <Text style={styles.value}>
                            {details.description.sku}
                        </Text>

                        <Text style={styles.name}>{trans.date}</Text>
                        {/* <Text style={styles.value}>{(details.description.bought.date)}</Text> */}

                        <Text style={styles.name}>{trans.place}</Text>
                        {/* <Text style={styles.shopName}>{details.description.bought.adress.shopName}</Text> */}

                        <View>
                            {/* <Text style={styles.adress}>{details.description.bought.adress.street}</Text>
                            <Text style={styles.adress}>{details.description.bought.adress.city}</Text> */}

                            <AnimSvg style={styles.place} source={placeIcon} />
                        </View>

                        <View style={styles.contact}>
                            {/* <Text style={styles.constactBox}>{details.description.bought.adress.email}</Text>
                            <Text style={styles.constactBox}>{details.description.bought.adress.phone}</Text> */}
                        </View>

                        <BigRedBtn
                            style={styles.btn}
                            title={trans.btn}
                            onpress={() => heandlerGetWaranty()}
                        />
                    </View>

                    <View style={styles.spaceOnEnd} />
                </ScrollView>
            </View>

            <StackHeader
                onpress={() => props.navigation.navigate('TabMenu')}
                inner={trans.header}
                getHeight={setHeadHeightt}
            />
        </SafeAreaView>
    );
};

export default WarrantyDetails;

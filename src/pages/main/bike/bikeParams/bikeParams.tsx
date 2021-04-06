import React from "react";
import { StyleSheet, Dimensions, SafeAreaView, View, Text } from 'react-native';
import I18n from 'react-native-i18n';
import { ScrollView } from 'react-native-gesture-handler';

import VerticalHeader from '../../../../sharedComponents/navi/verticalHeader/verticalHeader';
// import BigWhiteBtn from '../../../../sharedComponents/buttons/bigWhiteBtn';
import BigRedBtn from '../../../../sharedComponents/buttons/bigRedBtn';

import {
    initAppSize,
    setObjSize,
    getCenterLeftPx,
    getLeftPx,
    getTopPx,
    getWidthPx,
 
} from '../../../../helpers/layoutFoo';

interface Props {
    navigation: any,
    route: any,
};

const BikeParams: React.FC<Props> = (props: Props) => {

    const trans = I18n.t('MainProfile');
    const description = props.route.params.description;
    const params = props.route.params.params;

    initAppSize();

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
        },
        scroll: {
            backgroundColor: '#ffffff'
        },
        bikeName: {
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getLeftPx(40),
            width: '100%',
            color: '#313131',
            textAlign: 'center'
        },
        bikeDetails: {
            marginTop: getTopPx(5),
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'center',
            fontSize: getLeftPx(15),
            color: '#555555',
            // backgroundColor: 'khaki'
        },
        color: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginTop: getTopPx(39)
        },
        colorBall: {
            width: getLeftPx(24),
            height: getLeftPx(24),
            borderRadius: getLeftPx(12),
            backgroundColor: 'khaki',
            marginRight: getLeftPx(22)
        },
        colorText: {
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getLeftPx(18),
            color: '#555555'
        },
        size: {
            marginTop: getTopPx(20),
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: getLeftPx(29),
            borderRadius: getLeftPx(15),
            borderColor: '#33555555',
            borderWidth: 1,
            alignSelf: "flex-start"
        },
        sizeText: {
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getLeftPx(18),
            color: '#555555',
            paddingLeft: getLeftPx(15),
            paddingRight: getLeftPx(15),
        },
        lists: {
            marginTop: getTopPx(12),
            left: getCenterLeftPx(),
            width: getWidthPx()
        },
        list: {
            marginTop: getTopPx(30)
        },
        name: {
            fontFamily: "DIN2014Narrow-Regular",
            fontSize: getLeftPx(26),
            color: '#313131',
            textAlign: 'left',
            marginBottom: getTopPx(11)
        },
        valLine: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        value: {
            fontFamily: "DIN2014Narrow-Light",
            fontSize: getLeftPx(16),
            lineHeight: getLeftPx(26),
            color: '#313131'

        },
        btn: {
            width: getWidthPx(),
            height: getLeftPx(50),
            left: getCenterLeftPx(),
            marginTop: getTopPx(31),
            marginBottom: getTopPx(80)
        }
    })

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll}>

                <VerticalHeader
                    onpress={() => props.navigation.navigate('TabMenu')}
                />

                <View style={styles.lists}>

                    <Text style={styles.bikeName}>{description.name}</Text>

                    <Text style={styles.bikeDetails}>
                        {trans.details[0] + description.producer + trans.details[1] + description.frame}
                    </Text>

                    <View style={styles.color}>
                        <View style={styles.colorBall} />
                        <Text style={styles.colorText}>{description.color}</Text>
                    </View>

                    <View style={styles.size}>
                        <Text style={styles.sizeText}>{description.size}</Text>
                    </View>

                    {params.map((e, i) => (
                        <View style={styles.list} key={'list_' + i}>

                            <Text style={styles.name}>{e.name}</Text>

                            {e.list.map((ee, ii) => (
                                <View style={styles.valLine} key={'val_' + i + '_' + ii}>

                                    <Text style={styles.value}>{ee.name}</Text>
                                    <Text style={styles.value}>{ee.value}</Text>

                                </View>
                            ))}

                        </View>
                    ))}

                </View>

                <BigRedBtn
                    style={styles.btn}
                    title={trans.btnAddStuff}
                    onpress={() => props.navigation.navigate('TabMenu')}
                />

            </ScrollView>
        </SafeAreaView>
    )
}

export default BikeParams
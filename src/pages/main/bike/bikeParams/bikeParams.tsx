import React, {useState} from 'react';
import {StyleSheet, Dimensions, SafeAreaView, View, Text} from 'react-native';
import I18n from 'react-native-i18n';
import {ScrollView} from 'react-native-gesture-handler';

import StackHeader from '../../../../sharedComponents/navi/stackHeader/stackHeader';
import {ColorLabel} from '../../../../sharedComponents/labels';

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

const wh = Dimensions.get('window').height;

const BikeParams: React.FC<Props> = (props: Props) => {
    const trans: any = I18n.t('MainBikeParams');
    const description = props.route.params.description;
    const params = props.route.params.params;

    const [headHeight, setHeadHeightt] = useState(0);

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: '#ffffff',
        },
        scroll: {
            height: wh - headHeight,
            marginTop: headHeight,
        },
        bikeName: {
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getHorizontalPx(40),
            width: '100%',
            color: '#313131',
            textAlign: 'center',
        },
        bikeDetails: {
            marginTop: getVerticalPx(5),
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'center',
            fontSize: getHorizontalPx(15),
            color: '#555555',
            // backgroundColor: 'khaki'
        },
        color: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginTop: getVerticalPx(39),
        },
        size: {
            marginTop: getVerticalPx(20),
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: getHorizontalPx(29),
            borderRadius: getHorizontalPx(15),
            borderColor: '#33555555',
            borderWidth: 1,
            alignSelf: 'flex-start',
        },
        sizeText: {
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getHorizontalPx(18),
            color: '#555555',
            paddingLeft: getHorizontalPx(15),
            paddingRight: getHorizontalPx(15),
        },
        lists: {
            marginTop: getVerticalPx(12),
            left: getCenterLeftPx(),
            width: getWidthPx(),
        },
        list: {
            marginTop: getVerticalPx(30),
        },
        name: {
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getHorizontalPx(26),
            color: '#313131',
            textAlign: 'left',
            marginBottom: getVerticalPx(11),
        },
        valLine: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        value: {
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: getHorizontalPx(16),
            lineHeight: getHorizontalPx(26),
            color: '#313131',
        },
        longerValue: {
            flex: 1,
            flexWrap: 'wrap',
            textAlign: 'right',
            paddingLeft: 10,
        },
        lastOne: {
            marginBottom: getHorizontalPx(65),
        },
        btn: {
            width: getWidthPx(),
            height: getHorizontalPx(50),
            left: getCenterLeftPx(),
            marginTop: getVerticalPx(31),
            marginBottom: getVerticalPx(80),
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll}>
                <View style={styles.lists}>
                    <Text style={styles.bikeName}>{description.name}</Text>

                    <Text style={styles.bikeDetails}>
                        {trans.details[0] +
                            description.producer +
                            trans.details[1] +
                            description.serial_number}
                    </Text>

                    {description?.color && (
                        <ColorLabel
                            text={description.color}
                            colors={description?.colorCodes}
                            containerStyle={styles.color}
                        />
                    )}

                    <View style={styles.size}>
                        <Text style={styles.sizeText}>{description.size}</Text>
                    </View>

                    {params?.map((e, i) => (
                        <View
                            style={[
                                styles.list,
                                i == params.length - 1 && styles.lastOne,
                            ]}
                            key={'list_' + i}>
                            <Text style={styles.name}>{e.name}</Text>

                            {e.list.map((ee, ii) => (
                                <View
                                    style={styles.valLine}
                                    key={'val_' + i + '_' + ii}>
                                    <Text style={styles.value}>{ee.name}</Text>
                                    <Text
                                        style={[
                                            styles.value,
                                            styles.longerValue,
                                        ]}>
                                        {ee.value}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    ))}
                </View>
            </ScrollView>

            <StackHeader
                onpress={() => props.navigation.navigate('TabMenu')}
                inner={trans.header}
                getHeight={setHeadHeightt}
            />
        </SafeAreaView>
    );
};

export default BikeParams;

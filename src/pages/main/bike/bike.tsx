import React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, View, Text, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import TabBackGround from '../../../sharedComponents/navi/tabBackGround';
import { getBikesData, setBikesData } from '../../../storage/actions/index';
import { ScrollView } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';

import Warranty from './warranty';
import Reviews from './reviews';
import ComplaintsRepairs from './complaintsRepairs';

import {
    setAppSize,
    setObjSize,
    getCenterLeftPx,
    getTopPx,
    getWidthPx,
    getLeftPx,
} from '../../../helpers/layoutFoo';

interface Props {
    navigation: any,
    route: any,
    bikesData: any
    getBikesData: Function,
    setBikesData: Function,
};

const Bike: React.FC<Props> = (props: Props) => {

    const bike = props.bikesData[0];
    const trans = I18n.t('MainBike');

    const ww = Dimensions.get('window').width;
    const wh = Dimensions.get('window').height;
    setAppSize(ww, wh);

    setObjSize(334, 50);
    const w = getWidthPx();
    const l = getCenterLeftPx();
    const styles = StyleSheet.create({
        container: {
            // display: 'flex',
            // justifyContent: 'center',
            // alignItems: 'center',
            width: '100%',
            height: '100%',
        },
        scroll: {
            // backgroundColor: '#ffffff'  
            backgroundColor: '#f0f0f0' // #best
        },
        header: {
            marginTop: getTopPx(65),
            left: l,
            width: w,
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'center',
            fontSize: 18,
            color: '#313131',
        },
        params: {
            position: 'absolute',
            top: getTopPx(65 - 13),
            right: getLeftPx(40 - 13),
            width: getLeftPx(13 + 20 + 13),
            height: getLeftPx(13 + 20 + 13),
            backgroundColor: 'khaki'
        },
        paramIcon: {
            margin: getLeftPx(13),
            width: getLeftPx(20),
            height: getLeftPx(20),
        },
        bikeName: {
            marginTop: getTopPx(48),
            left: l,
            width: w,
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: 40,
            color: '#313131',
            textAlign: 'center',
        },
        bikeDetails: {
            marginTop: getTopPx(5),
            left: l,
            width: w,
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'center',
            fontSize: 15,
            color: '#555555',
            // backgroundColor: 'khaki'
        },
        warranty: {
            marginTop: getTopPx(76),
        },
        reviews: {
            marginTop: getTopPx(45),
        },
        complaintsRepairs: {
            marginTop: getTopPx(30),
        },
        separator: {
            width: '100%',
            height: getTopPx(200)
        },
        test: {
            backgroundColor: 'khaki'
        }
    })

    const heandleParams = () => {
        props.navigation.navigate('BikeParams', { description: bike.description, params: bike.params })
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll}>

                <Text style={styles.header}>{trans.header}</Text>

                <TouchableWithoutFeedback
                    onPress={() => heandleParams()}
                >
                    <View style={styles.params}>
                        <Svg viewBox="0 0 20 20" style={styles.paramIcon}>
                            <Path fill="#313131" fill-rule="nonzero" d="M11.376 0l.348 1.6c.054.247.239.443.48.51.632.176 1.242.43 1.815.752.219.124.488.116.7-.02l1.379-.886 1.946 1.946-.886 1.379c-.137.212-.144.481-.02.7.323.573.575 1.183.752 1.814.067.242.263.427.509.481L20 8.624v2.752l-1.6.348c-.247.054-.443.239-.51.48-.176.632-.43 1.242-.752 1.815-.124.219-.117.488.02.7l.886 1.379-1.946 1.946-1.379-.886c-.212-.137-.481-.144-.7-.02-.573.323-1.183.576-1.814.752-.242.067-.427.263-.481.51l-.348 1.6H8.624l-.348-1.6c-.054-.247-.239-.443-.48-.51-.632-.176-1.242-.43-1.815-.752-.219-.124-.488-.116-.7.02l-1.379.886-1.946-1.946.886-1.379c.137-.212.144-.481.02-.7-.322-.573-.575-1.183-.752-1.814-.067-.242-.263-.427-.509-.481L0 11.376V8.624l1.6-.348c.247-.054.443-.239.51-.48.176-.632.43-1.242.752-1.815.124-.219.117-.488-.02-.7l-.886-1.379 1.946-1.946 1.379.886c.212.137.481.144.7.02.573-.323 1.183-.576 1.814-.752.242-.067.427-.263.481-.51L8.624 0h2.752zM10 2.669l-.02.043c-.34.64-.93 1.125-1.648 1.325-.475.132-.936.323-1.367.567-.635.358-1.376.437-2.056.242l-.093-.03.03.092c.178.619.128 1.288-.151 1.88l-.09.176c-.196.346-.357.71-.482 1.085l-.086.284c-.2.717-.686 1.307-1.325 1.646l-.043.02.043.022c.586.311 1.043.833 1.269 1.47l.056.176c.133.476.324.937.567 1.368.358.635.437 1.377.242 2.057l-.03.091.093-.03c.618-.176 1.287-.127 1.88.152l.175.09c.346.196.71.357 1.085.482l.284.086c.717.2 1.307.686 1.646 1.325l.02.042.022-.042c.311-.586.833-1.043 1.47-1.27l.177-.055c.475-.132.936-.323 1.367-.567.635-.358 1.376-.437 2.056-.242l.092.029-.03-.091c-.177-.619-.127-1.288.152-1.88l.09-.176c.196-.346.357-.71.482-1.085l.086-.284c.2-.717.686-1.307 1.325-1.646L17.33 10l-.042-.021c-.586-.311-1.043-.833-1.269-1.47l-.056-.176c-.133-.476-.324-.937-.567-1.368-.358-.635-.437-1.377-.242-2.057l.029-.092-.092.03c-.618.177-1.287.128-1.88-.151l-.175-.09c-.346-.196-.71-.357-1.085-.482l-.284-.086c-.717-.2-1.307-.686-1.646-1.325L10 2.669zM10 6c2.206 0 4 1.794 4 4s-1.794 4-4 4-4-1.794-4-4 1.794-4 4-4zm0 2c-1.101 0-2 .899-2 2s.899 2 2 2 2-.899 2-2-.899-2-2-2z" />
                        </Svg>
                    </View>
                </TouchableWithoutFeedback>

                <Text style={styles.bikeName}>{bike.description.name}</Text>

                <Text style={styles.bikeDetails}>
                    {trans.details[0] + bike.description.producer + trans.details[1] + bike.description.frame}
                </Text>

                <Warranty
                    style={styles.warranty}
                    navigation={props.navigation}
                    type={bike.warranty.type}
                    toEnd={bike.warranty.toEnd}
                    warranty={trans.warranty}
                    details={{ description: bike.description, warranty: bike.warranty }}
                />

                <Reviews
                    style={styles.reviews}
                    list={bike.warranty.reviews}
                    description={trans.warranty.reviews}
                />

                <ComplaintsRepairs
                    style={styles.complaintsRepairs}
                    list={bike.complaintsRepairs}
                    description={trans.warranty.complaintsRepairs}
                />

                <View style={styles.separator} />

            </ScrollView>

            <TabBackGround></TabBackGround>

        </SafeAreaView>
    )
}

const mapStateToProps = (state: any) => {
    return {
        bikesData: state.bikes.list
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    setBikesData: (name: string) => dispatch(setBikesData(name)),
    getBikesData: async () => dispatch(await getBikesData()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Bike)
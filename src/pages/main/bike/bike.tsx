import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import I18n from 'react-native-i18n';
import TabBackGround from '../../../sharedComponents/navi/tabBackGround';
import { ScrollView } from 'react-native-gesture-handler';

import { useAppSelector } from '../../../hooks/redux';
import { getBike } from '../../../helpers/transformUserBikeData';

import Warranty from './warranty';
import Reviews from './reviews';
import ComplaintsRepairs from './complaintsRepairs';
import BikeSelectorList from './bikeSelectorList/bikeSelectorList';
import { countDaysToEnd } from '../../../helpers/warranty';
import ServiceMapBtn from '../../../sharedComponents/maps/serviceMap';

import {
    setObjSize,
    getCenterLeftPx,
    getVerticalPx,
    getWidthPx,
    getHorizontalPx,
} from '../../../helpers/layoutFoo';
import { UserBike } from '../../../models/userBike.model';

import BikeImage from '../../../sharedComponents/images/bikeImage';
import { SizeLabel, ColorLabel } from '../../../sharedComponents/labels';
import { CogBtn, ShowMoreArrowBtn } from '../../../sharedComponents/buttons';
import Carousel from '../../../sharedComponents/carousel/carousel';

interface Props {
    navigation: any;
    route: any;
}

const Bike: React.FC<Props> = (props: Props) => {
    // const frameNumber = useAppSelector<string>(state => state.user.frameNumber);
    const bikes = useAppSelector<UserBike[]>(state => state.bikes.list);

    const [bike, setBike] = useState(bikes?.[0]);

    const onChangeBikeHandler = (frameNumber: string) => {
        if (frameNumber === bike.description.serial_number) {
            return;
        }
        const newBike = getBike(bikes, frameNumber);
        if (newBike) {
            setBike(newBike);
        }
    };

    const trans: any = I18n.t('MainBike');

    setObjSize(334, 50);
    const w = getWidthPx();
    const l = getCenterLeftPx();
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
        },
        scroll: {
            backgroundColor: '#ffffff',
        },
        header: {
            marginTop: getVerticalPx(65),
            left: l,
            width: w,
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'center',
            fontSize: 18,
            color: '#313131',
        },
        params: {
            position: 'absolute',
            top: getVerticalPx(65 - 13),
            right: getHorizontalPx(40 - 13),
            width: getHorizontalPx(13 + 20 + 13),
            height: getHorizontalPx(13 + 20 + 13),
        },
        paramIcon: {
            margin: getHorizontalPx(13),
            width: getHorizontalPx(20),
            height: getHorizontalPx(20),
        },
        bikeName: {
            left: l,
            width: w,
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: 40,
            color: '#313131',
            textAlign: 'center',
        },
        bikeDetails: {
            marginTop: getVerticalPx(5),
            left: l,
            width: w,
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'center',
            fontSize: 15,
            color: '#555555',
        },
        warranty: {
            marginTop: getVerticalPx(76),
        },
        reviews: {
            marginTop: getVerticalPx(45),
        },
        complaintsRepairs: {
            marginTop: getVerticalPx(30),
        },
        separator: {
            width: '100%',
            height: getVerticalPx(200),
        },
        map: {
            left: l,
            width: w,
        },
        test: {
            backgroundColor: 'khaki',
        },
    });

    const heandleParams = () => {
        props.navigation.navigate('BikeParams', {
            description: bike?.description,
            params: bike?.params,
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll}>
                <Text style={styles.header}>{trans.header}</Text>

                {bike?.params && (
                    <CogBtn
                        callback={heandleParams}
                        containerStyle={styles.params}
                        iconStyle={styles.paramIcon}
                    />
                )}

                <BikeSelectorList
                    style={styles.reviews}
                    list={bikes}
                    description={trans.warranty.reviews}
                    callback={onChangeBikeHandler}
                    currentBike={bike.description.serial_number}
                    buttonText={trans.add}
                />

                {bike?.images && bike.images.length > 0 ? (
                    <Carousel
                        images={bike.images}
                        containerStyle={{ height: 210 }}
                    />
                ) : (
                    <BikeImage />
                )}

                <ShowMoreArrowBtn onPress={() => { }} up={true} />

                <Text style={styles.bikeName}>{bike?.description.name}</Text>

                <Text style={styles.bikeDetails}>
                    {trans.details[0] +
                        bike?.description.producer +
                        trans.details[1] +
                        bike?.description.serial_number}
                </Text>

                {bike?.warranty && (
                    <Warranty
                        style={styles.warranty}
                        navigation={props.navigation}
                        type={bike.warranty.info}
                        toEnd={
                            bike.warranty?.end
                                ? countDaysToEnd(bike.warranty.end)
                                : 0
                        }
                        warranty={trans.warranty}
                        details={{
                            description: bike?.description,
                            warranty: bike.warranty,
                        }}
                    />
                )}

                {bike?.warranty?.overviews && (
                    <Reviews
                        style={styles.reviews}
                        list={bike.warranty.overviews}
                        description={trans.warranty.reviews}
                    />
                )}

                {bike?.complaintsRepairs &&
                    bike.complaintsRepairs.length > 0 && (
                        <ComplaintsRepairs
                            style={styles.complaintsRepairs}
                            list={bike.complaintsRepairs}
                            description={trans.warranty.complaintsRepairs}
                        />
                    )}

                <ServiceMapBtn
                    style={styles.map}
                    title={trans.servisMap}
                    height={102}
                ></ServiceMapBtn>

                <View style={styles.separator} />
            </ScrollView>

            <TabBackGround />
        </SafeAreaView>
    );
};

export default Bike;

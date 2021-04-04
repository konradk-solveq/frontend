import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, SafeAreaView, View, Text } from 'react-native';
import I18n from 'react-native-i18n';
import TabBackGround from '../../../sharedComponents/navi/tabBackGround';

import {
    setAppSize,
    setObjSize,
    getCenterLeft,
    getCenterLeftPx,
    getTopPx,
    getWidth,
    getWidthPx,
    getWidthPxOf,
    getHeightPx,
} from '../../../helpers/layoutFoo';

interface Props {
    navigation: any,
    route: any,
};

const Bike: React.FC<Props> = (props: Props) => {

    const data = {
        bikes: [
            {
                description: {
                    name: 'Evado 2.0',
                    id: 'KRTR3Z28X17W040003',
                    producer: 'Kross',
                    frame: '121232',
                    color: 'czarny / zielony mat',
                    size: ' S (17”) 26”',
                    bought: {
                        date: '15-02-2019 12:00:00',
                        adress: {
                            shopName: 'All for Bike',
                            street: 'ul. 11-go Listopada 7a paw 3',
                            city: '62-510 Konin',
                            email: 'info.allforbike@gmail.com',
                            phone: '+48 665 362 280',
                            lat: 54.338890075683594,
                            lon: 18.600669860839844
                        }
                    },
                    params: [
                        {
                            name: 'Rama i widelec',
                            list: [
                                { name: 'Kaseta/wolnobieg', val: 'MATOWY' },
                                { name: 'Materiał ramy', val: 'ALUMINIUM PERFORMANCE' },
                                { name: 'Widelec', val: 'SR SUNTOUR XCE28' },
                                { name: 'Skok widelca', val: '80MM' },
                                { name: 'Tylny amrtyzator', val: 'BRAK' },
                                { name: 'Skok tylnego amortyzatora', val: 'BRAK' },
                            ]
                        },
                        {
                            name: 'Napęd',
                            list: [
                                { name: 'Przerzutka przód', val: 'SHIMANO TOURNEY TY700' },
                                { name: 'Przerzutka typ', val: 'SHIMANO ACERA M360' },
                                { name: 'Manetki', val: 'SHIMANO EF505' },
                                { name: 'Koronki', val: '42T-34T-24T/175MM' },
                                { name: 'Kaseta/wolnobieg', val: 'SHIMANO HG200' },
                                { name: 'Zakres kasety/wolnobieg', val: '12-32T' },
                                { name: 'Ilość przełożeń', val: '24' },
                                { name: 'Suport', val: 'FP-B902' },
                                { name: 'Łańcuch', val: 'YBN S8' }
                            ]
                        },
                        {
                            name: 'Koła',
                            list: [
                                { name: 'Pisata przód', val: 'GL-B43F-DS' },
                                { name: 'Piasta tył', val: 'GL-B43F-DS' },
                                { name: 'Obręcze', val: 'KROSS' },
                                { name: 'Opony', val: 'MITAS OCELOT V85 29X2.1' }
                            ]
                        },
                        {
                            name: 'Hamulec',
                            list: [
                                { name: 'Hamulec przód', val: 'SHIMANO MT200' },
                                { name: 'Hamulec tył', val: 'SHIMANO MT200' },
                                { name: 'Dźwignie hamulcowe', val: 'SHIMANO EF505' },
                                { name: 'Tarcze hamulcowe', val: 'DISC (160MM)' }
                            ]
                        },
                        {
                            name: 'Komponenty',
                            list: [
                                { name: 'Kierownica', val: 'ALUMINIUM 680 MM 31.8' },
                                { name: 'Wspornik kierownicy', val: 'ALUMINIUM 90MM/31,8/7°' },
                                { name: 'Siodłlo', val: 'KROSS D5311' },
                                { name: 'Wspormnik siodła', val: 'ALUMINIUM 27,2X350' },
                                { name: 'Stery', val: 'FP-H863 O1-1/8"' },
                                { name: 'Chwyty', val: 'KROSS HANDY' },
                                { name: 'Pedały', val: 'FP-804' }
                            ]
                        },
                        {
                            name: 'System e-bike',
                            list: [
                                { name: 'Silnik', val: 'BRAK' },
                                { name: 'Bateria', val: 'BRAK' },
                                { name: 'Bateria', val: 'BRAK' }
                            ]
                        },
                        {
                            name: 'Informacje dodatkowe',
                            list: [
                                { name: 'Waga [kg]', val: '15' }
                            ]
                        },
                        {
                            name: 'Akcesoria',
                            list: [
                                { name: 'Lampka', val: 'ECLIPSE LED' }
                            ]
                        },
                    ]
                },
                warranty: {
                    id: 'G12345566761',
                    type: "Rozszerzona",
                    toEnd: 35,
                    reviews: [
                        {
                            typ: 'gwarancyjny',
                            data: '2020-11-30 12:00:00'
                        },
                        {
                            typ: 'gwarancyjny',
                            data: '2021-03-15 12:00:00'
                        },
                        {
                            typ: 'okresowy',
                            data: '2021-04-30 12:00:00'
                        },
                    ]
                },
                complaintsRepairs: [
                    {
                        id: '2566939992',
                        name: 'Reklamacja roweru',
                        date: '2021-03-20 12:00:00',
                        description: 'Dźwignia przerzutki - pęknięcie',
                        staus: 'w takcie'
                    },
                    {
                        id: '102345566',
                        name: 'Reklamacja akcesorium',
                        date: '2021-03-20 12:00:00',
                        description: 'Niezgodność w dostawie - Uszkodzenie kartonu w dostawie w przypadku części opakowania zbiorczego.',
                        staus: 'zakończona'
                    }
                ]
            }
        ]
    }


    // const trans = I18n.t('Profile').view;

    const ww = Dimensions.get('window').width;
    const wh = Dimensions.get('window').height;
    setAppSize(ww, wh);

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: "#fdf5f5"
        },
        header: {
            position: 'absolute',
            width: getWidthPx(),
            left: getCenterLeftPx(),
            top: getTopPx(65),
            fontFamily: "DIN2014Narrow-Light",
            textAlign: 'center',
            fontSize: 18,
            color: '#313131'
        },
        text: {
            top: -30,
            fontFamily: "DIN2014Narrow-Regular",
            fontSize: 40,
            color: '#313131',
            textAlign: 'center',
        }
    })

    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.header}>Twój rower</Text>


            <Text style={styles.text}>Bike</Text>

            <TabBackGround></TabBackGround>

        </SafeAreaView>
    )
}

export default Bike
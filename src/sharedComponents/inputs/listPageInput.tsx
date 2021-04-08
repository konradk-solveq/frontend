import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, View, Text } from 'react-native';

import StackHeader from '../navi/stackHeader/stackHeader';

import {
    setObjSize,
    getCenterLeftPx,
    getVerticalPx,
    getWidthPx,
    getHorizontalPx
} from '../../helpers/layoutFoo';

interface Props {
    navigation: any, // <<--- #askBartosz (4) ? jak otypowywać takie zmienne ? gdybyś miał jakis przykład byłbym wdzięczny :)
    route: any,
};

const ListPageInput: React.FC<Props> = (props: Props) => {

    // alias-y // <<--- #askBartosz (5) ? czy wiesz może jak to się skompiluje, tz. czy przy przypisaniu do typu prostego powstanie referemcja czy kompilator potrafi zkojażyć bezpośrenio przypisanie ? bo przy obiekcie spodziewam się, że stwrzył by eferencję.
    // * wartości wymagane
    const list = props.route.params.list; // * lista itemów z listy
    const last = props.route.params.last ? props.route.params.last : null; // ostatni na liście do własnej modyfikacji, odyła do UnivesalInputPage
    const key = props.route.params.key; // * nazwa inputu (obiektu rodzica) do idntyfikacji zrotki z listy
    const header = props.route.params.header; // * nazwa strony w hederze
    const backTo = props.route.params.backTo; // * nazwa strony navigatora, do której wracamy po wyborze itemu z listy

    const [headHeight, setHeadHeightt] = useState(0);

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        scroll: {
            width: '100%',
            height: '100%',//wh - headHeight,
            top: headHeight,
        },
        list: {
            marginTop: getVerticalPx(30),
        },
        light30: {
            fontFamily: "DIN2014Narrow-Light",
            fontSize: getHorizontalPx(23),
            color: '#3587ea',
            textAlign: 'left',
            position: 'relative',
            width: getWidthPx(),
            left: getCenterLeftPx(),
            marginTop: getVerticalPx(22),
            marginBottom: getVerticalPx(22)
        },
        line: {
            width: getWidthPx(),
            left: getCenterLeftPx(),
            height: 1,
            backgroundColor: '#dddddd'

        },
        spaceOnEnd: {
            width: '100%',
            height: getVerticalPx(30) + headHeight
        }
    })

    // dosnie elementu last do listy
    useEffect(() => { if (last) list.push(last); }, [])

    // dla sprawdzenia czy kliknięto w ostatni, bo ostani otwiera możliwośś wpisania własnej wartości
    const hendleOnpress = (value: string) => {
        if (last && value == last) {
            console.log('%c last:', 'background: #ffcc00; color: #003300', last)

        } else {
            props.navigation.navigate(backTo, { key, value })
        }
    }

    return (
        <SafeAreaView>

            <View style={styles.scroll}>
                <ScrollView>

                    <View style={styles.list}>

                        {list.map((e: string, i: number) => {
                            return (
                                <TouchableOpacity
                                    key={'row_' + i}
                                    onPress={() => hendleOnpress(e)}
                                >
                                    <Text
                                        style={styles.light30}
                                        key={'it_' + i}
                                    >
                                        {e}
                                    </Text>

                                    {i < list.length - 1 && <View
                                        style={styles.line}
                                        key={'li_' + i}
                                    ></View>}
                                </TouchableOpacity>
                            )
                        })}

                    </View>


                    <View style={styles.spaceOnEnd}></View>

                </ScrollView>
            </View>

            <StackHeader
                onpress={() => props.navigation.goBack()}
                inner={header}
                getHeight={setHeadHeightt}
            ></StackHeader>

        </SafeAreaView>
    )
}

export default ListPageInput
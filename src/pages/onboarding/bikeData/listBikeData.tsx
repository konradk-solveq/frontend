import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Dimensions, ScrollView, TouchableOpacity, View, Text } from 'react-native';
import I18n from 'react-native-i18n';

import StackHeader from '../../../sharedComponents/navi/stackHeader';

import {
    initAppSize,
    setAppSize,
    setObjSize,
    getCenterLeft,
    getTop,
    getTopPx,
    getWidth,
    getHeightPx,
} from '../../../helpers/layoutFoo';

interface Props {
    navigation: any,
    route: any,
};

const ListBikeData: React.FC<Props> = (props: Props) => {

    // alias-y
    const list = props.route.params.list;
    const last = props.route.params.last ? props.route.params.last : null; // ostatni na liście do własnej modyfikacji
    const key = props.route.params.key;
    const header = props.route.params.header; // <<--- ask: Bartosz ? czy wiesz może jak to się skompiluje, tz. czy przy przypisaniu do typu prostego powstanie referemcja czy kompilator potrafi zkojażyć bezpośrenio przypisanie ? bo przy obiekcie spodziewam się, że stwrzył by eferencję.
    const backTo = props.route.params.backTo;

    const [headHeight, setHeadHeightt] = useState(0);

    const ww = Dimensions.get('window').width;
    const wh = Dimensions.get('window').height;
    setAppSize(ww, wh);

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        scroll: {
            width: '100%',
            height: '100%',//wh - headHeight,
            top: headHeight,
        },
        list: {
            marginTop: getTopPx(30),
        },
        light30: {
            fontFamily: "DIN2014Narrow-Light",
            fontSize: 23,
            color: '#3587ea',
            textAlign: 'left',
            position: 'relative',
            width: getWidth(),
            left: getCenterLeft(),
            marginTop: getTopPx(22),
            marginBottom: getTopPx(22)
        },
        line: {
            width: getWidth(),
            left: getCenterLeft(),
            height: 1,
            backgroundColor: '#dddddd'

        },
        spaceOnEnd: {
            width: '100%',
            height: getTopPx(30) + headHeight
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

export default ListBikeData
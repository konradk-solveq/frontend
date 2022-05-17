import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    View,
    Text,
} from 'react-native';

import {NavigationHeader} from '@components/navigation';

import {
    setObjSize,
    getCenterLeftPx,
    getVerticalPx,
    getWidthPx,
    getHorizontalPx,
} from '../../helpers/layoutFoo';
import deepCopy from '../../helpers/deepCopy';
import {BothStackRoute} from '../../navigation/route';

interface Props {
    navigation: any;
    route: any;
}

const ListPageInput: React.FC<Props> = (props: Props) => {
    // * wartości wymagane
    const last = props.route.params.last ? props.route.params.last : null; // ostatni na liście do własnej modyfikacji, odyła do UnivesalInputPage
    const key = props.route.params.key; // * nazwa inputu (obiektu rodzica) do idntyfikacji zrotki z listy
    const header = props.route.params.header; // * nazwa strony w hederze
    const backTo = props.route.params.backTo; // * nazwa strony navigatora, do której wracamy po wyborze itemu z listy
    const other = props.route.params.other; // * wartości dla customizowanej nazwy producenta

    const [headHeight, setHeadHeightt] = useState(0);

    // dosnie elementu last do listy
    const [list, setList] = useState(null); // * lista itemów z listy
    useEffect(() => {
        let newList = deepCopy(props.route.params.list);
        if (last) {
            newList.push(last);
        }
        setList(newList);
    }, []);

    // dla sprawdzenia czy kliknięto w ostatni, bo ostani otwiera możliwośś wpisania własnej wartości
    const hendleOnpress = (value: string) => {
        if (last && value == last) {
            props.navigation.navigate(BothStackRoute.INPUT_PAGE_SCREEN, {
                header: other.header,
                btn: other.btn,
                hendleGoFoward: (value: string) => {
                    props.navigation.navigate(backTo, {key, value});
                },
                goBack: BothStackRoute.LIST_PAGE_INPUT_SCREEN,
                text: other.text,
                placeholder: other.placeholder,
                messageWrong: other.messageWrong,
            });
        } else {
            props.navigation.navigate(backTo, {key, value});
        }
    };

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
        },
        scroll: {
            width: '100%',
            height: '100%', //wh - headHeight,
            top: headHeight,
        },
        list: {
            marginTop: getVerticalPx(30),
            marginBottom: getVerticalPx(30) + headHeight,
        },
        item: {
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: getHorizontalPx(23),
            color: '#3587ea',
            textAlign: 'left',
            position: 'relative',
            width: getWidthPx(),
            left: getCenterLeftPx(),
            marginTop: getVerticalPx(22),
            marginBottom: getVerticalPx(22),
        },
        line: {
            width: getWidthPx(),
            left: getCenterLeftPx(),
            height: 1,
            backgroundColor: '#dddddd',
        },
        spaceOnEnd: {
            width: '100%',
            height: getVerticalPx(30) + headHeight,
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.scroll}>
                <ScrollView>
                    <View style={styles.list}>
                        {list &&
                            list.map((e: string, i: number) => {
                                return (
                                    <TouchableOpacity
                                        key={'row_' + i}
                                        onPress={() => hendleOnpress(e)}>
                                        <Text
                                            style={styles.item}
                                            key={'it_' + i}>
                                            {e}
                                        </Text>

                                        {i < list.length - 1 && (
                                            <View
                                                style={styles.line}
                                                key={'li_' + i}
                                            />
                                        )}
                                    </TouchableOpacity>
                                );
                            })}
                    </View>

                    {/* <View style={styles.spaceOnEnd} /> */}
                </ScrollView>
            </View>

            <NavigationHeader title={header} getHeaderHeight={setHeadHeightt} />
        </SafeAreaView>
    );
};

export default ListPageInput;

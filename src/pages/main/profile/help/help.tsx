import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    ScrollView,
    SafeAreaView,
    Linking,
} from 'react-native';
import I18n from 'react-native-i18n';

import {
    setObjSize,
    getWidthPx,
    getVerticalPx,
    getHorizontalPx,
} from '../../../../helpers/layoutFoo';
import {useAppSelector} from '../../../../hooks/redux';

import Question from './faq/question';
import StackHeader from '../../../../sharedComponents/navi/stackHeader/stackHeader';
import data from './faq/data';

interface Props {
    navigation: any;
}

const wh = Dimensions.get('window').height;

const Help: React.FC<Props> = (props: Props) => {
    const trans = I18n.t('Help');

    const [headHeight, setheadHeight] = useState(0);

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        scroll: {
            width: '100%',
            height: wh - headHeight,
            top: headHeight,
            backgroundColor: '#fff',
        },
        wrap: {
            marginTop: getVerticalPx(50),
            width: getWidthPx(),
            left: getHorizontalPx(40),
            marginBottom: getVerticalPx(50),
            borderBottomColor: '#eee',
            borderBottomWidth: 1,
        },
        title: {
            textAlign: 'left',
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: 23,
            lineHeight: 30,
            color: '#313131',
        },
        paragraph: {
            textAlign: 'left',
            fontSize: 18,
            lineHeight: 24,
            color: '#555555',
        },
        regular: {
            fontFamily: 'DIN2014Narrow-Regular',
        },
        light: {
            fontFamily: 'DIN2014Narrow-Light',
        },
    });

    return (
        <SafeAreaView>
            <View style={styles.scroll}>
                <ScrollView>
                    <View style={styles.wrap}>
                        {data.map((e, i) => (
                            <Question key={'query_' + i} data={e} />
                        ))}
                    </View>
                </ScrollView>
            </View>

            <StackHeader
                onpress={() => props.navigation.goBack()}
                inner={trans.header}
                getHeight={setheadHeight}
                style={{backgroundColor: '#fff'}}
            />
        </SafeAreaView>
    );
};

export default Help;

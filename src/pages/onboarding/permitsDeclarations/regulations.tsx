import React, { useState } from 'react';
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
} from '../../../helpers/layoutFoo';

import StackHeader from '../../../sharedComponents/navi/stackHeader/stackHeader';
import Paragraph from './paragraph';

interface Props {
    navigation: any;
}

const wh = Dimensions.get('window').height;

const Regulations: React.FC<Props> = (props: Props) => {
    const trans = I18n.t('Regulations');
    const list = trans.paragraph;

    const [headHeight, setheadHeightt] = useState(0);

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        scroll: {
            width: '100%',
            height: wh - headHeight,
            top: headHeight,
        },
        wrap: {
            marginTop: getVerticalPx(50),
            width: getWidthPx(),
            left: getHorizontalPx(40),
            marginBottom: getVerticalPx(100),
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
        test: {
            width: 100,
            height: 20,
            marginEnd: 5,
        },
    });

    return (
        <SafeAreaView>
            <View style={styles.scroll}>
                <ScrollView>
                    <View style={styles.wrap}>
                        <Text style={styles.title}>{trans.title}</Text>


                        {list.map((e, i) => (
                            <Paragraph
                                marginTop={e.marginTop}
                                font={e.font}
                                text={e.text}
                                num={i}
                                key={'pgraph_' + i}
                            />
                        ))}

                    </View>
                </ScrollView>
            </View>

            <StackHeader
                onpress={() => props.navigation.navigate('PermitsDeclarations')}
                inner={trans.header}
                getHeight={setheadHeightt}
            />
        </SafeAreaView>
    );
};

export default Regulations;

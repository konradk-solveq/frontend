import React, { useState } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import I18n from 'react-native-i18n';

import {
    setObjSize,
    getWidthPx,
    getVerticalPx,
    getHorizontalPx,
} from '../../../helpers/layoutFoo';

import StackHeader from '../../../sharedComponents/navi/stackHeader/stackHeader';

interface Props {
    navigation: any;
}

const wh = Dimensions.get('window').height;

const Regulations: React.FC<Props> = (props: Props) => {
    const trans = I18n.t('Regulations');

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
        },
        title: {
            textAlign: 'left',
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getHorizontalPx(23),
            lineHeight: getHorizontalPx(30),
            color: '#313131',
        },
        paragraph: {
            textAlign: 'left',
            fontSize: getHorizontalPx(18),
            lineHeight: getHorizontalPx(24),
            color: '#555555',
        },
        regular: {
            fontFamily: 'DIN2014Narrow-Regular',
        },
        light: {
            fontFamily: 'DIN2014Narrow-Light',
        }
    });

    return (
        <SafeAreaView>
            <View style={styles.scroll}>
                <ScrollView>
                    <View style={styles.wrap}>

                        <Text style={styles.title}>{trans.title}</Text>

                        {trans.paragraph.map((e, i) => {
                            <Text
                                style={[
                                    styles.paragraph,
                                    e.font == 'regular' && styles.regular,
                                    e.font == 'light' && styles.light,
                                    { marginTop: getVerticalPx(e.marginTop) },
                                ]}
                                key={'prgph_' + i}
                            >
                                {e.text}
                            </Text>
                        })}

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

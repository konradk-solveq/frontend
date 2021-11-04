import React, {useState} from 'react';
import {useEffect} from 'react';
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
    getFontSize,
} from '../../../helpers/layoutFoo';
import {useAppSelector} from '../../../hooks/redux';

import StackHeader from '../../../sharedComponents/navi/stackHeader/stackHeader';
import Paragraph from './paragraph';

interface Props {
    navigation: any;
}

const wh = Dimensions.get('window').height;

const Regulations: React.FC<Props> = (props: Props) => {
    const data = useAppSelector(state => state.app.regulation);

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
            marginBottom: getVerticalPx(100),
        },
        title: {
            textAlign: 'left',
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getFontSize(23),
            lineHeight: getFontSize(30),
            color: '#313131',
        },
        paragraph: {
            textAlign: 'left',
            fontSize: getFontSize(18),
            lineHeight: getFontSize(24),
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
                        {data.title && (
                            <Text style={styles.title}>{data.title}</Text>
                        )}

                        {data.paragraph &&
                            data.paragraph.map((e, i) => (
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

            {data.header && (
                <StackHeader
                    onpress={() => props.navigation.goBack()}
                    inner={data.header}
                    getHeight={setheadHeight}
                    style={{backgroundColor: '#fff'}}
                />
            )}
        </SafeAreaView>
    );
};

export default Regulations;

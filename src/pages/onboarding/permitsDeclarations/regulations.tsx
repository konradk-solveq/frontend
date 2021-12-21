import React from 'react';
import {StyleSheet, View, Text, ScrollView, SafeAreaView} from 'react-native';

import {
    setObjSize,
    getWidthPx,
    getVerticalPx,
    getHorizontalPx,
    getFontSize,
} from '../../../helpers/layoutFoo';
import {useAppSelector} from '../../../hooks/redux';
import {commonStyle as comStyle} from '@helpers/commonStyle';

import StackHeader from '../../../sharedComponents/navi/stackHeader/stackHeader';
import Paragraph from './paragraph';

interface Props {
    navigation: any;
}

const Regulations: React.FC<Props> = (props: Props) => {
    const data = useAppSelector(state => state.app.regulation);

    setObjSize(334, 50);
    const styles = StyleSheet.create({
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
    });

    return (
        <SafeAreaView style={comStyle.container}>
            <View style={comStyle.scroll}>
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
                    style={{backgroundColor: '#fff'}}
                />
            )}
        </SafeAreaView>
    );
};

export default Regulations;

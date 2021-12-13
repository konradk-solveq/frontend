import React from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    ScrollView,
    SafeAreaView,
} from 'react-native';

import {
    setObjSize,
    getWidthPx,
    getVerticalPx,
    getHorizontalPx,
    getFontSize,
} from '../../../helpers/layoutFoo';
import {useAppSelector} from '../../../hooks/redux';
import {getAppLayoutConfig as get} from '@helpers/appLayoutConfig';
import {commonStyle as comStyle} from '@helpers/commonStyle';

import StackHeader from '../../../sharedComponents/navi/stackHeader/stackHeader';
import Paragraph from './paragraph';

interface Props {
    navigation: any;
}

const wh = Dimensions.get('window').height;

const PrivacyPolicy: React.FC<Props> = (props: Props) => {
    const data = useAppSelector(state => state.app.policy);

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        wrap: {
            marginTop: getVerticalPx(30),
            width: getWidthPx(),
            left: getHorizontalPx(40),
            marginBottom: getVerticalPx(100),
        },
        title: {
            top: getVerticalPx(-16),
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
                                    key={'pgrap_' + i}
                                />
                            ))}
                    </View>
                </ScrollView>
            </View>

            {data.header && (
                <StackHeader
                    onpress={() => props.navigation.goBack()}
                    inner={data.header}
                    titleStyle={styles.title}
                />
            )}
        </SafeAreaView>
    );
};

export default PrivacyPolicy;

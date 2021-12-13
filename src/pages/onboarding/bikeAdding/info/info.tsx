import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, View, Text, ScrollView} from 'react-native';
import I18n from 'react-native-i18n';

import StackHeader from '../../../../sharedComponents/navi/stackHeader/stackHeader';
import TypicalRedBtn from '../../../../sharedComponents/buttons/typicalRed';
import ImgKross from './imgKross';
import ImgOther from './imgOther';

import {
    setObjSize,
    getWidthPx,
    getVerticalPx,
    getCenterLeftPx,
    getFontSize,
} from '../../../../helpers/layoutFoo';
import {BothStackRoute} from '../../../../navigation/route';
import {commonStyle as comStyle} from '@helpers/commonStyle';

interface Props {
    navigation: any;
}

const Info: React.FC<Props> = (props: Props) => {
    const trans = I18n.t('AddingInfo');

    const [krossBike, setKrossBike] = useState(true);

    setObjSize(334, 41);
    const styles = StyleSheet.create({
        bottons: {
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'row',
            width: getWidthPx(),
            height: getVerticalPx(41),
            left: getCenterLeftPx(),
            marginTop: getVerticalPx(38),
        },
        svg: {
            width: getWidthPx(),
            left: getCenterLeftPx(),
            height: getWidthPx(334 * (270 / 334)),
        },
        text: {
            width: getWidthPx(),
            left: getCenterLeftPx(),
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: getFontSize(18),
            lineHeight: getFontSize(24),
            marginTop: getVerticalPx(44),
            marginBottom: getVerticalPx(100),
            color: '#555555',
        },
    });

    return (
        <SafeAreaView style={comStyle.container}>
            <View style={comStyle.scroll}>
                <ScrollView>
                    <View style={styles.bottons}>
                        <TypicalRedBtn
                            title={trans.btnKross}
                            active={krossBike}
                            onpress={() => setKrossBike(true)}
                        />

                        <TypicalRedBtn
                            title={trans.btnOther}
                            active={!krossBike}
                            onpress={() => setKrossBike(false)}
                        />
                    </View>

                    <View style={styles.svg}>
                        {krossBike ? <ImgKross /> : <ImgOther />}
                    </View>

                    <Text style={styles.text}>
                        {krossBike ? trans.textKross : trans.textOther}
                    </Text>
                </ScrollView>
            </View>

            <StackHeader
                onpress={() =>
                    props.navigation.navigate(
                        BothStackRoute.ADDING_BY_NUMBER_SCREEN,
                    )
                }
                inner={trans.head}
            />
        </SafeAreaView>
    );
};

export default Info;

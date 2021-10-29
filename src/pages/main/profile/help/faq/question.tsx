import React from 'react';
import {StyleSheet, View, Text, Linking} from 'react-native';
import I18n from 'react-native-i18n';
import Hyperlink from 'react-native-hyperlink';

import DropDownItem from './dropDownItem';
import ArrowDown from './arrowDown';
import ArrowUp from './arrowUp';

import {
    setObjSize,
    getWidthPx,
    getVerticalPx,
    getHorizontalPx,
    getFontSize,
} from '../../../../../helpers/layoutFoo';

interface IProps {
    data: {
        question: string;
        answer: string;
    };
}

const Question: React.FC<IProps> = ({data}: IProps) => {
    const trans = I18n.t('Urls');

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        wrap: {
            paddingTop: getVerticalPx(16),
            paddingBottom: getVerticalPx(16),
            width: getWidthPx(),
            borderTopColor: '#eee',
            borderTopWidth: 1,
        },
        question: {
            width: getWidthPx() - getHorizontalPx(40),
            textAlign: 'left',
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: getFontSize(18),
            lineHeight: getFontSize(30),
            color: '#3587ea',
        },
        arrow: {
            position: 'absolute',
            right: getVerticalPx(5),
            top: getHorizontalPx(11),
            width: getHorizontalPx(15),
            height: getHorizontalPx(9),
        },
        answer: {
            textAlign: 'left',
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: getFontSize(18),
            lineHeight: getFontSize(30),
            color: '#313131',
        },
    });

    return (
        <View style={styles.wrap}>
            <DropDownItem
                backgroundColor={'transparent'}
                titleBackground={'transparent'}
                contentBackground={'transparent'}
                underlineColor={'transparent'}
                contentVisible={false}
                invisibleImage={
                    <View style={styles.arrow}>
                        <ArrowDown />
                    </View>
                }
                visibleImage={
                    <View style={styles.arrow}>
                        <ArrowUp />
                    </View>
                }
                header={<Text style={styles.question}>{data.question}</Text>}>
                <Hyperlink
                    linkStyle={{color: '#3587ea'}}
                    linkText={(url: string) => {
                        let link = trans.find(e => e.url === url);
                        if (link) {
                            return link.hyper;
                        } else {
                            return url;
                        }
                    }}
                    onPress={(url: string) => {
                        Linking.openURL(url);
                    }}>
                    <Text style={styles.answer}>{data.answer}</Text>
                </Hyperlink>
            </DropDownItem>
        </View>
    );
};

export default Question;

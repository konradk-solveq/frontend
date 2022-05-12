import React from 'react';
import {StyleSheet, View, Linking} from 'react-native';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import Hyperlink from 'react-native-hyperlink';

import DropDownItem from './dropDownItem';
import ArrowDown from './arrowDown';
import ArrowUp from './arrowUp';

import {BodyPrimary, Paragraph} from '@components/texts/texts';
import colors from '@theme/colors';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';

interface IProps {
    data: {
        question: string;
        answer: string;
    };
}

const Question: React.FC<IProps> = ({data}: IProps) => {
    const {t} = useMergedTranslation('');

    const styles = StyleSheet.create({
        wrap: {
            paddingTop: getFVerticalPx(16),
            paddingBottom: getFVerticalPx(16),
        },
        arrow: {
            width: getFHorizontalPx(15),
            height: getFHorizontalPx(9),
        },
    });

    return (
        <View style={styles.wrap}>
            <DropDownItem
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
                header={
                    <BodyPrimary style={{marginRight: getFHorizontalPx(25)}}>
                        {data.question}
                    </BodyPrimary>
                }>
                <Hyperlink
                    linkStyle={{color: colors.red}}
                    linkText={(url: string) => {
                        const trans: {url: string; hyper: string}[] = t(
                            'Urls',
                            {
                                returnObjects: true,
                            },
                        );
                        const link = trans.find(e => e.url === url);
                        if (link) {
                            return link.hyper;
                        } else {
                            return url;
                        }
                    }}
                    onPress={(url: string) => {
                        Linking.openURL(url);
                    }}>
                    <Paragraph>{data.answer}</Paragraph>
                </Hyperlink>
            </DropDownItem>
        </View>
    );
};

export default Question;

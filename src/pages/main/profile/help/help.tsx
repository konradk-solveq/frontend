import React from 'react';
import {StyleSheet, Dimensions, View, ScrollView} from 'react-native';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

import {useAppSelector} from '@hooks/redux';
import {commonStyle} from '@theme/commonStyle';
import Question from './faq/question';
import {faqDataSelector} from '@storage/selectors/app';
import GenericScreen from '@src/pages/template/GenericScreen';
import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';

const wh = Dimensions.get('window').height;

const Help: React.FC = () => {
    const {t} = useMergedTranslation('Help');

    const faqData = useAppSelector(faqDataSelector);

    const styles = StyleSheet.create({
        scroll: {
            width: '100%',
            height: wh,
        },
        wrap: {
            width: '100%',
            marginBottom: getFVerticalPx(50),
        },
        scrollContainer: {
            marginTop: getFVerticalPx(25),
            marginBottom: getFVerticalPx(60),
        },
    });

    return (
        <GenericScreen screenTitle={t('header')} transculentStatusBar>
            <View style={commonStyle.scroll}>
                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.wrap}>
                        {faqData?.faq?.map((e, i) => (
                            <Question key={'query_' + i} data={e} />
                        ))}
                    </View>
                </ScrollView>
            </View>
        </GenericScreen>
    );
};

export default Help;

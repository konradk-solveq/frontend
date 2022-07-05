import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {useAppSelector} from '../../../hooks/redux';
import {appContainerHorizontalMargin} from '@theme/commonStyle';

import GenericScreen from '@pages/template/GenericScreen';
import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';
import LegalDocument from '@components/documents/LegalDocument';
import {regulationsDataSelector} from '@storage/selectors/app';

const Regulations: React.FC = () => {
    const data = useAppSelector(regulationsDataSelector);

    return (
        <GenericScreen
            transculentStatusBar
            screenTitle={data?.current?.content?.header}>
            <ScrollView style={styles.scrollWrapper}>
                <View style={styles.wrap}>
                    <LegalDocument
                        message={data.current}
                        style={styles.document}
                    />
                    {data?.next && <LegalDocument message={data.next} />}
                </View>
            </ScrollView>
        </GenericScreen>
    );
};

export default Regulations;

const styles = StyleSheet.create({
    scrollWrapper: {
        marginTop: getFVerticalPx(105),
        width: '100%',
    },
    wrap: {
        marginBottom: getFVerticalPx(100),
        paddingHorizontal: appContainerHorizontalMargin,
    },
    document: {
        marginBottom: getFVerticalPx(48),
    },
});

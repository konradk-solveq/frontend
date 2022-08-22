import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {useAppSelector} from '@hooks/redux';
import {appContainerHorizontalMargin} from '@theme/commonStyle';
import GenericScreen from '@src/pages/template/GenericScreen';
import {getFVerticalPx} from '@helpers/appLayoutDimensions';
import {privacyPolicyDataSelector} from '@storage/selectors/app';
import LegalDocument from '@components/documents/LegalDocument';

const PrivacyPolicy: React.FC = () => {
    const data = useAppSelector(privacyPolicyDataSelector);

    return (
        <GenericScreen
            screenTitle={data?.current?.content?.header}
            transculentStatusBar>
            <ScrollView style={styles.scrollWrapper}>
                <View style={styles.wrap}>
                    {data?.current && (
                        <LegalDocument
                            message={data.current}
                            style={styles.document}
                        />
                    )}
                    {data?.next && <LegalDocument message={data.next} />}
                </View>
            </ScrollView>
        </GenericScreen>
    );
};

export default PrivacyPolicy;

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

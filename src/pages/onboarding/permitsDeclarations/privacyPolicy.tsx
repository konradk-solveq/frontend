import React, {useMemo} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {
    setObjSize,
    getWidthPx,
    getVerticalPx,
    getHorizontalPx,
} from '@helpers/layoutFoo';
import {useAppSelector} from '@hooks/redux';
import {commonStyle} from '@theme/commonStyle';
import Paragraph from './paragraph';
import {onboardingFinishedSelector} from '@src/storage/selectors';
import {OnboardingStackRoute, RegularStackRoute} from '@src/navigation/route';
import GenericScreen from '@src/pages/template/GenericScreen';

const PrivacyPolicy: React.FC = () => {
    const data = useAppSelector(state => state.app.policy);
    const isOnboardingFinished = useAppSelector(onboardingFinishedSelector);
    const privacyPolicyRouteName = useMemo(
        () =>
            !isOnboardingFinished
                ? OnboardingStackRoute.REGULATIONS_ONBOARDING_SCREEN
                : RegularStackRoute.REGULATIONS_SCREEN,
        [isOnboardingFinished],
    );

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        wrap: {
            marginTop: getVerticalPx(30),
            width: getWidthPx(),
            left: getHorizontalPx(40),
            marginBottom: getVerticalPx(100),
        },
        title: {
            top: getVerticalPx(-8),
        },
        header: {
            marginHorizontal: 60,
        },
    });

    return (
        <GenericScreen screenTitle={data?.header} transculentStatusBar>
            <View style={commonStyle.scroll}>
                <ScrollView>
                    <View style={styles.wrap}>
                        {data.title && (
                            <Text style={styles.title}>{data.title}</Text>
                        )}

                        {data.paragraph &&
                            data.paragraph.map((e: any, i: number) => (
                                <Paragraph
                                    regulationsScreenRouteName={
                                        privacyPolicyRouteName
                                    }
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
        </GenericScreen>
    );
};

export default PrivacyPolicy;

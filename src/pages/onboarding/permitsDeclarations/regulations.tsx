import React, {useMemo} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {useAppSelector} from '../../../hooks/redux';
import {appContainerHorizontalMargin} from '@theme/commonStyle';

import {onboardingFinishedSelector} from '@storage/selectors';
import {OnboardingStackRoute, RegularStackRoute} from '@navigation/route';
import GenericScreen from '@pages/template/GenericScreen';
import JsonParagraph from './jsonParagraph';
import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';
import {Header3} from '@components/texts/texts';

const Regulations: React.FC = () => {
    const data = useAppSelector(state => state.app.regulation);
    const isOnboardingFinished = useAppSelector(onboardingFinishedSelector);
    const privacyPolicyRouteName = useMemo(
        () =>
            !isOnboardingFinished
                ? OnboardingStackRoute.REGULATIONS_ONBOARDING_SCREEN
                : RegularStackRoute.REGULATIONS_SCREEN,
        [isOnboardingFinished],
    );

    const styles = StyleSheet.create({
        scrollWrapper: {
            marginTop: getFVerticalPx(105),
        },
        wrap: {
            marginBottom: getFVerticalPx(100),
            paddingHorizontal: appContainerHorizontalMargin,
        },
    });

    return (
        <GenericScreen screenTitle={data?.header} transculentStatusBar>
            <ScrollView style={styles.scrollWrapper}>
                <View style={styles.wrap}>
                    {data.title && <Header3>{data.title}</Header3>}

                    {data.paragraph &&
                        data.paragraph.map((e, i) => (
                            <JsonParagraph
                                regulationsScreenRouteName={
                                    privacyPolicyRouteName
                                }
                                marginTop={e.marginTop}
                                font={e.font}
                                text={e.text}
                                num={i}
                                key={'pgraph_' + i}
                            />
                        ))}
                </View>
            </ScrollView>
        </GenericScreen>
    );
};

export default Regulations;

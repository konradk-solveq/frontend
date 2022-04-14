import {PrimaryButton, SecondaryButton} from '@src/components/buttons';
import LeafSvg from '@src/components/svg/LeafSvg';
import MoneySvg from '@src/components/svg/MoneySvg';
import ThankYouSvg from '@src/components/svg/ThankYouSvg';
import {Header1, Header2} from '@src/components/texts/texts';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@src/helpers/appLayoutDimensions';
import {simplyTimer} from '@src/helpers/stringFoo';
import colors from '@src/theme/colors';
import {appContainerHorizontalMargin} from '@src/theme/commonStyle';
import {CounterParamsLsitT} from '@src/type/rootStack';
import {useMergedTranslation} from '@src/utils/translations/useMergedTranslation';
import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import SavingPanel from './components/SavingPanel';
import StatisticElement from './components/StatisticElement';

interface IProps {
    userName: string;
    routeParams: Required<CounterParamsLsitT['CounterThankYouPage']>;
    savingsValues: {
        fuel: string;
        resource: string;
    };
    onPublishAction: () => void;
    onSaveAction: () => void;
}

const ThankYouPageContainer: React.FC<IProps> = ({
    userName,
    routeParams,
    savingsValues,
    onSaveAction,
    onPublishAction,
}) => {
    const {t} = useMergedTranslation('ThankYouPage');

    return (
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                <ThankYouSvg />
            </View>
            <Header1 color={colors.altGreen}>
                {t('goodJobTitle')} {userName ? userName : ''}
                {'!'}
            </Header1>
            <View style={styles.statsContainer}>
                <StatisticElement
                    testID="thank-you-page-container-route-distance"
                    text={t('distance')}
                    value={`${routeParams.distance} ${t('distanceSuffix')}`}
                />
                <StatisticElement
                    testID="thank-you-page-container-route-time"
                    text={t('tripTime')}
                    value={`${simplyTimer(
                        routeParams.time - routeParams.pause,
                    )} ${t('pauseSuffix')}`}
                />
                <StatisticElement
                    testID="thank-you-page-container-route-pause-time"
                    text={t('pauseTime')}
                    value={`${simplyTimer(routeParams.pause)} ${t(
                        'tripTimeSuffix',
                    )}`}
                />
            </View>
            <View style={styles.sloganContainer}>
                <Header2>{t('thankYouSlogan')}</Header2>
            </View>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <SavingPanel
                    style={styles.savingPanel}
                    text={`${savingsValues.resource} ${t('savedResource')}`}
                    background={colors.lightGreen}
                    icon={<LeafSvg />}
                />
                <SavingPanel
                    style={styles.savingPanel}
                    text={t('savedFuel', {quota: savingsValues.fuel})}
                    background={colors.lightBlue}
                    icon={<MoneySvg />}
                />
            </ScrollView>
            <View style={styles.buttonsContainer}>
                <SecondaryButton
                    style={styles.button}
                    text={t('saveRoute')}
                    testID={'thank-you-page-container-save-button'}
                    onPress={onSaveAction}
                />
                <PrimaryButton
                    style={styles.button}
                    text={t('publishRoute')}
                    testID={'thank-you-page-container-publish-button'}
                    onPress={onPublishAction}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        height: '100%',
        paddingHorizontal: appContainerHorizontalMargin,
    },
    imgContainer: {
        marginTop: getFVerticalPx(23),
    },
    mapContainer: {
        height: getFVerticalPx(163),
        borderWidth: 1,
        borderColor: 'peru',
        width: '100%',
        borderRadius: 8,
        marginVertical: getFVerticalPx(16),
    },
    statsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: getFVerticalPx(16),
        backgroundColor: colors.whiteGrey,
        borderRadius: getFHorizontalPx(8),
        marginTop: getFVerticalPx(24),
    },
    sloganContainer: {
        width: '100%',
        textAlign: 'left',
        marginTop: getFVerticalPx(24),
        marginBottom: getFVerticalPx(16),
    },
    buttonsContainer: {
        position: 'absolute',
        width: '100%',
        alignSelf: 'center',
        bottom: getFVerticalPx(50),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    savingPanel: {
        marginVertical: getFVerticalPx(8),
    },
    button: {
        width: getFHorizontalPx(171),
    },
});

export default ThankYouPageContainer;

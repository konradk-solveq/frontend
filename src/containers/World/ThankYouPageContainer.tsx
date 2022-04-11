import { useRoute } from '@react-navigation/native';
import { PrimaryButton, SecondaryButton } from '@src/components/buttons';
import LeafSvg from '@src/components/svg/LeafSvg';
import ThankYouSvg from '@src/components/svg/ThankYouSvg';
import { Header1, Header2 } from '@src/components/texts/texts';
import { getFHorizontalPx, getFVerticalPx } from '@src/helpers/appLayoutDimensions';
import colors from '@src/theme/colors';
import {appContainerHorizontalMargin} from '@src/theme/commonStyle';
import {useMergedTranslation} from '@src/utils/translations/useMergedTranslation';
import React from 'react';
import {SafeAreaView, View, Text, ScrollView, StyleSheet} from 'react-native';
import SavingPanel from './components/SavingPanel';
import StatisticElement from './components/StatisticElement';

interface IProps {
    userName: string
}

const ThankYouPageContainer: React.FC<IProps> = ({ userName }) => {
    const {t} = useMergedTranslation('ThankYouPage');
    // const route = useRoute<CounterThankYouPageRouteT>();

    // const onSaveRouteHandler = (forward: string) => {
    //     setGoForward(forward);
    //     dispatch(syncCurrentRouteData());
    // };
    
    return (
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                <ThankYouSvg />
            </View>
            <Header1 color={colors.altGreen}>
                {t('goodJobTitle')} {userName ? userName : ''}
            </Header1>
            <View style={styles.statsContainer}>
                <StatisticElement text={'Title1'} value={'Value1'} />
                <StatisticElement text={'Title2'} value={'Value2'} />
                <StatisticElement text={'Title3'} value={'Value3'} />
            </View>
            <View style={styles.sloganContainer}>
                <Header2>
                    {t('thankYouSlogan')}
                </Header2>
            </View>
            <SavingPanel 
                style={styles.savingPanel}
                text={'100 zaoszczędzonych gramów CO2'}
                background={colors.lightGreen}
            />
            <SavingPanel style={styles.savingPanel} text={'100 zaoszczędzonych gramów CO2'} background={colors.lightBlue} />
            <View style={styles.buttonsContainer}>
                <SecondaryButton
                    style={styles.button}
                    text={t('saveRoute')}
                    testID={'thank-you-cancel-btn'}
                    onPress={() => console.log('save')}
                />
                <PrimaryButton
                    style={styles.button}
                    text={t('publishRoute')}
                    testID={'thank-you-btn-submit-btn'}
                    onPress={() =>  console.log('publish')}
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
        borderWidth: 1,
        borderColor: 'red',
    },
    imgContainer: {
        marginTop: getFVerticalPx(23)
    },
    statsContainer: {
        width: '100%',
        marginHorizontal: appContainerHorizontalMargin,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: getFVerticalPx(16),
        backgroundColor: colors.whiteGrey,
        borderRadius: getFHorizontalPx(8),
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
    }
});

export default ThankYouPageContainer;

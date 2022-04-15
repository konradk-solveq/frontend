import React from 'react';
import {StyleSheet, View, GestureResponderEvent} from 'react-native';

import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

import {PrimaryButton} from '@components/buttons';
import {BlueBikeSvg} from '@components/svg';
import {Header1, Subtitle} from '@components/texts/texts';

interface IProps {
    bikeName: string;
    onAddBike: (e: GestureResponderEvent) => void;
    producer?: string;
    testID?: string;
}

const AddOtherBikeSummaryContainer: React.FC<IProps> = ({
    bikeName,
    onAddBike,
    producer = '',
    testID = 'add-other-bike-summary-container-test-id',
}: IProps) => {
    const {t} = useMergedTranslation('AddBikeSummary');

    return (
        <View style={styles.container} testID={testID}>
            <View style={styles.imageContainer}>
                <BlueBikeSvg />
            </View>
            <View style={styles.summary}>
                <Header1
                    algin="center"
                    style={styles.header}
                    testID={`${testID}-header`}>
                    {bikeName}
                </Header1>
                <Subtitle algin="center" testID={`${testID}-subtitle`}>
                    Producent: {producer || 'brak'}
                </Subtitle>
            </View>

            <PrimaryButton
                text={t('addBikeButton')}
                onPress={onAddBike}
                style={styles.button}
                testID={`${testID}-button`}
                withoutShadow
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center',
    },
    imageContainer: {
        marginBottom: getFVerticalPx(24),
        justifyContent: 'center',
        alignItems: 'center',
    },
    summary: {
        marginBottom: getFVerticalPx(36),
    },
    header: {
        paddingBottom: getFVerticalPx(8),
    },
    button: {
        marginBottom: getFVerticalPx(45),
    },
});

export default AddOtherBikeSummaryContainer;

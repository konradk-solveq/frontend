import React from 'react';
import {Image, StyleSheet, View, GestureResponderEvent} from 'react-native';

import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

import {PrimaryButton} from '@components/buttons';
import {BlueBikeSvg} from '@components/svg';
import {Header1, Subtitle} from '@components/texts/texts';

interface IProps {
    bikeName: string;
    frameNumber: string;
    onAddBike: (e: GestureResponderEvent) => void;
    imageUrl?: string;
    testID?: string;
}

const AddBikeSummaryContainer: React.FC<IProps> = ({
    bikeName,
    frameNumber,
    imageUrl,
    onAddBike,
    testID = 'add-bike-summary-container-test-id',
}: IProps) => {
    const {t} = useMergedTranslation('AddBikeSummary');

    return (
        <View style={styles.container} testID={testID}>
            <View style={styles.imageContainer}>
                {imageUrl ? (
                    <Image
                        resizeMode="contain"
                        source={{uri: imageUrl}}
                        style={styles.image}
                        testID={`${testID}-image`}
                    />
                ) : (
                    <BlueBikeSvg />
                )}
            </View>
            <View style={styles.summary}>
                <Header1
                    algin="center"
                    style={styles.header}
                    testID={`${testID}-header`}>
                    {bikeName}
                </Header1>
                <Subtitle algin="center" testID={`${testID}-subtitle`}>{`${t(
                    'summaryPrefix',
                )} ${frameNumber}`}</Subtitle>
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
    },
    image: {
        width: getFHorizontalPx(325),
        height: getFVerticalPx(250),
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

export default AddBikeSummaryContainer;

import React from 'react';
import {StyleSheet, View} from 'react-native';

import {PrimaryButton} from '@src/components/buttons';
import UpdateAppSvg from '@src/components/svg/UpdateAppSvg';
import {Header2, Paragraph} from '@src/components/texts/texts';
import {appContainerHorizontalMargin} from '@src/theme/commonStyle';
import {getFVerticalPx} from '@src/theme/utils/appLayoutDimensions';
import {useMergedTranslation} from '@src/utils/translations/useMergedTranslation';

interface IProps {
    handlePress: () => void;
}

const NewAppVersionContainer: React.FC<IProps> = ({handlePress}: IProps) => {
    const {t} = useMergedTranslation('newAppVersion');
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <UpdateAppSvg />
                <View style={styles.updateText}>
                    <Header2 algin="center" style={styles.header}>
                        {t('title')}
                    </Header2>
                    <Paragraph algin="center">{t('content')}</Paragraph>
                </View>

                <PrimaryButton text={t('updateButton')} onPress={handlePress} />
            </View>
        </View>
    );
};

export default NewAppVersionContainer;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingHorizontal: appContainerHorizontalMargin,
        alignItems: 'center',
    },
    updateText: {
        marginVertical: getFVerticalPx(40),
        width: getFVerticalPx(270),
    },
    header: {
        marginBottom: getFVerticalPx(16),
    },
    buttonContainer: {
        bottom: getFVerticalPx(65),
    },
});

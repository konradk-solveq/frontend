import {Header3} from '@src/components/texts/texts';
import colors from '@src/theme/colors';
import {getFHorizontalPx, getFVerticalPx} from '@helpers/appLayoutDimensions';
import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

interface ISavingPanelProps {
    text: string;
    icon?: SVGElement;
    style?: ViewStyle;
    background: string;
    testID?: string;
}

const SavingPanel: React.FC<ISavingPanelProps> = ({
    text,
    icon,
    style,
    background,
    testID = 'saving-panel',
}) => {
    const styles = StyleSheet.create({
        panelWrapper: {
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: background,
            width: '100%',
            borderRadius: getFHorizontalPx(8),
            height: getFHorizontalPx(80),
            alignItems: 'center',
            paddingVertical: getFVerticalPx(16),
            paddingHorizontal: getFHorizontalPx(16),
            marginRight: getFHorizontalPx(16),
        },
        iconWrapper: {
            borderRadius: getFHorizontalPx(48) / 2,
            width: getFHorizontalPx(48),
            height: getFHorizontalPx(48),
            backgroundColor: colors.white,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: getFHorizontalPx(16),
        },
        text: {
            flexWrap: 'wrap',
            flexDirection: 'row',
            width: '70%',
        },
    });

    return (
        <View style={[styles.panelWrapper, style]} testID={`${testID}-wrapper`}>
            <View style={styles.iconWrapper} testID={`${testID}-icon`}>
                {icon}
            </View>
            <View style={styles.text}>
                <Header3>{text}</Header3>
            </View>
        </View>
    );
};

export default SavingPanel;

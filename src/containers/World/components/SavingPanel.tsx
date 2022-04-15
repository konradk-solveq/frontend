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
}

const SavingPanel: React.FC<ISavingPanelProps> = ({
    text,
    icon,
    style,
    background,
}) => {
    const styles = StyleSheet.create({
        panelWrapper: {
            backgroundColor: background,
            width: getFHorizontalPx(216),
            borderRadius: getFHorizontalPx(8),
            height: getFHorizontalPx(136),
            alignItems: 'flex-start',
            padding: getFVerticalPx(16),
            marginRight: getFHorizontalPx(16),
        },
        iconWrapper: {
            borderRadius: getFHorizontalPx(48) / 2,
            width: getFHorizontalPx(48),
            height: getFVerticalPx(48),
            backgroundColor: colors.white,
            alignItems: 'center',
            justifyContent: 'center',
        },
        text: {
            marginTop: getFVerticalPx(8),
        },
    });

    return (
        <View style={[styles.panelWrapper, style]}>
            <View style={styles.iconWrapper}>{icon}</View>
            <View style={styles.text}>
                <Header3>{text}</Header3>
            </View>
        </View>
    );
};

export default SavingPanel;

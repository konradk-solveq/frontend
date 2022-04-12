import {Header3} from '@src/components/texts/texts';
import {getFHorizontalPx, getFVerticalPx} from '@src/helpers/appLayoutDimensions';
import colors from '@src/theme/colors';
import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

interface ISavingPanelProps {
    text: string,
    icon?: SVGElement,
    style?: ViewStyle,
    background: string,
}

const SavingPanel: React.FC<ISavingPanelProps> = ({text, icon, style, background}) => {

    const styles = StyleSheet.create({
        panelWrapper: {
            backgroundColor: background,
            width: '100%',
            borderRadius: getFHorizontalPx(8),
            height: getFHorizontalPx(80),
            flexDirection: 'row',
            alignItems: 'center',
            padding: getFVerticalPx(16),
        },
        icon: {

        },
        iconWrapper: {
            borderRadius: getFHorizontalPx(48) / 2,
            width: getFHorizontalPx(48),
            height: getFVerticalPx(48),
            backgroundColor: colors.white,
            alignItems: 'center',
            justifyContent: 'center'
        },
        text: {
            marginLeft: getFHorizontalPx(16),
        }
    });

    return (
        <View style={[styles.panelWrapper, style]}>
            <View style={styles.icon}>
                <View style={styles.iconWrapper}>
                    {icon}
                </View>
            </View>
            <View style={styles.text}>
                <Header3>
                    {text}
                </Header3>
            </View>
        </View>
    )
}


export default SavingPanel;

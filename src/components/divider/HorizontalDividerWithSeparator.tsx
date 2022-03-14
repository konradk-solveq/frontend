import React from 'react';
import {StyleSheet, View} from 'react-native';

import {MykrossIconFont} from '@theme/enums/iconFonts';
import colors from '@theme/colors';

import {Subtitle} from '@components/texts/texts';
import {TextIcon} from '@components/icons';
import {HorizontalDivider} from '@components/divider';

interface IProps {
    separatorText?: string;
    separatorIcon?: MykrossIconFont;
}

const HorizontalDividerWithSeparator: React.FC<IProps> = ({
    separatorText,
    separatorIcon,
}: IProps) => {
    return (
        <View style={[styles.container, styles.row]}>
            <HorizontalDivider
                width={1}
                color={colors.darkGrey}
                style={styles.divider}
            />
            <View style={styles.separatorContainer}>
                <View style={[styles.row, styles.separator]}>
                    {separatorText && (
                        <Subtitle
                            color={colors.darkGrey}
                            style={styles.textSeparator}>
                            {separatorText}
                        </Subtitle>
                    )}
                    {separatorIcon && (
                        <TextIcon
                            icon={separatorIcon}
                            iconColor={colors.darkGrey}
                        />
                    )}
                </View>
            </View>
            <HorizontalDivider
                width={1}
                color={colors.darkGrey}
                style={styles.divider}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
    },
    divider: {
        flexGrow: 3,
    },
    separatorContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    separator: {
        position: 'absolute',
    },
    textSeparator: {
        alignSelf: 'center',
    },
});

export default HorizontalDividerWithSeparator;

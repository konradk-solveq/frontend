import React from 'react';
import {StyleSheet, View} from 'react-native';

import {OptionsEnumsT} from '@models/map.model';
import colors from '@theme/colors';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';

import {BodyPrimary} from '@components/texts/texts';

interface TagsIProps {
    tags: string[];
    options?: OptionsEnumsT;
}

const Tags: React.FC<TagsIProps> = ({tags, options}: TagsIProps) => {
    return (
        <View style={styles.tagsWrapper}>
            {options?.tagsOptions &&
                options?.tagsOptions?.map(t => {
                    if (!t?.enumValue) {
                        return null;
                    }
                    if (!tags?.includes(t.enumValue) || !t?.i18nValue) {
                        return null;
                    }

                    return (
                        <View key={t.enumValue} style={styles.tag}>
                            <BodyPrimary>{t.i18nValue}</BodyPrimary>
                        </View>
                    );
                })}
        </View>
    );
};

const styles = StyleSheet.create({
    tagsWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tag: {
        marginBottom: getFVerticalPx(8),
        paddingHorizontal: getFHorizontalPx(16),
        paddingVertical: getFHorizontalPx(8),
        backgroundColor: colors.white,
        borderRadius: getFHorizontalPx(16),
        marginRight: getFHorizontalPx(8),
    },
});

export default Tags;

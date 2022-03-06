import React, {FunctionComponent, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {getFHorizontalPx} from '@helpers/appLayoutDimensions';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import {Demi16h24} from '@components/texts/texts';

const styles = StyleSheet.create({
    wrap: {
        display: 'flex',
        flexDirection: 'row',
        marginRight: getFHorizontalPx(16),
    },
    icon: {
        fontFamily: 'mykross',
        fontSize: getFHorizontalPx(24),
        width: getFHorizontalPx(24),
        height: getFHorizontalPx(24),
        textAlign: 'center',
        color: '#333',
    },
    number: {
        marginLeft: getFHorizontalPx(4),
        top: getFHorizontalPx(-1),
    },
});

interface ILikeProps {
    check?: boolean;
    value: number;
    onPress: (state: boolean) => void;
}

export const LikeIcon: FunctionComponent<ILikeProps> = ({
    check,
    value,
    onPress,
}: ILikeProps) => {
    const [likeChecked, setLikeChecked] = useState(check);

    const handleOnPress = () => {
        const state = !likeChecked;
        if (onPress) {
            onPress(state);
        }
        setLikeChecked(state);
    };

    return (
        <TouchableOpacity onPress={handleOnPress}>
            <View style={styles.wrap}>
                <Text style={styles.icon}>
                    {likeChecked
                        ? MykrossIconFont.MYKROSS_ICON_LIKE_ON
                        : MykrossIconFont.MYKROSS_ICON_LIKE_OFF}
                </Text>
                <Demi16h24 style={styles.number}>{value}</Demi16h24>
            </View>
        </TouchableOpacity>
    );
};

interface IProps {
    check?: boolean;
    onPress: () => void;
}

export const SaveIcon: FunctionComponent<IProps> = ({
    check,
    onPress,
}: IProps) => {
    const [saveChecked, setSaveChecked] = useState(check);

    const handleOnPress = () => {
        const state = !saveChecked;
        if (onPress) {
            onPress();
        }
        setSaveChecked(state);
    };

    return (
        <TouchableOpacity onPress={handleOnPress}>
            <Text style={styles.icon}>
                {check
                    ? MykrossIconFont.MYKROSS_ICON_SAVE_ON
                    : MykrossIconFont.MYKROSS_ICON_SAVE_OFF}
            </Text>
        </TouchableOpacity>
    );
};

interface ShareIProps {
    onPress: () => void;
}

export const ShareIcon: FunctionComponent<ShareIProps> = ({onPress}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.wrap}>
                <Text style={styles.icon}>
                    {MykrossIconFont.MYKROSS_ICON_ALT_SHARE}
                </Text>
            </View>
        </TouchableOpacity>
    );
};
interface EditIProps {
    onPress: () => void;
}

export const EditIcon: FunctionComponent<EditIProps> = ({onPress}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.wrap}>
                <Text style={styles.icon}>
                    {MykrossIconFont.MYKROSS_ICON_EDIT}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

interface TouchableIProps {
    onPress: () => void;
}

export const MoreIcon: FunctionComponent<TouchableIProps> = ({onPress}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.icon}>{MykrossIconFont.MYKROSS_ICON_MORE}</Text>
        </TouchableOpacity>
    );
};

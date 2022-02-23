import React, {FunctionComponent} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {getFHorizontalPx} from '@helpers/appLayoutDimensions';
import {MykrossIconFont} from '@theme/enums/iconFonts';

const styles = StyleSheet.create({
    text: {
        fontFamily: 'mykross',
        fontSize: getFHorizontalPx(30),
        width: getFHorizontalPx(30),
        height: getFHorizontalPx(30),
        textAlign: 'center',
        color: '#333',
    },
    icon: {
        position: 'absolute',
        top: 0,
        height: getFHorizontalPx(49),
        marginBottom: getFHorizontalPx(34),
        paddingTop: getFHorizontalPx(9),
        paddingBottom: getFHorizontalPx(10),
    },
});

export const HomeIcon: FunctionComponent = () => {
    const style = StyleSheet.create({
        home: {
            left: 0,
            width: getFHorizontalPx(87.5),
            paddingRight: getFHorizontalPx(23.5),
            paddingLeft: getFHorizontalPx(34),
        },
    });
    return (
        <View style={[styles.icon, style.home]}>
            <Text style={styles.text}>{MykrossIconFont.MYKROSS_ICON_HOME}</Text>
        </View>
    );
};

export const ExploreIcon: FunctionComponent = () => {
    const style = StyleSheet.create({
        explore: {
            left: getFHorizontalPx(9.5),
            width: getFHorizontalPx(107.5),
            paddingLeft: getFHorizontalPx(23.5),
            paddingRight: getFHorizontalPx(54),
        },
    });
    return (
        <View style={[styles.icon, style.explore]}>
            <Text style={styles.text}>
                {MykrossIconFont.MYKROSS_ICON_EXPLOR}
            </Text>
        </View>
    );
};

interface RecordIconIprops {
    hideIcon?: boolean;
}
export const RecordIcon: FunctionComponent<RecordIconIprops> = ({
    hideIcon,
}: RecordIconIprops) => {
    const style = StyleSheet.create({
        border: {
            width: getFHorizontalPx(48 + 4),
            height: getFHorizontalPx(48 + 4),
            borderRadius: getFHorizontalPx(24 + 1),
            backgroundColor: '#fff',
            top: '-50%',
            position: 'relative',
        },
        record: {
            top: getFHorizontalPx(2),
            left: getFHorizontalPx(2),
            width: getFHorizontalPx(48),
            height: getFHorizontalPx(48),
            borderRadius: getFHorizontalPx(24),
            padding: getFHorizontalPx(12),
            backgroundColor: '#333',
        },
        text: {
            fontFamily: 'mykross',
            fontSize: getFHorizontalPx(24),
            width: getFHorizontalPx(24),
            height: getFHorizontalPx(24),
            textAlign: 'center',
            color: '#fff',
        },
    });
    if (hideIcon) {
        return null;
    }

    return (
        <View style={style.border}>
            <View style={style.record}>
                <Text style={style.text}>
                    {false
                        ? MykrossIconFont.MYKROSS_ICON_PAUSE
                        : MykrossIconFont.MYKROSS_ICON_PLAY}
                </Text>
            </View>
        </View>
    );
};

export const BikeIcon: FunctionComponent = () => {
    const style = StyleSheet.create({
        bike: {
            left: getFHorizontalPx(-39),
            width: getFHorizontalPx(107.5),
            paddingLeft: getFHorizontalPx(54),
            paddingRight: getFHorizontalPx(23.5),
        },
    });
    return (
        <View style={[styles.icon, style.bike]}>
            <Text style={styles.text}>{MykrossIconFont.MYKROSS_ICON_BIKE}</Text>
        </View>
    );
};

export const ProfileIcon: FunctionComponent = () => {
    const style = StyleSheet.create({
        profile: {
            left: getFHorizontalPx(-9.5),
            width: getFHorizontalPx(87.5),
            paddingRight: getFHorizontalPx(34),
            paddingLeft: getFHorizontalPx(23.5),
        },
    });
    return (
        <View style={[styles.icon, style.profile]}>
            <Text style={styles.text}>
                {MykrossIconFont.MYKROSS_ICON_PROFILE}
            </Text>
        </View>
    );
};
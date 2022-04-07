import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import colors from '@theme/colors';
import Svg, {Path} from 'react-native-svg';
import {appContainerHorizontalMargin} from '@theme/commonStyle';
import {
    getFHorizontalPx,
    getFVerticalPx,
    getFFontSize,
} from '@theme/utils/appLayoutDimensions';

interface Props {
    title: string;
    onpress: () => void;
    hiddenBottomBorder?: boolean;
}

const ProfileButton: React.FC<Props> = (props: Props) => {

    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            borderBottomWidth: props.hiddenBottomBorder ? 0 : 1,
            borderBottomColor: colors.greyish,
            paddingHorizontal: appContainerHorizontalMargin,
        },
        buttonText: {
            fontFamily: 'DIN2014-Demi',
            fontSize: getFFontSize(16),
            color: colors.black,
            textAlign: 'left',
            position: 'relative',
            marginTop: getFVerticalPx(16),
            marginBottom: getFVerticalPx(16),
        },
        arrow: {
            width: getFHorizontalPx(8),
            height: getFHorizontalPx(14),
            marginRight: getFHorizontalPx(7),
        },
    });

    return (
        <TouchableOpacity onPress={props.onpress}>
            <View style={styles.container}>
                <Text style={styles.buttonText}>{props.title}</Text>
                <Svg style={styles.arrow} viewBox="0 0 9 15">
                    <Path
                        fill={colors.black}
                        fill-rule="nonzero"
                        d="M.309.79c-.38.355-.41.915-.088 1.302l.088.093 5.145 4.814L.31 11.815l-.088.093c-.322.387-.292.947.088 1.303s.978.383 1.392.082l.1-.082 5.89-5.513.088-.093c.295-.355.295-.855 0-1.21l-.088-.093L1.801.79C1.387.404.72.404.308.79z"
                    />
                </Svg>
            </View>
        </TouchableOpacity>
    );
};

export default ProfileButton;

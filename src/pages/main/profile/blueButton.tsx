import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import Svg, {G, Path, Circle} from 'react-native-svg';

import {
    setAppSize,
    initAppSize,
    setObjSize,
    getCenterLeftPx,
    getCenterTopPx,
    getHorizontal,
    getHorizontalPx,
    getVertical,
    getVerticalPx,
    getWidth,
    getWidthOf,
    getWidthPx,
    getWidthPxOf,
    getHeight,
    getHeightPx,
    getHeightOfPx,
    getRelativeWidth,
    getRelativeHeight,
    getStandard,
    getStandardPx,
    getPerfectPx,
    getPosStaticHeight,
    getOnlyPos,
    getPosAndWid,
    getPosWithMinHeight,
} from '../../../helpers/layoutFoo';

interface Props {
    title: string;
    onpress: Function;
}

const BlueButton: React.FC<Props> = (props: Props) => {
    setObjSize(334, 50);
    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            // backgroundColor: 'khaki',
        },
        blueText: {
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: 18,
            color: '#3587ea',
            textAlign: 'left',
            position: 'relative',
            marginTop: getVerticalPx(33 / 2),
            marginBottom: getVerticalPx(33 / 2),
        },
        arrow: {
            width: 9,
            height: 15,
            marginRight: getHorizontalPx(7),
        },
    });

    return (
        <TouchableOpacity onPress={props.onpress}>
            <View style={styles.container}>
                <Text style={styles.blueText}>{props.title}</Text>
                <Svg style={styles.arrow} viewBox="0 0 9 15">
                    <Path
                        fill="#313131"
                        fill-rule="nonzero"
                        d="M.309.79c-.38.355-.41.915-.088 1.302l.088.093 5.145 4.814L.31 11.815l-.088.093c-.322.387-.292.947.088 1.303s.978.383 1.392.082l.1-.082 5.89-5.513.088-.093c.295-.355.295-.855 0-1.21l-.088-.093L1.801.79C1.387.404.72.404.308.79z"
                    />
                </Svg>
            </View>
        </TouchableOpacity>
    );
};

export default BlueButton;

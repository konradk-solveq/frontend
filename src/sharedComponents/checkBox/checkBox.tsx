import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';

import ChecboxOn from './checboxOn';
import ChecboxOff from './checboxOff';
import ChecboxWrong from './checboxWrong';

const styles = StyleSheet.create({
    stretch: {
        width: '100%',
        height: '100%',
    },
    aligned: {
        justifyContent: 'center',
    },
    absolute: {
        position: 'absolute',
    },
});

interface Props {
    checked: boolean;
    wrong: boolean;
    getCheck: Function;
    disabled?: boolean;
}

const CheckBoxx: React.FC<Props> = (props: Props) => {
    const [checked, setChecked] = useState(props.checked);

    const hendlePress = () => {
        let res: boolean = !checked;
        setChecked(res);
        if (props.getCheck) {
            props.getCheck(res);
        }
    };

    useEffect(() => {
        setChecked(props.checked);
    }, [props.checked]);

    return (
        <TouchableWithoutFeedback
            style={styles.stretch}
            onPress={() => hendlePress()}
            disabled={props.disabled}>
            <View style={styles.stretch}>
                <View style={[styles.stretch, styles.aligned, styles.absolute]}>
                    {props.wrong ? <ChecboxWrong /> : <ChecboxOff />}
                </View>

                <View style={[styles.stretch, styles.aligned]}>
                    {checked && <ChecboxOn />}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default CheckBoxx;

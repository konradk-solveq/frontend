import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import ImageSvg from 'react-native-remote-svg';


interface Props {
    checked: boolean,
    wrong: boolean,
    getCheck: Function
};

const CheckBoxx: React.FC<Props> = (props: Props) => {

    const [checked, setChecked] = useState(props.checked);

    const hendlePress = () => {
        let res: boolean = !checked;
        setChecked(res);
        if (props.getCheck) props.getCheck(res)
    }

    useEffect(() => { setChecked(props.checked) }, [props.checked])

    const styles = StyleSheet.create({
        stretch: {
            width: "100%",
            height: "100%"
        }
    })

    return (
        <TouchableWithoutFeedback
            style={styles.stretch}
            onPress={() => hendlePress()}
        >
            <View style={styles.stretch}>

                <View style={[styles.stretch, {
                    position: 'absolute'
                }]}>
                    {props.wrong ? <ImageSvg
                        source={require('./checbox_wrong.svg')}
                        style={styles.stretch}
                    /> : <ImageSvg
                        source={require('./checbox_off.svg')}
                        style={styles.stretch}
                    />}
                </View>

                <View style={styles.stretch}>
                    {checked ? <ImageSvg
                        source={require('./checbox_on.svg')}
                        style={styles.stretch}
                    /> : null}
                </View>
            </View>

        </TouchableWithoutFeedback>
    )
}

export default CheckBoxx
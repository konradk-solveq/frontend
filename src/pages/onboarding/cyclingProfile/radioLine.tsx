import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import TypicalRedBtn from '../../../sharedComponents/buttons/typicalRed';

import {
    setObjSize,
    getCenterLeftPx,
    getVerticalPx,
    getWidthPx,
    getHorizontalPx,
} from '../../../helpers/layoutFoo';

interface Props {
    name: string;
    list: Array<string>;
    getReult: Function;
    active: number;
}

const RadioLine: React.FC<Props> = (props: Props) => {
    const [active, setActive] = useState(props.active);
    useEffect(() => {
        setActive(props.active);
    }, [props.active]);

    const hendleOnpress = (value: number) => {
        props.getReult && props.getReult(value);
        setActive(value);
    };

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        conainer: {
            width: getWidthPx(),
            left: getCenterLeftPx(),
            marginBottom: getVerticalPx(15),
        },
        reg18: {
            width: '100%',
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getHorizontalPx(18),
            color: '#313131',
            textAlign: 'left',
            marginBottom: getVerticalPx(5),
        },
        list: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
    });

    return (
        <View style={styles.conainer}>
            <Text style={styles.reg18}>{props.name}</Text>

            <View style={styles.list}>
                {props.list.map((e, i) => (
                    <TypicalRedBtn
                        title={e}
                        onpress={() => hendleOnpress(i)}
                        active={active == i}
                        key={props.name + '_' + i}
                        height={41}
                    />
                ))}
            </View>
        </View>
    );
};
export default RadioLine;

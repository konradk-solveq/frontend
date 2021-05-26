import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import I18n from 'react-native-i18n';
import {useNavigation} from '@react-navigation/native';

import BigRedBtn from '../../../../sharedComponents/buttons/bigRedBtn';
import BigWhiteBtn from '../../../../sharedComponents/buttons/bigWhiteBtn';

import {getVerticalPx} from '../../../../helpers/layoutFoo';

interface IProps {
    onPress: () => void;
}

const MyRoutes: React.FC<IProps> = ({onPress}: IProps) => {
    const trans: any = I18n.t('MainMyRoutes');
    const navigation = useNavigation();

    const styles = StyleSheet.create({
        container: {
            marginHorizontal: 40,
        },
        title: {
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: 40,
            lineHeight: 52,
            color: '#d8232a',
            textAlign: 'center',
            marginTop: getVerticalPx(37),
        },
        text: {
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: 23,
            lineHeight: 30,
            letterSpacing: 0.5,
            color: '#313131',
            textAlign: 'left',
            marginTop: getVerticalPx(20),
        },
        btnRecord: {
            height: 50,
            width: '100%',
            marginTop: getVerticalPx(40),
        },
        btnCheck: {
            height: 50,
            width: '100%',
            marginTop: getVerticalPx(30),
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{trans.title}</Text>

            <Text style={styles.text}>{trans.text}</Text>

            <BigRedBtn
                style={styles.btnRecord}
                title={trans.btnRecord}
                onpress={() => navigation.navigate('Counter')}
            />

            <BigWhiteBtn
                style={styles.btnCheck}
                title={trans.btnCheck}
                onpress={onPress}
            />
        </View>
    );
};

export default MyRoutes;

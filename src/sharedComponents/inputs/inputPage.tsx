import React, { useState} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    ScrollView,
} from 'react-native';

import StackHeader from '../../sharedComponents/navi/stackHeader/stackHeader';
import OneLineTekst from '../../sharedComponents/inputs/oneLineTekst';
import BigRedBtn from '../../sharedComponents/buttons/bigRedBtn';

import {
    setObjSize,
    getWidthPx,
    getVertical,
    getVerticalPx,
    getCenterLeftPx,
    getPosWithMinHeight,
    getHorizontalPx,
} from '../../helpers/layoutFoo';

interface Props {
    navigation: any;
    route: any;
}

const InputPage: React.FC<Props> = (props: Props) => {
    const param: {
        header: string;
        btn: string;
        hendleGoFoward: Function;
        goBack: string;
        text: string;
        placeholder: string;
        messageWrong: string;
    } = props.route.params;

    const [inputValue, setInputValue] = useState('');
    const [canGoFoward, setCanGoFoward] = useState(false);
    const [forceMessageWrong, setForceMessageWrong] = useState('');
    const [areaHeigh, setAreaHeigh] = useState(0);

    // valizadja poprawności inputa
    const hendleValidationOk = (value: string) => {
        if (value.length > 3) {
            setForceMessageWrong('');
            return true;
        }
        return false;
    };

    // validacja błędów, tu: czy wszystkie znaki są cyframi
    const hendleValidationWrong = (value: string) => {
        // const reg = new RegExp('^[0-9]+$');
        // if (value.length > 0 && !reg.test(value)) return true;
        return false;
    };

    // walidacja po naciśnięciu przyciku 'Dalej'
    const hendleGoFoward = () => {
        if (canGoFoward) {
            param.hendleGoFoward(inputValue);
        } else {
            setForceMessageWrong(param.messageWrong);
        }
    };

    const handleAreaHeight = (layout: any) => {
        setAreaHeigh(layout.height);
    };

    const [headHeight, setHeadHeight] = useState(0);

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
        },
        scroll: {
            top: headHeight,
        },
        area: {
            width: '100%',
            height: areaHeigh,
            minHeight: getVertical(414),
        },
        inputAndPlaceholder: getPosWithMinHeight(334, 90, 351 - 100, 100),
        title: {
            position: 'absolute',
            width: getWidthPx(),
            left: getCenterLeftPx(),
            top: getVertical(138 - 100),
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: 30,
            lineHeight: 38,
            color: '#555555',
            textAlign: 'left',
        },
        infoBtn: {
            position: 'relative',
            height: getHorizontalPx(29),
            marginTop: 3,
            width: getWidthPx(),
        },
        botton: {
            position: 'absolute',
            width: getWidthPx(),
            height: 50,
            left: getCenterLeftPx(),
            bottom: getVerticalPx(65 + 100),
        },
    });

    return (
        <SafeAreaView
            style={styles.container}
            onLayout={({nativeEvent}) => handleAreaHeight(nativeEvent.layout)}>
            <ScrollView
                keyboardShouldPersistTaps={'always'}
                style={styles.scroll}>
                <View style={styles.area}>
                    <Text style={styles.title}>{param.text}</Text>

                    <View style={styles.inputAndPlaceholder}>
                        <OneLineTekst
                            placeholder={param.placeholder}
                            onChangeText={setInputValue}
                            validationOk={hendleValidationOk}
                            validationWrong={hendleValidationWrong}
                            messageWrong={param.messageWrong}
                            value={inputValue}
                            validationStatus={setCanGoFoward}
                            forceMessageWrong={forceMessageWrong}
                        />
                    </View>

                    <BigRedBtn
                        style={styles.botton}
                        title={param.btn}
                        onpress={() => hendleGoFoward()}
                    />
                </View>
            </ScrollView>

            <StackHeader
                onpress={() => props.navigation.goBack()}
                getHeight={setHeadHeight}
                inner={param.header}
            />
        </SafeAreaView>
    );
};

export default InputPage;

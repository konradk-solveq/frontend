import {getHorizontalPx, getVerticalPx} from '@src/helpers/layoutFoo';
import React, {useState, useContext, useRef} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextStyle,
    ViewStyle,
    TouchableOpacity,
    Platform,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {getAverageSpeedFromDistanceAndTime} from '@src/utils/speed';
import {CounterDataContext} from '@src/pages/main/recording/counter/nativeCounter/counterContext/counterContext';
import {useEffect} from 'react';

interface Props {
    title: string;
    dataList: any;
    style?: ViewStyle;
    trackerStartTime: any;
}

const DataPreview: React.FC<Props> = ({
    title,
    dataList,
    style,
    trackerStartTime,
}: IProps) => {
    const [opacity, setOpacity] = useState(0.8);
    const [show, setShow] = useState(true);
    const [scrollAble, setscrollAble] = useState(false);

    const heandleOpacityPlus = () => {
        if (opacity < 1) {
            let newVal = opacity + 0.1;
            if (newVal > 1) {
                newVal = 1;
            }
            setOpacity(newVal);
        }
    };

    const heanleOpacityMinus = () => {
        if (opacity > 0.15) {
            let newVal = opacity - 0.1;
            if (newVal < 0.1) {
                newVal = 0.1;
            }
            setOpacity(newVal);
        }
    };

    const heandleHide = () => {
        setShow(!show);
    };
    const heandleScroll = () => {
        setscrollAble(!scrollAble);
    };

    let styles = StyleSheet.create({
        wrap: {
            position: 'absolute',
            left: getHorizontalPx(20),
            top: getVerticalPx(40),
            width: getHorizontalPx(374),
            maxHeight: getVerticalPx(874 - 60),
            backgroundColor: '#313131',
            zIndex: 1000,
            opacity: opacity,
            borderColor: '#000',
            borderWidth: 1,
            borderRadius: getHorizontalPx(36),
            paddingTop: getHorizontalPx(16),
            paddingBottom: getHorizontalPx(36),
        },
        title: {
            fontFamily: 'DIN2014Narrow-Bold',
            fontSize: 30,
            textAlign: 'center',
            color: 'white',
            paddingBottom: getVerticalPx(10),
        },
        dataWrap: {},
        textLine: {
            display: 'flex',
            flexDirection: 'row',
        },
        textName: {
            paddingLeft: getHorizontalPx(16),
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: 16,
            textAlign: 'center',
            color: 'white',
        },
        textValue: {
            paddingLeft: getHorizontalPx(5),
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: 16,
            textAlign: 'center',
            color: 'white',
        },
        section: {
            width: '100%',
        },
        textSection: {
            paddingLeft: getHorizontalPx(5),
            fontFamily: 'DIN2014Narrow-Bold',
            fontSize: 16,
            textAlign: 'center',
            color: 'white',
        },
        separator: {
            height: 1,
            width: getHorizontalPx(374 - 32),
            left: getHorizontalPx(16),
            backgroundColor: '#fff',
            marginVertical: getVerticalPx(5),
        },
        btnOpacityPlus: {
            backgroundColor: '#fff',
            width: getHorizontalPx(40),
            height: getHorizontalPx(40),
            borderRadius: 50,
            position: 'absolute',
            right: getHorizontalPx(16 + 40),
            top: getHorizontalPx(16) + getVerticalPx(40),
            zIndex: 1001,
            opacity: opacity,
        },
        btnOpacityMinus: {
            backgroundColor: '#fff',
            width: getHorizontalPx(40),
            height: getHorizontalPx(40),
            borderRadius: 50,
            position: 'absolute',
            left: getHorizontalPx(16 + 40),
            top: getHorizontalPx(16) + getVerticalPx(40),
            zIndex: 1001,
            opacity: opacity,
        },
        btnHidde: {
            backgroundColor: '#888',
            width: getHorizontalPx(40),
            height: getHorizontalPx(40),
            borderRadius: 50,
            position: 'absolute',
            right: getHorizontalPx(0),
            top: getVerticalPx(874 / 2) - getHorizontalPx(25),
            zIndex: 1001,
            opacity: 0.75,
        },
        btnscroll: {
            backgroundColor: '#888',
            width: getHorizontalPx(40),
            height: getHorizontalPx(40),
            borderRadius: 50,
            position: 'absolute',
            right: getHorizontalPx(0),
            top: getVerticalPx(874 / 2) + getHorizontalPx(25),
            zIndex: 1001,
            opacity: 0.75,
        },
        textBtn: {
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: 40,
            lineHeight: 42,
            textAlign: 'center',
            color: '#000',
        },
        textBtn2: {
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: 20,
            lineHeight: 36,
            textAlign: 'center',
            color: '#000',
        },
        text: {
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: 20,
            textAlign: 'center',
            color: 'white',
        },
    });

    let distanceData =
        useContext(CounterDataContext).trackerData?.odometer || 0;
    const speed = useContext(CounterDataContext).trackerData?.speed;
    const pauseTimeRedux = useContext(CounterDataContext).pauseTime;
    const startTime = trackerStartTime
        ? Date.parse(trackerStartTime.toUTCString())
        : 0;

    const averageSpeed = getAverageSpeedFromDistanceAndTime(
        distanceData,
        startTime,
        pauseTimeRedux,
    );

    const [reduxList, setReduxList] = useState([]);
    useEffect(() => {
        setReduxList([
            {},
            {section: 'redux data'},
            {
                name: 'distance',
                value: distanceData,
            },
            {
                name: 'speed',
                value: speed,
            },
            {
                name: 'pause Time',
                value: pauseTimeRedux,
            },
            {
                name: 'start Time',
                value: startTime,
            },
            {
                name: 'average Speed',
                value: averageSpeed,
            },
        ]);
    }, [distanceData]);

    return (
        <>
            {show && (
                <View style={styles.btnOpacityPlus}>
                    <TouchableOpacity onPress={heandleOpacityPlus}>
                        <Text style={styles.textBtn}>+</Text>
                    </TouchableOpacity>
                </View>
            )}
            {show && (
                <View style={styles.btnOpacityMinus}>
                    <TouchableOpacity onPress={heanleOpacityMinus}>
                        <Text style={styles.textBtn}>-</Text>
                    </TouchableOpacity>
                </View>
            )}
            {show && (
                <View
                    style={[styles.wrap, style]}
                    pointerEvents={scrollAble ? 'auto' : 'none'}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.separator} />

                    <ScrollView style={styles.dataWrap}>
                        {dataList.map((e: any, i: number) => {
                            const keys = Object.keys(e);
                            switch (keys[0]) {
                                case 'name':
                                    return (
                                        <View key={'dataPreview_' + i}>
                                            <View style={styles.textLine}>
                                                <Text style={styles.textName}>
                                                    {e.name}:
                                                </Text>
                                                <Text style={styles.textValue}>
                                                    {typeof e.value !==
                                                        'undefined' &&
                                                    e.value !== null
                                                        ? e.value.toString()
                                                        : '--- null ---'}
                                                </Text>
                                            </View>
                                        </View>
                                    );
                                case 'section':
                                    return (
                                        <View
                                            key={'dataPreview_' + i}
                                            style={styles.section}>
                                            <Text style={styles.textSection}>
                                                &#8658; {e.section} &#8656;
                                            </Text>
                                        </View>
                                    );
                                default:
                                    return (
                                        <View
                                            style={styles.separator}
                                            key={'dataPreview_' + i}
                                        />
                                    );
                            }
                        })}

                        {reduxList.map((e: any, i: number) => {
                            const keys = Object.keys(e);
                            switch (keys[0]) {
                                case 'name':
                                    return (
                                        <View key={'dataPreview_' + i}>
                                            <View style={styles.textLine}>
                                                <Text style={styles.textName}>
                                                    {e.name}:
                                                </Text>
                                                <Text style={styles.textValue}>
                                                    {typeof e.value !==
                                                        'undefined' &&
                                                    e.value !== null
                                                        ? e.value.toString()
                                                        : '--- null ---'}
                                                </Text>
                                            </View>
                                        </View>
                                    );
                                case 'section':
                                    return (
                                        <View
                                            key={'dataPreview_' + i}
                                            style={styles.section}>
                                            <Text style={styles.textSection}>
                                                &#8658; {e.section} &#8656;
                                            </Text>
                                        </View>
                                    );
                                default:
                                    return (
                                        <View
                                            style={styles.separator}
                                            key={'dataPreview_' + i}
                                        />
                                    );
                            }
                        })}
                    </ScrollView>
                </View>
            )}
            <View style={styles.btnHidde}>
                <TouchableOpacity onPress={heandleHide}>
                    <Text style={styles.textBtn2}>{show ? '>' : '<'}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.btnscroll}>
                <TouchableOpacity onPress={heandleScroll}>
                    <Text style={styles.textBtn2}>
                        {scrollAble ? 'scroll' : 'invis'}
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default DataPreview;
